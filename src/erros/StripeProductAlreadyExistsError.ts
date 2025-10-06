export default class StripeProductAlreadyExistsError extends Error {
  constructor(name: string) {
    super(`Product ${name} already exists in Stripe`);
    this.name = "StripeProductAlreadyExistsError";
  }
}
