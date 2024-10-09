import {DocumentNode, useQuery} from "@apollo/client";
import React from "react";
import styled from "styled-components";
import {ProgressTable} from "../../presenters/ProgressTable/ProgressTable";
import {ProgressTableData} from "../../../models/progressTableData";
import {useReloading} from "../../hooks/useReloading";

export type ActivityMetrics = {
	total_sessions: number,
	total_hours: number
}

const StyledProgressTable = styled(ProgressTable)<{data: any, reloading: boolean}>`
	${(props) => props.reloading ? 'opacity: 0.2' : ''};
`

export const ProgressTableContainer = (
	graphQlQuery: DocumentNode,
	metricsMap: (metrics: Record<string, ActivityMetrics>) => ProgressTableData
) => {
	const queryResult = useQuery(graphQlQuery, {
		variables: { forceRefresh: false }
	});
	const { loading, error, data, refetch } = queryResult
	const { reloading, reload } = useReloading(queryResult);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error loading data</p>;

	return <StyledProgressTable
		data={metricsMap(data.sources.calendar)}
		onDoubleClick={() => reload({forceRefresh: true})}
		cols={10}
		reloading={reloading} />
}
