const express = require('express');
const morgan = require('morgan');

const app = express();
// eslint-disable-next-line import/no-dynamic-require
const tourRouter = require(`${__dirname}/routes/tourRoutes`);
// eslint-disable-next-line import/no-dynamic-require
const userRouter = require(`${__dirname}/routes/userRoutes`);

//MIDDLEWARE: between client and server
//use = use middleware. Basically every Express step is middleware

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

//each and every single request because not specifying route
app.use((req, res, next) => {
  //next = requesting middleware
  //next is convention in express
  req.requestTime = new Date().toISOString();
  // eslint-disable-next-line no-console
  console.log(req.requestTime);
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//ROUTERS

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

//exporting app
module.exports = app;
