const express = require('express');

const ClassesService = require('./classes-service');

const classesRouter = express.Router();

// WARNING: Not using a serialize function here! Might delete this whole endpoint

classesRouter
  .route('/')
  .get((req, res, next) => {
    ClassesService.getAllClasses(
      req.app.get('db')
    )
      .then(allClasses => {
        res.json(allClasses);
      })
      .catch(next);
  });

classesRouter
  .route('/:id')
  .get((req, res, next) => {
  // This endpoint will GET the specified Class by their ID
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

    ClassesService.getClassById(
      req.app.get('db'),
      classId
    )
      .then(specifiedClass => {
        res.json(specifiedClass); // might need to sanitize if we let people add classes!
      })
      .catch(next);
  });

classesRouter
  .route('/:id/spells')
  .get((req, res, next) => {
  // This endpoint will be to GET all the spells a class has
  // For example: GET /${paladinId}/spells should return all paladin spells!
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

    ClassesService.getClassSpells(
      req.app.get('db'),
      classId
    )
      .then(resp => {
        res.json(resp);
      })
      .catch(next);
  });
module.exports = classesRouter;