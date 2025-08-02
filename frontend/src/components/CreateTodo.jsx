import { useState } from "react";

export function CreateTodo(props) {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	
	return (
		<div>
			<input id="title" type="text" placeholder="title" onChange={(e) => {
				setTitle(e.target.value);
			}}></input> <br/>

			<input id="desc" type="text" placeholder="description" onChange={(e) => {
				setDescription(e.target.value);
			}}></input><br/>

			<button onClick={()=> {
				fetch("http://localhost:3000/todo", {
					method: "POST",
					body: JSON.stringify({
						title: title,
						description: description
					}),
					headers: {
						"Content-type": "application/json"
					}
				})
				.then(async function(res) {
					const json = await res.json();
					alert("Todo Added");
				})
			}}>Add a Todo</button>
		</div>
	)
}