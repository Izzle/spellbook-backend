const ClassesService = {
  getAllClasses(db){},
  getSpellsByClass(db, classId){
    return db
      .from('spellbook_classes')
      .select('*')
      .where('id', classId);
    // return db.raw(
    //   `SELECT * FROM spellbook_classes WHERE id =${classId}`
    // );
  }
};

module.exports = ClassesService;
