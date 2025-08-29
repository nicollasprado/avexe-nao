import { useCart } from "@/contexts/CartContext";
import { formatPrice } from "@/utils/formatPrice";

export default function MenuFooter() {
  const { totalPrice, productsQuantity, toggleCart } = useCart();

  const getProductsQuantityText = () => {
    if (productsQuantity === 1) {
      return `${productsQuantity} item`;
    }
    return `${productsQuantity} itens`;
  };

  return (
    <footer className="bg-mygray-100 w-full h-[10dvh] rounded-t-2xl flex items-center">
      <div className="w-full flex justify-around items-center">
        <div className="flex gap-2 items-end">
          <h4 className="text-mygray-400 font-bold text-xl">
            R$ {formatPrice(totalPrice)}/
          </h4>
          <p className="text-mygray-300 font-semibold">
            {getProductsQuantityText()}
          </p>
        </div>

        <button
          type="button"
          className="px-6 py-3 bg-mypurple rounded-3xl text-white font-semibold shadow-2xl drop-shadow-2xl cursor-pointer"
          onClick={toggleCart}
        >
          Ver sacola
        </button>
      </div>
    </footer>
  );
}
