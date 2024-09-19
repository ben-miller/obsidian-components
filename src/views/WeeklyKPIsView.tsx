import React from 'react'
import styled from 'styled-components'
import {ProgressTable} from "../components/presenters/ProgressTable/ProgressTable";
import {checklistGridData, jobSearchMetrics, mindAndBodyMetrics} from "../models/fakeData";
import {ChecklistGrid} from "../components/presenters/ChecklistGrid/ChecklistGrid";

export const WeeklyKPIsView: React.FC = () => {
	const MainContainer = styled.div``
	const TableContainer = styled.div``

	return <MainContainer className={"weekly-kpis-container"}>
		<TableContainer>
			<ProgressTable title={'Mind and Body'} data={mindAndBodyMetrics} cols={10} />
			{/*<ProgressTable title={'Job Search'} data={jobSearchMetrics} cols={10} />*/}
			<ChecklistGrid title={'Dev project'} data={checklistGridData.data} />
		</TableContainer>
	</MainContainer>
}
