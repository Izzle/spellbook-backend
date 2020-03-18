BEGIN;

TRUNCATE
    spellbook_spells,
    spellbook_classes,
    spellbook_class_spells,
    spellbook_spellbooks,
    spellbook_spell_spellbook
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
    ('Chaos Bolt', 2, 'Destruction', '125 feet', '1 Action', 'V, S, M', 'Instantaneous', 'A fiery ball of green fire. Hits for 1d6 damage.', 'The fire gets greener'),
    ('Arcane Blast', 3, 'Evocation', '25 feet', '1 Action', 'V', 'Instantaneous', 'Blue and white sparks erupt from your fingertips. Hits for 2d6 damage.', null),
    ('Soothe beast', 2, 'Nature', '50 feet', '1 Action', 'S, M', 'Instantaneous', 'You calm down any enraged beasts and increase your parties stealth checks against it by 5.', 'You gain an animal companion for 8 hours'),
    ('Frostbolt', 3, 'Evocation', '125 feet', '1 Action', 'V, S, M', 'Instantaneous', 'An icey ball of ice. Hits for 1d6 damage.', 'It makes big ice cubes. Add 1d4 damage.'),
    ('Ice blast', 5, 'Conjuration', '500 feet', '1 Action', 'V, S, M', 'Instantaneous', 'You barrage a large area with a hail of rigid ice. Dealing 3d10 damage to all creatures within 500 feet of the cast', 'Your enemies call their auto insurance'),
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
    (7, 8);

INSERT INTO spellbook_spellbooks (spellbook_name)
VALUES
    ('Arcane Spelltome'),
    ('Necronomicon'),
    ('Divine Spelltome');

INSERT INTO spellbook_spell_spellbook (spellbook_id, spell_id)
VALUES
    (1, 1),
    (1, 3),
    (1, 5),
    (2, 2),
    (2, 1),
    (3, 2),
    (3, 5),
    (3, 6),
    (3, 7),
    (3, 8);

COMMIT;