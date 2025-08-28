import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Product } from "~/prisma/generated/prisma";

const getAllProductsByCategory = async (
  categoryId: number
): Promise<Product[]> => {
  const req = await axios.get(`/api/category/${categoryId}/products`);

  return req.data;
};

export const useGetAllProductsByCategory = (categoryId: number) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["category", categoryId, "products"],
    queryFn: () => getAllProductsByCategory(categoryId),
    retry: 3,
    enabled: !!categoryId,
  });

  return {
    productsData: data,
    productsError: error,
    productsIsLoading: isLoading,
  };
};
