"use client";

import HTTP_CODES_ENUM from "@/services/api/types/http-codes";
import { createQueryKeys } from "@/services/react-query/query-key-factory";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
  GetManufacturerRequest,
  useGetManufacturerService,
  useGetManufacturersListService,
} from "@/services/api/services/manufacturers";

export const manufacturersQueryKeys = createQueryKeys(["manufacturers"], {
  list: () => ({
    key: [],
  }),
  byId: (id: string) => ({
    key: [id],
  }),
});

export const useGetManufacturersListQuery = () => {
  const fetch = useGetManufacturersListService();

  const query = useInfiniteQuery({
    queryKey: manufacturersQueryKeys.list().key,
    initialPageParam: 1,
    queryFn: async ({ pageParam, signal }) => {
      const { status, data } = await fetch(
        {
          page: pageParam,
          limit: 10,
        },
        {
          signal,
        }
      );

      if (status === HTTP_CODES_ENUM.OK) {
        return {
          data: data.data,
          nextPage: data.hasNextPage ? pageParam + 1 : undefined,
        };
      }
    },
    getNextPageParam: (lastPage) => {
      return lastPage?.nextPage;
    },
  });

  return query;
};

export const useGetManufacturerQuery = ({ id }: GetManufacturerRequest) => {
  const fetch = useGetManufacturerService();

  return useQuery({
    queryKey: manufacturersQueryKeys.byId(id).key,
    queryFn: async ({ signal }) => {
      const { status, data } = await fetch(
        {
          id,
        },
        {
          signal,
        }
      );

      if (status === HTTP_CODES_ENUM.OK) {
        return {
          data,
        };
      }
    },
  });
};
