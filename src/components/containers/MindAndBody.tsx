import {ProgressTableData} from "../../models/progressTableData";
import {GET_MIND_AND_BODY_METRICS} from "../../graphql/queries";
import {ActivityMetrics, ProgressTableContainer} from "./shared/ProgressTableContainer";

const metricsMap = (metrics: Record<string, ActivityMetrics>): ProgressTableData => [
	{
		name: 'Running, sessions this week',
		data: { current: metrics.running.total_sessions, total: 6 },
	},
	{
		name: 'Weight Training, sessions this week',
		data: { current: metrics.weight_training.total_sessions, total: 4 },
	},
	{
		name: 'Meditation, hours this week',
		data: { current: metrics.meditation.total_hours, total: 14 },
	},
]

export const MindAndBody = () => ProgressTableContainer(GET_MIND_AND_BODY_METRICS, metricsMap)
