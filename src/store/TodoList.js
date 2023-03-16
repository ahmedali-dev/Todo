import todosList from "../components/todos/TodosList";

const {createSlice} = require("@reduxjs/toolkit");
const initstate = {
    data: []
}
const TodoList = createSlice({
    name: 'todolist',
    initialState: initstate,
    reducers: {
        getTodoList: (state, action) => {
            state.data = [];
            state.data = action.payload.data;
        },
        addTodoList: (state, action) => {
            fetch("")
        }
    }
});

export const {getTodoList} = TodoList.actions;

export default TodoList.reducer;