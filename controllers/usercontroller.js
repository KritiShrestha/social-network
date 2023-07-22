const {User, Thought} = require('../models');

module.exports = {
  // Get all users
  async getUsers(req, res) {
    try {
      const users = await User.find().lean(); // Populate friendList and use lean() for performance

      // Add friendCount to each user object in the response
      users.forEach((user) => {
        user.friendCount = user.friends.length;
        // user.friends = user.friends.map((friend) => friend.toString()); // Convert ObjectIds to strings
      });

      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Get a single user
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({
          _id: req.params.userId
        })
        .populate('thoughts') // Populate the thoughts field with the full details of each thought
        .populate({
          path: 'thoughts',
          populate: {
            path: 'reactions',
            select: '-_id -__v'
          } // Populate reactions for each thought, exclude _id and __v fields
        })
        .populate('friends', '-__v') // Populate the friends field with the full details of each friend, exclude __v field
        .lean();

      if (!user) {
        return res.status(404).json({
          message: 'No user with that ID'
        });
      }

      const friendsWithCount = await Promise.all(
        user.friends.map(async (friend) => {
          const friendUser = await User.findOne({
            _id: friend._id
          });
          const friendCount = friendUser.friends.length;
          return {
            ...friend,
            friendCount
          };
        })
      );

      user.friends = friendsWithCount;
      user.friendCount = user.friends.length;
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // create a new user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //Update a user 
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate({
          _id: req.params.userId
        }, {
          username: req.body.username
        }, // Update the username
        {
          new: true
        } // Return the updated user in the response
      );

      if (!user) {
        return res.status(404).json({
          message: 'No user with that ID'
        });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Delete a user and associated apps
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({
        _id: req.params.userId
      });
      if (!user) {
        return res.status(404).json({
          message: 'No user with that ID'
        });
      }
      res.json({
        message: 'User and associated apps deleted!'
      })
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //Add a new friend
  async addFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate({
        _id: req.params.userId
      }, {
        $addToSet: {
          friends: req.params.friendId
        }
      }, {
        new: true
      });
      if (!user) {
        return res.status(404).json({
          message: 'No user with that ID'
        });
      }
      res.json('New friend added')
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //Delete a friend
  async deleteFriend(req, res) {
    try {
      const {
        userId,
        friendId
      } = req.params;

      // Check if the user and friend exist
      const user = await User.findById(userId);
      const friend = await User.findById(friendId);

      if (!user || !friend) {
        return res.status(404).json({
          message: 'User or friend not found'
        });
      }

      // Remove friendId from the user's friend list
      user.friends.pull(friendId);
      await user.save();

      res.json({
        message: 'Friend removed successfully',
        user
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //POST to create a reaction stored in a single thought's reactions array field
  async addReaction(req, res) {
    try {
      const {
        userId,
        thoughtId
      } = req.params;
      const {
        reactionBody,
        username
      } = req.body;

      // Check if the user and thought exist
      const user = await User.findById(userId);
      const thought = await Thought.findById(thoughtId);

      if (!user || !thought) {
        return res.status(404).json({
          message: 'User or thought not found'
        });
      }

      // Create the reaction and add it to the thought's reactions array
      const reaction = {
        reactionBody,
        username
      };
      thought.reactions.push(reaction);

      await thought.save();

      res.json({
        message: 'Reaction added successfully',
        thought
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //DELETE to pull and remove a reaction by the reaction's reactionId value

  async deleteReaction(req, res) {
    try {
      const {
        userId,
        thoughtId,
        reactionId
      } = req.params;

      // Check if the user and thought exist
      const user = await User.findById(userId);
      const thought = await Thought.findById(thoughtId);

      if (!user || !thought) {
        return res.status(404).json({
          message: 'User or thought not found'
        });
      }

      // Find the reaction in the thought's reactions array
      const reaction = thought.reactions.find((reaction) => reaction.reactionId.equals(reactionId));

      if (!reaction) {
        return res.status(404).json({
          message: 'Reaction not found'
        });
      }

      // Remove the reaction from the thought's reactions array
      thought.reactions.pull(reaction._id);

      await thought.save();

      res.json({
        message: 'Reaction deleted successfully',
        thought
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },
}