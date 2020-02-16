const express = require("express");
const mongoose = require('mongoose');
const http = require('http');
const cors = require('cors');
const routes = require('./routes');
const { setupWebSocket } = require('./websocket')
const port = 3333;

const app = express();
const server = http.Server(app);

setupWebSocket(server);

mongoose.connect(*/Add here your MongoDB database/*, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use(cors());
app.use(express.json());
app.use(routes);

console.log('rodando');
server.listen(port);
