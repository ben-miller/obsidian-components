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
				running_total_sessions
				weight_training_total_sessions
				meditation_total_hours
			}
		}
	}
`
