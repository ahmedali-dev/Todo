import React from "react";
import {Link, NavLink} from "react-router-dom";
import css from './TodosList.module.scss'
import {openHeader} from "../../store/Style";
import {useDispatch} from "react-redux";

const TodosList = ({list}) => {
    const dispath = useDispatch();
    return (
        <>
            {list.map((item) => (
                <div className={css.item} key={item.id} id={item.id}>
                    <NavLink onClick={() => dispath(openHeader())} to={`/todos/${item.id}`}>
                        <div className={css.item_content}>
                            <div className={css.item_content_todoname}>{item.todo}</div>
                            <div className={css.item_content__todotime}>{item.time}</div>
                        </div>
                    </NavLink>
                    <div className={css.item_option}>
                        <Link to={`/edit/${item.id}`}>
                            <i class="lar la-edit"></i>
                        </Link>
                        <button>
                            <i class="lar la-trash-alt"></i>
                        </button>
                    </div>
                </div>
            ))}
        </>
    );
};

export default TodosList;
