const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createNewThought,
  updateThought,
  deleteThought,
} = require('../../controller/thoughtController');

router.route('/').get(getThoughts).post(createNewThought);
router
  .route('/:thoughtId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

module.exports = router;
