import { Link, NavLink } from "react-router-dom";
import css from "./Header.module.scss";
const Header = (props) => {
    return (
        <nav className={css.nav}>
            <div className={css.nav_left}>
                <div className={css.nav_left_logo}>logo</div>
                <div className={css.nav_left_list}>
                    <Link to={"/collections"}>
                        <p className={css.text}>Collections</p>
                        <p className={css.icon}>
                            <i className="las la-burn"></i>
                        </p>
                    </Link>
                </div>
            </div>

            <div className={css.nav_right}>
                <div className={css.nav_right_list}>
                    <NavLink
                        className={({isActive}) => {
                            return isActive ? css.active : '';
                        }}
                        to={"/collections"}
                    >
                        <p className={css.text}>Collections</p>
                        <p className={css.icon}>
                            <i className="las la-burn"></i>
                        </p>
                    </NavLink>

                    <div className={css.addbtn}>
                        <p className={css.icon}>
                            <i className="las la-plus"></i>
                        </p>
                    </div>

                    <NavLink
                        className={({isActive}) => {
                            return isActive ? css.active : '';
                        }}
                        to={"/stars"}
                    >
                        <p className={css.icon}>
                            <i className="las la-star"></i>
                        </p>
                    </NavLink>

                    <NavLink
                        className={({isActive}) => {
                            return isActive ? css.active : '';
                        }}
                        to={"/account"}
                    >
                        {/* <p className={css.text}>Collections</p> */}

                        <img src="https://images.unsplash.com/photo-1598097599413-17a71172168c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YW5nZWxhfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" />
                    </NavLink>
                </div>
            </div>
        </nav>
    );
};

export default Header;
