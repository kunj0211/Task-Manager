import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TaskContext } from '../context/TaskContext'
import DeleteModal from './DeleteModal'
import CryptoJS from 'crypto-js'

const TaskList = () => {
	const { tasks, deleteTask, isLoading } = useContext(TaskContext)
	const navigate = useNavigate()
	const [search, setSearch] = useState('')
	const [filterStatus, setFilterStatus] = useState('')
	const [taskToDelete, setTaskToDelete] = useState(null)

	const [currentPage, setCurrentPage] = useState(1)
	const [tasksPerPage, setTasksPerPage] = useState(5)

	const displayedTasks = tasks.filter((task) => {
		const searchTerm = search.trim().toLowerCase()
		const matchesSearch =
			searchTerm === '' ||
			task.title.toLowerCase().includes(searchTerm) ||
			(task.description &&
				task.description.toLowerCase().includes(searchTerm))
		const matchesStatus =
			filterStatus === '' || task.status === filterStatus
		return matchesSearch && matchesStatus
	})

	const indexOfLastTask = currentPage * tasksPerPage
	const indexOfFirstTask = indexOfLastTask - tasksPerPage
	const currentTasks = displayedTasks.slice(indexOfFirstTask, indexOfLastTask)
	const totalPages = Math.ceil(displayedTasks.length / tasksPerPage)

	const pageNumbers = []
	for (let i = 1; i <= totalPages; i++) {
		pageNumbers.push(i)
	}

	const getStatusColor = (status) => {
		switch (status) {
			case 'Todo':
				return 'bg-gray-200 text-gray-800 border-gray-400'
			case 'In Progress':
				return 'bg-blue-100 text-blue-800 border-blue-300'
			case 'Done':
				return 'bg-green-100 text-green-800 border-green-300'
			default:
				return 'bg-gray-200 text-gray-800 border-gray-400'
		}
	}

	const handleDeleteClick = (task) => {
		setTaskToDelete(task)
	}

	const confirmDelete = () => {
		if (taskToDelete) {
			deleteTask(taskToDelete.id)
			setTaskToDelete(null)
		}
	}

	const cancelDelete = () => {
		setTaskToDelete(null)
	}

	const handleEdit = (id) => {
		const secretUuid = import.meta.env.VITE_ENCRYPTION_KEY
		const key = CryptoJS.enc.Utf8.parse(secretUuid.substring(0, 16))
		const iv = CryptoJS.enc.Utf8.parse(secretUuid.substring(0, 16))

		const encrypted = CryptoJS.AES.encrypt(String(id), key, { iv: iv })
		const hexStr = encrypted.ciphertext.toString(CryptoJS.enc.Hex)

		const uuidLikeId = hexStr.replace(
			/(.{8})(.{4})(.{4})(.{4})(.{12})/,
			'$1-$2-$3-$4-$5',
		)
		navigate(`/edit/${uuidLikeId}`)
	}

	const handleSearch = (value) => {
		setSearch(value)
		setCurrentPage(1)
	}

	const handleFilter = (status) => {
		setFilterStatus(status)
		setCurrentPage(1)
	}

	const handleTasksPerPageChange = (value) => {
		setTasksPerPage(Number(value))
		setCurrentPage(1)
	}

	if (isLoading) {
		return (
			<div className='flex items-center justify-center min-h-screen bg-gray-50'>
				<div className='flex flex-col items-center gap-4'>
					<div className='w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin'></div>
					<p className='text-gray-500 text-lg font-medium'>
						Loading tasks...
					</p>
				</div>
			</div>
		)
	}

	return (
		<div className='w-full mx-auto px-8 py-10 bg-gray-50 min-h-screen'>
			<div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8'>
				<div>
					<h1 className='text-3xl font-bold text-gray-900'>
						Your Tasks
					</h1>
				</div>
				<div className='flex flex-col gap-3 sm:flex-row sm:items-center'>
					<input
						type='text'
						placeholder='Search tasks...'
						className='w-72 px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-500 transition-all duration-300'
						value={search}
						onChange={(e) => handleSearch(e.target.value)}
					/>
					<select
						onChange={(e) => handleFilter(e.target.value)}
						value={filterStatus}
						className='w-52 pl-3 pr-3 py-2 rounded-md border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-500 transition-all duration-300'
					>
						<option value=''>All Statuses</option>
						<option value='Todo'>Todo</option>
						<option value='In Progress'>In Progress</option>
						<option value='Done'>Done</option>
					</select>
				</div>
			</div>

			{displayedTasks.length === 0 ? (
				<div className='text-center py-20 bg-gray-100 rounded-2xl border-2 border-dashed border-gray-300'>
					<p className='text-gray-500 text-lg'>No Tasks Found</p>
				</div>
			) : (
				<ul className='space-y-4'>
					{currentTasks.map((task) => (
						<li
							key={task.id}
							className='bg-white p-6 rounded-2xl border border-gray-300 shadow-sm hover:border-blue-500 hover:shadow-md hover:shadow-blue-500/10 transition-all duration-300'
						>
							<div className='flex flex-col gap-4'>
								<div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3'>
									<h3 className='text-2xl font-bold text-gray-900 flex-1'>
										{task.title}
									</h3>
									<span
										className={`px-3 py-1 rounded-full text-sm font-semibold border w-fit ${getStatusColor(task.status)}`}
									>
										{task.status}
									</span>
								</div>

								{task.description && (
									<div className=' pl-4 py-2 bg-blue-50 rounded'>
										<p className='text-gray-700 leading-relaxed whitespace-pre-wrap wrap-break-word'>
											{task.description}
										</p>
									</div>
								)}

								<div className='flex flex-wrap gap-3 pt-2 justify-start sm:justify-end'>
									<button
										onClick={() =>
											handleEdit(task.id, task)
										}
										className='px-6 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 shadow-sm transition'
									>
										Edit
									</button>
									<button
										onClick={() => handleDeleteClick(task)}
										className='px-6 py-2 rounded-md bg-red-600 text-white font-medium hover:bg-red-700 shadow-sm transition'
									>
										Delete
									</button>
								</div>
							</div>
						</li>
					))}
				</ul>
			)}

			{displayedTasks.length > 0 && (
				<div className='mt-8 pt-6 border-t border-gray-300/50 flex flex-col sm:flex-row items-center justify-between gap-4'>
					<div className='flex items-center gap-4'>
						<p className='text-sm text-gray-600 font-medium'>
							Showing{' '}
							<span className='text-gray-900 font-semibold'>
								{indexOfFirstTask + 1}
							</span>{' '}
							to{' '}
							<span className='text-gray-900 font-semibold'>
								{Math.min(
									indexOfLastTask,
									displayedTasks.length,
								)}
							</span>{' '}
							of{' '}
							<span className='text-gray-900 font-semibold'>
								{displayedTasks.length}
							</span>{' '}
							tasks
						</p>
						<div className='flex items-center gap-2'>
							<label
								htmlFor='tasksPerPage'
								className='text-sm text-gray-600'
							>
								Per page:
							</label>
							<select
								id='tasksPerPage'
								value={tasksPerPage}
								onChange={(e) =>
									handleTasksPerPageChange(e.target.value)
								}
								className='px-2 py-1 text-sm border border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-500 transition-all duration-300'
							>
								<option value={5}>5</option>
								<option value={10}>10</option>
								<option value={25}>25</option>
							</select>
						</div>
					</div>

					{totalPages > 1 && (
						<div className='inline-flex gap-2 isolate rounded-md shadow-sm'>
							<button
								onClick={() =>
									setCurrentPage((prev) =>
										Math.max(prev - 1, 1),
									)
								}
								disabled={currentPage === 1}
								className={`relative inline-flex items-center rounded-l-md px-4 py-2 text-sm font-semibold border border-gray-300 focus:z-10 ${
									currentPage === 1
										? 'bg-gray-100 text-gray-400'
										: 'bg-white text-gray-900 hover:bg-gray-50'
								} transition-colors`}
							>
								Previous
							</button>

							{pageNumbers.map((num) => (
								<button
									key={num}
									onClick={() => setCurrentPage(num)}
									className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold border border-gray-300 focus:z-10 transition-colors ${
										currentPage === num
											? 'bg-blue-600 text-white'
											: 'bg-white text-gray-700 hover:bg-gray-50'
									}`}
								>
									{num}
								</button>
							))}

							<button
								onClick={() =>
									setCurrentPage((prev) =>
										Math.min(prev + 1, totalPages),
									)
								}
								disabled={currentPage === totalPages}
								className={`relative inline-flex items-center rounded-r-md px-4 py-2 text-sm font-semibold border border-gray-300 focus:z-10 ${
									currentPage === totalPages
										? 'bg-gray-100 text-gray-400 '
										: 'bg-white text-gray-900 hover:bg-gray-50'
								} transition-colors`}
							>
								Next
							</button>
						</div>
					)}
				</div>
			)}

			<DeleteModal
				isOpen={!!taskToDelete}
				taskTitle={taskToDelete?.title}
				onConfirm={confirmDelete}
				onCancel={cancelDelete}
			/>
		</div>
	)
}

export default TaskList
