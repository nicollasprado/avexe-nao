import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Product } from "~/prisma/generated/prisma";

const getProductById = async (id: number): Promise<Product> => {
  const req = await axios.get<Product>(`/api/product/${id}`);

  return req.data;
};

export const useGetProductById = (id: number) => {
  const query = useQuery({
    queryKey: ["product", "byId", id],
    queryFn: () => getProductById(id),
    retry: 3,
  });

  return {
    productData: query.data,
  };
};
