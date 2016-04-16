var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var Q = require('q');
var app = express();
var mysql = require('mysql');

//var routes = require('./routes/index');
//var users = require('./routes/users');

var connection = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'anip1234',
      database: 'rembook'
    }
);

connection.connect(function(err){
    if(err){
        console.log('Error! ', err);
    }
    else{
        console.log('Successful connection!');
    }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/:id', function(req, res) {

    //res.send('requested id ' + req.params.id);
    var id = req.params.id;

    var data = {};

    var queryString1 = 'SELECT * from student where student_id = ' + id;
    var queryString2 = 'SELECT * from message where ID = ' + id;
    var queryString3 = 'SELECT * from comment where post_about = ' + id;

    connection.query(queryString1, function (err, rows, fields) {
        if (err) {
            console.log(err);
        }
        else {
            data.studentDetails=rows;
        }

    });

    connection.query(queryString2, function(err, rows, fields){
        if(err){
            console.log(err);
        }

        else{
            data.studentMessage=rows;
        }
    });

    connection.query(queryString3, function(err, rows, fields){
        if(err){
            console.log('Error while querying! ', err);
            res.send(500, err);
        }

        else{
            data.studentComments=rows;
            res.send(200, data);
        }
    });

});


        /*
      else{
        /!*console.log('rows');
        for(var i in rows){
          console.log(rows[i]);
        }
        console.log('fields', fields);*!/
        data.studentDetails=rows;
      }
    });

    connection.query(queryString2, function(err, rows, fields){
      if(err){
        console.log('Error while querying! ', err);
        res.send(500, err);
      }

      else{
        /!*console.log('rows');
        for(var i in rows){
          console.log(rows[i]);
        }
        console.log('fields', fields);*!/
        data.studentMessage=rows;
      }
    });

    connection.query(queryString3, function(err, rows, fields){
      if(err){
        console.log('Error while querying! ', err);
        res.send(500, err);
      }

      else{
        /!*console.log('rows');
        for(var i in rows){
          console.log(rows[i]);
        }
        console.log('fields', fields);*!/
        data.studentComments=rows;

        res.send(200, data);
      }
    });

});

connection.end();*/

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
