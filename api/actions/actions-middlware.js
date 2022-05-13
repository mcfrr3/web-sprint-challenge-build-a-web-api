// add middlewares here related to actions
const Actions = require('./actions-model');
const Projects = require('../projects/projects-model');

function validateActionId(req, res, next) {
  const { id } = req.params;

  Actions.get(id)
    .then(result => {
      if (result) {
        req.action = result;
        next();
      } else {
        res.status(404).end();
        return;
      }
    });
}

function validateAction(req, res, next) {
  const { project_id, description, notes, completed } = req.body;

  // Ensure the given project_id exists in the DB
  Projects.get(project_id)
    .then(result => {
      if (!result) {
        res.status(404).end();
        return;
      }
    })

  if ((req.method === /put/i && completed === undefined) 
    || (!project_id || !description || !notes)) {
    res.status(400).end();
    return;
  }
  next();
}

module.exports = {
  validateActionId,
  validateAction
}