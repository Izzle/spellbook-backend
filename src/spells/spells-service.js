
const xss = require('xss');

const SpellsService = {
  getAllSpells(db) {
    return db
      .from('spellbook_spells')
      .select('*');
  },
  getSpellById(db, id){
    return db
      .from('spellbook_spells AS sp')
      .select(
        'sp.spell_name',
        'sp.spell_level',
        'sp.spell_school',
        'sp.spell_range',
        'sp.cast_time',
        'sp.spell_components',
        'sp.spell_duration',
        'sp.spell_description',
        'sp.higher_levels'
      )
      .where('sp.id', id)
      .first();
  },
  insertSpell(db, newSpell){
    return db
      .insert(newSpell)
      .into('spellbook_spells')
      .returning('*')
      .then(rows => rows[0]); 
  },
  serializeSpell(spell){
    // The serialize function will CLEAN UP (e.g. sanitize and/or format) all data before we send it out as a response
    // If you want to LIMIT the data your are responding with, you should SELECT less data from the Database in your knex service
    //   (e.g. if you didn't want to send the ID when a GET request at :id is made)
    return {
      id: spell.id,
      spell_name: xss(spell.spell_name),
      spell_level: spell.spell_level,
      spell_school: xss(spell.spell_school),
      spell_range: xss(spell.spell_range) || '', // optional field
      cast_time: xss(spell.cast_time),
      spell_components: xss(spell.spell_components) || '', // optional field
      spell_duration: xss(spell.spell_duration),
      spell_description: xss(spell.spell_description),
      higher_levels: xss(spell.higher_levels) || '' // optional field
    };
  }
};

module.exports = SpellsService;