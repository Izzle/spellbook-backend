const express = require('express');
const xss = require('xss');
const path = require('path');

const SpellBooksService = require('./spellbooks-service');

const spellbooksRouter = express.Router();
const jsonParser = express.json();

// The serialize function will CLEAN UP (e.g. sanitize and/or format) all data before we send it out as a response
// If you want to LIMIT the data your are responding with, you should SELECT less data from the Database in your knex service
//   (e.g. if you didn't want to send the ID when a GET request at :id is made)
const serializeSpellBook = spellbook => ({
  id: spellbook.id,
  spellbook_name: xss(spellbook.spellbook_name) || `Spellbook ${spellbook.id}` // instead of returning 'null' when they havent set a spellbook name, returns Spellbook 3 etc
});

// REMEMBER - FILTERS AND SORTS USE "query parameters"
//  GETting or modifying data uses "params" instead
spellbooksRouter
  .route('/') // All spellbooks
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
  .route('/:id') // A specific spellbook
  .get((req, res, next) => {
    // GET a specified SpellBook by its ID
    // NOTE: We get the STRING '123' instead of the NUMBER 123 because of JSON
    let spellbookId = req.params.id;
    
    if(spellbookId == null) {
      return res.status(400).json({
        error: `Missing 'id' in params`
      });
    }

    // This is will turn our string into a number. If it is a float, it will parseFloat(), if its int it will parseInt()
    // if it has random text in it, it will return NaN
    spellbookId = Number(spellbookId);
    // If spellbookId is NaN or a float it will respond 400
    if (isNaN(spellbookId) || !Number.isInteger(spellbookId)) {
      return res.status(400).json({
        error: `'id' must be an integer number`
      });
    }

    SpellBooksService.getSpellBookById(
      req.app.get('db'),
      spellbookId
    )
      .then(spellbook => {
        res.json(serializeSpellBook(spellbook));
      })
      .catch(next);
  })
  .post();

spellbooksRouter
  .route('/:id/spells') // NOT SETUP YET: All spells in a specified spellbook
  .get((req, res, next) => {
    res.json({ message: 'here are all the spells in this spellbook'});
  });

spellbooksRouter
  .route('/:id/frogs')
  // used this endpoint to test that static endpoints work this way.You CANT have 2 dynamic endpoints in an app
  //    e.g. you cant have /:spell_id and /:class_id
  // But you CAN have different STATIC endpoints. e.g. /api/spells and /api/classes 
  //     (technically you can have as many as you want. do /api/fireball, /api/frostbolt, /api/arcaneblast would all work)
  .get((req, res, next) => {
    res.json({ message: 'here are all frogs in a box.'});
  });

spellbooksRouter
  .route('/:id/spells/:id') // NOT SETUP YET: GET a specific spell in a specific spellbook
  .get((req, res, next) => {
    res.json({ message: 'does this endpoint even need to exists???? need to think of a use case for it....'});
  }); 
  
module.exports = spellbooksRouter;