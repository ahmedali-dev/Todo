import {configureStore} from "@reduxjs/toolkit";
import style from './Style';


const Store = configureStore({
    reducer: {
        style: style
    }
})

export default Store;