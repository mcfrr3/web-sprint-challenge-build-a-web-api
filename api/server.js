const express = require('express');
const server = express();

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
const actionsRouter = require('../api/actions/actions-router');
// Build your projects router in /api/projects/projects-router.js
const projectsRouter = require('../api/projects/projects-router');
// Do NOT `server.listen()` inside this file!

const { logger } = require('./middleware/middleware');

server.use(express.json());
server.use(logger);

server.use('/api/actions', actionsRouter);
server.use('/api/projects', projectsRouter);

module.exports = server;
