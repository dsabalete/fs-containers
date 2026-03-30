const express = require('express')
const { Todo } = require('../mongo')
const redis = require('../redis')
const router = express.Router()

const TODO_COUNTER_KEY = 'added_todos'

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  await redis.incr(TODO_COUNTER_KEY)
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  const todo = req.todo
  if (!todo) return res.sendStatus(404)
  await todo.deleteOne()
  res.send(todo)
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  const todo = req.todo
  if (!todo) return res.sendStatus(404)
  res.send(todo)
})

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  const todo = req.todo
  if (!todo) return res.sendStatus(404)
  todo.done = !todo.done
  await todo.save()
  res.send(todo)
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
