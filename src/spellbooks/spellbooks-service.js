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
  /**
   * Replace the spells in a spellbook
   * This will delete all rows in the spellbook and insert new values
   * @param {Object} db - The knex instance
   * @param {number} spellbookId - The id of the spellbook
   * @param {Array} newSpellIds - The id(s) of all spells you wish to be in the database
   */
  updateSpellsInSpellBook(db, spellbookId, newSpellIds) { 

    return db.transaction(trx => {  // they use function(trx) - could my syntax be an issue?
      db('spellbook_spell_spellbook')
        .where('spellbook_id', spellbookId)
        .del()
        .transacting(trx)
        .then(() => { 
          newSpellIds.forEach(newSpell => {
            // [2, 4, 6]
            // [{spellbook_id: spellbookId}, {spell_id: newSpellIds[0]}]
            newSpell = [];
            const spellbook = {spellbook_id: spellbookId};
            const spell = {spell_id: newSpellIds[0]};
            newSpell = [spellbook, spell];
            // newSpell.spell_id = newSpellIds[0];
            // newSpell.spellbook_id = spellbookId;
            return db.insert(newSpell)
              .into('spellbook_spell_spellbook')
              .transacting(trx);
          });
        })
        .then(trx.commit)
        .catch(trx.rollback);
      // .then(() => {
      //   return db.insert({spellbook_id: spellbookId}, 'spell_id') // INSERT INTO spellbook_spell_spellbook (spellbook_id)
      //     .into('spellbook_spell_spellbook')  // VALUES (spellbookId) RETURNING 'spell_id'
      //     .then(ids => {
      //       newSpellIds.forEach(newSpellId => newSpellId.spell_id = ids[0]);
      //       return db.insert(newSpellIds)
      //         .into('spellbook_spell_spellbook')
      //         .transacting(trx);
      //     });
      // })
        
    });
    // return db
    //   .raw(`BEGIN;
    //         DELETE FROM spellbook_spell_spellbooks WHERE spellbook_id = ${spellbookId} (use ? probably)

    //         INSERT INTO spellbook_spell_spellbooks (spellbook_id, spell_id)
    //         VALUES 
    //           (${spellbookId}, ${newSpellIds}), // for each spellId. this will vary depending on # of entries
    //           (${spellbookId}, ${newSpellIds}),
    //           (${spellbookId}, ${newSpellIds}),
    //           (${spellbookId}, ${newSpellIds});

    //         COMMIT;`)
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