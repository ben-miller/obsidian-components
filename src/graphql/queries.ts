import { gql } from '@apollo/client';

export const GET_INBOX_COUNTS = gql`
    query GetInboxCounts {
        sources {
            obsidian {
                inboxes
                inbox_items
            }
            trello {
                inbox_size
            }
            youtube {
                liked_videos
            }
            tidal {
                uncategorized_tracks
            }
            org_mode {
                inboxes
                inbox_items
            }
            firefox {
                bookmarks
            }
        }
    }
`;
