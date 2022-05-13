// Write your "projects" router here!
const express = require('express');

// Import model
const Projects = require('../projects/projects-model');

// Middleware
const middleware = require('./projects-middleware');

const router = express.Router();

// Routes
router.get('/', (req, res) => {
  Projects.get()
    .then(result => {
      res.json(result);
    });
});

router.get('/:id', middleware.validateProjectId, (req, res) => {
  res.json(req.project);
});

router.post('/', middleware.validateProject, (req, res) => {
  Projects.insert(req.body)
    .then(result => {
        res.json(result);
    });
});

router.put('/:id', middleware.validateProjectId, middleware.validateProject, (req, res) => {
  const { completed } = req.body;

  if (completed === undefined) {
    res.status(400).end();
  } else {
    Projects.update(req.params.id, req.body)
      .then(result => {
          res.json(result);
      });
  }
});

router.delete('/:id', middleware.validateProjectId, (req, res) => {
  Projects.remove(req.params.id)
    .then(result => {
        res.json(result);
    });
});

router.get('/:id/actions', middleware.validateProjectId, (req, res) => {
  Projects.getProjectActions(req.params.id)
    .then(result => {
        res.json(result);
    });
});

module.exports = router;