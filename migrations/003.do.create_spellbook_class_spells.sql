CREATE TABLE class_spells (
    -- triple check that ON CASCADE is what we want after we make seed data
    -- I dont want any side effects that i didnt think of deleting the wrong spells lol
    class_id INTEGER 
        REFERENCES spellbook_classes(id) ON DELETE CASCADE NOT NULL,
    spell_id INTEGER 
        REFERENCES spellbook_spells(id) ON DELETE CASCADE NOT NULL,
    PRIMARY KEY (class_id, spell_id)
);

