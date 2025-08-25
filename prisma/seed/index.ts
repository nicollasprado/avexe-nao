import { storeSeed } from "./store.seed";
import { categorySeed } from "./category.seed";
import { usersSeed } from "./users.seed";
import { productSeed } from "./product.seed";
import { toppingSeed } from "./topping.seed";
import { orderSeed } from "./order.seed";

export async function execute() {
  await storeSeed();
  await categorySeed();
  await toppingSeed();
  await productSeed();
  await usersSeed();
  await orderSeed();
}

execute();
