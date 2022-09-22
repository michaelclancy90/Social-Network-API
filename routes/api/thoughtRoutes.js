const router = require('express').Router();
const {
  getThoughts,
  getSingleThoughts,
  createNewThought,
  updateThought,
  deleteThought,
} = require('../../controller/thoughtController');

router.route('/').get(getThoughts).post(createNewThought);
router
  .route('./thoughtId')
  .get(getSingleThoughts)
  .put(updateThought)
  .delete(deleteThought);

module.exports = router;
