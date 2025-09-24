"use client";

import ICartProduct from "@/interfaces/ICartProduct";
import { joinUUIDs } from "@/utils/joinUUIDs";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Product } from "~/prisma/generated/prisma";

interface ICart {
  products: ICartProduct[];
  productsQuantity: number;
  totalPrice: number;
  isOpen: boolean;
  isConfirmRemoveModalOpen: boolean;
  setIsConfirmRemoveModalOpen: (open: boolean) => void;
  cartProductToRemove: ICartProduct | null;
  setCartProductToRemove: (product: ICartProduct | null) => void;
  toggleCart: () => void;
  addProduct: (
    product: Product,
    toppings: {
      id: string;
      name: string;
    }[],
    quantity: number,
    price: number
  ) => void;
  removeProduct: (cartProduct: ICartProduct) => void;
  increaseProductQuantity: (cartProduct: ICartProduct) => void;
  decreaseProductQuantity: (cartProduct: ICartProduct) => void;
}

const CartContext = createContext<ICart>({
  products: [],
  productsQuantity: 0,
  totalPrice: 0,
  isOpen: false,
  setIsConfirmRemoveModalOpen: () => {},
  isConfirmRemoveModalOpen: false,
  setCartProductToRemove: () => {},
  cartProductToRemove: null,
  toggleCart: () => {},
  addProduct: () => {},
  removeProduct: () => {},
  increaseProductQuantity: () => {},
  decreaseProductQuantity: () => false,
});

interface ICartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: ICartProviderProps) => {
  const [products, setProducts] = useState<ICartProduct[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [productsQuantity, setProductsQuantity] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [cartProductToRemove, setCartProductToRemove] =
    useState<ICartProduct | null>(null);
  const [isConfirmRemoveModalOpen, setIsConfirmRemoveModalOpen] =
    useState<boolean>(false);

  useEffect(() => {
    setIsConfirmRemoveModalOpen(!!cartProductToRemove);
  }, [cartProductToRemove]);

  const generateCartProductId = (
    product: Product,
    toppings: {
      id: string;
      name: string;
    }[]
  ): string => {
    const uuids: string[] = [];
    uuids.push(product.id);
    toppings.forEach((topping) => uuids.push(topping.id));
    return joinUUIDs(uuids);
  };

  const toggleCart = (): void => {
    setIsOpen((prev) => !prev);
  };

  const addProduct = (
    product: Product,
    toppings: {
      id: string;
      name: string;
    }[],
    quantity: number,
    price: number
  ): void => {
    const newCartProductId = generateCartProductId(product, toppings);
    const productAlreadyInCart = products.find(
      (p) => p.id === newCartProductId
    );

    const cartProduct: ICartProduct = {
      id: newCartProductId,
      product,
      quantity,
      toppings,
      price,
    };

    if (productAlreadyInCart) {
      increaseProductQuantity(cartProduct);
      return;
    }

    setProducts((prev) => {
      return [...prev, cartProduct];
    });

    const newTotalPrice =
      totalPrice + cartProduct.product.price * cartProduct.quantity;
    const newProductsQuantity = productsQuantity + cartProduct.quantity;

    setTotalPrice(newTotalPrice);
    setProductsQuantity(newProductsQuantity);
  };

  const removeProduct = (cartProduct: ICartProduct): void => {
    const foundProduct = products.find((p) => p.id === cartProduct.id);
    if (!foundProduct) return;

    setProducts((prev) => {
      const newTotalPrice =
        totalPrice - foundProduct.product.price * foundProduct.quantity;
      const newProductsQuantity = productsQuantity - foundProduct.quantity;

      setTotalPrice(newTotalPrice >= 0 ? newTotalPrice : 0);
      setProductsQuantity(newProductsQuantity >= 0 ? newProductsQuantity : 0);

      return prev.filter((p) => p.id !== foundProduct.id);
    });

    setCartProductToRemove(null);
    setIsConfirmRemoveModalOpen(false);
  };

  const increaseProductQuantity = (cartProduct: ICartProduct): void => {
    const requestedProduct = products.find((p) => p.id === cartProduct.id);
    if (!requestedProduct) return;

    setProducts((prev) => {
      setTotalPrice(
        totalPrice + requestedProduct.product.price * cartProduct.quantity
      );
      setProductsQuantity(productsQuantity + cartProduct.quantity);

      return prev.map((p) =>
        p.id === cartProduct.id
          ? { ...p, quantity: p.quantity + cartProduct.quantity }
          : p
      );
    });
  };

  const decreaseProductQuantity = (cartProduct: ICartProduct): void => {
    const requestedProduct = products.find((p) => p.id === cartProduct.id);
    if (!requestedProduct) return;

    if (requestedProduct && requestedProduct.quantity === 1) {
      setCartProductToRemove(cartProduct);
      setIsConfirmRemoveModalOpen(true);
      return;
    }

    setProducts((prev) => {
      setTotalPrice(totalPrice - requestedProduct.product.price);
      setProductsQuantity(productsQuantity - 1);

      return prev.map((p) =>
        p.id === cartProduct.id ? { ...p, quantity: p.quantity - 1 } : p
      );
    });
  };

  return (
    <CartContext.Provider
      value={{
        products,
        productsQuantity,
        totalPrice,
        isOpen,
        isConfirmRemoveModalOpen,
        setIsConfirmRemoveModalOpen,
        cartProductToRemove,
        setCartProductToRemove,
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
