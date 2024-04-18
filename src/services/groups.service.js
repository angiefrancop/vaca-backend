import { Model } from '../lib/model.js';

const GroupService = () => {
  const groupModel = Model();
  const getGroupById = (id) => {
    return groupModel.findUnique(id);
  };

  const getGroups = () => {
    return groupModel.findMany();
  };

  const createGroup = (group) => {
    group.name = group.name.toLowerCase();
    group.date = new Date();
    return groupModel.create(group);
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

export { GroupService };
