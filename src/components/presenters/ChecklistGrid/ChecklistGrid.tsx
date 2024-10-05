import React from "react";
import {DotChart, DotProps} from "../DotChart/DotChart";
import {
	SectionContainer,
	SubSectionContainer,
	SubSectionItem,
	SubSectionLabel,
	SubSectionLabelContainer
} from "../Section/sectionLayouts";
import {GET_ORG_MODE_TODO, SUBSCRIBE_ORG_MODE_TODO} from "../../../graphql/queries";
import {useQueryOrSubscription} from "../../hooks/useQueryOrSubscription";

export enum ChecklistGridState {
	SELECTED = 0,
	NEXT = 1,
	DOING = 2,
	BUG = 3,
	DONE = 4
}

export namespace ChecklistGridState {
	export function fromString(state: string): ChecklistGridState {
		switch (state.toUpperCase()) {
			case 'DOING':
				return ChecklistGridState.DOING;
			case 'NEXT':
				return ChecklistGridState.NEXT;
			case 'BUG':
				return ChecklistGridState.BUG;
			case 'DONE':
				return ChecklistGridState.DONE;
			case 'SELECTED':
			default:
				return ChecklistGridState.SELECTED;
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
			[ChecklistGridState.SELECTED]: 'bg-primary-25',
			[ChecklistGridState.NEXT]: 'bg-primary-50',
			[ChecklistGridState.DOING]: 'bg-secondary-dark',
			[ChecklistGridState.BUG]: 'bg-warning-dark',
			[ChecklistGridState.DONE]: 'bg-primary-400'
		},
		cols = 10,
		dotSize = 20,
		dotGap = 16,
		className
	}) => {
	const { loading, error, data, reload } = useQueryOrSubscription(
		GET_ORG_MODE_TODO,
		SUBSCRIBE_ORG_MODE_TODO,
		{ variables: { forceRefresh: true } },
		true
		);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error loading data</p>;

	const tasks = data.org_mode.project_tasks.map((item: { state: string, label: string }) => {
		return { state: ChecklistGridState.fromString(item.state), label: item.label }
	})
	const selected: ChecklistGridDotProps[] = tasks.filter((item: { state: ChecklistGridState; }) => item.state === ChecklistGridState.SELECTED);
	const doing: ChecklistGridDotProps[] = tasks.filter((item: { state: ChecklistGridState; }) => item.state === ChecklistGridState.DOING);
	const next: ChecklistGridDotProps[] = tasks.filter((item: { state: ChecklistGridState; }) => item.state === ChecklistGridState.NEXT);
	const bug: ChecklistGridDotProps[] = tasks.filter((item: { state: ChecklistGridState; }) => item.state === ChecklistGridState.BUG);
	const done: ChecklistGridDotProps[] = tasks.filter((item: { state: ChecklistGridState; }) => item.state === ChecklistGridState.DONE);
	const sortedData = [...done, ...doing, ...bug, ...next, ...selected];

	const sectionContainer = (title: string, items: ChecklistGridDotProps[]) => {
		return <SubSectionContainer>
			<SubSectionLabelContainer>
				<SubSectionLabel>
					{title}
				</SubSectionLabel>
			</SubSectionLabelContainer>
			<SubSectionItem>
				<ul>
					{items.map((item, index) => (
						<li key={index}>{item.label}</li>
					))}
				</ul>
			</SubSectionItem>
		</SubSectionContainer>
	}

	return <SectionContainer
		className={className}
		onDoubleClick={() => reload({forceRefresh: true})}
	>
		{title && <h2>{title}</h2>}
		<SubSectionContainer>
			<SubSectionLabelContainer>
				<SubSectionLabel>
					All Tasks
				</SubSectionLabel>
			</SubSectionLabelContainer>
			<SubSectionItem>
				<DotChart
					data={sortedData}
					statusClasses={statusClasses}
					cols={cols}
					dotSize={dotSize}
					dotGap={dotGap}
				/>
			</SubSectionItem>
		</SubSectionContainer>
		{ doing.length > 0 && sectionContainer("In Progress", doing) }
		{ next.length > 0 && sectionContainer("Upcoming", next) }
	</SectionContainer>
};
