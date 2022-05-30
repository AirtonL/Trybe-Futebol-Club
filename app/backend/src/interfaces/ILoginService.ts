export default interface ILoginService {
  user: {
    id: number,
    username: string,
    role: string,
    email: string,
  },
  token: string
}
