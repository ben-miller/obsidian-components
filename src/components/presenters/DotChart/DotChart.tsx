import React, {useRef, useState} from "react";
import styled from "styled-components"
import classNames from 'classnames';
import {DotChartTooltip} from "./DotChartToolTip";

export interface DotProps {
	state: number;
	label?: string;
}

const Dot = styled.div<{
	dotSize: number;
}>`
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
	const [tooltip, setTooltip] = useState<{ label: string; x: number; y: number } | null>(null);
	const dotRefs = useRef<(HTMLDivElement | null)[]>([]);

	const maxWidth = cols ? cols * dotSize + (cols - 1) * dotGap : undefined

	const handleMouseEnter = (index: number, label?: string) => {
		if (!label) return;
		const dotElement = dotRefs.current[index];
		if (dotElement) {
			const rect = dotElement.getBoundingClientRect();
			const tooltipX = rect.left + rect.width / 2 + 6;
			const tooltipY = rect.top + 10;

			setTooltip({ label, x: tooltipX, y: tooltipY });
		}
	};

	const handleMouseLeave = () => {
		setTooltip(null);
	};

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
						)}
						onMouseEnter={() => handleMouseEnter(index, active.label)}
						onMouseLeave={handleMouseLeave}
						ref={(el: HTMLDivElement | null) => (dotRefs.current[index] = el)}
					>
						{/*{active.label && <DotLabel>{active.label}</DotLabel>}*/}
					</Dot>
				))}
			</DotContainer>
			{tooltip && (
				<DotChartTooltip x={tooltip.x} y={tooltip.y}>
					{tooltip.label}
				</DotChartTooltip>
			)}
		</div>
	)
};
