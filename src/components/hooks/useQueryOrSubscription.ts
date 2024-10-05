import {DocumentNode, OperationVariables, useQuery, useSubscription} from '@apollo/client';
import {useReloading} from "./useReloading";

export const useQueryOrSubscription = <TData = any, TVariables = OperationVariables>(
	queryString: DocumentNode,
	subscriptionString: DocumentNode,
	variables?: { variables: { forceRefresh: boolean } },
	subscription = false,
) => {
	if (subscription) {
		const { loading, error, data } = useSubscription(subscriptionString)
		return { loading, error, data, reload: () => {} };
	} else {
		const queryResult = useQuery(queryString, variables);
		const { loading, error, data } = queryResult;
		const { reloading, reload } = useReloading(queryResult);
		return { loading, error, data: data.sources, reload }
	}
};
