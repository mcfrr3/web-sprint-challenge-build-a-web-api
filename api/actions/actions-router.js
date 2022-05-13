// Write your "actions" router here!
const express = require('express');

const Actions = require('../actions/actions-model');

// Middleware
const middleware = require('./actions-middlware');

const router = express.Router();

// Routes
router.get('/', (req, res) => {
  Actions.get()
    .then(result => {
      res.json(result);
    });
});

router.get('/:id', middleware.validateActionId, (req, res) => {
  res.json(req.action);
});

router.post('/', middleware.validateAction, (req, res) => {
  Actions.insert(req.body)
    .then(result => {
      res.json(result);
    });
});

router.put('/:id', middleware.validateActionId, middleware.validateAction, (req, res) => {
  Actions.update(req.params.id, req.body)
    .then(result => {
      res.json(result);
    });
});

router.delete('/:id', middleware.validateActionId, (req, res) => {
  Actions.remove(req.params.id)
    .then(result => {
      res.json(result);
    });
});

module.exports = router;