import ICartProduct from "@/interfaces/ICartProduct";

export const getCartProductUniqueId = (cartProduct: ICartProduct): number => {
  return (
    cartProduct.product.id +
    cartProduct.toppings.reduce((prev, curr) => prev + curr.id, 0)
  );
};
