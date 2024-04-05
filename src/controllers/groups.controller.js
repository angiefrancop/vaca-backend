import groupsService from '../services/groups.service.js';

const groupsController = {
  getGroupById: (req, res) => {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'ID must be a number' });
    }
    const group = groupsService.getGroupById(id);
    res.json(group);
  },
  getGroups: (req, res) => {
    const groups = groupsService.getGroups();
    console.info(groups);
    res.json(groups);
  },
  createGroup: (req, res) => {
    const group = req.body;
    if (!group.name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const groupExists = groupsService.getGroups().find((actualGroup) => actualGroup.name === group.name.toLowerCase());

    if (groupExists) {
      return res.status(400).json({ error: 'Group already exists' });
    }

    if (group.name.length > 30) {
      return res.status(400).json({ error: 'the name exceeds the 30 characters allowed' });
    }

    if (!group.color) {
      return res.status(400).json({ error: 'Color is required' });
    }

    const groups = groupsService.createGroup(group);
    res.json(groups);
  },
  updateGroup: (req, res) => {
    const id = Number(req.params.id);
    const group = req.body;

    if (isNaN(id)) {
      return res.status(400).json({ error: 'ID must be a number' });
    }

    if (group.name && group.name === '') {
      return res.status(400).json({ error: 'Name cannot be empty' });
    }

    if (group.color && group.color === '') {
      return res.status(400).json({ error: 'Color cannot be empty' });
    }

    const groupUpdated = groupsService.updateGroup(id, group);
    res.json(groupUpdated);
  },

  deleteGroup: (req, res) => {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'ID must be a number' });
    }
    const groups = groupsService.deleteGroup(id);
    res.json(groups);
  }
};

export default groupsController;
