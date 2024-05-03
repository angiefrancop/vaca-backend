import Repository from '../repositories/users.repository.js';
import AppError from '../lib/application.error.js';

const UsersService = (dbClient) => {
  const repository = Repository(dbClient);

  const getUserById = async (id) => {
    return await repository.getUserById(id);
  };

  const getUsers = async () => {
    return await repository.getUsers();
  };

  const createUser = async (user) => {
    return await repository.createUser(user);
  };

  const updateUser = async (user) => {
    const existingUser = await repository.getUserById(user.id);
    if (!existingUser) {
      throw AppError('User to update does not exist', 404);
    }

    return await repository.updateById(user);
  };

  const deleteUser = async (id) => {
    return await repository.deleteUser(id);
  };

  return {
    getUserById,
    getUsers,
    createUser,
    updateUser,
    deleteUser
  };
};

export default UsersService;
