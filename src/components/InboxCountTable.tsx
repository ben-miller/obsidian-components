import React from 'react';
import { useQuery } from "@apollo/client";
import { GET_INBOX_COUNTS } from "../graphql/queries";
import {SimpleTable, SimpleTableData} from './SimpleTable/SimpleTable';

const InboxCountTable: React.FC = () => {
	const { loading, error, data, refetch } = useQuery(GET_INBOX_COUNTS);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error loading data</p>;

	const formatTitle = (str: string) => {
		// Replace underscores with spaces and capitalize each word
		return str
			.replace(/_/g, ' ')
			.replace(/\b\w/g, l => l.toUpperCase());
	};

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

	return <SimpleTable data={formattedData} onDoubleClick={() => refetch()}/>
};

export default InboxCountTable;
