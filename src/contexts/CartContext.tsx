"use client";

import { createContext, ReactNode, useContext, useState } from "react";
import { Product } from "~/prisma/generated/prisma";

interface ICart {
  products: Product[];
  productsQuantity: number;
  totalPrice: number;
  isOpen: boolean;
  toggleCart: () => void;
  addProduct: (product: Product) => void;
  removeProduct: (productId: number) => void;
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
  const [products, setProducts] = useState<Product[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [productsQuantity, setProductsQuantity] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleCart = (): void => {
    setIsOpen((prev) => !prev);
  };
  
  const addProduct = (product: Product): void => {};
  const removeProduct = (productId: number): void => {};
  const increaseProductQuantity = (productId: number): void => {};
  const decreaseProductQuantity = (productId: number): void => {};

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
