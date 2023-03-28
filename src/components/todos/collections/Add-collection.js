import Input from "./../../UI/Input";
import Button from "./../../UI/Button";
import css from "./Add-collection.module.scss";
import { useEffect, useRef } from "react";
const AddCollections = ({ placeholder, Cancel, remove, st, ...props }) => {
    const collectionText = useRef(null);
    const cancel = useRef(null);
    useEffect(() => {
        collectionText.current?.focus();
    }, []);

    const submitHandler = (e) => {
        e.preventDefault();
    };

    console.dir(cancel);

    return (
        <>
            <div
                className={remove ? `${css.mask} ${css.mask_remove}` : css.mask}
            ></div>
            <div
                className={
                    remove
                        ? `${css.AddCollections} ${css.add_remove}`
                        : css.AddCollections
                }
            >
                <form onSubmit={submitHandler}>
                    <Input
                        classname={css.formGroup}
                        placeholder={placeholder}
                        ref={collectionText}
                        type="text"
                    />
                    <div className={css.btn_group}>
                        <Button classname={css.btn_group_item} text="Add" />
                        <Button
                            classname={css.btn_group_item}
                            ref={cancel}
                            text="Cancel"
                            onClick={Cancel}
                        />
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddCollections;
