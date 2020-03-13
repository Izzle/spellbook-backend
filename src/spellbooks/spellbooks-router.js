const express = require('express');
const xss = require('xss');
const path = require('path');

const SpellBooksService = require('./spellbooks-service');

const spellbooksRouter = express.Router();
const jsonParser = express.json();

const serializeSpellBook = spellbook => ({
  id: spellbook.id,
  spellbook_name: xss(spellbook.spellbook_name) || `Spellbook ${spellbook.id}` // instead of returning 'null' when they havent set a spellbook name, returns Spellbook 3 etc
});

spellbooksRouter
  .route('/')
  .get((req, res, next) => {

    SpellBooksService.getAllSpellBooks(
      req.app.get('db')
    )
      .then(spellbooks => {
        res.json(spellbooks.map(serializeSpellBook));
      })
      .catch(next);
  });

spellbooksRouter
  .route('/:id')
  .get()
  .post();

module.exports = spellbooksRouter;