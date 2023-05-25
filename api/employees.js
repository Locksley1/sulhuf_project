const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')

// @route    POST api/employees
// @desc     Create an employee in the database
// @access   PUBLIC
router.post('/', [

  check('first_name', 'First name is required!').not().isEmpty(),
  check('last_name', 'Last name is required!').not().isEmpty(),
  check('Department', 'Department is required!').not().isEmpty(),
  check('monthly_salary', 'Monthly salary is required!').not().isEmpty(),
  check('job_title', 'Job title is required!').not().isEmpty()

], (req, res) => {

  const errors = validationResult(req)

  if (!errors.isEmpty()) {

    // Returns bad request if proper information is not provided
    return res.status(400).json({ errors: errors.array() })
  }

  console.log(req.body)
  res.send('employee')

})

// @route    GET api/employees/:id
// @desc     Retrieves information about a specific employee by ID
// @access   PUBLIC
router.get('/employee/:id', (req, res) => {

  res.send('employee')

})


module.exports = router
