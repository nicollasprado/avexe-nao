import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Category } from "~/prisma/generated/prisma";

const getAllCategories = async (): Promise<Category[]> => {
  const req = await axios.get<Category[]>("/api/category");

  return req.data;
};

export const useGetAllCategories = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["allCategories"],
    queryFn: getAllCategories,
    retry: 3,
  });

  return {
    categoriesIsPending: isPending,
    categoriesError: error,
    categories: data,
  };
};
