import {ProgressDisplayType, ProgressTableData} from "../../models/progressTableData";
import {GET_MIND_AND_BODY_METRICS} from "../../graphql/queries";
import {ProgressTableContainer} from "./shared/ProgressTableContainer";

export type MindAndBodyMetrics = {
	running_total_sessions: number,
	weight_training_total_sessions: number,
	meditation_total_hours: number
}

const metricsMap = ({
						running_total_sessions,
						weight_training_total_sessions,
						meditation_total_hours
}: MindAndBodyMetrics): ProgressTableData => [
	{
		name: 'Running',
		children: [
			{ name: 'sessions this week', current: running_total_sessions, total: 6, type: ProgressDisplayType.Dots },
		],
	},
	{
		name: 'Weight Training',
		children: [
			{ name: 'sessions this week', current: weight_training_total_sessions, total: 4, type: ProgressDisplayType.Dots },
		],
	},
	{
		name: 'Meditation',
		children: [
			{ name: 'hours this week', current: meditation_total_hours, total: 14, type: ProgressDisplayType.Dots },
		],
	},
]

export const MindAndBody = () => ProgressTableContainer(GET_MIND_AND_BODY_METRICS, metricsMap)
