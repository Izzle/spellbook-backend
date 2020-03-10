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
  getSpellsByClass(db, classId){},
  insertSpell(db, newSpell){},
  serializeSpell(spell){
    return {
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
    };
  }
};

module.exports = SpellsService;