const express = require('express');
const xss = require('xss');
const path = require('path');

const SpellBooksService = require('./spellbooks-service');

const spellbooksRouter = express.Router();
const jsonParser = express.json();

const serializeSpellBook = spellbook => ({}); // Dont need to use XSS until I let the users POST a spellbook. CUrrently they cant create them.

spellbooksRouter
  .route('/')
  .get((req, res, next) => {

    SpellBooksService.getAllSpellBooks(
      req.app.get('db')
    )
      .then(spellbooks => {
        res.json(spellbooks);
      })
      .catch(next);
  });

spellbooksRouter
  .route('/:id')
  .get()
  .post();

module.exports = spellbooksRouter;