import express from "express";
import groupsController from "./groups.controller.js";
const routerGroups = express.Router();

routerGroups.get("/api/groups", groupsController.getGroups);

export default routerGroups;