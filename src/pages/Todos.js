import TodosList from "../components/todos/TodosList";
import css from "./todos.module.scss";
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";
import {Link, useParams} from "react-router-dom";
import TodoItems from "../components/todos/TodoItems";
import {useSelector} from "react-redux";

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
    const {headerOpen} = useSelector(state => state.style);
    const params = useParams();
    console.log('todo', props)
    return (
        <div className={css.todocontainer}>

            <div className={`${css.todoList} ${headerOpen ? css.active : null}`}>
                <div className={css.form}>
                    <form action="">
                        <Input placeholder={'search'}/>
                        <Link to={'/add'}>new</Link>
                    </form>
                </div>
                {<TodosList list={DATA_DAME}/>}
            </div>
            {params.id ? <div className={css.todoItem}><TodoItems id={params.id}/></div> :
                <div className={'center'}>Select ToDo</div>}
        </div>
    );
};

export default Todos;
