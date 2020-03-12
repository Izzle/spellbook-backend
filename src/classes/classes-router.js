const express = require('express');

const ClassesService = require('./classes-service');

const classesRouter = express.Router();

classesRouter
  .route('/')
  .get((req, res, next) => {
    res.json({ message: 'lol'});
  });

classesRouter
  .route('/:id')
  .get();

module.exports = classesRouter;