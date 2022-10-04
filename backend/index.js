const express = require("express");
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv/config');
const mongoose = require('mongoose');
const http = require("http");
const {Server} = require('socket.io')
const bodyParser = require('body-parser');
const authRoute = require('./routes/authRoutes')
const imageRoute = require('./routes/imageRoutes')
const taskRoute = require('./routes/taskRoutes')
const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
})

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());

// Routes
app.get('/', (req, res) => res.render('/'));
app.get('/Edit', (req, res) => res.render('Edit'));
app.get('/ImageSet', (req, res) => res.render('ImageSet'));
app.use(authRoute);
app.use(imageRoute);
app.use(taskRoute);


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
  /*socket.broadcast.on("sendGetFrame", user_name =>{
    console.log(user_name)
  //  socket.broadcast.emit("")
  })*/
});

server.listen(process.env.PORT)