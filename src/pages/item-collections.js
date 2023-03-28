import { useParams } from "react-router-dom";
import css from "./ItemCollections.module.scss";
import Items from "./../components/todos/items/Items";
import NavigationColl from "../components/todos/collections/Navigation";
import { useState } from "react";
import AddCollections from "../components/todos/collections/Add-collection";
const DM = [
    {
        id: 16793438956571,
        name: "collection 1",
        tasks: [
            { id: 16793438956793, task: "read 10 paper" },
            { id: 16793438956710, task: "weakup before 3pm" },
            { id: 16793438956544, task: "visit best freind today" },
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

const ItemsCollections = () => {
    const { id: collid } = useParams();
    const [additem, setAdditem] = useState(false);

    const collection = DM.find((coll) => coll.id == collid);

    const back = () => {
        window.history.back();
    };

    if (!collection) {
        return <div>collection not found {setTimeout(() => back(), 2000)}</div>;
    }
    return (
        <div className={css.itemsContainer}>
            {/*collections navigation bar in computer mode*/}
            <NavigationColl />
            {additem ? (
                <AddCollections
                    placeholder={"Add task"}
                    Cancel={() => setAdditem(false)}
                />
            ) : null}
            {/**/}
            <div className={css.itemColl}>
                <div className={css.header}>
                    <div className={css.header_left}>
                        <div onClick={back} className={css.header_left_icon}>
                            <i className="las la-angle-left"></i>
                        </div>
                        <div className={css.header_left_name}>
                            {collection.name}
                        </div>
                    </div>

                    <div className={css.option}>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>

                <div
                    className={css.addbtn_com}
                    onClick={() => setAdditem(!additem)}
                >
                    <div className={css.btn}>
                        <div className={css.i}>
                            <i className="las la-plus"></i>
                        </div>
                        <div className={css.msg}>Add new task</div>
                    </div>
                </div>

                <div className={css.items}>
                    <Items
                        collId={collid}
                        setAdditem={setAdditem}
                        additem={additem}
                    />
                </div>
            </div>
        </div>
    );
};

export default ItemsCollections;
