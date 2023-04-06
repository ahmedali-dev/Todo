import {useEffect, useState} from "react";
import {toast} from "react-hot-toast";
import {useDispatch, useSelector} from "react-redux";
import {LogoutAction} from "../store/Slices/RegisterSlice";

const FetchCollectionsHook = (props) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState('')
    let {token, isloading} = useSelector(state => state.register);
    const dispatch = useDispatch();

    const FetchData = async () => {
        props.loading(true);
        const url = "https://todo.ahmedali-dev.repl.co/collections";
        const request = await fetch(
            url,
            {
                method: 'POST',
                body: JSON.stringify({token}),
                headers: {
                    'Content-Type': "application/json",
                    'auth': token
                }
            }
        )
        if (!request.ok) {
            props.loading(false);
            setError("connection error");
            return toast.error("connection error");
        }

        const response = await request.json();

        if (response.status !== 200) {
            if (response.error) {
                toast.error(response.error.token);
                dispatch(LogoutAction());

            }
            if (response.message) {
                dispatch(LogoutAction());
                toast.error(response.message);
                setError(response.message);
            }
            props.loading(false);
            return;
        } else {
            setData(response.data);
            props.loading(false);
        }

        props.loading(false);

    }


    return [data, error, FetchData];
}
export default FetchCollectionsHook;