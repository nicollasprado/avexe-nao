export const formatPrice = (price: number): string => {
  if (price === 0) {
    return "0,0";
  }

  const priceStr = price.toString();
  const cents = priceStr.substring(priceStr.length - 2, priceStr.length);
  const rest = priceStr.substring(0, priceStr.length - 2);

  return `${rest},${cents}`;
};
