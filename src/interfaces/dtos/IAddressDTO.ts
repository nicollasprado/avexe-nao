export default interface IAddressDTO {
  id: string;
  cep: string;
  street: string;
  number: string;
  neighborhood: string;
  complement?: string;
  reference?: string;
  lastUsedAt?: Date;
}
