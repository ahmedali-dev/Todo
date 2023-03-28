import { useState } from "react";
import Edit from "../components/account/Edit";
import Button from "../components/UI/Button";
import AccountInfo from "./../components/account/AccountInfo";
const Account = (props) => {
    const [edit, setEdit] = useState(false);
    const editehandler = () => setEdit(!edit);
    return (
        <div>
            {edit ? (
                <Edit Edit={editehandler} />
            ) : (
                <AccountInfo Edit={editehandler} />
            )}
            <div style={{ marginTop: "13rem" }}></div>
        </div>
    );
};

export default Account;
