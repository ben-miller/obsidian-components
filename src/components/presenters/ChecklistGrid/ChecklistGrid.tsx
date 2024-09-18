import React from "react";
import {DotChart, DotProps} from "../DotChart/DotChart";

enum ChecklistGridState {
	TODO = 0,
	DOING = 1,
	DONE = 2
}

interface ChecklistGridDotProps extends DotProps {
	label: string;
}

interface ChecklistGridProps {
	title?: string;
	data?: ChecklistGridDotProps[];
	statusClasses?: Record<number, string>;
	cols?: number;
	dotSize?: number;
	dotGap?: number;
}

export const ChecklistGrid: React.FC<ChecklistGridProps> = (
	{
		title = 'Project Checklist',
		data = [
			{
				state: ChecklistGridState.TODO,
				label: 'Github heat map'
			},{
				state: ChecklistGridState.TODO,
				label: 'Stacked bar chart for summarizing time use'
			},{
				state: ChecklistGridState.DOING,
				label: 'Checklist grid'
			},{
				state: ChecklistGridState.DONE,
				label: 'Dot count chart'
			},{
				state: ChecklistGridState.TODO,
				label: 'Day of year dot chart'
			},{
				state: ChecklistGridState.TODO,
				label: 'Financial metrics'
			},{
				state: ChecklistGridState.TODO,
				label: 'Skill tree'
			}],
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
		title={title}
		data={data}
		statusClasses={statusClasses}
		cols={cols}
		dotSize={dotSize}
		dotGap={dotGap}
	/>
};
