import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { TaskContext } from '../context/TaskContext'
import { useNavigate } from 'react-router-dom'

const CreateTask = () => {
	const { addTask } = useContext(TaskContext)
	const navigate = useNavigate()
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		mode: 'onSubmit',
		reValidateMode: 'onChange',
	})

	const onSubmit = async (data) => {
		const success = await addTask(data)
		if (success) {
			reset()
			navigate('/tasklist')
		}
	}

	return (
		<div className='flex items-center justify-center min-h-[93.3vh] px-4 pb-17 bg-gray-50'>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='flex flex-col gap-5 w-full max-w-md p-12 bg-white border border-gray-300 rounded-xl shadow-lg'
			>
				<h2 className='text-2xl font-bold text-gray-900 text-center mb-2'>
					Create New Task
				</h2>

				<div className='flex flex-col gap-1'>
					<input
						type='text'
						placeholder='Task Title'
						{...register('title', {
							required: 'Title is required',
						})}
						maxLength={20}
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
						maxLength={50}
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
				<button
					type='submit'
					className='w-full py-3 px-4 mt-2 font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:shadow-lg duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
				>
					Create Task
				</button>
			</form>
		</div>
	)
}

export default CreateTask
