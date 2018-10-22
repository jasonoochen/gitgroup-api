"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const projectModel_1 = require("./../models/projectModel");
const Project = mongoose.model("Project", projectModel_1.ProjectSchema);
class ProjectController {
    addNewProject(req, res) {
        let newProject = new Project(req.body);
        newProject.save((err, project) => {
            if (err) {
                res.send(err);
            }
            res.json(project);
        });
    }
    getAllProjects(req, res) {
        Project.find({}, (err, project) => {
            if (err) {
                res.send(err);
            }
            res.json(project);
        });
    }
}
exports.ProjectController = ProjectController;
//# sourceMappingURL=projectController.js.map