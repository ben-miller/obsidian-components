import React, {useState} from 'react';
import { useQuery } from "@apollo/client";
import { GET_INBOX_COUNTS } from "../../graphql/queries";
import {SimpleTable, SimpleTableData} from '../presenters/SimpleTable/SimpleTable';
import styled from "styled-components";

const SimpleTableWithReloading = styled(SimpleTable)<{data: any, reloading: boolean}>`
	${(props) => props.reloading ? 'opacity: 0.2' : ''};
`

const InboxCountTable: React.FC = () => {
	const { loading, error, data, refetch } = useQuery(GET_INBOX_COUNTS, {
		variables: { forceRefresh: false }
	});
	const [reloading, setReloading] = useState(false);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error loading data</p>;

	const formatTitle = (str: string) => {
		// Replace underscores with spaces and capitalize each word
		return str
			.replace(/_/g, ' ')
			.replace(/\b\w/g, l => l.toUpperCase());
	};

	const handleReload = () => {
		setReloading(true);
		refetch({forceRefresh: true}).then((response) => {
			console.log('data reloaded')
			setReloading(false)
		}).catch((error) => {
			console.error('Error fetching data', error);
		})
	}

	const formattedData: SimpleTableData = Object.keys(data.sources)
		.filter(key => key !== '__typename')
		.map(source => {
			const children = Object.keys(data.sources[source])
				.filter(key => key !== '__typename')
				.map(key => ({
					name: formatTitle(key),
					size: data.sources[source][key]
				}));

			return {
				name: formatTitle(source),
				children
			};
		});

	return <SimpleTableWithReloading
		data={formattedData}
		onDoubleClick={handleReload}
		reloading={reloading}
	/>
};

export default InboxCountTable;
