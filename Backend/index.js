const express = require('express');
const { createTodo } = require('./types');
const { todo } = require('./db');
const cors = require('cors');	
const app = express();


app.use(cors());

app.use(express.json());

app.post("/todo", async function(req, res) {
 
	const createPayload = req.body;
	const parsedPayload = createTodo.safeParse(createPayload);
	if (!parsedPayload.success) {
		res.status(411).json({
			msg: "You sent the wrong inputs",
		})
		return;
	}
	await todo.create({
		title: createPayload.title,
		description: createPayload.description,
		completed: false
	})

	res.json({
		msg: "Todo Created"
	})
})

app.get("/todos", async function(req, res) {
	const id = req.query.id;

	if (id) {
		try {
			const todoItem = await todo.findById(id); // or use find({ _id: id }) if needed
			if (!todoItem) {
				return res.status(404).json({ msg: "Todo not found" });
			}
			return res.json({ todo: todoItem });
		} catch (e) {
			return res.status(500).json({ msg: "Invalid ID format" });
		}
	}
	const todos = await todo.find();

	res.json({
		todos
	})
})

app.put("/completed", async function(req, res){
	const updatePayload = req.body;
	const parsePayload = updateTodo.safeParse(updatePayload);
	if(!parsePayload.success) {
		res.status(411).json({
			msg: "You sent the wrong inputs",
		})
		return;
	}

	await todo.update({
		_id: req.body.id
	}, {
		completed: true
	})

	res.status(200).json({
		msg: "Todo updated Successfully"
	});
});

app.listen(3000);
console.log("Server running on port 3000");