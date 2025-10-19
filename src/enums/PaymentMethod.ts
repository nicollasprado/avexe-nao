import { TPaymentMethod } from "@/types/TPaymentMethod";

export const PAYMENT_METHOD: Record<"CARD" | "MONEY", TPaymentMethod> = {
  CARD: "CARD",
  MONEY: "MONEY",
};
