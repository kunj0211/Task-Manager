const express = require('express')
const router = express.Router()
const Task = require('../models/Task')

// @route   POST /api/tasks
// @desc    Create a new task
router.post('/', async (req, res) => {
	try {
		const newTask = await Task.create({
			title: req.body.title,
			description: req.body.description,
			status: req.body.status || 'Todo',
		})
		res.status(201).json(newTask)
	} catch (err) {
		console.error(err.message)
		res.status(500).send('Server Error')
	}
})

// @route   GET /api/tasks
// @desc    Get all tasks
router.get('/', async (req, res) => {
	try {
		const tasks = await Task.findAll({ order: [['createdAt', 'DESC']] })
		res.json(tasks)
	} catch (err) {
		console.error(err.message)
		res.status(500).send('Server Error')
	}
})

// @route   PUT /api/tasks/:id
// @desc    Update a task
router.put('/:id', async (req, res) => {
	try {
		const task = await Task.findByPk(req.params.id)
		if (!task) return res.status(404).json({ msg: 'Task not found' })
		await task.update(req.body)
		res.json(task)
	} catch (err) {
		console.error(err.message)
		res.status(500).send('Server Error')
	}
})

// @route   DELETE /api/tasks/:id
// @desc    Delete a task
router.delete('/:id', async (req, res) => {
	try {
		const task = await Task.findByPk(req.params.id)
		if (!task) return res.status(404).json({ msg: 'Task not found' })
		await task.destroy()
		res.json({ msg: 'Task removed' })
	} catch (err) {
		console.error(err.message)
		res.status(500).send('Server Error')
	}
})

module.exports = router
