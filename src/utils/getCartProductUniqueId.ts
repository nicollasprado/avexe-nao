import ICartProduct from "@/interfaces/ICartProduct";

export const getCartProductUniqueId = (cartProduct: ICartProduct): string => {
  const getToppingsId = (): string => {
    let toppingId: string = "";

    cartProduct.toppings.forEach((topping) => {
      toppingId += topping.id;
    });

    return toppingId;
  };

  return cartProduct.product.id + getToppingsId();
};
