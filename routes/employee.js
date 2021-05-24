const router = require('express').Router();
const employeeController = require('../controllers/employeeController');

// api/employee/add
router.post('/login', employeeController.login);

// api/employee/logout
router.post('/logout', employeeController.logout);

// api/employee/add
router.post('/add', employeeController.add);

// api/employee/:employeeId
router.get('/:employeeId', employeeController.get);

// api/employee/:employeeId
router.delete('/:employeeId', employeeController.delete);

// api/employee/:employeeId
router.put('/:employeeId', employeeController.update);

module.exports = router;