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
  .get((req, res, next) => {
  // NOTE: We get the STRING '123' instead of the NUMBER 123 because of JSON
    let classId = req.params.id;
    
    if(classId == null) {
      return res.status(400).json({
        error: `Missing 'id' in params`
      });
    }

    // This is will turn our string into a number. If it is a float, it will parseFloat(), if its int it will parseInt()
    // if it has random text in it, it will return NaN
    classId = Number(classId);
    // If classId is NaN or a float it will respond 400
    if (isNaN(classId) || !Number.isInteger(classId)) {
      return res.status(400).json({
        error: `'id' must be an integer number`
      });
    }

    ClassesService.getSpellsByClass(
      req.app.get('db'),
      classId
    )
      .then(specifiedClass => {
        res.json(specifiedClass); // might need to sanitize if we let people add classes!
      })
      .catch(next);
  });

module.exports = classesRouter;