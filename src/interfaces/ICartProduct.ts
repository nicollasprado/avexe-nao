import { Product } from "~/prisma/generated/prisma";

export default interface ICartProduct {
  product: Product;
  quantity: number;
  toppings: {
    id: number;
    name: string;
  }[];
  price: number;
}
