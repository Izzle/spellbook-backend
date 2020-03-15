SELECT 
    sp.id, sp.spell_name, sp.spell_level, sp.spell_school, sp.spell_range
FROM
    spellbook_spellbooks AS spbook
JOIN 
    spellbook_spell_spellbook AS sp_spbook
ON  
    spbook.id = sp_spbook.spellbook_id
JOIN
    spellbook_spells AS sp
ON 
    sp_spbook.spell_id = sp.id;