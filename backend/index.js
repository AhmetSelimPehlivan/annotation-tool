const express = require("express");
const session = require('express-session')
const cors = require('cors');
const cookieParser = require('cookie-parser');
const http = require("http");
const mongoose = require('mongoose');
const {Server} = require('socket.io')
const RedisStore = require("connect-redis")(session);
const Redis = require('ioredis');
var AWS = require("aws-sdk");
const bodyParser = require('body-parser');
const authRoute = require('./routes/authRoutes')
const imageRoute = require('./routes/imageRoutes')
const taskRoute = require('./routes/taskRoutes')
const keypointRoute = require('./routes/keypointRoutes')
// const completedTaskRoute = require('./routes/completedTaskRoutes')
const s3Route = require('./routes/s3Routes')
const app = express();
const server = http.createServer(app);

const sixHour = 1000 * 60 * 60 * 6;
require('dotenv/config');
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
})
const redis = new Redis();
app.use(session({
  name: process.env.COOKIE_NAME,
  store: new RedisStore({ 
    client: redis,
    disableTouch: true
  }),
  cookie: { 
    expires: sixHour, 
    httpOnly: true,
    secure: false
  },
  secret: process.env.JWTPRIVATEKEY,
  resave: false,
  saveUninitialized: false,
}))

app.set('trust proxy', 1) // trust first proxy
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());

// Routes
app.use(authRoute);
app.use(imageRoute);
app.use(taskRoute);
app.use(keypointRoute);
// app.use(completedTaskRoute)
app.use(s3Route);

AWS.config.update({
  "region": "eu-central-1",
  "accessKeyId": process.env.AWS_ACCESS_KEY_ID, "secretAccessKey":  process.env.AWS_SECRET_ACCESS_KEY
});
mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
  })
  .then(() => console.log("Database connected!"))
  .catch(err => console.log(err));

// Web Socket.io

io.on("connection", (socket) => {
  console.log("User Socket Connected")
  socket.on("disconnect", ()=> console.log('diiss'));
  socket.on("available_frame_count", message => {
    socket.broadcast.emit("recieve-available_frame_count",message)
  })
});

server.listen(process.env.PORT)