import React, { createContext, useState, useEffect } from 'react'
import { toast } from 'react-toastify'

export const TaskContext = createContext()

export const TaskProvider = ({ children }) => {
	const [tasks, setTasks] = useState([])
	const [error, setError] = useState(null)
	const [isLoading, setIsLoading] = useState(true)

	const API_URL = 'http://localhost:5000/api/tasks'

	// Show the task
	const fetchTasks = async () => {
		setError(null)
		setIsLoading(true)
		try {
			const response = await fetch(API_URL)
			if (!response.ok) throw new Error('Failed to fetch tasks')
			const data = await response.json()
			setTasks(data)
		} catch (err) {
			setError(err.message)
			toast.error(`Error: ${err.message}`)
		} finally {
			setIsLoading(false)
		}
	}

	// Add the task
	const addTask = async (taskData) => {
		try {
			const response = await fetch(API_URL, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(taskData),
			})

			if (!response.ok) throw new Error('Failed to create task')
			const newTask = await response.json()
			setTasks((prevTasks) => [newTask, ...prevTasks])
			toast.success('Task created successfully!')
			return true
		} catch (err) {
			toast.error(`Error: ${err.message}`)
			return false
		}
	}

	// Update a task
	const updateTask = async (id, updatedData) => {
		try {
			const response = await fetch(`${API_URL}/${id}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(updatedData),
			})
			if (!response.ok) throw new Error('Failed to update task')
			const updatedTask = await response.json()
			setTasks((prevTasks) =>
				prevTasks.map((task) =>
					String(task.id) === String(id) ? updatedTask : task,
				),
			)
			toast.success('Task updated successfully!')
			return true
		} catch (err) {
			toast.error(`Error: ${err.message}`)
			return false
		}
	}

	// Delete a task
	const deleteTask = async (id) => {
		try {
			const response = await fetch(`${API_URL}/${id}`, {
				method: 'DELETE',
			})
			if (!response.ok) throw new Error('Failed to delete task')
			setTasks((prevTasks) =>
				prevTasks.filter((task) => String(task.id) !== String(id)),
			)
			toast.success('Task deleted successfully!')
			return true
		} catch (err) {
			toast.error(`Error: ${err.message}`)
			return false
		}
	}

	// Fetch tasks on mount
	useEffect(() => {
		fetchTasks()
	}, [])

	return (
		<TaskContext.Provider
			value={{
				tasks,
				error,
				isLoading,
				fetchTasks,
				addTask,
				updateTask,
				deleteTask,
			}}
		>
			{children}
		</TaskContext.Provider>
	)
}
