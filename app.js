const express = require('express');
const app = express();
const ExpressError = require('./expressError');
const uRoutes = require('./routes/users');

app.use(express.json());
app.use('/', uRoutes);



/** 404 handler */

app.use(function(req, res, next) {
  const err = new ExpressError("Not Found", 404);
  return next(err);
});

/** general error handler */

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: err.message
  });
});


module.exports = app;
