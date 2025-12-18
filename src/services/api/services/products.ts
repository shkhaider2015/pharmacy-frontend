import { useCallback } from "react";
import useFetch from "../use-fetch";
import { API_URL } from "../config";
import wrapperFetchJsonResponse from "../wrapper-fetch-json-response";
import { InfinityPaginationType } from "../types/infinity-pagination";
import { RequestConfigType } from "./types/request-config";
import { Product as Entity } from "../types/product";

export type GetProductsListRequest = {
  page: number;
  limit: number;
};

export type GetProductsListResponse = InfinityPaginationType<Entity>;

export function useGetProductsListService() {
  const fetch = useFetch();

  return useCallback(
    (data: GetProductsListRequest, requestConfig?: RequestConfigType) => {
      const requestUrl = new URL(`${API_URL}/v1/products`);
      requestUrl.searchParams.append("page", data.page.toString());
      requestUrl.searchParams.append("limit", data.limit.toString());

      return fetch(requestUrl, {
        method: "GET",
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<GetProductsListResponse>);
    },
    [fetch]
  );
}

export type GetProductRequest = {
  id: Entity["id"];
};

export type GetProductResponse = Entity;

export function useGetProductService() {
  const fetch = useFetch();

  return useCallback(
    (data: GetProductRequest, requestConfig?: RequestConfigType) => {
      return fetch(`${API_URL}/v1/products/${data.id}`, {
        method: "GET",
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<GetProductResponse>);
    },
    [fetch]
  );
}

export type CreateProductRequest = Omit<
  Entity,
  "id" | "createdAt" | "updatedAt"
>;

export type CreateProductResponse = Entity;

export function useCreateProductService() {
  const fetch = useFetch();

  return useCallback(
    (data: CreateProductRequest, requestConfig?: RequestConfigType) => {
      return fetch(`${API_URL}/v1/products`, {
        method: "POST",
        body: JSON.stringify(data),
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<CreateProductResponse>);
    },
    [fetch]
  );
}

export type EditProductRequest = {
  id: Entity["id"];
  data: Partial<Omit<Entity, "id" | "createdAt" | "updatedAt">>;
};

export type EditProductResponse = Entity;

export function useEditProductService() {
  const fetch = useFetch();

  return useCallback(
    (data: EditProductRequest, requestConfig?: RequestConfigType) => {
      return fetch(`${API_URL}/v1/products/${data.id}`, {
        method: "PATCH",
        body: JSON.stringify(data.data),
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<EditProductResponse>);
    },
    [fetch]
  );
}

export type DeleteProductRequest = {
  id: Entity["id"];
};

export type DeleteProductResponse = undefined;

export function useDeleteProductService() {
  const fetch = useFetch();

  return useCallback(
    (data: DeleteProductRequest, requestConfig?: RequestConfigType) => {
      return fetch(`${API_URL}/v1/products/${data.id}`, {
        method: "DELETE",
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<DeleteProductResponse>);
    },
    [fetch]
  );
}
