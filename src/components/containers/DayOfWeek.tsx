import {ProgressTable} from "../presenters/ProgressTable/ProgressTable";
import React from "react";
import {ProgressTableSectionData} from "../../models/progressTableData";

function getCurrentDayOfWeek(): number {
	const currentDate = new Date();
	const day = currentDate.getDay();

	// Adjust to make Sunday 1, Monday 2, ..., Saturday 7
	return day === 0 ? 1 : day + 1;
}

const data = (): ProgressTableSectionData[] => [
	{
		name: 'Time, day of week',
		data: { type: 'DotCountData', current: getCurrentDayOfWeek(), total: 7 },
	}
]

export const DayOfWeek: React.FC = () => {
	return <ProgressTable data={data()} cols={10}/>
}
