import React, {useState} from "react";
import css from './Header.module.scss'

const Header = () => {

    const [active, setactive] = useState(false);

    return <nav className={css.nav}>
        <div
            onClick={() => setactive(!active)}
            className={active ? `${css.activeTodoList} ${css.active}` : `${css.activeTodoList}`}><i
            className="las la-angle-double-right"></i></div>
        <div className={css.logo}>ToDo</div>
    </nav>;
};

export default Header;
