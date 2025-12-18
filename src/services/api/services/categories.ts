import { useCallback } from "react";
import useFetch from "../use-fetch";
import { API_URL } from "../config";
import wrapperFetchJsonResponse from "../wrapper-fetch-json-response";
import { InfinityPaginationType } from "../types/infinity-pagination";
import { RequestConfigType } from "./types/request-config";
import { Category as Entity } from "../types/category";

export type GetCategoriesListRequest = {
  page: number;
  limit: number;
};

export type GetCategoriesListResponse = InfinityPaginationType<Entity>;

export function useGetCategoriesListService() {
  const fetch = useFetch();

  return useCallback(
    (data: GetCategoriesListRequest, requestConfig?: RequestConfigType) => {
      const requestUrl = new URL(`${API_URL}/v1/categories`);
      requestUrl.searchParams.append("page", data.page.toString());
      requestUrl.searchParams.append("limit", data.limit.toString());

      return fetch(requestUrl, {
        method: "GET",
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<GetCategoriesListResponse>);
    },
    [fetch]
  );
}

export type GetCategoryRequest = {
  id: Entity["id"];
};

export type GetCategoryResponse = Entity;

export function useGetCategoryService() {
  const fetch = useFetch();

  return useCallback(
    (data: GetCategoryRequest, requestConfig?: RequestConfigType) => {
      return fetch(`${API_URL}/v1/categories/${data.id}`, {
        method: "GET",
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<GetCategoryResponse>);
    },
    [fetch]
  );
}

export type CreateCategoryRequest = Omit<
  Entity,
  "id" | "createdAt" | "updatedAt"
>;

export type CreateCategoryResponse = Entity;

export function useCreateCategoryService() {
  const fetch = useFetch();

  return useCallback(
    (data: CreateCategoryRequest, requestConfig?: RequestConfigType) => {
      return fetch(`${API_URL}/v1/categories`, {
        method: "POST",
        body: JSON.stringify(data),
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<CreateCategoryResponse>);
    },
    [fetch]
  );
}

export type EditCategoryRequest = {
  id: Entity["id"];
  data: Partial<Omit<Entity, "id" | "createdAt" | "updatedAt">>;
};

export type EditCategoryResponse = Entity;

export function useEditCategoryService() {
  const fetch = useFetch();

  return useCallback(
    (data: EditCategoryRequest, requestConfig?: RequestConfigType) => {
      return fetch(`${API_URL}/v1/categories/${data.id}`, {
        method: "PATCH",
        body: JSON.stringify(data.data),
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<EditCategoryResponse>);
    },
    [fetch]
  );
}

export type DeleteCategoryRequest = {
  id: Entity["id"];
};

export type DeleteCategoryResponse = undefined;

export function useDeleteCategoryService() {
  const fetch = useFetch();

  return useCallback(
    (data: DeleteCategoryRequest, requestConfig?: RequestConfigType) => {
      return fetch(`${API_URL}/v1/categories/${data.id}`, {
        method: "DELETE",
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<DeleteCategoryResponse>);
    },
    [fetch]
  );
}
