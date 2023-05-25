const express = require('express')
const router = express.Router()

// @route    POST api/employees
// @desc     Create an employee in the database
// @access   PUBLIC
router.post('/', (req, res) => {

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
