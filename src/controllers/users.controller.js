import UsersService from '../services/users.service.js';

const UsersController = () => {
  const getUserById = async (req, res) => {
    const usersService = UsersService(req.dbClient);
    const user = await usersService.getUserById(req.params.id);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.status(200).json(user);
    }
  };

  const getUsers = async (req, res) => {
    const usersService = UsersService(req.dbClient);
    const users = await usersService.getUsers();
    res.status(200).json(users);
  };
  const createUser = async (req, res) => {
    const usersService = UsersService(req.dbClient);
    const user = req.body;
    const createdUser = await usersService.createUser(user);
    res.status(201).json(createdUser);
  };

  const updateUser = async (req, res) => {
    const usersService = UsersService(req.dbClient);
    const id = req.params.id;
    const user = {
      ...req.body,
      id
    };

    if (user.name && user.name === '') {
      return res.status(400).json({ error: 'Name cannot be empty' });
    }

    const updatedUser = await usersService.updateUser(user);
    if (updatedUser) {
      res.status(200).json({ message: 'User updated' });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  };

  const deleteUser = async (req, res) => {
    const usersService = UsersService(req.dbClient);
    const deleted = await usersService.deleteUser(req.params.id);
    if (deleted) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  };

  return {
    getUserById,
    getUsers,
    createUser,
    updateUser,
    deleteUser
  };
};

export default UsersController;
