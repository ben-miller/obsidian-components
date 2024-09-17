import { gql } from '@apollo/client';

export const GET_INBOX_COUNTS = gql`
    query GetInboxCounts($forceRefresh: Boolean!) {
        sources {
            obsidian(forceRefresh: $forceRefresh) {
                inboxes
                inbox_items
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
                inboxes
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
			}
		}
	}
`
