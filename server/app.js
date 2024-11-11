const express = require('express');
const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');
const app = express();

const authRoute = require('./routes/auth.js');
const categoriesRoute = require('./routes/categories.js');
const tasksRoute = require('./routes/tasks.js');

const pool = new Pool({
  connectionString: process.env.DATABASE_CONNECTION,
});

const port = 1000;

app.use(express.json());

app.use(authRoute);
app.use(categoriesRoute);
app.use(tasksRoute);

app.listen(port, () => {
    console.log(`app is listening at port ${port}`)
})