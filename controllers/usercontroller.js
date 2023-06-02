const { User } = require('../models');
const express = require('express');
const app = express();

module.exports = {
    // Get all users
    async getUsers(req, res) {
      try {
        const users = await User.find();
        res.json(users);
      } catch (err) {
        res.status(500).json(err);
      }
    },
    // Get a single user
    async getSingleUser(req, res) {
      try {
        const user = await User.findOne({ _id: req.params.userId })
          .select('-__v');
  
        if (!user) {
          return res.status(404).json({ message: 'No user with that ID' });
        }
  
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
          const user = await User.findOneAndUpdate( {_id: req.params.userId});
          if(!user){
            return res.status(404).json({ message: 'No user with that ID' });
          }
            res.json(user);
        } catch (err) {
          res.status(500).json(err);
        }
      },

       // Delete a user and associated apps
    
      async deleteUser(req, res) {
        try {
          const user = await User.findOneAndDelete({ _id: req.params.userId });
    
          if (!user) {return res.status(404).json({ message: 'No user with that ID' });}
          Application.deleteMany({ _id: { $in: user.applications } });
          res.json({ message: 'User and associated apps deleted!' })
        } catch (err) {
          res.status(500).json(err);
        }
      },
  
  //Add a new friend
  async addFriend (req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId},
        {$addToSet:{friends:req.params.friendId}},
        {new:true}
        );
      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }
       res.json('New friend added')
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //Delete a friend
  async deleteFriend (req, res) {
    try {
      const user = await User.findOneAndDelete(
        { _id: req.params.userId},
        {$pull:{friends:req.params.friendId}},
        {new:true}
        );
      if (!user)
      await res.json({ message: 'No user with this ID' })
      else res.json({ message: 'friend removed'})
    } catch (err) {
      res.status(500).json(err);
    }
  },
}