
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
  }
};

module.exports = SpellsService;