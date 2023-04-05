import Register from "../components/register/Register-form";
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";
import css from "./../components/register/Register.module.scss";
import {useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import {isDisabled} from "@testing-library/user-event/dist/utils";

const span = () => (
    <>
        You Have <span>Account ?</span>
    </>
);

function generateRandomString(length) {
    const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

const Signup = (props) => {
    const name = useRef();
    const email = useRef();
    const password = useRef();
    /*  const [nameError,  */
    const [loading, setloading] = useState(false);
    const navigate = useNavigate();

    const submith = async (e) => {
        e.preventDefault();
        setloading(true);
        const namev = name.current.value;
        const emailv = email.current.value;
        const passwordv = password.current.value;
        // localStorage.setItem("token", '1');
        const signup = await fetch("http://192.168.1.2:8080/signin.php", {
            method: "POST",
            body: JSON.stringify({
                name: namev,
                email: emailv,
                password: passwordv,
            }),
        });
        if (!signup.ok) {
            // localStorage.setItem("token", '1');
            setloading(false);
            return;
        }
        const data = await signup.json();
        localStorage.setItem("token", data.token);
        setloading(false);
        props.Token(data.token);
        navigate("/collections");
    };

    return (
        <Register
            onSubmit={submith}
            link="/signin"
            selection={span()}
            header={"Welcome Back"}
        >
            <Input
                classname={css.formGroup}
                ref={name}
                onChange={() => {
                    console.log("sadfaschinage");
                }}
                label="Name"
                type="text"
                placeholder="Name"
            />
            <Input
                classname={css.formGroup}
                ref={email}
                label="Email"
                type="email"
                placeholder="Email"
            />

            <Input
                classname={css.formGroup}
                ref={password}
                label="Password"
                type="password"
                placeholder="********"
            />
            <Button
                text={loading ? "loading" : "SignUp"}
                onClick={() => "hello"}
                disabled={loading ? true : ""}
                classname={css.formGroup}
            />
        </Register>
    );
};

export default Signup;
