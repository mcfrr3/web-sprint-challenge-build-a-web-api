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

router.get('/:id', (req, res) => {
  const { id } = req.params;
  Projects.get(id)
    .then(result => {
      if (result) {
        res.json(result);
      } else {
        res.status(404).end();
      }
    });
});

router.post('/', middleware.validateProject, (req, res) => {
  Projects.insert(req.body)
    .then(result => {
        res.json(result);
    });
});

module.exports = router;