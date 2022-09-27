const express = require("express");
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
require('dotenv/config');

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Routes
const postsRoute = require('./routes/posts')
app.use('/', postsRoute);

mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Database connected!"))
  .catch(err => console.log(err));
app.listen(process.env.PORT)