import { useCallback } from "react";
import useFetch from "../use-fetch";
import { API_URL } from "../config";
import wrapperFetchJsonResponse from "../wrapper-fetch-json-response";
import { InfinityPaginationType } from "../types/infinity-pagination";
import { RequestConfigType } from "./types/request-config";
import { Generic as Entity } from "../types/generic";

export type GetGenericsListRequest = {
  page: number;
  limit: number;
};

export type GetGenericsListResponse = InfinityPaginationType<Entity>;

export function useGetGenericsListService() {
  const fetch = useFetch();

  return useCallback(
    (data: GetGenericsListRequest, requestConfig?: RequestConfigType) => {
      const requestUrl = new URL(`${API_URL}/v1/generics`);
      requestUrl.searchParams.append("page", data.page.toString());
      requestUrl.searchParams.append("limit", data.limit.toString());

      return fetch(requestUrl, {
        method: "GET",
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<GetGenericsListResponse>);
    },
    [fetch]
  );
}

export type GetGenericRequest = {
  id: Entity["id"];
};

export type GetGenericResponse = Entity;

export function useGetGenericService() {
  const fetch = useFetch();

  return useCallback(
    (data: GetGenericRequest, requestConfig?: RequestConfigType) => {
      return fetch(`${API_URL}/v1/generics/${data.id}`, {
        method: "GET",
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<GetGenericResponse>);
    },
    [fetch]
  );
}

export type CreateGenericRequest = Omit<
  Entity,
  "id" | "createdAt" | "updatedAt"
>;

export type CreateGenericResponse = Entity;

export function useCreateGenericService() {
  const fetch = useFetch();

  return useCallback(
    (data: CreateGenericRequest, requestConfig?: RequestConfigType) => {
      return fetch(`${API_URL}/v1/generics`, {
        method: "POST",
        body: JSON.stringify(data),
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<CreateGenericResponse>);
    },
    [fetch]
  );
}

export type EditGenericRequest = {
  id: Entity["id"];
  data: Partial<Omit<Entity, "id" | "createdAt" | "updatedAt">>;
};

export type EditGenericResponse = Entity;

export function useEditGenericService() {
  const fetch = useFetch();

  return useCallback(
    (data: EditGenericRequest, requestConfig?: RequestConfigType) => {
      return fetch(`${API_URL}/v1/generics/${data.id}`, {
        method: "PATCH",
        body: JSON.stringify(data.data),
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<EditGenericResponse>);
    },
    [fetch]
  );
}

export type DeleteGenericRequest = {
  id: Entity["id"];
};

export type DeleteGenericResponse = undefined;

export function useDeleteGenericService() {
  const fetch = useFetch();

  return useCallback(
    (data: DeleteGenericRequest, requestConfig?: RequestConfigType) => {
      return fetch(`${API_URL}/v1/generics/${data.id}`, {
        method: "DELETE",
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<DeleteGenericResponse>);
    },
    [fetch]
  );
}
