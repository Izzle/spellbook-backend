require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const { NODE_ENV } = require('./config');
const spellsRouter = require('./spells/spells-router');
const classesRouter = require('./classes/classes-router');
const spellbooksRouter = require('./spellbooks/spellbooks-router');

const app = express();

const morganOption = (NODE_ENV === 'production') ? 'tiny' : 'common';

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());

app.use('/api/spells', spellsRouter);
app.use('/api/classes', classesRouter);
app.use('/api/spellbooks', spellbooksRouter);

app.get('/', (req, res, next) => { // eslint-disable-line no-unused-vars
  res.send('Hello, world!');
});

app.use(function errorHandler(error, req, res, next) { // eslint-disable-line no-unused-vars
  let response;
  if (NODE_ENV === 'production') {
    response = { error: { message: 'server error'}};
  } else {
    console.error(error);
    response = { message: error.message, error};
  }
  res.status(500).json(response);
});

module.exports = app;