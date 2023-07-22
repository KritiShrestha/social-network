const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
  addReaction,
  deleteReaction
} = require('../../controllers/usercontroller');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router
.route('/:userId').get(getSingleUser)
.put(updateUser)
.delete(deleteUser);

// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);


// /api/users/:userId/thoughts/:thoughtId/reactions
router.route('/:userId/thoughts/:thoughtId/reactions').post(addReaction);

// /api/users/:userId/thoughts/:thoughtId/reactions/:reactionId
router.route('/:userId/thoughts/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;