const recruitDao = require('./recruitDao');
const userDao = require('./userDao');
const likesDao = require('./likesDao');
const faqDao = require('./faqDao');
const careerDao = require('./careerDao');
const applyDao = require('./applyDao');

module.exports = {
  userDao,
  faqDao,
  recruitDao,
  likesDao,
  careerDao,
  applyDao
};