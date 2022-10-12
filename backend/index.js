const express = require("express");
const session = require('express-session')
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv/config');
const http = require("http");
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const {Server} = require('socket.io')
const bodyParser = require('body-parser');
const authRoute = require('./routes/authRoutes')
const imageRoute = require('./routes/imageRoutes')
const taskRoute = require('./routes/taskRoutes')
const keypointRoute = require('./routes/keypointRoutes')
const s3Route = require('./routes/s3Routes')
const app = express();
const server = http.createServer(app);
const sixHour = 1000 * 60 * 60 * 6;

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
})

app.set('trust proxy', 1) // trust first proxy
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(session({
  secret: process.env.JWTPRIVATEKEY,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: sixHour },
  //store: MongoStore.create({mongoUrl: process.env.DB_CONNECTION})
}))

// Routes
app.use(authRoute);
app.use(imageRoute);
app.use(taskRoute);
app.use(keypointRoute);
app.use(s3Route);

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