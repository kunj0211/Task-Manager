const express = require('express')
const cors = require('cors')
require('dotenv').config()

const sequelize = require('./config/database')
const taskRoutes = require('./routes/tasks')

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/tasks', taskRoutes)

// PostgreSQL connection
sequelize
	.authenticate()
	.then(() => {
		console.log('PostgreSQL connected successfully')
		return sequelize.sync({ alter: true }) // Sync models with database
	})
	.catch((err) => console.error('PostgreSQL connection error:', err))

// Start server
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
