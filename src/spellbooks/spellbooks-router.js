const express = require('express');
const xss = require('xss');
const path = require('path');

const SpellBooksService = require('./spellbooks-service');

const spellbooksRouter = express.Router();
const jsonParser = express.json();

const serializeSpellBook = spellbook => ({});

spellbooksRouter
  .route('/')
  .get((req, res, next) => {
    res.json({ message: 'functional stub is working yo'});
  });

spellbooksRouter
  .route('/:id')
  .get()
  .post();

module.exports = spellbooksRouter;