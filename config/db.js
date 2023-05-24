const mongoose = require("mongoose")

const config = require("config")

const connect = async () => {
  try {

    await mongoose.connect(config.get('mongoDB_URI'))

    console.log("MongoDB Connected")
  }
  catch (error) {
    console.error(error.message)

    process.exit(1)
  }
}

module.exports = connect;
