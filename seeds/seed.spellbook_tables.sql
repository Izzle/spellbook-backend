BEGIN;

TRUNCATE
    spellbook_spells,
    spellbook_classes,
    spellbook_class_spells
    RESTART IDENTITY CASCADE;

INSERT INTO spellbook_spells (
    spell_name, 
    spell_level, 
    spell_school, 
    spell_range, 
    cast_time, 
    spell_components, 
    spell_duration, 
    spell_description, 
    higher_levels
) VALUES
    ('Fireball', 1, 'Evocation', '100 feet', '1 Action', 'V, S, M', 'Instantaneous', 'A fiery ball of fire. Hits for 1d4 damage.', 'It blows up mountains'),
    ('Fireball', 2, 'Evocation', '125 feet', '1 Action', 'V, S, M', 'Instantaneous', 'A fiery ball of fire. Hits for 1d6 damage.', 'It blows up mountains'),
    ('Fireball', 3, 'Evocation', '150 feet', '1 Action', 'V, S, M', 'Instantaneous', 'A fiery ball of fire. Hits for 1d8 damage.', 'It blows up mountains'),
    ('Frostbolt', 1, 'Evocation', '100 feet', '1 Action', 'V, S, M', 'Instantaneous', 'An icey ball of ice. Hits for 1d4 damage.', 'It makes snowcones.'),
    ('Frostbolt', 3, 'Evocation', '125 feet', '1 Action', 'V, S, M', 'Instantaneous', 'An icey ball of ice. Hits for 1d6 damage.', 'It makes big ice cubes. Add 1d4 damage.'),
    ('Frostbolt', 5, 'Evocation', '150 feet', '1 Action', 'V, S, M', 'Instantaneous', 'An icey ball of ice. Hits for 1d8 damage.', 'It makes blocks of ice hurl from the sky. Add 1d10 damage.'),
    ('Cure wounds', 1, 'Restoration', 'Touch', '1 Action', 'V, S', 'Instantaneous', 'A creature you touch regains a number of hit points equal to 1d8 + your spellcasting ability modifier. This spell has no effect on undead or constructs.', 'When you cast this spell using a spell slot of 2nd level or higher, the healing increases by 1d8 for each slot level above 1st.'),
    ('Cure wounds', 2, 'Restoration', 'Touch', '1 Action', 'V, S', 'Instantaneous', 'A creature you touch regains a number of hit points equal to 1d8 + your spellcasting ability modifier. This spell has no effect on undead or constructs.', 'When you cast this spell using a spell slot of 2nd level or higher, the healing increases by 1d8 for each slot level above 1st.'),
    ('Cure wounds', 3, 'Restoration', 'Touch', '1 Action', 'V, S', 'Instantaneous', 'A creature you touch regains a number of hit points equal to 1d8 + your spellcasting ability modifier. This spell has no effect on undead or constructs.', 'When you cast this spell using a spell slot of 2nd level or higher, the healing increases by 1d8 for each slot level above 1st.'),
    ('Test Spell', 1, 'Whatever', 'Touch', '13 years', null, 'Concentration', 'You test a spell.', null);

INSERT INTO spellbook_classes (class_name)
VALUES
    ('Bard'),
    ('Cleric'),
    ('Druid'),
    ('Paladin'),
    ('Sorcerer'),
    ('Wizard'),
    ('Warlock');

INSERT INTO spellbook_class_spells (class_id, spell_id)
VALUES
    (1, 7),
    (2, 7),
    (3, 7),
    (4, 7),
    (2, 3),
    (5, 3),
    (6, 3),
    (7, 3),
    (2, 4),
    (5, 4),
    (6, 4),
    (7, 10);

COMMIT;