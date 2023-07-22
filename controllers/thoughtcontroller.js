// const {User, Thought} = require ('../models');
const User = require('../models/User')
const Thought = require('../models/Thought')

module.exports = {
  // Get all thoughts
  async getthought(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  },

  //get a single thought by its id:
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({
        _id: req.params.thoughtId
      }).select('-_v');
      if (!thought) {
        return res.status(404).json({
          message: 'No thought with that ID'
        });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //create a new thought and push the created thought's _id to the associated user's thoughts array field)
  // Because thought are associated with Users, we update User who created thought and add the ID of the thought to the array
  async createThought(req, res) {
    try {

      // Find the user by username
      const user = await User.findOne({
        username: req.body.username
      });

      if (!user) {
        return res.status(404).json({
          message: 'No user with that username'
        });
      }

      // Create a new thought with the user's _id as the userId
      const thought = await Thought.create({
        ...req.body,
        userId: user._id
      });

      // Update the associated user's thoughts array with the newly created thought's _id
      user.thoughts.push(thought._id);
      await user.save();

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },


  //update a thought by its id
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate({
        _id: req.params.thoughtId
      }, {
        $set: req.body
      }, {
        runValidators: true,
        new: true
      }).select('-__v');
      if (!thought) {
        return res.status(404).json({
          message: 'No thought with that ID'
        });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //Delete a thought by its id
  async deleteThought(req, res) {
    try {
      const deletedThought = await Thought.findOneAndDelete({
        _id: req.params.thoughtId
      });

      if (!deletedThought) {
        return res.status(404).json({
          message: 'No thought with that ID'
        });
      }

      // Remove the thought's _id from the associated user's thoughts array
      const user = await User.findOneAndUpdate({
        username: deletedThought.username
      }, {
        $pull: {
          thoughts: deletedThought._id
        }
      }, {
        new: true
      });

      if (!user) {
        return res.status(404).json({
          message: 'No user associated with the deleted thought'
        });
      }

      res.json({
        message: 'Thought has been deleted',
        deletedThought
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },

}