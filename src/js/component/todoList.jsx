import React, { useState, useEffect } from "react";

const TodoList = () => {
	const [inputValue, setInputValue] = useState("");
	const [inputList, setInputList] = useState(["Abraham", "Elsa"]);

	function addItem(e) {
		if (e.keyCode == 13) {
			setInputValue(inputValue);
			const list = inputList.concat(inputValue);
			setInputList(list);
			setInputValue("");
		}
	}

	function deleteAll() {
		setInputList([]);
	}

	const deleteItem = index => {
		setInputList(inputList.filter((item, i) => index != i));
	};

	function displayTask(int) {
		int;
	}

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
