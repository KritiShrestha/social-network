const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router
.route('/:userId').get(getSingleUser)
.put(updateUser)
.delete(deleteUser);

 //api/users/:userId/:friends/
router
.route('/api/users/:userId/friends').post(addFriend);

 //api/users/:userId/:friends/:friendId
router
.route('/api/users/:userId/friends/:friendId').delete(deleteFriend)

module.exports = router;