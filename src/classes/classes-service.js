const ClassesService = {
  getAllClasses(db){
    return db
      .from('spellbook_classes')
      .select('*');
  },
  getClassById(db, id){
    return db
      .from('spellbook_classes')
      .select('*')
      .where({ id });
  },
  getSpellsByClass(db, classId){
    return db
      .from('spellbook_classes')
      .select('*')
      .where('id', classId);
    // Need to get all the spells a class can use
    // return db.raw(
    //   `SELECT * FROM spellbook_classes WHERE id =${classId}`
    // );
  }
};

module.exports = ClassesService;
