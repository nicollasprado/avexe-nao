"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCart } from "@/contexts/CartContext";
import { formatPrice } from "@/utils/formatPrice";

export function ConfirmRemoveProductModal() {
  const {
    totalPrice,
    isConfirmRemoveModalOpen,
    cartProductToRemove,
    setCartProductToRemove,
    removeProduct,
  } = useCart();

  if (!cartProductToRemove) return null;

  const handleClose = () => {
    setCartProductToRemove(null);
  };

  return (
    <Dialog open={isConfirmRemoveModalOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-left">
            Confirmar remoção do produto:
          </DialogTitle>
          <DialogDescription>
            <div className="flex flex-col gap-4 text-left">
              <div>
                <p>
                  {cartProductToRemove.product.name} com{" "}
                  {cartProductToRemove.toppings.map((topping, index) => (
                    <span key={topping.id}>
                      {topping.name}
                      {index < cartProductToRemove.toppings.length - 1
                        ? ", "
                        : "."}
                    </span>
                  ))}
                </p>
              </div>

              <div>
                <p>
                  Valor do produto: R${" "}
                  {formatPrice(cartProductToRemove.product.price)}
                </p>
                <p>
                  Valor total antes da remoção: R$ {formatPrice(totalPrice)}
                </p>
                <p className="font-semibold">
                  Valor total após remoção: R${" "}
                  {formatPrice(
                    totalPrice -
                      cartProductToRemove.product.price *
                        cartProductToRemove.quantity
                  )}
                </p>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>

        <button
          type="button"
          className="bg-green-400 rounded-md p-2 text-white font-semibold cursor-pointer"
          onClick={() => removeProduct(cartProductToRemove)}
        >
          Confirmar
        </button>
      </DialogContent>
    </Dialog>
  );
}
