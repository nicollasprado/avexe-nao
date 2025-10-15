export default interface IAddressDTO {
  id: string;
  street: string;
  number: string;
  complement?: string;
  reference?: string;
  lastUsedAt?: Date;
}
