
require('dotenv').config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Database Connected'))
    .catch(
        (err) => {
            console.log( err);
            process.exit(1);
        }
    );

module.exports = mongoose;