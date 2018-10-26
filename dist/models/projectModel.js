"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
exports.ProjectSchema = new Schema({
    name: {
        type: String,
        required: true
    }
});
exports.ProjectModel = mongoose.model("Project", exports.ProjectSchema);
class Project {
    constructor(name, id, repositories, collaborators) {
        this.name = name;
        if (id)
            this.id = id;
        if (repositories)
            this.repositories = repositories.slice(0);
        if (collaborators)
            this.collaborators = collaborators.slice(0);
    }
    getId() {
        return this.id;
    }
    getName() {
        return this.name;
    }
    getRepositories() {
        return this.repositories;
    }
    getCollaborators() {
        return this.collaborators;
    }
    saveToMongo() {
        let project = new exports.ProjectModel({
            name: this.name
        });
        // ...
        // save repositories and collaborators to mongoDB
        // ...
        project.save((err, project) => {
            if (err)
                throw err;
            this.id = project.id;
        });
    }
}
exports.Project = Project;
//# sourceMappingURL=projectModel.js.map