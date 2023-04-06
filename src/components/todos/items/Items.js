import {useState} from "react";
import AddCollections from "./../collections/Add-collection";
import css from "./Items.module.scss";
import RegisterForm from "../../register/Register-form";
import Input from "../../UI/Input";
import Button from "../../UI/Button";
import {Mark} from "../../icons/icons";

const DM = [
    {
        id: 16793438956571,
        name: "collection 1",
        tasks: [
            {id: 16793438956793, task: "read 10 paper"},
            {id: 167934389567101, task: "weakup before 3pm"},
            {
                id: 1679343895654411,
                task: "visit best freind today",
            },
            {id: 16793438956793111, task: "read 10 paper"},
            {id: 167934389567101111, task: "weakup before 3pm"},
            {
                id: 1679343895654411111,
                task: "visit best freind today",
            },
            {id: 16793438956793111111, task: "read 10 paper"},
            {id: 167934389567102, task: "weakup before 3pm"},
            {
                id: 167934389565443,
                task: "visit best freind today",
            },
            {id: 167934389567934, task: "read 10 paper"},
            {id: 167934389567105, task: "weakup before 3pm"},
            {
                id: 167934389565446,
                task: "visit best freind today",
            },
            {id: 167934389567937, task: "read 10 paper"},
            {id: 167934389567108, task: "weakup before 3pm"},
            {
                id: 167934389565449,
                task: "visit best freind today",
            },
            {id: 167934389567930, task: "read 10 paper"},
            {id: 1679343895671000, task: "weakup before 3pm"},
            {
                id: 167934389565440,
                task: "visit best freind today",
            },

            {
                id: 16793438956620,
                task: "not play in mobile before 10 pm",
            },
        ],
        completed: [
            {
                id: 16793438956311,
                task: "complete react native folder",
            },
        ],
    },
    {
        id: 16793438955993,
        name: "collection 1",
        tasks: [
            {
                id: 4584523452344523,
                task: "completed design system video",
            },
        ],
        completed: [],
    },
];

const color = () => {
    let c = "1234567890abcdef";

    let col = "#";

    for (let i = 0; i < 6; i++) {
        col += c[Math.floor(Math.random() * (c.length - 1))];
    }

    return col;
};

const Items = (props) => {
    const [additem, setAdditem] = useState(false);
    console.log(props.collId);
    const collection = DM.find((coll) => {
        return coll.id == props.collId;
    });
    console.log(collection);
    if (!collection) {
        return <div>not found collection</div>;
    }

    return (
        <>
            <div className={css.items}>
                <div className={css.items_item}>
                    <div className={css.items_item_name}>
                        Tasks - {collection.tasks.length}
                    </div>
                    {collection.tasks.map((coll) => (
                        <div key={coll.id} className={css.items_item_task}>
                            <div
                                className={css.items_item_task_linec}
                                style={{
                                    background: `${color()}`,
                                }}
                            ></div>
                            <div key={coll.id} className={css.items_item_task_ta}>
                                <div className={css.items_item_task_ta_checkBox}>
                                    <input type="checkbox" id={coll.id}/>
                                    <label htmlFor={coll.id}>
                                    <span>
                                       <Mark/>
                                    </span>
                                    </label>
                                </div>
                                <div className={css.items_item_task_ta_name}>
                                    {coll.task}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className={css.items_item}>
                    <div className={css.items_item_name}>
                        Completed -{collection.completed.length}
                    </div>

                    {collection.completed.map((coll) => (
                        <div key={coll.id} className={css.items_item_task}>
                            <div
                                className={css.items_item_task_linec}
                                style={{
                                    background: `${color()}`,
                                }}
                            ></div>
                            <div
                                key={coll.id}
                                className={`${css.items_item_task_ta} ${css.items_item_task_comp}`}
                            >
                                <div
                                    className={`${css.items_item_task_ta_checkBox} ${css.completed}`}
                                >
                                    <input
                                        type="checkbox"
                                        defaultChecked
                                        id={coll.id}
                                    />
                                    <label htmlFor={coll.id}>
                                    <span>
                                        <Mark/>
                                    </span>
                                    </label>
                                </div>
                                <div
                                    className={`${css.items_item_task_ta_name} ${css.items_item_task_comp_name}`}
                                >
                                    {coll.task}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>


                <div className={css.margin}></div>
            </div>
            <div
                className={css.addbtn}
                // onClick={() => props.setAdditem(!additem)}
            >
                <form>
                    <Input classname={css.input} key={'addToDo'} placeholder={'Write new ToDo'}/>
                    <Button classname={css.button} text={<i className="las la-plus"></i>}/>
                </form>
            </div>
        </>
    );
};

export default Items;
