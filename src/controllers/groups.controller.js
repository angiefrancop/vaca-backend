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
    res.json(groups);
  },
  createGroup: (req, res) => {
    const group = req.body;
    if (!group.name) {
      return res.status(400).json({ error: 'Name is required' });
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

    const groups = groupsService.updateGroup(id, group);
    res.json(groups);
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
