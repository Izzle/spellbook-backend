CREATE TABLE spellbook_spell_spellbook (
    spell_id INTEGER
        REFERENCES spellbook_spells(id) ON DELETE CASCADE NOT NULL,
    spellbook_id INTEGER
        REFERENCES spellbook_spellbooks(id) ON DELETE CASCADE NOT NULL,
    PRIMARY KEY (spell_id, spellbook_id)
);