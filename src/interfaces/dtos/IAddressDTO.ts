export default interface IAddressDTO {
  id: string;
  cep: string;
  street: string;
  number: string;
  city: string;
  neighborhood: string;
  complement?: string;
  reference?: string;
  lastUsedAt?: Date;
}
