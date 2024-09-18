import React from 'react'
import styled from 'styled-components';
import {DotCountChart} from "../DotChart/DotCountChart";
import {ProgressTableData, ProgressTableSection} from "../../../models/progressTableData";

const Container = styled.div`
	padding: 20px;
	font-family: 'equity-caps', sans-serif;
	text-transform: lowercase;
	font-size: 17px;
	max-width: 800px;
	min-width: 200px;
`;

const Label = styled.div`
`

const LabelContainer = styled.div`
	flex: 2;
	display: flex;
`

const Item = styled.div`
	flex: 3;
	display: flex;
	margin-top: 6px;
`;

const MainComponent = styled.div`
	display: flex-block;
`

const ItemContainer = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 15px;
`

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

export const ProgressTableSectionComponent: React.FC<{
	section: ProgressTableSection,
	sectionIndex: any,
	cols: number
}> = ({section, sectionIndex, cols}) => {
	return <ItemContainer>
		<LabelContainer>
			<Label style={{ textAlign: 'right' }} key={sectionIndex} >
				{section.name}, {section.children[0].name}
			</Label>
		</LabelContainer>
		<Item key={sectionIndex}>
			<DotCountChart
				current={section.children[0].current}
				total={section.children[0].total}
				cols={cols}/>
		</Item>
	</ItemContainer>;
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
		<Container onDoubleClick={onDoubleClick} className={className}>
			{title && <h2>{title}</h2>}
			<MainComponent>
				{data.map((section, sectionIndex) => (
					<ProgressTableSectionComponent
						section={section}
						sectionIndex={sectionIndex}
						cols={cols} />
				))}
			</MainComponent>
		</Container>
	);
};
