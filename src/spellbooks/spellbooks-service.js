const xss = require('xss');

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
              sp_spbook.spell_id = sp.id
            WHERE
              sp_spbook.spellbook_id = ?`, [id])
      .then(resp => resp.rows);
  },
  updateSpellsInSpellBook(db, spellbookId, spell_id) {
    // ISSUE:
    // I wanted to make many changes on the frontend, then have them press "SAVE" button to finalize all changes and do a PUT/PATCH then
    // How can I do an UPDATE that does them all? Should I have my PUT request have an array of the spell IDs and then interate over that in my router
    // and do many DB changes? or should I try to do them all in one-go in SQL code?
    // how do I handle removing a spell from the spellbook? Should I just remove everything in the table and repopulate it?
    // How could I put these all in one transaction??
    return db
      .raw(`UPDATE spellbook_spell_spellbooks
            SET spell_id = ?
            WHERE spellbook_id = ??`, [spell_id], [spellbookId]);
  },
  serializeSpellBook(spellbook) {
  // The serialize function will CLEAN UP (e.g. sanitize and/or format) all data before we send it out as a response
  // If you want to LIMIT the data your are responding with, you should SELECT less data from the Database in your knex service
  //   (e.g. if you didn't want to send the ID when a GET request at :id is made)
    return {
      id: spellbook.id,
      spellbook_name: xss(spellbook.spellbook_name) || `Spellbook ${spellbook.id}` // instead of returning 'null' when they havent set a spellbook name, returns Spellbook 3 etc
    };
  }
};

module.exports = SpellBooksService;