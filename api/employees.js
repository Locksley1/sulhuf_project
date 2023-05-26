const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')

const Employee = require('../models/Employee')

// @route    POST api/employees
// @desc     Create an employee in the database
// @access   PUBLIC
router.post('/', [

  check('first_name', 'First name is required!').not().isEmpty(),
  check('last_name', 'Last name is required!').not().isEmpty(),
  check('department', 'Department is required!').not().isEmpty(),
  check('monthly_salary', 'Monthly salary is required!').not().isEmpty(),
  check('job_title', 'Job title is required!').not().isEmpty()

], async (req, res) => {

  const errors = validationResult(req)

  if (!errors.isEmpty()) {

    // Returns bad request if proper information is not provided
    return res.status(400).json({ errors: errors.array() })
  }

  const { first_name, last_name, department, monthly_salary, job_title } = req.body

  const employee_number = Math.floor(Math.random() * 90000) + 10000;

  try {

    let employee = await Employee.findOne({ employee_number })

    if (employee)
      return res.status(400).json({ errors: [{ msg: 'Employee already exists!' }] })

    employee = new Employee({
      employee_number,
      first_name,
      last_name,
      department,
      monthly_salary,
      job_title
    })

    await employee.save()
    res.send('Employee added')
  }
  catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }

})

// @route    GET api/employees/:id
// @desc     Retrieves information about a specific employee by ID
// @access   PUBLIC
router.get('/employee/:id', (req, res) => {

  res.send('employee')

})


module.exports = router
