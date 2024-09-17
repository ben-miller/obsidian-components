import React from "react";
import styled from "styled-components"
import classNames from 'classnames';

const Dot = styled.div<{ dotSize: number; }>`
	width: ${({ dotSize }) => dotSize}px;
	height: ${({ dotSize }) => dotSize}px;
	border-radius: 50%;
	transition: background-color 0.3s ease;
`;

const DotContainer = styled.div<{ dotMargin: number; }>`
	display: flex;
	flex-wrap: wrap-reverse;
	flex-direction: row;
	gap: ${({ dotMargin }) => dotMargin}px;
`;

export interface DotChartProps {
	title?: string;
	data: number[];
	statusClasses?: Record<number, string>;
	cols?: number;
	dotSize?: number;
	dotGap?: number;
}

export const DotChart: React.FC<DotChartProps> = (
	{
		title,
		data,
		statusClasses = {0: 'bg-primary-50', 1: 'bg-primary-dark'},
		cols = 10,
		dotSize = 20,
		dotGap = 16
	}) => {

	const maxWidth = cols ? cols * dotSize + (cols - 1) * dotGap : undefined

	return (
		<div>
			{title && <h2>{title}</h2>}
			<DotContainer
				style={{maxWidth: maxWidth}}
				dotMargin={dotGap}>
				{data.map((active, index) => (
					<Dot
						key={index}
						dotSize={dotSize}
						className={classNames(
							statusClasses[active]
						)}
					/>
				))}
			</DotContainer>
		</div>
	)
};
