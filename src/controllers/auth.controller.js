import AuthService from '../services/auth.service.js';
import UsersService from '../services/users.service.js';

const AuthController = () => {
  const login = async (req, res) => {
    const authService = AuthService(req.dbClient);
    const { email, password } = req.body;
    const token = await authService.login(email, password);

    res.json({ token });
  };

  const signup = async (req, res) => {
    const usersService = UsersService(req.dbClient);
    const { name, email, password } = req.body;
    const existingUser = await usersService.getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const user = await usersService.createUser({ name, email, password });
    res.status(201).json(user);
  };

  return {
    login,
    signup
  };
};

export default AuthController;
