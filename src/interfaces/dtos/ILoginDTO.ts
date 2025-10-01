export default interface ILoginDTO {
  user: {
    id: string;
    firstName: string;
    lastName: string;
  };
  token: string;
}
