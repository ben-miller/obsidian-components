import React from "react";
import {DotChart, DotProps} from "../DotChart/DotChart";
import {
	SectionContainer,
	SubSectionContainer,
	SubSectionItem,
	SubSectionLabel,
	SubSectionLabelContainer
} from "../Section/sectionLayouts";
import {useQuery} from "@apollo/client";
import {GET_ORG_MODE_TODO} from "../../../graphql/queries";

export enum ChecklistGridState {
	TODO = 0,
	DOING = 1,
	DONE = 2
}

export namespace ChecklistGridState {
	export function fromString(state: string): ChecklistGridState {
		switch (state.toUpperCase()) {
			case 'DOING':
				return ChecklistGridState.DOING;
			case 'DONE':
				return ChecklistGridState.DONE;
			case 'TODO':
			default:
				return ChecklistGridState.TODO;
		}
	}
}

export interface ChecklistGridDotProps extends DotProps {
	label: string;
}

interface ChecklistGridProps {
	title: string;
	statusClasses?: Record<number, string>;
	cols?: number;
	dotSize?: number;
	dotGap?: number;
	className?: string;
}

export const ChecklistGrid: React.FC<ChecklistGridProps> = (
	{
		title,
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
	const { loading, error, data, refetch } = useQuery(GET_ORG_MODE_TODO, {
		variables: { forceRefresh: true }
	});

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error loading data</p>;

	const tasks = data.sources.org_mode.project_tasks.map((item: { state: string, label: string }) => {
		return { state: ChecklistGridState.fromString(item.state), label: item.label }
	})
	const doing: ChecklistGridDotProps[] = tasks.filter((item: { state: ChecklistGridState; }) => item.state === ChecklistGridState.DOING);

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
					data={tasks}
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
