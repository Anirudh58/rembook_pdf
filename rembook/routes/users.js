var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:id', function(req, res, next) {
  var id = req.params.id;

  console.log('requested id is', id);

  res.send('respond with a resource');
});

module.exports = router;
