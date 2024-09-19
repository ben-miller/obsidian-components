import React from "react";
import {DotChart, DotProps} from "../DotChart/DotChart";
import {
	SectionContainer,
	SubSectionContainer, SubSectionItem,
	SubSectionLabel,
	SubSectionLabelContainer
} from "../Section/sectionLayouts";

export enum ChecklistGridState {
	TODO = 0,
	DOING = 1,
	DONE = 2
}

export interface ChecklistGridDotProps extends DotProps {
	label: string;
}

interface ChecklistGridProps {
	title: string;
	data: ChecklistGridDotProps[];
	statusClasses?: Record<number, string>;
	cols?: number;
	dotSize?: number;
	dotGap?: number;
	className?: string;
}

export const ChecklistGrid: React.FC<ChecklistGridProps> = (
	{
		title,
		data,
		statusClasses = {
			[ChecklistGridState.TODO]: 'bg-primary-25',
			[ChecklistGridState.DOING]: 'bg-primary-200 dot-in-progress',
			[ChecklistGridState.DONE]: 'bg-primary-400'
		},
		cols = 10,
		dotSize = 20,
		dotGap = 16,
		className
	}) => {
	const doing = data.filter(item => item.state === ChecklistGridState.DOING);
	return <SectionContainer className={className}>
		{title && <h2>{title}</h2>}
		<SubSectionContainer>
			<SubSectionLabelContainer>
				<SubSectionLabel>
					All Tasks
				</SubSectionLabel>
			</SubSectionLabelContainer>
			<SubSectionItem>
				<DotChart
					data={data}
					statusClasses={statusClasses}
					cols={cols}
					dotSize={dotSize}
					dotGap={dotGap}
				/>
			</SubSectionItem>
		</SubSectionContainer>
		<SubSectionContainer>
			<SubSectionLabelContainer>
				<SubSectionLabel>
					In Progress
				</SubSectionLabel>
			</SubSectionLabelContainer>
			<SubSectionItem>
				<ul>
					{doing.length > 0 ? (
						doing.map((item, index) => (
							<li key={index}>{item.label}</li>
						))
					) : (
						<li>No items in progress</li>
					)}
				</ul>
			</SubSectionItem>
		</SubSectionContainer>
	</SectionContainer>
};
