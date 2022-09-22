const router = require('express').Router();
const {
  getThoughts,
  getSingleThoughts,
  createNewThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction,
} = require('../../controller/thoughtController');

router.route('/').get(getThoughts).post(createNewThought);
router
  .route('./thoughtId')
  .get(getSingleThoughts)
  .put(updateThought)
  .delete(deleteThought);
router.route('./:thoughtId/reactions').post(addReaction);
router.route('./:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;
