import IAddressDTO from "./IAddressDTO";
import IUserDTO from "./IUserDTO";

export default interface IUserWithAdressesDTO extends IUserDTO {
  addresses: IAddressDTO[];
}
