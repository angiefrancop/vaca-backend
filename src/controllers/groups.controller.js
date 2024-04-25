import GroupService from '../services/groups.service.js';

const GroupController = () => {
  const getGroupById = async (req, res) => {
    const groupService = GroupService(req.dbClient);
    const group = await groupService.getGroupById(req.params.id);
    if (!group) {
      res.status(404).json({ error: 'Group not found' });
    } else {
      res.status(200).json(group);
    }
  };

  const getGroups = async (req, res) => {
    const groupService = GroupService(req.dbClient);
    const groups = await groupService.getGroups();
    res.status(200).json(groups);
  };
  const createGroup = async (req, res) => {
    const group = req.body;
    if (!group.name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const groupExists = groupService.getGroups().find((actualGroup) => actualGroup.name === group.name.toLowerCase());
    console.log('groupExists--->', groupExists);

    if (groupExists) {
      return res.status(400).json({ error: 'Group already exists' });
    }

    if (group.name.length > 30) {
      return res.status(400).json({ error: 'the name exceeds the 30 characters allowed' });
    }

    if (!group.color) {
      return res.status(400).json({ error: 'Color is required' });
    }

    groupService.createGroup(group);
    res.json(groupService.getGroups());
  };

  const updateGroup = async (req, res) => {
    const id = Number(req.params.id);
    const group = req.body;

    if (group.name && group.name === '') {
      return res.status(400).json({ error: 'Name cannot be empty' });
    }

    if (group.color && group.color === '') {
      return res.status(400).json({ error: 'Color cannot be empty' });
    }

    res.json(groupService.updateGroup(id, group));
  };

  const deleteGroup = async (req, res) => {
    const id = req.params.id;
    const groups = groupService.deleteGroup(id);
    res.json(groups);
  };

  return {
    getGroupById,
    getGroups,
    createGroup,
    updateGroup,
    deleteGroup
  };
};

export default GroupController;
