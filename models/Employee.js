const mongoose = require("mongoose")


const EmployeeSchema = new mongoose.Schema({
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

  role: {
    type: String,
    required: true

  }
})

module.exports = Employee = mongoose.model('employee', EmployeeSchema)
