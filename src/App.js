import "./App.css";
import Header from "./components/Header/Header";
import {useState} from "react";
import {GetTodo} from "./Hooks/GetTodo";

const App = (props) => {

    GetTodo();

    return (
        <>
            <Header/>
            {/* main content */}
            <main className="main">{props.children}</main>
        </>
    );
};

export default App;
