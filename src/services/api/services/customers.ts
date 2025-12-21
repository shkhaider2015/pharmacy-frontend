import { useCallback } from "react";
import useFetch from "../use-fetch";
import { API_URL } from "../config";
import wrapperFetchJsonResponse from "../wrapper-fetch-json-response";
import { InfinityPaginationType } from "../types/infinity-pagination";
import { RequestConfigType } from "./types/request-config";
import { Customer as Entity } from "../types/customer";

export type GetCustomersListRequest = {
  page: number;
  limit: number;
};

export type GetCustomersListResponse = InfinityPaginationType<Entity>;

export function useGetCustomersListService() {
  const fetch = useFetch();

  return useCallback(
    (data: GetCustomersListRequest, requestConfig?: RequestConfigType) => {
      const requestUrl = new URL(`${API_URL}/v1/customers`);
      requestUrl.searchParams.append("page", data.page.toString());
      requestUrl.searchParams.append("limit", data.limit.toString());

      return fetch(requestUrl, {
        method: "GET",
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<GetCustomersListResponse>);
    },
    [fetch]
  );
}

export type GetCustomerRequest = {
  id: Entity["id"];
};

export type GetCustomerResponse = Entity;

export function useGetCustomerService() {
  const fetch = useFetch();

  return useCallback(
    (data: GetCustomerRequest, requestConfig?: RequestConfigType) => {
      return fetch(`${API_URL}/v1/customers/${data.id}`, {
        method: "GET",
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<GetCustomerResponse>);
    },
    [fetch]
  );
}

export type CreateCustomerRequest = Omit<
  Entity,
  "id" | "createdAt" | "updatedAt"
>;

export type CreateCustomerResponse = Entity;

export function useCreateCustomerService() {
  const fetch = useFetch();

  return useCallback(
    (data: CreateCustomerRequest, requestConfig?: RequestConfigType) => {
      return fetch(`${API_URL}/v1/customers`, {
        method: "POST",
        body: JSON.stringify(data),
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<CreateCustomerResponse>);
    },
    [fetch]
  );
}

export type EditCustomerRequest = {
  id: Entity["id"];
  data: Partial<Omit<Entity, "id" | "createdAt" | "updatedAt">>;
};

export type EditCustomerResponse = Entity;

export function useEditCustomerService() {
  const fetch = useFetch();

  return useCallback(
    (data: EditCustomerRequest, requestConfig?: RequestConfigType) => {
      return fetch(`${API_URL}/v1/customers/${data.id}`, {
        method: "PATCH",
        body: JSON.stringify(data.data),
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<EditCustomerResponse>);
    },
    [fetch]
  );
}

export type DeleteCustomerRequest = {
  id: Entity["id"];
};

export type DeleteCustomerResponse = undefined;

export function useDeleteCustomerService() {
  const fetch = useFetch();

  return useCallback(
    (data: DeleteCustomerRequest, requestConfig?: RequestConfigType) => {
      return fetch(`${API_URL}/v1/customers/${data.id}`, {
        method: "DELETE",
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<DeleteCustomerResponse>);
    },
    [fetch]
  );
}
