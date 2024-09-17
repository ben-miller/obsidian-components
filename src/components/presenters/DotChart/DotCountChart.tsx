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

interface DotChartProps {
	title?: string;
	current: number;
	total: number;
	cols?: number;
	dotSize?: number;
	dotGap?: number;
}

export const DotCountChart: React.FC<DotChartProps> = ({ title, current, total, cols = 10, dotSize = 20, dotGap = 16 }) => {
	const arr = new Array(total)
		.fill(true, 0, current)
		.fill(false, current, total)

	const maxWidth = cols ? cols * dotSize + (cols - 1) * dotGap : undefined

	return (
		<div>
			{title && <h2>{title}</h2>}
			<DotContainer
				style={{maxWidth: maxWidth}}
				dotMargin={dotGap}>
				{arr.map((active, index) => (
					<Dot
						key={index}
						dotSize={dotSize}
						className={classNames(
							active ? 'bg-primary-dark' : 'bg-primary-50'
						)}
					/>
				))}
			</DotContainer>
		</div>
	)
};
