const knex = require('knex');
const app = require('../src/app');
const helpers = require('./test-helper');

describe('Spells Endpoint', function() {
  let db;

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL
    });
    app.set('db', db);
  });

  after('disconnect from db', () => db.destroy());

  before('cleanup', () => helpers.cleanTables(db));
  
  afterEach('cleanup', () => helpers.cleanTables(db));

  describe('GET /api/spells', () => {
    context('Given there are spells in the database', () => {
      beforeEach('insert spells', () => {
        helpers
      });
    });
  });

  describe('POST /api/spells', () => {});

  describe('GET /api/spells/:id', () => {});

});