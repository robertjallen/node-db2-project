const express = require('express');


const server = express();
const carsRouter = require('./carsRouter');
server.use(express.json());
server.use('/cars', carsRouter);

module.exports = server;