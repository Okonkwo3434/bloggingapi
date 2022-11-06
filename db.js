const { appendFile } = require("fs");
const mongoose = require("mongoose");
require("dotenv").config();

const MONGO_DB_CONNECTION_URL = process.env.MONGO_DB_CONNECTION_URL;

function connectToMongoDB() {
  mongoose.connect(MONGO_DB_CONNECTION_URL, { useNewUrlParser:true, useUnifiedTopology: true, useCreateIndex:true })
    .then((result) => appendFile.listen(3000))
    .catch((err) => console.log(err))     

  mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB successfully");
  });

  mongoose.connection.on("error", (err) => {
        console.log(err)
        console.log("An error occurred while connecting to MongoDB!");

  });
}

module.exports = { connectToMongoDB };
