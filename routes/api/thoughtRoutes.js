const router = require ('express').Router();
const{
    getthought,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
} = require ('../../controllers/thoughtcontroller.js')

// /api/thoughts

router.route('/').get(getthought).post(createThought);

// /api/thoughts/:thoughtId
router
  .route('/:thoughtId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

//api/thoughts/:thoughtId/reaction
router
.route('/:thoughtId/reactions').post(addReaction)

// /api/thoughts/:thoughtId/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;