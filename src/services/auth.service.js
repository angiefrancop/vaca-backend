import Repository from '../repositories/users.repository.js';
import AppError from '../lib/application.error.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const UsersService = (dbClient) => {
  const repository = Repository(dbClient);

  const login = async (email, password) => {
    const user = await repository.getUserByEmail(email);
    console.info(user, email, password);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw AppError('Invalid credentials', 401);
    }

    const payload = { id: user.id };
    return jwt.sign(payload, process.env.JWT_SECRET);
  };

  return {
    login
  };
};

export default UsersService;
