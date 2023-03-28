import { useRef, useState } from "react";
import Button from "../UI/Button";
import Input from "../UI/Input";
import css from "./AccountInfo.module.scss";
const Edit = (props) => {
    const [img, setImg] = useState("");
    const image = useRef();
    const url = () => {
        console.log(image);
        setImg(URL.createObjectURL(image.current.files[0]));
    };
    return (
        <>
            <div className={css.EditAccountInfo}>
                <div className={css.EditAccountInfo_img}>
                    <img src={img} alt="user avatar" />
                </div>
                <div className={css.EditAccountInfo_form}>
                    <form>
                        <Input
                            onChange={url}
                            ref={image}
                            type="file"
                            label="Select Avatar"
                            classname={css.file}
                        />

                        <Input type="text" label="Name" placeholder="Name" />
                        <Input type="text" label="Email" placeholder="Email" />
                        <Button text="Save" onClick={props.Edit} />
                    </form>
                </div>
            </div>
        </>
    );
};

export default Edit;
