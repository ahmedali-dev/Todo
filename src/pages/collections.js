import { useState } from "react";
import Loader from "./../components/UI/Loader";
import CollectionsList from "../components/todos/collections/collectionList";
import css from "./collections.module.scss";
const getid = () =>
	Math.floor(Math.random() * 1000 + 10 * new Date().getTime());
const DMD = [
	{
		id: getid(),
		name: "collection 1",
		tasks: [
			{
				id: getid(),
				task: "read 10 paper",
			},
			{
				id: getid(),
				task: "weakup before 3pm",
			},
			{
				id: getid(),
				task: "visit best freind today",
			},
			{
				id: getid(),
				task: "not play in mobile before 10 pm",
			},
		],
		completed: [
			{
				id: getid(),
				task: "complete react native folder",
			},
		],
	},
	{
		id: getid(),
		name: "collection 1",
		tasks: [],
		completed: [],
	},
];

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

const Collections = () => {
	const [loading, setLoading] = useState(true);
	//console.log(JSON.stringify(DMD));
	setTimeout(() => setLoading(false), 3000);

	if (loading) {
		return (
			<div>
				<Loader />
			</div>
		);
	}

	return (
		<div className={css.collections}>
			<div
				onClick={() => {
					console.log(null);
				}}
				className={css.collHeader}
			>
				Collections
			</div>
			<div className={css.collList}>
				{<CollectionsList collectionlist={DM} />}
			</div>
		</div>
	);
};

export default Collections;
