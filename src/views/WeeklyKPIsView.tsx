import React from 'react'
import styled from 'styled-components'
import {ProgressTable} from "../components/presenters/ProgressTable/ProgressTable";
import {jobSearchMetrics, mindAndBodyMetrics} from "../models/fakeData";

export const WeeklyKPIsView: React.FC = () => {
	const MainContainer = styled.div``
	const TableContainer = styled.div``

	return <MainContainer className={"weekly-kpis-container"}>
		<TableContainer>
			<ProgressTable title={'Mind and Body'} data={mindAndBodyMetrics} cols={10} />
			<ProgressTable title={'Job Search'} data={jobSearchMetrics} cols={10} />
		</TableContainer>
	</MainContainer>
}
