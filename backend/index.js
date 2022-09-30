const express = require("express");
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const authRoute = require('./routes/authRoutes')

const app = express();
require('dotenv/config');

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());

// Routes
app.get('/', (req, res) => res.render('/'));
app.get('/Edit', (req, res) => res.render('Edit'));
app.get('/ImageSet', (req, res) => res.render('ImageSet'));
app.use(authRoute);

mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
  })
  .then(() => console.log("Database connected!"))
  .catch(err => console.log(err));
app.listen(process.env.PORT)