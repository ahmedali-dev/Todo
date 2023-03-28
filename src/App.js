import "./App.scss";
import { Route, Routes, Navigate } from "react-router-dom";
import Collections from "./pages/collections";
import ItemCollcetions from "./pages/item-collections";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Header from "./components/Header/Header";
import Account from "./pages/Account";
const App = (props) => {
    return (
        <>
            {/*header*/}
            <Header />

            {/* main content */}
            <main className="main">
                <Routes>
                    <Route
                        path="/signup"
                        element={
                            <>
                                {sessionStorage.getItem("tokken") ? (
                                    <Navigate
                                        to={"/collections"}
                                        replace={true}
                                    />
                                ) : null}
                                <Signup />
                            </>
                        }
                    />
                    <Route
                        path="/signin"
                        element={
                            <>
                                {sessionStorage.getItem("tokken") ? (
                                    <Navigate
                                        to={"/collections"}
                                        replace={true}
                                    />
                                ) : null}
                                <Signin />
                            </>
                        }
                    />

                    <Route
                        path="/"
                        element={
                            <Navigate to={"/collections"} replace={true} />
                        }
                        exact
                    ></Route>
                    <Route
                        path="/collections"
                        element={
                            <>
                                {sessionStorage.getItem("tokken") ? null : (
                                    <Navigate to={"/signin"} replace={true} />
                                )}
                                <Collections />
                            </>
                        }
                        exact
                    />
                    <Route
                        path="/collections/:id"
                        element={
                            <>
                                {sessionStorage.getItem("tokken") ? null : (
                                    <Navigate to={"/signin"} replace={true} />
                                )}
                                <ItemCollcetions />
                            </>
                        }
                    />

                    <Route
                        path="/account"
                        element={
                            <>
                                {sessionStorage.getItem("tokken") ? null : (
                                    <Navigate to={"/signin"} replace={true} />
                                )}
                                <Account />
                            </>
                        }
                        exact
                    />

                    <Route path="/new-quote" element={<div>news quote</div>} />
                    <Route path="*" element={<div>not found page</div>} />
                </Routes>
            </main>
        </>
    );
};

export default App;
