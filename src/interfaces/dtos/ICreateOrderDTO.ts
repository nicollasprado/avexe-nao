import { TPaymentType } from "@/types/TPaymentType";

export default interface ICreateOrderDTO {
  method: TPaymentType;
  userId: string;
  addressId: string;
  products: {
    id: string;
    quantity: number;
  }[];
  description?: string;
}
