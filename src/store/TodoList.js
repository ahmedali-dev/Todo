import todosList from "../components/todos/TodosList";
import { GetTodo } from "../Hooks/GetTodo";
import { createAsyncThunk } from "@reduxjs/toolkit";

const { createSlice } = require("@reduxjs/toolkit");
const initstate = {
	data: [],
	isLoading: false,
	error: "",
};

export const fetchData = createAsyncThunk("data/fetchdata", async () => {
	const req = await fetch("https://sql.ahmedali-dev.repl.co/", {
		method: "POST",
	});
	const json = await req.json();
	return json;
});

const TodoList = createSlice({
	name: "todolist",
	initialState: initstate,
	reducers: {
		getTodoList: (state, action) => {
			state.data = [];
			state.data = action.payload.data;
		},
		addTodoList: (state, action) => {
			const { addData } = action.payload;
			fetch("https://sql.ahmedali-dev.repl.co/add", {
				method: "POST",
				body: JSON.stringify(addData),
			});
		},
		addchild: (state, action) => {
			const { addData } = action.payload;
			console.log(addData);
			fetch("https://sql.ahmedali-dev.repl.co/update", {
				method: "POST",
				body: JSON.stringify(addData),
			});
		},
		deleteTodoList: (state, action) => {
			const { id } = action.payload;
			fetch("https://sql.ahmedali-dev.repl.co/delete", {
				method: "DELETE",
				body: JSON.stringify({ id: id }),
			});
		},
		updateTodoList: (state, action) => {
			const { id, actionup, listup } = action.payload;
			fetch("https://sql.ahmedali-dev.repl.co/update", {
				method: "POST",
				body: JSON.stringify({
					id,
					action: actionup,
					todos: listup,
				}),
			});
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchData.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(fetchData.fulfilled, (state, action) => {
			state.isLoading = false;
			state.data = [];
			console.log(action.payload.data);
			state.data = action.payload.data;
		});
		builder.addCase(fetchData.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.error.message;
		});
	},
});

export const {
	getTodoList,
	addTodoList,
	addchild,
	deleteTodoList,
	updateTodoList,
} = TodoList.actions;

export default TodoList.reducer;
