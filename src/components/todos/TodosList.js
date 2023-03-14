import React from "react";
import {Link} from "react-router-dom";
import css from './TodosList.module.scss'

const TodosList = ({list}) => {
    console.log(list);
    return (
        <>
            {list.map((item) => (
                <div className={css.item} key={item.id} id={item.id}>
                    <div className={css.item_content}>
                        <div className={css.item_content_todoname}>{item.todo}</div>
                        <div className={css.item_content__todotime}>{item.time}</div>
                    </div>
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
