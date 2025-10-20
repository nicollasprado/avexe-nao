import { CepNotFoundError } from "@/errors/CepNotFoundError";
import IGetAddressByCep from "@/interfaces/IGetAddressByCep";
import axios from "axios";

interface IViaCepAddress {
  cep: string;
  logradouro: string;
  complemento: string;
  unidade: string;
  bairro: string;
  localidade: string;
  uf: string;
  estado: string;
  regiao: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}

class ViaCepService {
  private cache = new Map<string, IGetAddressByCep | null>();

  public async getAddressByCep(cep: string) {
    const cachedAddress = this.cache.get(cep);

    if (cachedAddress !== undefined) {
      if (cachedAddress === null) {
        throw new CepNotFoundError("CEP não encontrado");
      }

      return cachedAddress;
    }

    const res = await axios.get<IViaCepAddress>(
      `https://viacep.com.br/ws/${cep}/json/`
    );

    const { bairro, localidade, logradouro } = res.data;

    if (!bairro || !localidade || !logradouro) {
      this.cache.set(cep, null);
      throw new CepNotFoundError("CEP não encontrado");
    }

    const address: IGetAddressByCep = {
      cep,
      street: logradouro,
      city: localidade,
      neighborhood: bairro,
    };

    this.cache.set(cep, address);

    return address;
  }
}

export const viaCepService = new ViaCepService();
