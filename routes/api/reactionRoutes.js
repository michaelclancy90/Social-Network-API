const router = require('express').Router();
const {
  addReaction,
  deleteReaction,
} = require('../../controller/reactionController');

router.route('/:thoughtId').post(addReaction);
router.route('/:thoughtId/:reactionId').delete(deleteReaction);

module.exports = router;
