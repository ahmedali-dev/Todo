import React, {useEffect} from "react";
import {Link, NavLink} from "react-router-dom";
import css from './TodosList.module.scss'
import {openHeader} from "../../store/Style";
import {useDispatch} from "react-redux";
import { deleteTodoList,fetchData } from "../../store/TodoList";


const TodosList = ({list}) => {
    const dispatch = useDispatch();

	const deleteTodoListHandler = (id) => {
		console.log('remove todolist', id);
		dispatch(deleteTodoList({id}));
		setTimeout(()=> {
			dispatch(fetchData());
		},1000);
//		dispatch(fetchData());
	}

	
    return (
        <>
            {list.map((item) => (
                <div className={css.item} key={item.id} id={item.id}>
                    <NavLink onClick={() => dispatch(openHeader())} to={`/todos/${item.id}`}>
                        <div className={css.item_content}>
                            <div className={css.item_content_todoname}>{item.todos}</div>
                            <div className={css.item_content__todotime}>{item.time}</div>
                        </div>
                    </NavLink>
                    <div className={css.item_option}>
                        <Link to={`/edit/${item.id}`}>
                            <i class="lar la-edit"></i>
                        </Link>
                        <button onClick={() => deleteTodoListHandler(item.id)} data-id={item.id}>
                            <i class="lar la-trash-alt"></i>
                        </button>
                    </div>
                </div>
            ))}
        </>
    );
};

export default TodosList;
