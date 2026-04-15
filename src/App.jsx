import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import CreateTask from './components/CreateTask'
import EditTask from './components/EditTask'
import TaskList from './components/TaskList'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { TaskProvider } from './context/TaskContext'

function App() {
	return (
		<>
			<TaskProvider>
				<BrowserRouter>
					<Navbar />
					<Routes>
						<Route
							path='/'
							element={<Navigate to='/createtask' />}
						/>
						<Route path='/createtask' element={<CreateTask />} />
						<Route path='/tasklist' element={<TaskList />} />
						<Route path='/edit/:id' element={<EditTask />} />
					</Routes>
				</BrowserRouter>
				<ToastContainer theme='light' />
			</TaskProvider>
		</>
	)
}

export default App
