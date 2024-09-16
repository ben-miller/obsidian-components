import {DocumentNode, useQuery} from "@apollo/client";
import React, {useState} from "react";
import styled from "styled-components";
import {ProgressTable} from "../../presenters/ProgressTable/ProgressTable";
import {ProgressTableData} from "../../../models/progressTableData";

const ProgressTableWithFlash = styled(ProgressTable)<{data: any, pulse: boolean}>`
	${(props) => props.pulse ? 'opacity: 0.2' : ''};
`

export const ProgressTableContainer = (
	graphQlQuery: DocumentNode,
	metricsMap: (map: Record<string, number>) => ProgressTableData
) => {
	const { loading, error, data, refetch } = useQuery(graphQlQuery, {
		variables: { forceRefresh: false }
	});
	const [pulse, setPulse] = useState(false);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error loading data</p>;

	const handleReload = () => {
		setPulse(true);
		refetch({forceRefresh: true}).then(() => {
			setPulse(false)
		}).catch((error) => {
			console.error('Error fetching data', error);
		})
	}

	return <ProgressTableWithFlash
		data={metricsMap(data.sources.calendar)}
		onDoubleClick={handleReload}
		cols={10}
		pulse={pulse} />
}
