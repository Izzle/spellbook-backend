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
  });

module.exports = spellsRouter;