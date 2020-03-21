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


module.exports = {

};