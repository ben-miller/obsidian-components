import React from 'react';
import styled from 'styled-components';

const Progress = styled.div<{ maxWidth?: number }>`
	border-radius: 5px;
	flex: 1;
	height: 24px;
	overflow: hidden;
	position: relative;
	max-width: ${({ maxWidth }) => (maxWidth ? `${maxWidth}px` : 'auto')};
`;

const ProgressFill = styled.div<{ percentage: number }>`
	height: 100%;
	width: ${({ percentage }) => percentage}%;
	transition: width 0.4s ease;
`;

const ProgressText = styled.span`
	position: absolute;
	top: 4px;
	left: 50%;
	transform: translateX(-50%);
	color: white;
	font-size: 12px;
	font-weight: bold;
`;

const ProgressBar: React.FC<{ completed: number, total: number, maxWidth?: number }> = ({ completed, total, maxWidth }) => {
	return <Progress className={'bg-primary-25'} maxWidth={maxWidth}>
		<ProgressFill
			percentage={Math.round(100 * completed / total)}
			className={'bg-primary-dark'}
		/>
		<ProgressText>{completed} / {total}</ProgressText>
	</Progress>
}

export default ProgressBar;
