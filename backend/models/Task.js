const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const Task = sequelize.define('Task', {
	title: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	description: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: '',
	},
	status: {
		type: DataTypes.ENUM('Todo', 'In Progress', 'Done'),
		allowNull: false,
		defaultValue: 'Todo',
	},
})

module.exports = Task
