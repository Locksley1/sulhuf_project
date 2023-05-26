const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')

const Employee = require('../models/Employee')

// @route    GET api/employees
// @desc     Get all employees from the database
// @access   PUBLIC
router.get('/', async (req, res) => {

  try {
    // Page query defaults to 0 if it does not have a value
    const page = req.query.page || 0

    const employeePerPage = 3

    // Filters by employee name and fetches the correct amount of employees per page. For example, page 2 would skip the first 6 employees and retrieve only the next 3 due to the imposed limit
    const employees = await Employee.find().select('employee_name -_id').skip(page * employeePerPage).limit(employeePerPage)

    res.json(employees)
  }
  catch (err) {
    serverError(err, res)
  }
})

// @route    PUT api/employees/:id
// @desc     Update a specific employee's information in the database  
// @access   PUBLIC
router.put('/:id', async (req, res) => {
  await Employee.updateOne({ _id: req.params.id }, { $set: req.body })
  res.send('Employee updated successfully!')

})

// @route    POST api/employees
// @desc     Create an employee in the database
// @access   PUBLIC
router.post('/', [

  check('employee_name', 'Employee name is required!').not().isEmpty(),
  check('department', 'Department is required!').not().isEmpty(),
  check('monthly_salary', 'Monthly salary is required!').not().isEmpty(),
  check('job_title', 'Job title is required!').not().isEmpty()

], async (req, res) => {

  const errors = validationResult(req)

  if (!errors.isEmpty()) {

    // Returns bad request if proper information is not provided
    return res.status(400).json({ errors: errors.array() })
  }

  const { employee_name, department, monthly_salary, job_title } = req.body

  try {
    const employee = new Employee({
      employee_name,
      department,
      monthly_salary,
      job_title
    })

    await employee.save()
    res.send('Employee added')
  }
  catch (err) {
    serverError(err, res)
  }

})

// @route    GET api/employees/:id
// @desc     Retrieves information about a specific employee by their ID
// @access   PUBLIC
router.get('/:id', async (req, res) => {

  try {
    let employee = await Employee.findOne({ _id: req.params.id }).select('-_id -__v')

    res.json(employee)
  }
  catch (err) {
    serverError(err, res)
  }
})

function serverError(err, res) {
  console.error(err.message)
  res.status(500).send('Server Error')
}

// @route    DELETE api/employees/:id
// @desc     Deletes an employee from the database by their id
// @access   PUBLIC
router.delete('/:id', async (req, res) => {

  try {
    await Employee.deleteOne({ _id: req.params.id })
    return res.status(204)
  }
  catch (err) {
    serverError(err, res)
  }
})

module.exports = router
