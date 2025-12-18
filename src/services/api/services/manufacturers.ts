import { useCallback } from "react";
import useFetch from "../use-fetch";
import { API_URL } from "../config";
import wrapperFetchJsonResponse from "../wrapper-fetch-json-response";
import { InfinityPaginationType } from "../types/infinity-pagination";
import { RequestConfigType } from "./types/request-config";
import { Manufacturer as Entity } from "../types/manufacturer";

export type GetManufacturersListRequest = {
  page: number;
  limit: number;
};

export type GetManufacturersListResponse = InfinityPaginationType<Entity>;

export function useGetManufacturersListService() {
  const fetch = useFetch();

  return useCallback(
    (data: GetManufacturersListRequest, requestConfig?: RequestConfigType) => {
      const requestUrl = new URL(`${API_URL}/v1/manufacturers`);
      requestUrl.searchParams.append("page", data.page.toString());
      requestUrl.searchParams.append("limit", data.limit.toString());

      return fetch(requestUrl, {
        method: "GET",
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<GetManufacturersListResponse>);
    },
    [fetch]
  );
}

export type GetManufacturerRequest = {
  id: Entity["id"];
};

export type GetManufacturerResponse = Entity;

export function useGetManufacturerService() {
  const fetch = useFetch();

  return useCallback(
    (data: GetManufacturerRequest, requestConfig?: RequestConfigType) => {
      return fetch(`${API_URL}/v1/manufacturers/${data.id}`, {
        method: "GET",
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<GetManufacturerResponse>);
    },
    [fetch]
  );
}

export type CreateManufacturerRequest = Omit<
  Entity,
  "id" | "createdAt" | "updatedAt"
>;

export type CreateManufacturerResponse = Entity;

export function useCreateManufacturerService() {
  const fetch = useFetch();

  return useCallback(
    (data: CreateManufacturerRequest, requestConfig?: RequestConfigType) => {
      return fetch(`${API_URL}/v1/manufacturers`, {
        method: "POST",
        body: JSON.stringify(data),
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<CreateManufacturerResponse>);
    },
    [fetch]
  );
}

export type EditManufacturerRequest = {
  id: Entity["id"];
  data: Partial<Omit<Entity, "id" | "createdAt" | "updatedAt">>;
};

export type EditManufacturerResponse = Entity;

export function useEditManufacturerService() {
  const fetch = useFetch();

  return useCallback(
    (data: EditManufacturerRequest, requestConfig?: RequestConfigType) => {
      return fetch(`${API_URL}/v1/manufacturers/${data.id}`, {
        method: "PATCH",
        body: JSON.stringify(data.data),
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<EditManufacturerResponse>);
    },
    [fetch]
  );
}

export type DeleteManufacturerRequest = {
  id: Entity["id"];
};

export type DeleteManufacturerResponse = undefined;

export function useDeleteManufacturerService() {
  const fetch = useFetch();

  return useCallback(
    (data: DeleteManufacturerRequest, requestConfig?: RequestConfigType) => {
      return fetch(`${API_URL}/v1/manufacturers/${data.id}`, {
        method: "DELETE",
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<DeleteManufacturerResponse>);
    },
    [fetch]
  );
}
