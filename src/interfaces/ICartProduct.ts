import { Product } from "~/prisma/generated/prisma";

export default interface ICartProduct {
  product: Product;
  quantity: number;
  toppings: {
    id: string;
    name: string;
  }[];
  price: number;
}
