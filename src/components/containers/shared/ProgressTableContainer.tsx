import {DocumentNode, useQuery} from "@apollo/client";
import React, {useState} from "react";
import styled from "styled-components";
import {ProgressTable} from "../../presenters/ProgressTable/ProgressTable";
import {ProgressTableData} from "../../../models/progressTableData";

export type ActivityMetrics = {
	total_sessions: number,
	total_hours: number
}

const ProgressTableWithReloading = styled(ProgressTable)<{data: any, reloading: boolean}>`
	${(props) => props.reloading ? 'opacity: 0.2' : ''};
`

export const ProgressTableContainer = (
	graphQlQuery: DocumentNode,
	metricsMap: (metrics: Record<string, ActivityMetrics>) => ProgressTableData
) => {
	const { loading, error, data, refetch } = useQuery(graphQlQuery, {
		variables: { forceRefresh: false }
	});
	const [reloading, setReloading] = useState(false);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error loading data</p>;

	const handleReload = () => {
		setReloading(true);
		refetch({forceRefresh: true}).then(() => {
			setReloading(false)
		}).catch((error) => {
			console.error('Error fetching data', error);
		})
	}

	return <ProgressTableWithReloading
		data={metricsMap(data.sources.calendar)}
		onDoubleClick={handleReload}
		cols={10}
		reloading={reloading} />
}
