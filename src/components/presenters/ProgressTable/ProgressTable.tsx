import React from 'react'
import {DotCountChart} from "../DotChart/DotCountChart";
import {ProgressTableData, ProgressTableSectionData} from "../../../models/progressTableData";
import {ChecklistGrid} from "../ChecklistGrid/ChecklistGrid";
import {
	SectionContainer,
	SubSectionContainer,
	SubSectionItem,
	SubSectionLabel,
	SubSectionLabelContainer
} from "../Section/sectionLayouts";

export const parseYamlToDotCountTableProps = (parsedData: any): ProgressTableProps | null => {
	try {
		// Type guard to validate the parsed data
		const validateData = (data: any): data is ProgressTableProps => {
			return (
				typeof data === 'object' &&
				Array.isArray(data.data) &&
				typeof data.cols === 'number' &&
				(typeof data.title === 'string' || typeof data.title === 'undefined')
			);
		};

		if (validateData(parsedData)) {
			return parsedData;
		} else {
			throw new Error('Invalid YAML format.');
		}
	} catch (error) {
		console.error('Error parsing YAML:', error);
		return null;
	}
};

export const ProgressTableSection: React.FC<{
	section: ProgressTableSectionData,
	sectionIndex: any,
	cols: number
}> = ({section, sectionIndex, cols}) => {
	const renderChart = () => {
		switch(section.data.type) {
			case "ChecklistGridData":
				return <ChecklistGrid
					data={section.data.data}
				/>
			case 'DotCountData':
			default:
				return <DotCountChart
					current={section.data.current}
					total={section.data.total}
					cols={cols}/>
		}
	}

	return <SubSectionContainer>
		<SubSectionLabelContainer>
			<SubSectionLabel>
				{section.name}
			</SubSectionLabel>
		</SubSectionLabelContainer>
		<SubSectionItem>
			{renderChart()}
		</SubSectionItem>
	</SubSectionContainer>;
}

export interface ProgressTableProps {
	className?: string;
	title?: string;
	data: ProgressTableData;
	cols: number;
	dotSize?: number;
	dotGap?: number;
	onDoubleClick?: () => void;
	children?: React.ReactNode;
}

export const ProgressTable: React.FC<ProgressTableProps> = (
	{
		title,
		data,
		cols = 10,
		onDoubleClick,
		className
	}) => {
	return (
		<SectionContainer onDoubleClick={onDoubleClick} className={className}>
			{title && <h2>{title}</h2>}
			{data.map((section, sectionIndex) => (
				<ProgressTableSection
					section={section}
					sectionIndex={sectionIndex}
					cols={cols} />
			))}
		</SectionContainer>
	);
};
