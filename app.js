var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('dotenv').config();
var pool = require('./models/bd');
var session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/admin/login');
var adminRouter = require('./routes/admin/vip');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'kjshfaof284l124g124asg4887h212s',
  resave: false,
  saveUninitialized: true
}))

secured = async (req, res, next) => {
  try {
    console.log(req.session.id_usuario);
    if (req.session.id_usuario) {
      next();
    } else {
      res.redirect('/admin/login')
    }
  } catch (error) {
    console.log(error);
  }
}

app.get('/nosotros', function(req, res) {
  res.render('nosotros', {tytle: 'Nosotros'});
})
app.get('/noticias', function(req, res) {
  res.render('noticias', {tytle: 'Noticias'});
})
app.get('/lectura', function(req, res) {
  res.render('lectura', {tytle: 'Lectura'});
})


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin/login', loginRouter);
app.use('/admin/vip', secured, adminRouter);

//pool.query('select * from suscriptores').then(function (resultados) {
//  console.log(resultados)
//});

//insertar registro
var obj = {
  nombre: 'prueba',
  mail: 'prueba@trucoteca.net'
}

pool.query('insert into suscriptores set ?', [obj]).then(function (resultados) {
  console.log(resultados)
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
