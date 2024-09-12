import React from 'react'
import styled from 'styled-components'
import {ProgressTable} from "../components/ProgressTable/ProgressTable";
import {fakeData} from "../models/fakeData";

export const WeeklyKPIsView: React.FC = () => {
	const MainContainer = styled.div``
	const TableContainer = styled.div``

	return <MainContainer className={"weekly-kpis-container"}>
		<TableContainer>
			<ProgressTable title={'Mind and Body'} data={fakeData.mindAndBodyMetrics} cols={10} />
			<ProgressTable title={'Job Search'} data={fakeData.jobSearchMetrics} cols={10} />
		</TableContainer>
	</MainContainer>
}
