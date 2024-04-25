import { Model } from '../lib/model.js';
import Repository from '../repositories/groups.repository.js';

const GroupService = (dbClient) => {
  const repository = Repository(dbClient);

  const getGroupById = async (id) => {
    return await repository.getGroupById(id);
  };

  const getGroups = async () => {
    return await repository.getGroups();
  };

  const createGroup = async (group) => {
    group.name = group.name.toLowerCase();
    return await repository.createGroup(group);
  };

  const updateGroup = (id, group) => {
    group.id = id;
    return groupModel.update(group.id, group);
  };

  const deleteGroup = (id) => {
    groupModel.delete(id);
    return groupModel.findMany();
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
