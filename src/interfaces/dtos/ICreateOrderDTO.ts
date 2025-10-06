import { TPaymentType } from "@/types/TPaymentType";

export default interface ICreateOrderDTO {
  method: TPaymentType;
  userId: string;
  products: {
    id: string;
    quantity: number;
  }[];
  description?: string;
}
