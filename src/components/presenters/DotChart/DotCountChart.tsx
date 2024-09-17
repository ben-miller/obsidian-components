import React from "react";
import {DotChart} from "./DotChart";

interface DotChartProps {
	title?: string;
	current: number;
	total: number;
	cols?: number;
	dotSize?: number;
	dotGap?: number;
}

export const DotCountChart: React.FC<DotChartProps> = (
	{
		title,
		current,
		total,
		cols = 10,
		dotSize = 20,
		dotGap = 16
	}) => {
	const data = new Array(total)
		.fill(1, 0, current)
		.fill(0, current, total)
	return <DotChart
		title={title}
		data={data}
		cols={cols}
		dotSize={dotSize}
		dotGap={dotGap}
	/>
};
