import React from "react";
import styled from "styled-components"
import classNames from 'classnames';

export interface DotProps {
	state: number;
	label?: string;
}

const DotLabel = styled.span`
	position: relative;
	visibility: hidden;
	cursor: default;
	display: inline-block;
	white-space: nowrap;
	top: 30px;
	font-size: 20px;
	background-color: white;
	border-radius: 3px;
	padding: 3px;
	border: 1px solid;
`

const Dot = styled.div<{
	dotSize: number;
}>`
	width: ${({ dotSize }) => dotSize}px;
	height: ${({ dotSize }) => dotSize}px;
	border-radius: 50%;
	transition: background-color 0.3s ease;
	&:hover ${DotLabel} {
		visibility: visible;
		opacity: 1;
	}
`;

const DotContainer = styled.div<{ dotMargin: number; }>`
	display: flex;
	flex-wrap: wrap-reverse;
	flex-direction: row;
	gap: ${({ dotMargin }) => dotMargin}px;
`;

export interface DotChartProps {
	title?: string;
	data: DotProps[];
	statusClasses: Record<number, string>;
	cols?: number;
	dotSize?: number;
	dotGap?: number;
}

export const DotChart: React.FC<DotChartProps> = (
	{
		title,
		data,
		statusClasses,
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
				{data.map((active: DotProps, index) => (
					<Dot
						key={index}
						dotSize={dotSize}
						className={classNames(
							statusClasses[active.state]
						)}>
						{active.label && <DotLabel>{active.label}</DotLabel>}
					</Dot>
				))}
			</DotContainer>
		</div>
	)
};
