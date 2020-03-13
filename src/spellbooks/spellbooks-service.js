const SpellBooksService = {
  getAllSpellBooks(db){
    return db
      .from('spellbook_spellbooks')
      .select('*');
  },
  getSpellBookById(db, id){
    return db
      .from('spellbook_spellbooks')
      .select('*')
      .where('id', id);
  }
};

module.exports = SpellBooksService;