const express = require("express")

const server = express()

const connect = require('./config/db')
connect()

const PORT = process.env.PORT || 3000

server.listen(PORT, () => {
  console.log('Server running on port ' + PORT)
})
