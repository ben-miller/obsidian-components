import {ProgressDisplayType, ProgressTableData} from "../../models/progressTableData";
import {GET_MIND_AND_BODY_METRICS} from "../../graphql/queries";
import {ActivityMetrics, ProgressTableContainer} from "./shared/ProgressTableContainer";

const metricsMap = (metrics: Record<string, ActivityMetrics>): ProgressTableData => [
	{
		name: 'Running',
		children: [
			{ name: 'sessions this week', current: metrics.running.total_sessions, total: 6, type: ProgressDisplayType.Dots },
		],
	},
	{
		name: 'Weight Training',
		children: [
			{ name: 'sessions this week', current: metrics.weight_training.total_sessions, total: 4, type: ProgressDisplayType.Dots },
		],
	},
	{
		name: 'Meditation',
		children: [
			{ name: 'hours this week', current: metrics.meditation.total_hours, total: 14, type: ProgressDisplayType.Dots },
		],
	},
]

export const MindAndBody = () => ProgressTableContainer(GET_MIND_AND_BODY_METRICS, metricsMap)
