import { useState } from 'react';
import { OperationVariables, QueryResult } from "@apollo/client";

export const useReloading = <TData = any, TVariables = OperationVariables>(
	queryResult: QueryResult<TData, TVariables>
) => {
	const [reloading, setReloading] = useState(false);

	const reload = (variables?: Partial<TVariables>) => {
		setReloading(true);
		queryResult
			.refetch(variables)
			.finally(() => setReloading(false));
	};

	return { reloading, reload };
};
