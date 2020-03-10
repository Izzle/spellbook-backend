// example data that was used on the front end
const STORE = {
   
  classes: [
    {
      id: 1,
      class_name: 'Bard'
    },
    {
      id: 2,
      class_name: 'Cleric'
    },
    {
      id: 3,              
      class_name: 'Druid'
    },
    {
      id: 4,
      class_name: 'Paladin'
    },
    {
      id: 5,
      class_name: 'Sorcerer'
    },
    {
      id: 6,
      class_name: 'Wizard'
    },
    {
      id: 7,
      class_name: 'Warlock'
    }
  ],

  class_spells: [
    { // generic case
      class_id: classes.id,
      spell_id: spells.id
    },
    { //example
      class_id: 2 (CLERIC)
      spell_id: 1
    }

  ],
  // NOTE Spells will be different depending on class
  // For example: a Paladin gets Cure Wounds at level 3
  // but a Cleric may get it at level 2
  // just make another unique spell with a different ID
  // that uses all the same data except modify what changes

  spells: [
    {
      id: 1,
      spell_name: 'Fireball',
      spell_level: 3, // level 0 is Cantrip!
      spell_school: 'Evocation',
      spell_range: '150 feet', // optional
      cast_time: '1 action',
      spell_components: 'V, S, M (A tiny ball of bat guano and sulfur)', // optional
      spell_duration: 'Instantaneous',
      spell_description: `A bright streak flashes from your pointing finger to a point you choose within range and then blossoms with a low roar into an explosion of flame. Each creature in a 20-foot-radius sphere centered on that point must make a dexterity saving throw. A target takes 8d6 fire damage on a failed save, or half as much damage on a successful one. The fire spreads around corners. It ignites flammable objects in the area that aren't being worn or carried.`,
      higher_levels: `When you cast this spell using a spell slot of 4th level or higher, the damage increases by 1d6 for each slot level above 3rd.`
    },
    {
      id: 2,
      spell_name: 'Frostbolt',
      spell_level: 4, // level 0 is Cantrip!
      spell_school: 'Frost Spec lol',
      spell_range: '120 feet',
      cast_time: '1 action',
      spell_components: 'V, M (A tiny ball of ice)',
      spell_duration: 'Instantaneous',
      spell_description: `A cold iceball flies towards your enemy`,
      higher_levels: `When you cast this spell using a spell slot of 4th level or higher, the damage increases by 1d4 for each slot level above 3rd.`
    },
    {
      id: 3,
      spell_name: 'Heal',
      spell_level: 0, // level 0 is Cantrip!
      spell_school: 'Restoration?',
      spell_range: '220 feet',
      cast_time: '1 action',
      spell_components: 'V',
      spell_duration: 'Channelled',
      spell_description: `A heal to keep the rabble alive`,
      higher_levels: `When you cast this spell using a spell slot of 5th level or higher, the heal increases by 1d4 for each slot level above 5rd.`
    },
    {
      id: 4,
      spell_name: 'Fireball',
      spell_classes: [2, 5, 6, 7], // references the IDs of classes that can use this spell
      spell_level: 2, // level 0 is Cantrip!
      spell_school: 'Evocation',
      spell_range: '150 feet', // optional
      cast_time: '1 action',
      spell_components: 'V, S, M (A tiny ball of bat guano and sulfur)', // optional
      spell_duration: 'Instantaneous',
      spell_description: `A bright streak flashes from your pointing finger to a point you choose within range and then blossoms with a low roar into an explosion of flame. Each creature in a 20-foot-radius sphere centered on that point must make a dexterity saving throw. A target takes 8d6 fire damage on a failed save, or half as much damage on a successful one. The fire spreads around corners. It ignites flammable objects in the area that aren't being worn or carried.`,
      higher_levels: `When you cast this spell using a spell slot of 4th level or higher, the damage increases by 1d6 for each slot level above 3rd.`
    }
  ],

  spellbooks: [
    {
      id: 1,
      spellbook_name: 'Deck 1: Arcane!',
      spellsInBook: [1, 3, 4],
      customLayout: {  // not going to do this right now, just trying to figure out my data
        exists: false,
        layout: []
      }
    },
    {
      id: 2,
      spellbook_name: 'Deck 2: Whatever',
      spellsInBook: [2, 4],
      customLayout: {  // not going to do this right now, just trying to figure out my data
        exists: false,
        layout: []
      }
    },
    {
      id: 3,
      spellbook_name: 'Spellbook 3',
      customLayout: {  // not going to do this right now, just trying to figure out my data
        exists: false,
        layout: []
      }
    }
  ]
};
