CREATE TABLE spellbook_spells (
    id SERIAL PRIMARY KEY,
    spell_name TEXT NOT NULL,
    spell_level INTEGER DEFAULT 0,
    school TEXT NOT NULL,
    spell_range TEXT,
    cast_time TEXT NOT NULL,
    spell_components TEXT,
    spell_duration TEXT NOT NULL,
    spell_description TEXT NOT NULL,
    higher_levels TEXT
);

-- how to do Arrays in PSQL
-- table for spells taht dont matter which class
-- and a table for each class and its version of the spell
