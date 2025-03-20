const express = require('express');
const router = express.Router();

const {
  createDataEntry,
  getDataEntry,
  queryDataEntries,
  updateDataEntry,
  deleteDataEntry,
} = require('../controllers/dataController');

const emailValidator = require('../middleware/emailValidator');
const {
  validateCreate,
  validateUpdate,
  validateQuery,
} = require('../middleware/dataValidator');

router.use(emailValidator);

router.post('/', validateCreate, createDataEntry);

router.get('/', validateQuery, queryDataEntries);

router.get('/:id', getDataEntry);

router.put('/:id', validateUpdate, updateDataEntry);

router.delete('/:id', deleteDataEntry);

module.exports = router; 