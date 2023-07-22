const router = require ('express').Router();
const{
    getthought,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought
} = require ('../../controllers/thoughtcontroller.js')

// /api/thoughts
router.route('/').get(getthought).post(createThought);

// /api/thoughts/:thoughtId
router
  .route('/:thoughtId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

module.exports = router;