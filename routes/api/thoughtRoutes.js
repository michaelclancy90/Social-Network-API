const router = require('express').Router();
const {
  getThoughts,
  getSingleThoughts,
  createNewThought,
  addReaction,
  deleteReaction,
} = require('../../controllers/thoughtController');

router.route('/').get(getThoughts).post(createNewThought);
router
  .route('./thoughtId')
  .get(getSingleThoughts)
  .put(updateThought)
  .delete(deleteThought);
router.route('./thoughtId/reactions').post(addReaction);
router.route('./thoughtId/reactions/reactionId').delete(deleteReaction);

module.exports = router;
