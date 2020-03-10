CREATE TABLE spellbook_class_spells (
    class_id INTEGER 
        REFERENCES spellbook_classes(id) ON DELETE CASCADE NOT NULL,
    spell_id INTEGER 
        REFERENCES spellbook_spells(id) ON DELETE CASCADE NOT NULL,
    PRIMARY KEY (class_id, spell_id)
);

