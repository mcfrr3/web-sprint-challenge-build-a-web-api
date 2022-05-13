// add middlewares here related to projects
const Projects = require('./projects-model');

function validateProjectId(req, res, next) {
  const { id } = req.params;

  Projects.get(id)
    .then(result => {
      if (result) {
        req.project = result;
        next();
      } else {
        res.status(404).end();
        return;
      }
    })
}

function validateProject(req, res, next) {
  const { name, description } = req.body;

  if (!name || !description) {
    res.status(400).end();
    return;
  }
  next();
}

module.exports = {
  validateProjectId,
  validateProject
}