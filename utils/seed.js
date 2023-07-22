// seed.js
const mongoose = require('mongoose');
const data = require('./data');
const User = require('../models/User');
const Thought = require('../models/Thought');
const Reaction = require('../models/Reaction');
const connection = require('../config/connection');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
  try {
    // Clear existing data (optional)
    await User.deleteMany();
    await Thought.deleteMany();
    await Reaction.deleteMany();

     // Seed users
    const users = await User.insertMany(data.users);

    // Seed thoughts and reactions
    const thoughts = data.thoughts.map((thought) => {
      const user = users.find((user) => user.username === thought.username);
      thought.username = user.username; // Update to use the actual username

      thought.reactions = thought.reactions.map((reaction) => {
        const reactingUser = users.find((user) => user.username === reaction.username);
        const reactionId = new mongoose.Types.ObjectId(); // Generate a new ObjectId for reactionId
        reaction.reactionId = reactionId; // Set the reactionId field
        reaction.username = reactingUser.username; // Update to use the actual username
        return reaction;
      });
      return thought;
    });

    const seededThoughts = await Thought.insertMany(thoughts);

    // Update users with thoughts
    for (const thought of seededThoughts) {
      const user = users.find((user) => user.username === thought.username);
      user.thoughts.push(thought._id);
      await user.save();
    }

    // Seed friends and friendCount
    for (const user of users) {
      // Generate a random number of friends for each user
      const numFriends = Math.floor(Math.random() * (users.length - 1)); // Random number from 0 to (total users - 1)
      const friends = users
        .filter((u) => u.username !== user.username) // Exclude the current user from friends
        .sort(() => 0.5 - Math.random()) // Shuffle the users array randomly
        .slice(0, numFriends); // Get the first numFriends users as friends

      user.friends = friends.map((friend) => friend._id);
      user.friendCount = friends.length;
      await user.save();
    }

    console.log('Data seeded successfully');
    process.exit(0); // Exit the script
  } catch (err) {
    console.error('Error seeding data:', err);
    process.exit(1); // Exit the script with an error code
  }
});