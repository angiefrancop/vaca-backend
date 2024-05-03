import UsersService from '../services/users.service.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const AuthController = () => {
  const login = async (req, res) => {
    console.info('AuthController.login');
    const usersService = UsersService(req.dbClient);
    const { email, password } = req.body;
    const user = await usersService.getUserByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const payload = { id: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET);
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
