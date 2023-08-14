import * as React from "react";
import { QueryClient, useQuery } from "react-query";
import APIService from "../apiService/apiService";
import APIContext from "../apiService/apiContext";
import { IFiltersContext } from "../context/filters";

export const useWooRequests = (queryClient: QueryClient) => {
  const API: APIService | null = React.useContext(APIContext);

  const getAll = (filters: IFiltersContext) =>
    useQuery<any, Error>(["wooRequests", filters], () => API?.wooRequests.getAll(filters), {
      onError: (error) => {
        console.warn(error.message);
      },
    });

  const getOne = (requestId: string) =>
    useQuery<any, Error>(["wooRequests", requestId], () => API?.wooRequests.getOne(requestId), {
      initialData: () =>
        queryClient.getQueryData<any[]>("wooRequests")?.find((_wooRequests) => _wooRequests.id === requestId),
      onError: (error) => {
        throw new Error(error.message);
      },
      enabled: !!requestId,
    });

  return { getAll, getOne };
};
