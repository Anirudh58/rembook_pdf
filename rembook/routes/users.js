var express = require('express');
var router = express.Router();

var mysql = require('mysql');

var connection = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'anip1234',
      database: 'rembook'
    }
);

connection.connect();


/* GET users listing. */
router.get('/:id', function(req, res, next) {
  var id = req.params.id;

  console.log('requested id is', id);

  res.send('respond with a resource');
});

module.exports = router;
