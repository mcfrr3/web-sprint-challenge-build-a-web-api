// add middlewares here related to projects
const Projects = require('./projects-model');

function validateProject(req, res, next) {
  const { name, description } = req.body;

  if (!name || !description) {
    res.status(404).end();
    return;
  }
  next();
}

module.exports = {
  validateProject
}