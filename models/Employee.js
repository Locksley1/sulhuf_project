const mongoose = require("mongoose")


const EmployeeSchema = new mongoose.Schema({
  employee_number: {
    type: Number,
    required: true
  },
  first_name: {
    type: String,
    required: true
  },

  last_name: {
    type: String,
    required: true
  },

  department: {
    type: String,
    required: true
  },

  monthly_salary: {
    type: Number,
    required: true
  },

  job_title: {
    type: String,
    required: true

  }
})

module.exports = Employee = mongoose.model('employee', EmployeeSchema)
