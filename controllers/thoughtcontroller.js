// const {User, Thought} = require ('../models');
const User = require('../models/user')
const Thought = require('../models/thought')

module.exports = {
    // Get all thoughts
    async getthought(req, res) {
      try {
        const thoughts = await Thought.find();
        res.json(thoughts);
      } catch (err) {
        res.status(500).json(err);
      }
    },

    //get a single thought by its id:
        async getSingleThought(req, res) {
          try {
            const thought = await Thought.findOne({_id: req.params.thoughtId}).select('-_v');
            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
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
              const thought = await Thought.create(req.body);
              const user = await User.findOneAndUpdate(
                {_id:req.body.userId},
                {$addToSet:{thoughts:thought._id}},
                {new: true}
              );
        
              if (!user){
                return res.status (404).json({ message: 'No user with that ID' });
              }
              res.json('');
            }
            catch (err) {
              res.status(500).json(err);
            }
          }, 
      //update a thought by its id

      async updateThought(req, res) {
        try {
          const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
          ).select('-__v');
          if (!thought) {
            return res.status(404).json({ message: 'No thought with that ID' });
          }
          res.json(thought);
        } catch (err) {
          res.status(500).json(err);
        }
      },

    //Delete a thought by its id
    async deleteThought(req, res) {
      try {
        const thought = await User.findByIdAndDelete({ _id: req.params.thoughtId });
  
        if (!thought) {
          return res.status(404).json({ message: 'No thought with that ID' });
        }
        return User.findOneAndUpdate(
          { thoughts: req.params.thoughtId },
          { $pull: { thoughts: req.params.thoughtId } },
          { new: true }
        );
       res.json(thought)
      } catch (err) {
        res.status(500).json(err);
      }
    },

    //POST to create a reaction stored in a single thought's reactions array field
    async addReaction(req, res) {
      try {
        const thought = await Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $push: { reaction: req.body } },
          { runValidators: true, new: true }
        );
      
        if (!thought){
          return res.status (404).json({ message: 'No thought with that ID' });
        }
        res.json(thought);
      }
      catch (err) {
        res.status(500).json(err);
      }
    }, 

    //DELETE to pull and remove a reaction by the reaction's reactionId value

    async deleteReaction(req, res) {
      try {
        const thought = await Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $pull: { reactions:{reactionId: req.params.reactionId } }},
          {new: true }
        );
      
        if (!thought){
          return res.status (404).json({ message: 'No reaction with that ID' });
        }
        res.json(thought);
      }
      catch (err) {
        res.status(500).json(err);
      }
    }, 

}