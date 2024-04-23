import { UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import useGetAll from "hooks/useGet";
import { get } from "lodash";
import { FC, ReactElement } from "react";
import { TMeta, TParams } from "services/types";

interface IContainer {
  children: (
    data: {
      items: object[];
      meta: TMeta;
    } & UseQueryResult
  ) => ReactElement<any, any> | null;
  name: string;
  url: string;
  dataKey?: string;
  onSuccess?: (data: object[] | [] | object) => void;
  onError?: (error: object | []) => void;
  queryOptions?: UseQueryOptions<any, Error>;
  params?: TParams | undefined;
}

const All: FC<IContainer> = ({
  children,
  name,
  url,
  onSuccess,
  onError,
  dataKey = "data",
  queryOptions,
  params,
}) => {
  const data = useGetAll({
    name,
    url,
    onSuccess,
    onError,
    queryOptions,
    params,
  });

  const newData: { items: object[] | []; meta: TMeta } = {
    items: get(data, `data.${dataKey}`, []),
    meta: {
      currentPage: get(data, "data.page", 1),
      pageCount: get(data, "data.last_page", 1),
      perPage: get(data, "data.per_page", 1),
      totalCount: get(data, "data.all_data", 1),
    },
  };
  return children({
    items: newData.items,
    meta: newData.meta,
    ...data,
  });
};

export default All;
