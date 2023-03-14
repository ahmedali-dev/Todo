import TodosList from "../components/todos/TodosList";
import css from "./todos.module.scss";

const DATA_DAME = [
    {
        id: "p1",
        todo: "hellow rold",
        time: 1677782912479,
        child: {},
    },
    {
        id: "p2",
        todo: "hello wrold",
        time: 1677722912479,
        child: {},
    },
    {
        id: "p3",
        todo: "promodoro",
        time: 1667782912479,
        child: {},
    },
    {
        id: "p4",
        todo: "fetch data use javascript",
        time: 1377782912479,
        child: {},
    },
];

const Todos = (props) => {
    console.log('todo', props)
    return (
        <div className={css.todocontainer}>
            <div className={css.todoList}>{<TodosList list={DATA_DAME}/>}</div>
            <div className={css.todoItem}>items</div>
        </div>
    );
};

export default Todos;
