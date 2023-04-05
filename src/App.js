import "./App.scss";
import {Route, Routes, Navigate} from "react-router-dom";
import Collections from "./pages/collections";
import ItemCollcetions from "./pages/item-collections";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Header from "./components/Header/Header";
import Account from "./pages/Account";
import {useState} from "react";

const App = (props) => {
    const token = localStorage.getItem("token");
    const [Token, setToken] = useState(token);
    return (
        <>
            {/*header*/}

            {/* main content */}
            {/*token not found*/}
            {!token && (
                <main>
                    <Routes>
                        <Route
                            path="/signup"
                            element={
                                <>
                                    <Signup Token={setToken}/>
                                </>
                            }
                        />
                        <Route
                            path="/signin"
                            element={
                                <>
                                    <Signin Token={setToken}/>
                                </>
                            }
                        />
                        <Route path="*" element={<Navigate to={"/signup"}/>}/>
                    </Routes>
                </main>
            )}
            {/*token found*/}
            {token && (
                <>

                    <main className="main">
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    <Navigate to={"/collections"} replace={true}/>
                                }
                                exact
                            ></Route>
                            <Route
                                path="/collections"
                                element={
                                    <>
                                        <Header/>
                                        <Collections/>
                                    </>
                                }
                                exact
                            />
                            <Route
                                path="/collections/:id"
                                element={
                                    <>
                                        <ItemCollcetions/>
                                    </>
                                }
                            />

                            <Route
                                path="/account"
                                element={
                                    <>
                                        <Header/>
                                        <Account/>
                                    </>
                                }
                                exact
                            />

                            <Route path="/wishlist"
                                   element={
                                       <>
                                           <Header/>
                                           <div>news wishlist</div>
                                       </>
                                   }
                            />
                            <Route path="*" element={<Navigate to={"/collections"}/>}/>
                        </Routes>
                    </main>
                </>
            )}
        </>
    );
};

export default App;
