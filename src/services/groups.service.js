import Repository from '../repositories/groups.repository.js';
import AppError from '../lib/application.error.js';

const GroupService = (userId, dbClient) => {
  const repository = Repository(userId, dbClient);

  const getGroupById = async (id) => {
    return await repository.getGroupById(id);
  };

  const getGroups = async () => {
    return await repository.getGroups();
  };

  const createGroup = async (group) => {
    const name = validaName(group.name.toLowerCase());
    group.name = group.name.toLowerCase();
    const groupCount = await repository.countByName(name);
    if (groupCount > 0) {
      throw AppError('Already exists a group with the same name', 409);
    }
    return await repository.createGroup(group);
  };

  const updateGroup = async (group) => {
    const name = validaName(group.name);

    const existingGroup = await repository.getGroupById(group.id);
    if (!existingGroup) {
      throw AppError('Group to update does not exist', 404);
    }

    const groupCount = await repository.countByNameNotId(name, group.id);
    if (groupCount > 0) {
      throw AppError('Already exists a group with the same name', 409);
    }

    return await repository.updateById({
      ...group,
      name
    });
  };

  const deleteGroup = async (id) => {
    return await repository.deleteGroup(id);
  };

  const validaName = (newName) => {
    // limpiar los datos
    const name = (newName || '').trim();
    // validar los campos individuales
    if (name.length === 0) {
      throw AppError('Name is required', 400);
    }
    if (name.length > 30) {
      throw AppError('Name must be less than 30 characters', 400);
    }

    return name;
  };

  return {
    getGroupById,
    getGroups,
    createGroup,
    updateGroup,
    deleteGroup
  };
};

export default GroupService;
