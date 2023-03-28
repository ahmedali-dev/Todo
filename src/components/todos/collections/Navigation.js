import { Link, NavLink, useParams } from "react-router-dom";
import css from "./Navigation.module.scss";

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

const NavigationColl = () => {
    const { id } = useParams();
    return (
        <div className={css.Nav}>
            <Link to={"/collections"} className={css.header}>
                Collections
            </Link>
            <div className={css.collections}>
                {DM.map((dm) => (
                    <NavLink
                        key={dm.id}
                        className={() =>
                            id == dm.id
                                ? `${css.collections_item} ${css.active}`
                                : css.collections_item
                        }
                        to={`/collections/${dm.id}`}
                    >
                        <div key={dm.name}>{dm.name}</div>
                    </NavLink>
                ))}
            </div>
        </div>
    );
};

export default NavigationColl;
