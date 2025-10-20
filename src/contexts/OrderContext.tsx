"use client";

import { PAYMENT_METHOD } from "@/enums/PaymentMethod";
import IAddressDTO from "@/interfaces/dtos/IAddressDTO";
import { apiService } from "@/services/ApiService";
import { TPaymentMethod } from "@/types/TPaymentMethod";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface IOrderContext {
  paymentMethod: TPaymentMethod;
  address: IAddressDTO;
  description: string;
  setAddress: (addressId: string) => void;
  setDescription: (description: string) => void;
  setPaymentMethod: (method: TPaymentMethod) => void;
}

const OrderContext = createContext<IOrderContext>({
  paymentMethod: PAYMENT_METHOD.CARD,
  address: {} as IAddressDTO,
  description: "",
  setAddress: () => {},
  setDescription: () => {},
  setPaymentMethod: () => {},
});

interface IOrderProviderProps {
  children: ReactNode;
}

export const OrderProvider = ({ children }: IOrderProviderProps) => {
  const [paymentMethod, setPaymentMethod] = useState(PAYMENT_METHOD.CARD);
  const [address, setAddress] = useState<IAddressDTO>({} as IAddressDTO);
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchAddresses = async () => {
      const res = await apiService.axios.get("/api/me/addresses", {
        withCredentials: true,
      });

      const addresses = res.data;

      if (addresses && addresses.length > 0) {
        setAddress(addresses[0]);
      }
    };

    fetchAddresses();
  }, []);

  const setSelectedAddress = async (addressId: string) => {
    const res = await apiService.axios.get(`/api/addresses/${addressId}`, {
      withCredentials: true,
    });
    setAddress(res.data);
  };

  return (
    <OrderContext.Provider
      value={{
        paymentMethod,
        address,
        description,
        setAddress: setSelectedAddress,
        setDescription,
        setPaymentMethod,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const data = useContext(OrderContext);
  return data;
};
