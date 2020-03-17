const express = require('express');
const path = require('path');

const SpellBooksService = require('./spellbooks-service');
const SpellsService = require('../spells/spells-service');

const spellbooksRouter = express.Router();
const jsonParser = express.json();


// REMEMBER - FILTERS AND SORTS USE "query parameters"
//  GETting or modifying data uses "params" instead
spellbooksRouter
  .route('/') // All spellbooks
  .get((req, res, next) => {

    SpellBooksService.getAllSpellBooks(
      req.app.get('db')
    )
      .then(spellbooks => {
        res.json(spellbooks.map(SpellBooksService.serializeSpellBook));
      })
      .catch(next);
  });

spellbooksRouter
  .route('/:id') // A specific spellbook
  .get((req, res, next) => {
    // GET a specified SpellBook by its ID
    // NOTE: We get the STRING '123' instead of the NUMBER 123 because of JSON
    let spellbookId = req.params.id;
    
    if(spellbookId == null) { // eslint-disable-line eqeqeq
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
        res.json(SpellBooksService.serializeSpellBook(spellbook));
      })
      .catch(next);
  })
  .post(); // create a single spellbook (i.e. Arcane, Holy Paladin spells, etc)

spellbooksRouter
  .route('/:id/spells') // All spells in a specified spellbook
  .get((req, res, next) => {
    // NOTE: We get the STRING '123' instead of the NUMBER 123 because of JSON
    let spellbookId = req.params.id;
    
    if(spellbookId == null) { // eslint-disable-line eqeqeq
      return res.status(400).json({
        error: `Missing 'id' in params`
      });
    }

    // This is will turn our string into a number
    spellbookId = Number(spellbookId);
    // If spellbookId is NaN or a float it will respond 400
    if (isNaN(spellbookId) || !Number.isInteger(spellbookId)) {
      return res.status(400).json({
        error: `'id' must be an integer number`
      });
    }

    SpellBooksService.getAllSpellsInSpellBook(
      req.app.get('db'),
      spellbookId
    )
      .then(spells => {
        res.json(spells.map(SpellsService.serializeSpell));
      })
      .catch(next);
  })
  .put(jsonParser, (req, res, next) => { // replaces all spells in the specified spellbook (e.g. when removing and adding spells to your spellbook)
    
    const { spell_ids } = req.body;
    let spellbookId = req.params.id;

    // VALIDATION HERE
    // Validating to make sure that all the required fields are in the request
    const newSpells = {spell_ids, spellbookId};  
    for (const [key, value] of Object.entries(newSpells)) {
      if (value == null) { // eslint-disable-line eqeqeq
        return res.status(400).json({
          error: `Missing '${key}' in request body`
        });
      }
    }
    
    // jsonParser only parses the body, so req.params.id will be a STRING
    spellbookId = Number(spellbookId);
    // If spellbookId is NaN or a float it will respond 400
    if(isNaN(spellbookId) || !Number.isInteger(spellbookId)) {
      return res.status(400).json({
        error: `'spellbookId' must be an integer number`
      });
    }

    // check that the values spell_ids is an array of integers
    if(!Array.isArray(spell_ids)) {
      return res.status(400).json({
        error: `'spell_ids' must be an Array`
      });
    }

    spell_ids.forEach(spell_id => {
      if(isNaN(spell_id) || !Number.isInteger(spell_id)) {
        return res.status(400).json({
          error: `'spell_ids' must be contain only integer numbers`
        });
      }
    });

    SpellBooksService.updateSpellsInSpellBook(
      req.app.get('db'),
      spellbookId,
      spell_ids
    ).then(() => {
      res.status(204).end();
    })
      .catch(next);
  }); 

spellbooksRouter
  .route('/:id/spells/:id') // NOT SETUP YET: GET a specific spell in a specific spellbook
  .get((req, res, next) => {
    res.json({ message: 'does this endpoint even need to exists???? need to think of a use case for it....'});
  }); 

module.exports = spellbooksRouter;