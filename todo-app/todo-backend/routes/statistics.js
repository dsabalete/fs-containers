const express = require('express');
const redis = require('../redis')
const router = express.Router();

const TODO_COUNTER_KEY = 'added_todos'

router.get('/', async (_, res) => {
  const addedTodos = await redis.get(TODO_COUNTER_KEY) || 0
  res.send({ added_todos: parseInt(addedTodos) });
});

module.exports = router;
