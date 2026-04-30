import { useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { TaskContext } from '../context/TaskContext'

const EditTask = () => {
	const { id: encodedId } = useParams()
	let id
	try {
		id = atob(encodedId)
	} catch (e) {
		id = null
		console.log(e)
	}
	const navigate = useNavigate()
	const { tasks, updateTask } = useContext(TaskContext)
	const task = tasks.find((taskItem) => String(taskItem.id) === String(id))

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		mode: 'onSubmit',
		reValidateMode: 'onChange',
		defaultValues: {
			title: '',
			description: '',
			status: '',
		},
	})

	useEffect(() => {
		if (task) {
			reset({
				title: task.title,
				description: task.description || '',
				status: task.status,
			})
		}
	}, [task, reset])

	const onSubmit = async (data) => {
		const success = await updateTask(id, data)
		if (success) {
			navigate('/tasklist')
		}
	}

	if (tasks.length === 0) {
		return (
			<div className='flex items-center justify-center min-h-[93.3vh] px-4 bg-gray-50 text-gray-900'>
				<p className='text-lg'>Loading task details...</p>
			</div>
		)
	}

	if (!task) {
		return (
			<div className='flex items-center justify-center min-h-[93.3vh] px-4 bg-gray-50 text-gray-900'>
				<div className='bg-white border border-gray-300 rounded-xl p-8 shadow-lg text-center'>
					<p className='text-xl font-semibold mb-4'>Task not found</p>
					<button
						onClick={() => navigate('/tasklist')}
						className='px-4 py-2 bg-blue-600 rounded-md text-white hover:bg-blue-700 transition'
					>
						Return to Task List
					</button>
				</div>
			</div>
		)
	}

	return (
		<div className='flex items-center justify-center min-h-[93.3vh] px-4 pb-17 bg-gray-50'>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='flex flex-col gap-5 w-full max-w-md p-12 bg-white border border-gray-300 rounded-xl shadow-lg'
			>
				<h2 className='text-2xl font-bold text-gray-900 text-center mb-2'>
					Edit Task
				</h2>

				<div className='flex flex-col gap-1'>
					<input
						type='text'
						placeholder='Task Title'
						{...register('title', {
							required: 'Title is required',
						})}
						className='w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm hover:shadow-md focus:shadow-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-500 hover:border-blue-500 transition-all duration-300'
					/>
					{errors.title && (
						<span className='text-sm text-red-500 ml-1'>
							{errors.title.message}
						</span>
					)}
				</div>

				<div className='flex flex-col gap-1'>
					<textarea
						placeholder='Task Description'
						rows={4}
						{...register('description')}
						className='w-full px-3 py-2 h-32 border border-gray-300 rounded-lg shadow-sm hover:shadow-md focus:shadow-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 resize-none overflow-y-auto bg-white text-gray-900 placeholder-gray-500 hover:border-blue-500 transition-all duration-300'
					></textarea>
				</div>

				<div className='flex flex-col gap-1'>
					<select
						{...register('status', {
							required: 'Status is required',
						})}
						className='w-full px-3 py-2.5 border border-gray-300 rounded-lg shadow-sm hover:shadow-md focus:shadow-md focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white text-gray-900 hover:border-blue-500 transition-all duration-300'
					>
						<option value='' className='bg-white text-gray-900'>
							Select Status
						</option>
						<option value='Todo' className='bg-white text-gray-900'>
							Todo
						</option>
						<option
							value='In Progress'
							className='bg-white text-gray-900'
						>
							In Progress
						</option>
						<option value='Done' className='bg-white text-gray-900'>
							Done
						</option>
					</select>
					{errors.status && (
						<span className='text-sm text-red-500 ml-1'>
							{errors.status.message}
						</span>
					)}
				</div>

				<div className='flex gap-3'>
					<button
						type='button'
						onClick={() => navigate('/tasklist')}
						className='flex-1 py-3 px-4 font-semibold text-gray-700 bg-gray-200 rounded-lg shadow-md hover:bg-gray-300 transition'
					>
						Cancel
					</button>
					<button
						type='submit'
						className='flex-1 py-3 px-4 font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition'
					>
						Update Task
					</button>
				</div>
			</form>
		</div>
	)
}

export default EditTask
