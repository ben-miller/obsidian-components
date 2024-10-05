import { gql } from '@apollo/client';

export const GET_INBOX_COUNTS = gql`
	query GetInboxCounts($forceRefresh: Boolean!) {
		sources {
			obsidian(force_refresh: $forceRefresh) {
				inbox_total_items
				life_inbox_dir
				journal_inbox_dir
				administrivia_inbox_dir
				desktop_inbox_dir
				library_inbox_dir
			}
			trello(force_refresh: $forceRefresh) {
				inbox_size
				shopping_inbox_size
			}
			youtube(force_refresh: $forceRefresh) {
				liked_videos
			}
			tidal(force_refresh: $forceRefresh) {
				uncategorized_tracks
			}
			org_mode(force_refresh: $forceRefresh) {
				inbox_items
			}
			firefox(force_refresh: $forceRefresh) {
				bookmarks
			}
		}
	}
`;

export const GET_MIND_AND_BODY_METRICS = gql`
	query GetInboxCounts($forceRefresh: Boolean!) {
		sources {
			calendar(force_refresh: $forceRefresh) {
				running { total_sessions }
				weight_training { total_sessions }
				meditation { total_hours }
			}
		}
	}
`

export const GET_JOB_SEARCH_METRICS = gql`
	query GetInboxCounts($forceRefresh: Boolean!) {
		sources {
			calendar(force_refresh: $forceRefresh) {
				dev { total_hours }
				job_search{ total_sessions }
				leet_code { total_sessions }
			}
		}
	}
`

export const GET_ORG_MODE_TODO = gql`
	query GetInboxCounts($forceRefresh: Boolean!) {
		sources {
			org_mode(force_refresh: $forceRefresh) {
				project_tasks {
					label
					state
				}
			}
		}
	}
`

export const SUBSCRIBE_ORG_MODE_TODO = gql`
	subscription GetOrgModeTodo {
		org_mode {
			project_tasks {
				label
				state
			}
		}
	}
`
