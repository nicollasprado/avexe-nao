import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Store } from "~/prisma/generated/prisma";

const getStoreData = async (): Promise<Store> => {
  const req = await axios.get<Store>("/api/store");

  return req.data;
};

export const useStoreData = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["storeData"],
    queryFn: getStoreData,
    retry: 3,
  });

  return {
    storeIsPending: isPending,
    storeError: error,
    store: data,
  };
};
