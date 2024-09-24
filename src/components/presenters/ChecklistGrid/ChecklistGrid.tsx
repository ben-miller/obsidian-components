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
	NEXT = 1,
	DOING = 2,
	DONE = 3
}

export namespace ChecklistGridState {
	export function fromString(state: string): ChecklistGridState {
		switch (state.toUpperCase()) {
			case 'DOING':
				return ChecklistGridState.DOING;
			case 'NEXT':
				return ChecklistGridState.NEXT;
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
			[ChecklistGridState.NEXT]: 'bg-primary-200 dot-task-next',
			[ChecklistGridState.DOING]: 'bg-primary-200 dot-task-doing',
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
	const next: ChecklistGridDotProps[] = tasks.filter((item: { state: ChecklistGridState; }) => item.state === ChecklistGridState.NEXT);

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
						<li>(No items in progress)</li>
					)}
				</ul>
			</SubSectionItem>
		</SubSectionContainer>
		{ next.length > 0 &&
			<SubSectionContainer>
				<SubSectionLabelContainer>
					<SubSectionLabel>
						Upcoming
					</SubSectionLabel>
				</SubSectionLabelContainer>
				<SubSectionItem>
					<ul>
						{next.length > 0 ? (
							next.map((item, index) => (
								<li key={index}>{item.label}</li>
							))
						) : (
							<li>No upcoming items</li>
						)}
					</ul>
				</SubSectionItem>
			</SubSectionContainer>
		}
	</SectionContainer>
};
