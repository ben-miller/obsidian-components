import {ProgressTable} from "../presenters/ProgressTable/ProgressTable";
import React from "react";

function getCurrentDayOfWeek(): number {
	const currentDate = new Date();
	const day = currentDate.getDay();

	// Adjust to make Sunday 1, Monday 2, ..., Saturday 7
	return day === 0 ? 1 : day + 1;
}

const data = () => [
	{
		name: 'Time',
		children: [
			{ name: 'day of week', current: getCurrentDayOfWeek(), total: 7 },
		],
	}
];

export const DayOfWeek: React.FC = () => {
	return <ProgressTable data={data()} cols={10}/>
}
