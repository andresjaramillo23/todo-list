import React, { useState, useEffect } from "react";

const TodoList = () => {
	const [inputValue, setInputValue] = useState("");
	const [inputList, setInputList] = useState(["", ""]);

	function addItem() {
		setInputValue(inputValue);
		const list = inputList.concat(inputValue);
		setInputList(list);
		console.log(inputList);
	}

	return (
		<div className="text-center mt-5">
			<h1>Hello Moto!</h1>
			<input
				type="text"
				value={inputValue}
				onChange={e => setInputValue(e.target.value)}
			/>
		</div>
	);
};

export default TodoList;
