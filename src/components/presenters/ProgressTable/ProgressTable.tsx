import React from 'react'
import styled from 'styled-components';
import {DotCountChart} from "../DotChart/DotCountChart";
import {ProgressTableData, ProgressTableSectionData} from "../../../models/progressTableData";
import {ChecklistGrid} from "../ChecklistGrid/ChecklistGrid";

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

const SectionContainer = styled.div`
	padding: 20px;
	font-family: 'equity-caps', serif;
	text-transform: lowercase;
	font-size: 17px;
	max-width: 800px;
	min-width: 200px;
`;

const SubSectionLabel = styled.div`
`

const SubSectionLabelContainer = styled.div`
	flex: 2;
	display: flex;
`

const SubSectionItem = styled.div`
	flex: 3;
	display: flex;
	margin-top: 6px;
`;

const SubSectionsContainer = styled.div`
	display: flex-block;
`

const SubSectionContainer = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 15px;
`

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
			<SubSectionLabel key={sectionIndex} >
				{section.name}
			</SubSectionLabel>
		</SubSectionLabelContainer>
		<SubSectionItem key={sectionIndex}>
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
			<SubSectionsContainer>
				{data.map((section, sectionIndex) => (
					<ProgressTableSection
						section={section}
						sectionIndex={sectionIndex}
						cols={cols} />
				))}
			</SubSectionsContainer>
		</SectionContainer>
	);
};
