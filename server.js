//todo entry point
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const authRoutes = require('./routes/auth');

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.listen(process.env.PORT, () => {
    console.log(`Server running ${process.env.PORT}`);
});


app.use('/api',authRoutes);
