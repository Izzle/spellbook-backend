const express = require('express');
const xss = require('xss');

const SpellsService = require('./spells-service');

const spellsRouter = express.Router();
const jsonParser = express.json();

const serializeSpell = spell => ({
  id: spell.id,
  spell_name: xss(spell.spell_name),
  level: spell.level,
  spell_school: xss(spell.spell_school),
  spell_range: xss(spell.spell_range),
  cast_time: xss(spell.cast_time),
  spell_components: xss(spell.spell_components), // do I need to add a " || ''" or " || {}" to entries that can be NULL?
  spell_duration: xss(spell.spell_duration),
  spell_description: xss(spell.spell_description),
  higher_levels: xss(spell.higher_levels)
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

    // HOW DO I WRITE THIS WITH ASYNC AWAIT?
    // Where do I put the 'async' ??
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

    //VALIDATION HERE
    
    // add back values to the newSpell object that werent need for validation or required fields
    // ie newSpell.spell_range = spell_range;
  });

module.exports = spellsRouter;