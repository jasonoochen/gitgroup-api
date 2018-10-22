"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const projectController_1 = require("./../controllers/projectController");
class ProjectRoutes {
    constructor() {
        this.projectController = new projectController_1.ProjectController();
    }
    routes(app) {
        app.route("/").get((req, res) => {
            res.status(200).send({
                message: "GET request successfulll!!!!"
            });
        });
        app.route("/project").post(this.projectController.addNewProject);
        app.route("/project").get(this.projectController.getAllProjects);
    }
}
exports.ProjectRoutes = ProjectRoutes;
//# sourceMappingURL=projectRoutes.js.map