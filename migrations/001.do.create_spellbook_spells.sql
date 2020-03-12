CREATE TABLE spellbook_spells (
    id SERIAL PRIMARY KEY,
    spell_name TEXT NOT NULL,
    spell_level INTEGER DEFAULT 0,
    spell_school TEXT NOT NULL,
    spell_range TEXT,
    cast_time TEXT NOT NULL,
    spell_components TEXT,
    spell_duration TEXT NOT NULL,
    spell_description TEXT NOT NULL,
    higher_levels TEXT 
    -- will likely have to add a USER_ID column for when I have user management
);