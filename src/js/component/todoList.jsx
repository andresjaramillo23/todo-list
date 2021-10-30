import React, { useState, useEffect } from "react";

const TodoList = () => {
	const [inputValue, setInputValue] = useState("");
	const [inputList, setInputList] = useState([]);

	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/13")
			.then(response => {
				if (!response.ok) {
					throw new Error(response.statusText);
				}
				return response.json();
			})
			.then(data => setInputList(data));
	}, []); //empty array means it will only run once

	function addItem(e) {
		if (e.keyCode == 13) {
			setInputValue(inputValue);
			const list = inputList.concat(inputValue);
			setInputList(list);
			setInputValue("");

			fetch("https://assets.breatheco.de/apis/fake/todos/user/13", {
				method: "PUT",
				body: JSON.stringify(list),
				headers: {
					"Content-Type": "application/json"
				}
			}).then(response => {
				if (response.ok) {
					fetch("https://assets.breatheco.de/apis/fake/todos/user/13")
						.then(response => {
							if (!response.ok) {
								throw new Error(response.statusText);
							}
							return response.json();
						})
						.then(data => setInputList(data))
						.catch(error => console.error(error));
				}
			});
		}
	}

	function deleteAll() {
		setInputList([]);
	}

	const deleteItem = index => {
		let newList = setInputList(inputList.filter((item, i) => index != i));

		fetch("https://assets.breatheco.de/apis/fake/todos/user/13", {
			method: "PUT",
			body: JSON.stringify(newList),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(response => console.log(response))
			.catch(error => console.error(error));
	};

	return (
		<div className="text-center mt-5">
			<h1>Hello Moto!</h1>
			<h3>
				{inputList.length == 0
					? "No task to display"
					: inputList.length == 1
					? "There is one task left"
					: "The number of tasks left is: " + inputList.length}
			</h3>
			<input
				type="text"
				value={inputValue}
				onChange={e => setInputValue(e.target.value)}
				onKeyUp={addItem}
			/>
			<div className="text-center mt-5">
				{inputList.map((item, index) => (
					<>
						<li key={index}>
							{item}
							<button onClick={() => deleteItem(index)}>
								<i
									className="fa fa-times"
									aria-hidden="true"></i>
							</button>
						</li>
					</>
				))}
			</div>
			<div>
				<input
					type="button"
					value="delete all"
					onClick={() => deleteAll()}></input>
			</div>
		</div>
	);
};

export default TodoList;
