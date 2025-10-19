import { TPaymentMethod } from "@/types/TPaymentMethod";

export default interface ICreateOrderDTO {
  method: TPaymentMethod;
  userId: string;
  addressId: string;
  products: {
    id: string;
    quantity: number;
  }[];
  description?: string;
}
