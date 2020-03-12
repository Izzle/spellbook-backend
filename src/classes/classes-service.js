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
  getClassSpells(db, classId){
    return db
      .from('spellbook_classes')
      .select('*')
      .join('spellbook_class_spells', 'spellbook_classes.id', '=', 'spellbook_class_spells.class_id')
      .where('class_id', classId);
     
  }
};

module.exports = ClassesService;
