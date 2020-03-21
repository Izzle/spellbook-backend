// This file is run by our npm test, in package.json
// A feature of mocha lets us require a specific setup file
process.env.TZ = 'UTC';
process.env.NODE_ENV = 'test';

require('dotenv').config();
const { expect } = require('chai');
const supertest = require('supertest');

global.expect = expect;
global.supertest = supertest;