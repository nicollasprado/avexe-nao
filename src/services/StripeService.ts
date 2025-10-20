import StripeProductAlreadyExistsError from "@/errors/StripeProductAlreadyExistsError";
import IStripeProductDTO from "@/interfaces/dtos/IStripeProductDTO";
import Stripe from "stripe";

class StripeService {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  }

  public async getProductByName(
    name: string
  ): Promise<IStripeProductDTO | null> {
    const stripeProductsList = await this.stripe.products.list();

    const product = stripeProductsList.data.find(
      (product) => product.name === name
    );

    if (!product) return null;

    return {
      id: product.id,
      name: product.name,
      priceId: product.default_price as string,
    };
  }

  public async getProductById(
    stripeProductId: string
  ): Promise<IStripeProductDTO | null> {
    const product = await this.stripe.products.retrieve(stripeProductId);

    if (!product) return null;

    return {
      id: product.id,
      name: product.name,
      priceId: product.default_price as string,
    };
  }

  public async createProduct(
    name: string,
    price: number
  ): Promise<IStripeProductDTO> {
    const productExists = await this.getProductByName(name);

    if (productExists) throw new StripeProductAlreadyExistsError(name);

    const stripeProduct = await this.stripe.products.create({
      name,
      default_price_data: {
        unit_amount: price,
        currency: "BRL",
      },
    });

    return {
      id: stripeProduct.id,
      priceId: stripeProduct.default_price as string,
      name,
    };
  }
}

export const stripeService = new StripeService();
