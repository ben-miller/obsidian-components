import styled from "styled-components";
import React from "react";
import {createPortal} from "react-dom";

interface DotChartTooltipProps {
	x: number;
	y: number;
	children?: React.ReactNode;
}

export const DotChartTooltipWrapper = styled.div<DotChartTooltipProps>`
	position: fixed;
	top: ${({ y }) => y}px;
	left: ${({ x }) => x}px;
	background-color: white;
	padding: 5px;
	border-radius: 3px;
	white-space: nowrap;
	z-index: 9999; /* Adjust as needed */
	pointer-events: none;
	opacity: 1;
	border: 1px solid;
	font-family: 'equity-caps', serif;
`;

export const DotChartTooltip: React.FC<DotChartTooltipProps> = ({ x, y, children }) => {
	return createPortal(
		<DotChartTooltipWrapper x={x} y={y} >{children}</DotChartTooltipWrapper>,
		document.body
	);
};
