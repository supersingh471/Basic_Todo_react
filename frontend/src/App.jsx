import { useState, useEffect } from 'react';
import './App.css';
import { CreateTodo } from './components/CreateTodo';
import { Todos } from './components/Todos';

function App() {
	const [todos, setTodos] = useState([]);

	// ✅ Use useEffect to fetch data once
	useEffect(() => {
		fetch("http://localhost:3000/todos")
			.then(async (res) => {
				const json = await res.json();
				setTodos(json.todos);
			})
			.catch(err => {
				console.error("Failed to fetch todos:", err);
			});
	}, []); // ✅ empty array = run only once on mount

	return (
		<div>
			<CreateTodo />
			<Todos todos={todos} /> {/* ✅ use the real todos */}
		</div>
	);
}

export default App;
