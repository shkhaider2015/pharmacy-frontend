import { useCallback } from "react";
import useFetch from "../use-fetch";
import { API_URL } from "../config";
import wrapperFetchJsonResponse from "../wrapper-fetch-json-response";
import { InfinityPaginationType } from "../types/infinity-pagination";
import { RequestConfigType } from "./types/request-config";
import { Supplier as Entity } from "../types/supplier";

export type GetSuppliersListRequest = {
  page: number;
  limit: number;
};

export type GetSuppliersListResponse = InfinityPaginationType<Entity>;

export function useGetSuppliersListService() {
  const fetch = useFetch();

  return useCallback(
    (data: GetSuppliersListRequest, requestConfig?: RequestConfigType) => {
      const requestUrl = new URL(`${API_URL}/v1/suppliers`);
      requestUrl.searchParams.append("page", data.page.toString());
      requestUrl.searchParams.append("limit", data.limit.toString());

      return fetch(requestUrl, {
        method: "GET",
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<GetSuppliersListResponse>);
    },
    [fetch]
  );
}

export type GetSupplierRequest = {
  id: Entity["id"];
};

export type GetSupplierResponse = Entity;

export function useGetSupplierService() {
  const fetch = useFetch();

  return useCallback(
    (data: GetSupplierRequest, requestConfig?: RequestConfigType) => {
      return fetch(`${API_URL}/v1/suppliers/${data.id}`, {
        method: "GET",
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<GetSupplierResponse>);
    },
    [fetch]
  );
}

export type CreateSupplierRequest = Omit<
  Entity,
  "id" | "createdAt" | "updatedAt"
>;

export type CreateSupplierResponse = Entity;

export function useCreateSupplierService() {
  const fetch = useFetch();

  return useCallback(
    (data: CreateSupplierRequest, requestConfig?: RequestConfigType) => {
      return fetch(`${API_URL}/v1/suppliers`, {
        method: "POST",
        body: JSON.stringify(data),
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<CreateSupplierResponse>);
    },
    [fetch]
  );
}

export type EditSupplierRequest = {
  id: Entity["id"];
  data: Partial<Omit<Entity, "id" | "createdAt" | "updatedAt">>;
};

export type EditSupplierResponse = Entity;

export function useEditSupplierService() {
  const fetch = useFetch();

  return useCallback(
    (data: EditSupplierRequest, requestConfig?: RequestConfigType) => {
      return fetch(`${API_URL}/v1/suppliers/${data.id}`, {
        method: "PATCH",
        body: JSON.stringify(data.data),
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<EditSupplierResponse>);
    },
    [fetch]
  );
}

export type DeleteSupplierRequest = {
  id: Entity["id"];
};

export type DeleteSupplierResponse = undefined;

export function useDeleteSupplierService() {
  const fetch = useFetch();

  return useCallback(
    (data: DeleteSupplierRequest, requestConfig?: RequestConfigType) => {
      return fetch(`${API_URL}/v1/suppliers/${data.id}`, {
        method: "DELETE",
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<DeleteSupplierResponse>);
    },
    [fetch]
  );
}
