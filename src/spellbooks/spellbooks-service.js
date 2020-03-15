const SpellBooksService = {
  getAllSpellBooks(db){
    return db
      .from('spellbook_spellbooks')
      .select('*');
  },
  getSpellBookById(db, id){
    return db
      .from('spellbook_spellbooks AS sp')
      .select('sp.spellbook_name')
      .where('id', id)
      .first();
  },
  getAllSpellsInSpellBook(db, id) {
    return db
      // .from('spellbook_spellbooks AS spbook')
      // .select('sp.spell_name', 'sp.spell_level') // just a couple test values first, then we need all values
      // .join()
      .raw(`SELECT
              sp.id, sp.spell_name, sp.spell_level, sp.spell_school, sp.spell_range, sp.cast_time, sp.spell_components, sp.spell_duration, sp.higher_levels
            FROM
              spellbook_spellbooks AS spbook
            JOIN
              spellbook_spell_spellbook AS sp_spbook
            ON  spbook.id = sp_spbook.spellbook_id
            JOIN
              spellbook_spells AS sp
            ON
              sp_spbook.spell_id = sp.id`)
      .then(resp => resp.rows);
  }
};

module.exports = SpellBooksService;