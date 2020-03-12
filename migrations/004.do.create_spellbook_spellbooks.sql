CREATE TABLE spellbook_spellbooks (
    id SERIAL PRIMARY KEY,
    spellbook_name TEXT,  -- Optional. If there isn't a spellbook_name then use conditional rendering on the frontend and use the ID in the name
);