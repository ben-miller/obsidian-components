import { gql } from '@apollo/client';

export const GET_INBOX_COUNTS = gql`
    query GetInboxCounts($forceRefresh: Boolean!) {
        sources {
            obsidian(forceRefresh: $forceRefresh) {
                inbox_total_items
				life_inbox_dir
				journal_inbox_dir
				administrivia_inbox_dir
				desktop_inbox_dir
				library_inbox_dir
            }
            trello(forceRefresh: $forceRefresh) {
                inbox_size
            }
            youtube(forceRefresh: $forceRefresh) {
                liked_videos
            }
            tidal(forceRefresh: $forceRefresh) {
                uncategorized_tracks
            }
            org_mode(forceRefresh: $forceRefresh) {
                inbox_items
            }
            firefox(forceRefresh: $forceRefresh) {
                bookmarks
            }
        }
    }
`;

export const GET_MIND_AND_BODY_METRICS = gql`
	query GetInboxCounts($forceRefresh: Boolean!) {
		sources {
			calendar(forceRefresh: $forceRefresh) {
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
			calendar(forceRefresh: $forceRefresh) {
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
			org_mode(forceRefresh: $forceRefresh) {
				project_tasks {
					label
					state
				}
			}
		}
	}
`
