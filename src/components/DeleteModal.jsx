import React from 'react'

const DeleteModal = ({ isOpen, taskTitle, onConfirm, onCancel }) => {
	if (!isOpen) return null

	return (
		<div className='fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
			<div className='bg-white p-8 rounded-2xl border border-gray-300 shadow-2xl max-w-sm w-full'>
				<h3 className='text-2xl font-bold text-gray-900 mb-2'>
					Delete Task
				</h3>
				<p className='text-gray-600 mb-6'>
					Are you sure you want to delete this task?
				</p>
				<div className='flex gap-3'>
					<button
						onClick={onCancel}
						className='flex-1 px-4 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-semibold transition shadow-md'
					>
						Cancel
					</button>
					<button
						onClick={onConfirm}
						className='flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold transition shadow-md'
					>
						Delete
					</button>
				</div>
			</div>
		</div>
	)
}

export default DeleteModal
