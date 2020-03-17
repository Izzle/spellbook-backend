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
  updateSpellsInSpellBook(db, spellbookId, newSpellIds) { // newRow should be the data
    // Rather than UPDATE-ing everything, in this casee it will be simplier to remove everything and add new ones

    // SET CONTENTS OF SPELLBOOK TO THIS
    // make trx in knex
    // dleete everything
    // insert new values

    // INPUT (db, spellbookId, newSpellIds)
    // db = knex
    // spellbookId = integer
    // newSpellIds = array of integers ie [3, 4, 5, 6, 12]
    return db.transaction(trx => {  // they use function(trx) - could my syntax be an issue?
      db('spellbook_spell_spellbooks')
        .where('spellbook_id', spellbookId)
        .del()
        .transacting(trx)
        .then(() => {
          return db.insert({spellbook_id: spellbookId}, 'spell_id') // INSERT INTO spellbook_spell_spellbooks (spellbook_id)
            .into('spellbook_spell_spellbooks')  // VALUES (spellbookId) RETURNING 'spell_id'
            .transacting(trx) // should I do a transaction object or a query builder?? How would I chain then in either case?
            .then(ids => {
              newSpellIds.forEach(newSpellId => newSpellId.spell_id = ids[0]);
              return db.insert(newSpellIds)
                .into('spellbook_spell_spellbooks')
                .transacting(trx);
            });
        })
        .then(trx.commit)
        .catch(trx.rollback);
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