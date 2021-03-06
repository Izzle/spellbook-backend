function makeSpellsArray() {
  return [
    {
      id: 1,
      spell_name: 'Fire spell',
      spell_level: 3,
      spell_school: 'Evocation',
      spell_range: '100 feet',
      cast_time: '1 Action',
      spell_components: 'V, S, M',
      spell_duration: 'Instantaneous',
      spell_description: 'A fiery ball',
      higher_levels: 'It blows up'
    },
    {
      id: 2,
      spell_name: 'Sleepy spell',
      spell_level: 5,
      spell_school: 'Conjuration',
      spell_range: '300 feet',
      cast_time: '1 Action',
      spell_components: 'V, S',
      spell_duration: '8 Hours',
      spell_description: 'You put the target to sleep',
      higher_levels: 'Enemy is in a coma for 2d6 days'
    },
    {
      id: 3,
      spell_name: 'Hyper coder',
      spell_level: 7,
      spell_school: 'App developer',
      spell_range: '5 feet',
      cast_time: '1 Action',
      spell_components: 'S',
      spell_duration: 'Instantaneous',
      spell_description: 'You code up a storm!',
      higher_levels: 'The code is actually good now'
    }
  ];
}

function makeSpellBooksArray() {
  return [
    {
      id: 1,
      spellbook_name: 'Test Wizard SpellBook'
    },
    {
      id: 2,
      spellbook_name: 'Spell Bookerson Jr.'
    },
    {
      id: 3,
      spellbook_name: 'How to Test Code and Influence Programs'
    }
  ];
}

function makeSpellsInSpellbooks(spells, spellbooks) {
  return [
    {
      spell_id: spells[0].id,
      spellbook_id: spellbooks[0].id
    },
    {
      spell_id: spells[0].id,
      spellbook_id: spellbooks[1].id
    },
    {
      spell_id: spells[0].id,
      spellbook_id: spellbooks[0].id
    },
    {
      spell_id: spells[0].id,
      spellbook_id: spellbooks[0].id
    },
    {
      spell_id: spells[2].id,
      spellbook_id: spellbooks[2].id
    }
  ];
}

function makeSpellsFixtures() {
  const testSpells = makeSpellsArray();
  const testSpellBooks = makeSpellBooksArray();
  const testSpellsInSpellbooks = makeSpellsInSpellbooks(testSpells, testSpellBooks);

  return { testSpells, testSpellBooks, testSpellsInSpellbooks };
}

function cleanTables(db) {  
  return db.raw(
    `TRUNCATE
        spellbook_classes,
        spellbook_class_spells,
        spellbook_spells,
        spellbook_spell_spellbook,
        spellbook_spellbooks
        RESTART IDENTITY CASCADE`
  );
}

function seedSpells(db, spells) {
  return db.into('spellbook_spells').insert(spells)
   .then(() => {
    // update the auto sequence to stay in sync
    db.raw(`SELECT setval('spellbook_spells_id_seq', ?)`,
      [spells[spells.length - 1].id])
   });
};

function seedSpellbookTables(db, spells, spellbooks, spells_in_spellbooks) {
  // make a transaction to group the queries and auto rollback on any failure
  return db.transaction(async trx => {
    await seedSpells(trx, spells);
    await trx.into('spellbook_spellbooks').insert(spellbooks);
    // update the auto sequence to stay in sync
    await trx.raw(
      `SELECT setval('spellbook_spellbooks_id_seq', ?)`,
      [spellbooks[spellbooks - 1].id]
    );
  });
}

module.exports = {
  makeSpellsArray,
  makeSpellBooksArray,
  makeSpellsInSpellbooks,
  
  makeSpellsFixtures,
  cleanTables,
  seedSpells,
  seedSpellbookTables
};