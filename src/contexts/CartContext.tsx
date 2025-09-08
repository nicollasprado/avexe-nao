"use client";

import ICartProduct from "@/interfaces/ICartProduct";
import { createContext, ReactNode, useContext, useState } from "react";

interface ICart {
  products: ICartProduct[];
  productsQuantity: number;
  totalPrice: number;
  isOpen: boolean;
  toggleCart: () => void;
  addProduct: (product: ICartProduct) => void;
  removeProduct: (cartProduct: ICartProduct) => void;
  increaseProductQuantity: (productId: number) => void;
  decreaseProductQuantity: (productId: number) => void;
}

const CartContext = createContext<ICart>({
  products: [],
  productsQuantity: 0,
  totalPrice: 0,
  isOpen: false,
  toggleCart: () => {},
  addProduct: () => {},
  removeProduct: () => {},
  increaseProductQuantity: () => {},
  decreaseProductQuantity: () => {},
});

interface ICartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: ICartProviderProps) => {
  const [products, setProducts] = useState<ICartProduct[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [productsQuantity, setProductsQuantity] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleCart = (): void => {
    setIsOpen((prev) => !prev);
  };

  const getUniqueIdForCartProduct = (cartProduct: ICartProduct): number => {
    return (
      cartProduct.product.id +
      cartProduct.toppings.reduce((prev, curr) => prev + curr.id, 0)
    );
  };

  const addProduct = (cartProduct: ICartProduct): void => {
    setProducts((prev) => {
      const productAlreadyInCart = prev.find(
        (p) =>
          getUniqueIdForCartProduct(p) ===
          getUniqueIdForCartProduct(cartProduct)
      );

      if (productAlreadyInCart) {
        const updatedProduct = {
          ...productAlreadyInCart,
          quantity: productAlreadyInCart.quantity + cartProduct.quantity,
        };

        const cartWithoutProduct = prev.filter(
          (p) =>
            getUniqueIdForCartProduct(p) !==
            getUniqueIdForCartProduct(cartProduct)
        );

        return [...cartWithoutProduct, updatedProduct];
      }

      return [...prev, cartProduct];
    });

    const newTotalPrice =
      totalPrice + cartProduct.product.price * cartProduct.quantity;
    const newProductsQuantity = productsQuantity + cartProduct.quantity;

    setTotalPrice(newTotalPrice);
    setProductsQuantity(newProductsQuantity);
  };

  const removeProduct = (cartProduct: ICartProduct): void => {
    setProducts((prev) => {
      const foundProduct = prev.find(
        (p) =>
          getUniqueIdForCartProduct(p) ===
          getUniqueIdForCartProduct(cartProduct)
      );

      if (foundProduct) {
        const newTotalPrice =
          totalPrice - foundProduct.product.price * foundProduct.quantity;
        const newProductsQuantity = productsQuantity - foundProduct.quantity;

        setTotalPrice(newTotalPrice >= 0 ? newTotalPrice : 0);
        setProductsQuantity(newProductsQuantity);

        return prev.filter(
          (p) =>
            getUniqueIdForCartProduct(p) !==
            getUniqueIdForCartProduct(foundProduct)
        );
      }

      return prev;
    });
  };

  const increaseProductQuantity = (productId: number): void => {
    setProducts((prev) => {
      const requestedProduct = products.find((p) => p.product.id === productId);
      const prevWithoutRequested = products.filter(
        (p) => p.product.id !== productId
      );

      if (requestedProduct) {
        setTotalPrice((prev) => prev + requestedProduct.product.price);
        setProductsQuantity((prev) => prev + 1);

        return [
          ...prevWithoutRequested,
          { ...requestedProduct, quantity: requestedProduct.quantity + 1 },
        ];
      }

      return prev;
    });
  };
  const decreaseProductQuantity = (productId: number): void => {
    setProducts((prev) => {
      const requestedProduct = products.find((p) => p.product.id === productId);
      const prevWithoutRequested = products.filter(
        (p) => p.product.id !== productId
      );

      if (requestedProduct) {
        setTotalPrice((prev) => prev - requestedProduct.product.price);
        setProductsQuantity((prev) => prev - 1);

        return [
          ...prevWithoutRequested,
          { ...requestedProduct, quantity: requestedProduct.quantity - 1 },
        ];
      }

      return prev;
    });
  };

  return (
    <CartContext.Provider
      value={{
        products,
        productsQuantity,
        totalPrice,
        isOpen,
        toggleCart,
        addProduct,
        removeProduct,
        increaseProductQuantity,
        decreaseProductQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  return context;
};
