const mongoose = require("mongoose");

//Connect to MongoDB
mongoose.connect('mongodb+srv://cohort2:supersingh471@cohort2.6d1abj6.mongodb.net/todo_project');

const todoSchema = new mongoose.Schema({
	title: String,
	description: String,
	completed: Boolean
})

const todo = mongoose.model('todos', todoSchema);

module.exports = {
	todo
}