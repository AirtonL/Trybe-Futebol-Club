import ILoginService from '../interfaces/ILoginService';
import User from '../database/models/User';
import { jwtSign } from '../helpers/jsonWebToken/TokenGenerate';

class LoginService {
  constructor(
    private model = User,
  ) {}

  async validLogin(email: string, _password: string): Promise<ILoginService | null> {
    const user = await this.model.findOne({ where: { email } });
    if (!user) return null;

    const token = jwtSign({ data: { email, id: user.id, role: user.role } });

    return {
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
        email: user.email,
      },
      token,
    };
  }
}

export default new LoginService();
