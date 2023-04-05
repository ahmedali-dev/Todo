import {Link, NavLink} from "react-router-dom";
import css from "./Header.module.scss";
import {CollSvg, WishListSvg} from "../icons/icons";


const Header = (props) => {
    return (
        <nav className={css.nav}>
            <div className={css.nav_left}>
                <div className={css.nav_left_logo}>logo</div>
            </div>

            <div className={css.nav_right}>
                <div className={css.nav_right_list}>
                    <NavLink
                        className={({isActive}) => {
                            return isActive ? css.active : '';
                        }}
                        to={"/collections"}
                    >
                        <p className={css.icon}>
                            <CollSvg/>
                        </p>
                        <p className={css.text}>Collections</p>
                    </NavLink>


                    <NavLink
                        className={({isActive}) => {
                            return isActive ? css.active : '';
                        }}
                        to={"/wishlist"}
                    >
                        <p className={css.icon}>
                            <WishListSvg/>
                        </p>
                        <div className={css.text}>WishList</div>
                    </NavLink>

                    <NavLink
                        className={({isActive}) => {
                            return isActive ? css.active : '';
                        }}
                        to={"/account"}
                    >
                        {/* <p className={css.text}>Collections</p> */}

                        <img
                            src="https://images.unsplash.com/photo-1598097599413-17a71172168c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YW5nZWxhfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"/>
                    </NavLink>
                </div>
            </div>
        </nav>
    );
};

export default Header;
