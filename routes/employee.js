const router = require('express').Router();
const employeeController = require('../controllers/employeeController');

// api/employee/add
router.post('/add', employeeController.add);

// api/employee/:employeeId
router.get('/:userId', employeeController.get);

// api/employee/:employeeId
router.delete('/:userId', employeeController.delete);

// api/employee/:employeeId
router.put('/:userId', employeeController.update);

module.exports = router;