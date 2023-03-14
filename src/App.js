import "./App.css";
import Header from "./components/Header/Header";
import {useState} from "react";

const App = (props) => {

    const [showNav, setShowNav] = useState(false);
    const shownavhandler = () => {
        setShowNav(!showNav);
    }
    return (
        <>
            <Header/>
            {/* main content */}
            <main className="main">{props.children}</main>
        </>
    );
};

export default App;
