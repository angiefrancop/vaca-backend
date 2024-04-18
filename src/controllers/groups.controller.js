import { GroupService } from '../services/groups.service.js';

const GroupController = () => {
  const groupService = GroupService();

  const getGroupById = (req, res) => {
    const id = req.params.id;
    if (isNaN(id)) {
      return res.status(400).json({ error: 'ID must be a number' });
    }
    const group = groupService.getGroupById(id);
    res.json(group);
  };

  const getGroups = (req, res) => {
    const groups = groupService.getGroups();
    console.info(groups);
    res.json(groups);
  };
  const createGroup = (req, res) => {
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

  const updateGroup = (req, res) => {
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

  const deleteGroup = (req, res) => {
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

export { GroupController };
