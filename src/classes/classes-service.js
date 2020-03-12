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
      // .join('spellbook_spells', 'spellbook_spell.id', '=', 'spellbook_class_spells.spell_id')
      .where('class_id', classId);
    // From KNEXJS DOCUMENTATION on Grouped Joins:
    //
    //   knex.select('*').from('users').join('accounts', function() {
    //     this.on('accounts.id', '=', 'users.account_id').orOn('accounts.owner_id', '=', 'users.id')
    //   })
    //   Outputs:
    //   select * from "users" inner join "accounts" on "accounts"."id" = "users"."account_id" or "accounts"."owner_id" = "users"."id"
  }
};

module.exports = ClassesService;
