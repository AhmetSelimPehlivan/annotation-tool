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
const s3Route = require('./routes/s3Routes')
const app = express();
const server = http.createServer(app);
require('dotenv/config');

const sixHour = 1000 * 60 * 60 * 6;
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
    secure: false,
    maxAge: (24 * 60 * 60 * 1000)
  },
  isAuth: false,
  resave: false,
  saveUninitialized: false,
  secret: process.env.PRIVATEKEY,
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
app.use(s3Route);

AWS.config.update({
  "region": process.env.AWS_FETCH_BUCKET_REGION,
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
  console.log(`User Connected: ${socket.id}`);
  socket.on("disconnect", ()=> console.log('diiss'));
  socket.on("available_frame_count", message => {
    socket.broadcast.emit("recieve-available_frame_count",message)
  })
  socket.on("re_add_frames", message => {
    socket.broadcast.emit("recieve-readd_frame_count",message)
  })
});

server.listen(process.env.PORT)