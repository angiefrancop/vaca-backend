let groups = [];

const groupsService = {
  getGroupById: (id) => {
    return groups.find((group) => group.id === id);
  },
  getGroups: () => {
    return groups;
  },
  createGroup: (group) => {
    let maxId = groups.reduce((max, item) => Math.max(max, item.id), 0);
    group.id = maxId + 1;
    group.name = group.name.toLowerCase();
    group.date = new Date();
    groups.push(group);
    return groups;
  },
  updateGroup: (id, group) => {
    const index = groups.findIndex((group) => group.id === id);
    group.id = id;
    groups[index] = group;
    return group;
  },
  deleteGroup: (id) => {
    groups = groups.filter((group) => group.id !== id);
    return groups;
  }
};

export default groupsService;
