export class CepNotFoundError extends Error {
  constructor(cep: string) {
    super(`CEP ${cep} não encontrado.`);
    this.name = "CepNotFoundError";
  }
}
