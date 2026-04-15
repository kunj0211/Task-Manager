import React from 'react'
import { NavLink, Link } from 'react-router-dom'

const Navbar = () => {
	const navLinkStyle = ({ isActive }) =>
		`px-3 py-2 rounded-md font-medium transition-all duration-300 inline-block ${
			isActive
				? 'bg-gray-200 text-gray-900 shadow-sm'
				: 'text-gray-700 hover:text-gray-900 hover:bg-gray-100 hover:shadow-sm'
		}`

	return (
		<nav className='bg-white text-gray-900 border-b border-gray-300 shadow-md sticky top-0 z-50'>
			<div className='max-w-full mx-auto px-4 sm:px-6 lg:px-8 relative'>
				<div className='flex items-center justify-center h-12'>
					<div className='absolute left-2 sm:left-2 lg:left-4 flex items-center h-full'>
						<p className='font-bold text-xl text-gray-900'>
							Task Manager
						</p>
					</div>
					<div className='flex items-center space-x-4'>
						<NavLink to='/createtask' className={navLinkStyle}>
							Create Task
						</NavLink>
						<NavLink to='/tasklist' className={navLinkStyle}>
							Task List
						</NavLink>
					</div>
				</div>
			</div>
		</nav>
	)
}

export default Navbar
