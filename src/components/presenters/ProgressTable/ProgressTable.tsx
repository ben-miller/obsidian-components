import React from 'react'
import styled from 'styled-components';
import {DotChart} from "../DotChart/DotChart";
import {ProgressDisplayType, ProgressTableData} from "../../../models/progressTableData";
import ProgressBar from "../ProgressBar/ProgressBar";

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

export interface DotCountTableProps {
	title?: string;
	data: ProgressTableData;
	cols: number;
	dotSize?: number;
	dotGap?: number;
}

export const parseYamlToDotCountTableProps = (parsedData: any): DotCountTableProps | null => {
	try {
		// Type guard to validate the parsed data
		const validateData = (data: any): data is DotCountTableProps => {
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

export const ProgressTable: React.FC<DotCountTableProps> = ({ title, data, cols = 10, dotSize = 20, dotGap = 16}) => {
	const maxWidth = cols ? cols * dotSize + (cols - 1) * dotGap : undefined

	return (
		<Container>
			{title && <h2>{title}</h2>}
			<MainComponent>
				{data.map((section, sectionIndex) => (
					<ItemContainer>
						<LabelContainer>
							<Label style={{ textAlign: 'right' }} key={sectionIndex} >
								{section.name}, {section.children[0].name}
							</Label>
						</LabelContainer>
						<Item key={sectionIndex}>
							{section.children[0].type === ProgressDisplayType.Dots ?
								<DotChart
									current={section.children[0].current}
									total={section.children[0].total}
									cols={cols}/> :
								<ProgressBar
									completed={section.children[0].current}
									total={section.children[0].total}
									maxWidth={maxWidth}
								/>
							}
						</Item>
					</ItemContainer>
				))}
			</MainComponent>
		</Container>
	);
};
