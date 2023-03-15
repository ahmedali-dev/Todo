import React from 'react';
import css from './TodosItem.module.scss'
import {Link} from "react-router-dom";
import Input from "../UI/Input";

const TodoItems = (props) => {
    const DATA_DAME = [
        {
            id: "p1",
            todo: "hellow rold",
            time: 1677782912479,
            child: [
                {
                    id: '1',
                    todo: 'hello p1 i am child 1',
                    time: 333333333
                },
                {
                    id: '2',
                    todo: 'hello p1 i am child 1',
                    time: 333333333
                }
            ],
        },
        {
            id: "p2",
            todo: "hello wrold",
            time: 1677722912479,
            child: [],
        },
        {
            id: "p3",
            todo: "promodoro",
            time: 1667782912479,
            child: [],
        },
        {
            id: "p4",
            todo: "fetch data use javascript",
            time: 1377782912479,
            child: [],
        },
    ];
    const getTodo = DATA_DAME.find(todo => todo.id == props.id);

    if (!getTodo) {
        return <div className={'center'}>not found todo</div>
    }

    const ToDosItem = (data) => <div className={css.item}>
        <div className={css.item_content}>
            <div className={css.item_content_todoname}>{data.todo}</div>
            <div className={css.item_content__todotime}>{data.time}</div>
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
                <form action="">
                    <Input placeholder={'search'}/>
                    <Link to={`/add/${getTodo.id}`}>new</Link>
                </form>
            </div>
            {getTodo.child.length === 0 ? <div className={'center'}>ToDo list is empty</div> :
                getTodo.child.map(singletodo => ToDosItem(singletodo))}
        </>
    );
};

export default TodoItems;
