import GroupService from '../services/groups.service.js';

const GroupController = () => {
  const getGroupById = async (req, res) => {
    const groupService = GroupService(req.user?.id, req.dbClient);
    const group = await groupService.getGroupById(req.params.id);
    if (!group) {
      res.status(404).json({ error: 'Group not found' });
    } else {
      res.status(200).json(group);
    }
  };

  const getGroups = async (req, res) => {
    const groupService = GroupService(req.user?.id, req.dbClient);
    const groups = await groupService.getGroups();
    res.status(200).json(groups);
  };
  const createGroup = async (req, res) => {
    const groupService = GroupService(req.user?.id, req.dbClient);
    const group = req.body;
    const createdGroup = await groupService.createGroup(group);
    res.status(201).json(createdGroup);
  };

  const updateGroup = async (req, res) => {
    const groupService = GroupService(req.user?.id, req.dbClient);
    const id = req.params.id;
    const group = {
      ...req.body,
      id
    };

    if (group.name && group.name === '') {
      return res.status(400).json({ error: 'Name cannot be empty' });
    }

    if (group.color && group.color === '') {
      return res.status(400).json({ error: 'Color cannot be empty' });
    }

    const updatedGroup = await groupService.updateGroup(group);
    if (updatedGroup) {
      res.status(200).json({ message: 'Group updated' });
    } else {
      res.status(404).json({ error: 'Group not found' });
    }
  };

  const deleteGroup = async (req, res) => {
    const groupService = GroupService(req.user?.id, req.dbClient);
    const deleted = await groupService.deleteGroup(req.params.id);
    if (deleted) {
      res.status(200).json({ message: 'Group deleted' });
    } else {
      res.status(404).end();
    }
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
