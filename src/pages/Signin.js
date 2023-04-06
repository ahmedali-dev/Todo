import {useState} from "react";
import Register from "../components/register/Register-form";
import css from "./../components/register/Register.module.scss";
import Button from "../components/UI/Button";
import Input from "../components/UI/Input";
import {useNavigate} from "react-router-dom";
import {toast} from "react-hot-toast";
import {SignUpAction} from "../store/Slices/RegisterSlice";
import {useDispatch} from "react-redux";
import Loader from "../components/UI/Loader";

const span = () => (
    <>
        Create New <span>Account !</span>
    </>
);
const Signin = (props) => {

    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [emailError, setemailError] = useState('');
    const [passwordError, setpasswordError] = useState('');
    const [loading, setloading] = useState(false);
    const navigate = useNavigate();
    const submith = async (e) => {
        e.preventDefault();
        setloading(true);
        const signup = await fetch("https://todo.ahmedali-dev.repl.co/signin", {
            method: "POST",
            body: JSON.stringify({
                email,
                password
            }),
        });
        if (!signup.ok) {
            toast.error("SignUp failed");
            setloading(false);
            return;
        }
        const data = await signup.json();
        if (data.status != 200) {
            toast.error("SignUp failed");
            setemailError(data.error.email && data.error.email);
            setpasswordError(data.error.password && data.error.password);
            setloading(false);
        } else {
            toast.success(data.message);
            setloading(false);
            localStorage.setItem('token', data.token);
            dispatch(SignUpAction({token: data.token}));
            // navigate("collections");
        }
    };


    if (loading) {
        return <Loader/>;
    }
    return (
        <Register
            onSubmit={submith}
            link="/signup"
            selection={span()}
            header={"Welcome Back"}
        >
            <Input
                classname={css.formGroup}
                onChange={(e) => setEmail(e.target.value)}
                label="Email"
                type="email"
                placeholder="Email"
                defaultValue={email}
                error={emailError && emailError}
            />

            <Input
                classname={css.formGroup}
                onChange={(e) => setPassword(e.target.value)}
                label="Password"
                type="password"
                placeholder="********"
                defaultValue={password}
                error={passwordError && passwordError}
            />
            <Button text={"Signin"} classname={css.formGroup}/>
        </Register>
    );
};

export default Signin;
