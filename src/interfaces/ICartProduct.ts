import { Product } from "~/prisma/generated/prisma";

export default interface ICartProduct {
  id: string;
  product: Product;
  quantity: number;
  toppings: {
    id: string;
    name: string;
  }[];
  price: number;
}
