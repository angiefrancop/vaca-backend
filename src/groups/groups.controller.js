import groupsService from "./groups.service.js";
const getGroups = (req, res) => {
    return res.status(200).json(groupsService.getGroups());
};


export default { getGroups };