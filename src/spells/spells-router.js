const express = require('express');
const xss = require('xss');
const path = require('path');

const SpellsService = require('./spells-service');

const spellsRouter = express.Router();
const jsonParser = express.json();

const serializeSpell = spell => ({
  id: spell.id,
  spell_name: xss(spell.spell_name),
  level: spell.level,
  spell_school: xss(spell.spell_school),
  spell_range: xss(spell.spell_range) || '', // optional field
  cast_time: xss(spell.cast_time),
  spell_components: xss(spell.spell_components) || '', // optional field
  spell_duration: xss(spell.spell_duration),
  spell_description: xss(spell.spell_description),
  higher_levels: xss(spell.higher_levels) || '' // optional field
});

spellsRouter
  .route('/')
  .get((req, res, next) => {
    SpellsService.getAllSpells(
      req.app.get('db')
    )
      .then(spells => {
        res.json(spells.map(serializeSpell));
      })
      .catch(next);
  })
  .post(jsonParser, (req, res, next) => {
    // get all fields that will be used at all 
    // in this case we dont take an ID because the server will be creating that - we dont POST that
    const { spell_name,
      spell_level,
      spell_school,
      spell_range,
      cast_time,
      spell_components,
      spell_duration,
      spell_description,
      higher_levels } = req.body;
    // make a newSpell object that we'll add values to after validation
    // first only adding the REQUIRED fields
    const newSpell = { spell_name, spell_school, cast_time, spell_duration, spell_description };
    
    // When I make the input DROPDOWNs for certain values, using things like this to validate against
    //  const validSpellSchools = ['Evocation', 'Illusion', 'etc'];
    //  const validCastTimes = ['1 Action', 'Forever lol'];

    // VALIDATION HERE
    // Validating to make sure that all the required fields are in the request
    for (const [key, value] of Object.entries(newSpell)) {
      if (value == null) { // eslint-disable-line eqeqeq
        return res.status(400).json({
          error: `Missing '${key}' in request body`
        });
      }
    }
    
    // Send 400 if 'spell_level' is not a number or not an integer
    if(isNaN(spell_level) || !Number.isInteger(spell_level)) {
      return res.status(400).json({
        error: `'spell_level' must be an integer number`
      });
    }
    
    const assumedStrings = { 
      spell_name, 
      spell_school, 
      spell_range, 
      cast_time, 
      spell_components, 
      spell_duration, 
      spell_description, 
      higher_levels
    };

    // Validating that all values are strings that are supposed to be
    for (const [key, value] of Object.entries(assumedStrings)) {
      // Make sure we don't send a 400 if it was an optional field is empty. Required fields have already been tested.
      if(value != null && typeof(value) !== 'string') { // eslint-disable-line eqeqeq
        return res.status(400).json({
          error: `'${key}' must be a string`
        });
      }
    }


    // Add optional values to newSpell after all validation is complete
    newSpell.spell_level = spell_level; // spell level isnt optional, but it does have a default value in our DB
    newSpell.spell_range = spell_range;
    newSpell.spell_components = spell_components;
    newSpell.higher_levels = higher_levels;

    // insert our data into the database
    SpellsService.insertSpell(
      req.app.get('db'),
      newSpell
    )
      .then(spell => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${spell.id}`))
          .json(serializeSpell(spell));
      })
      .catch(next);
  });

module.exports = spellsRouter;