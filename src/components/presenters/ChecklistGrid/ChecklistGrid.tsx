import React from "react";
import {DotChart, DotProps} from "../DotChart/DotChart";

export enum ChecklistGridState {
	TODO = 0,
	DOING = 1,
	DONE = 2
}

export interface ChecklistGridDotProps extends DotProps {
	label: string;
}

interface ChecklistGridProps {
	data: ChecklistGridDotProps[];
	statusClasses?: Record<number, string>;
	cols?: number;
	dotSize?: number;
	dotGap?: number;
}

export const ChecklistGrid: React.FC<ChecklistGridProps> = (
	{
		data,
		statusClasses = {
			[ChecklistGridState.TODO]: 'bg-primary-50',
			[ChecklistGridState.DOING]: 'bg-secondary-dark',
			[ChecklistGridState.DONE]: 'bg-primary-400'
		},
		cols = 10,
		dotSize = 20,
		dotGap = 16
	}) => {
	return <DotChart
		data={data}
		statusClasses={statusClasses}
		cols={cols}
		dotSize={dotSize}
		dotGap={dotGap}
	/>
};
