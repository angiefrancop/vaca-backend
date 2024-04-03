let groups = [];

const groupsService = {
  getGroupById: (id) => {
    return groups.find((group) => group.id === id);
  },
  getGroups: () => {
    return groups;
  },
  createGroup: (group) => {
    groups.push(group);
    return groups;
  },
  updateGroup: (id, group) => {
    const index = groups.findIndex((group) => group.id === id);
    groups[index] = group;
    return groups;
  },
  deleteGroup: (id) => {
    groups = groups.filter((group) => group.id !== id);
    return groups;
  }
};

export default groupsService;
