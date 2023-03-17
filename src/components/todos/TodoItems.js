import React, {useRef} from 'react';
import css from './TodosItem.module.scss'
import {Link} from "react-router-dom";
import Input from "../UI/Input";
import {useDispatch, useSelector} from "react-redux";
import Button from "../UI/Button";
import {addchild, fetchData} from "../../store/TodoList";


const TodoItems = (props) => {


    const dispatch = useDispatch();
    const todoItemtext = useRef(null);
    const {data} = useSelector(state => state.list)
    let getTodo = data.find(todo => todo.id == props.id);

    console.log(getTodo)
    if (!getTodo) {
        return <div className={'center'}>not found todo</div>
    }
    getTodo = getTodo.child ? JSON.parse(getTodo.child) : "";


    const additemhandler = (e) => {
        e.preventDefault();

        if (todoItemtext.current.value.length === 0) return;


        let newchild;
        if (getTodo) {
            const counter = getTodo.child !== null ? getTodo[getTodo.length - 1].id : 0;
            newchild = [...getTodo, {
                id: Math.floor(counter + 1),
                item: todoItemtext.current.value
            }]
        } else {
            newchild = [{
                id: Math.floor(1),
                item: todoItemtext.current.value
            }]
        }

        // console.log(newchild)
        const todo = {id: props.id, child: newchild};
        dispatch(addchild({addData: todo}))
        dispatch(fetchData());
        todoItemtext.current.value = "";

    }
    const ToDosItem = (data) =>
        <div className={css.item} key={data.id}>
            <div className={css.item_content}>
                <div className={css.item_content_todoname}>{data.item}</div>
                {/*<div className={css.item_content__todotime}>{}</div>*/}
            </div>

            <div className={css.item_option}>
                <Link to={`/edit/${props.id}/${data.id}`}>
                    <i className="lar la-edit"></i>
                </Link>
                <button>
                    <i className="lar la-trash-alt"></i>
                </button>
            </div>
        </div>
    return (
        <>
            <div className={css.form}>
                <form action="" onSubmit={additemhandler}>
                    <Input ref={todoItemtext} placeholder={'add new item'}/>
                    <Button to={`/add/${props.id}`} text={'item'}></Button>
                </form>
            </div>
            {!getTodo ? <div className={'center'}>ToDo list is empty</div> :
                getTodo.map(singletodo => ToDosItem(singletodo))}
        </>
    );
};

export default TodoItems;
