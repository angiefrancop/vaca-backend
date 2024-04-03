import groupsService from '../services/groups.service.js';

const groupsController = {
  getGroupById: (req, res) => {
    const id = Number(req.params.id);
    const group = groupsService.getGroupById(id);
    res.json(group);
  },
  getGroups: (req, res) => {
    const groups = groupsService.getGroups();
    res.json(groups);
  },
  createGroup: (req, res) => {
    const group = req.body;
    const groups = groupsService.createGroup(group);
    res.json(groups);
  },
  updateGroup: (req, res) => {
    const id = Number(req.params.id);
    const group = req.body;
    const groups = groupsService.updateGroup(id, group);
    res.json(groups);
  },
  deleteGroup: (req, res) => {
    const id = Number(req.params.id);
    const groups = groupsService.deleteGroup(id);
    res.json(groups);
  }
};

export default groupsController;
