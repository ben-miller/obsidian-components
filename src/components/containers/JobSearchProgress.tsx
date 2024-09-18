import {ProgressTableData} from "../../models/progressTableData";
import {GET_JOB_SEARCH_METRICS} from "../../graphql/queries";
import {ActivityMetrics, ProgressTableContainer} from "./shared/ProgressTableContainer";

const metricsMap = (metrics: Record<string, ActivityMetrics>): ProgressTableData => [
	{
		name: 'Job Search',
		children: [
			{ name: 'sessions this week', current: metrics.job_search.total_sessions, total: 5 },
		],
	},
	{
		name: 'LeetCode',
		children: [
			{ name: 'sessions this week', current: metrics.leet_code.total_sessions, total: 5 },
		],
	},
	{
		name: 'Dev Project',
		children: [
			{ name: 'hours this week', current: metrics.dev.total_hours, total: 30 },
		],
	},
]

export const JobSearchProgress = () => ProgressTableContainer(GET_JOB_SEARCH_METRICS, metricsMap)
