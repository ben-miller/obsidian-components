import {ProgressTable} from "../presenters/ProgressTable/ProgressTable";
import {ProgressDisplayType} from "../../models/progressTableData";
import {useQuery} from "@apollo/client";
import {GET_MIND_AND_BODY_METRICS} from "../../graphql/queries";
import React, {useState} from "react";
import styled from "styled-components";

const mindAndBodyMetrics = (
	runningSessions: number,
	weightTrainingSessions: number,
	meditationHours: number
) => [
	{
		name: 'Running',
		children: [
			{ name: 'sessions this week', current: runningSessions, total: 6, type: ProgressDisplayType.Dots },
		],
	},
	{
		name: 'Weight Training',
		children: [
			{ name: 'sessions this week', current: weightTrainingSessions, total: 4, type: ProgressDisplayType.Dots },
		],
	},
	{
		name: 'Meditation',
		children: [
			{ name: 'hours this week', current: meditationHours, total: 14, type: ProgressDisplayType.Dots },
		],
	},
]

const ProgressTableWithFlash = styled(ProgressTable)<{data: any, pulse: boolean}>`
	${(props) => props.pulse ? 'opacity: 0.2' : ''};
`

export const MindAndBody = () => {
	const { loading, error, data, refetch } = useQuery(GET_MIND_AND_BODY_METRICS, {
		variables: { forceRefresh: false }
	});
	const [pulse, setPulse] = useState(false);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error loading data</p>;

	const handleReload = () => {
		setPulse(true);
		refetch({forceRefresh: true}).then((response) => {
			console.log('data reloaded')
			setPulse(false)
		}).catch((error) => {
			console.error('Error fetching data', error);
		})
	}

	return <ProgressTableWithFlash
		data={mindAndBodyMetrics(
			data.sources.calendar.running_total_sessions,
			data.sources.calendar.weight_training_total_sessions,
			data.sources.calendar.meditation_total_hours
		)}
		onDoubleClick={handleReload}
		cols={10}
		pulse={pulse} />
}
