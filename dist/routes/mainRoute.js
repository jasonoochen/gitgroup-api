"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const projectRoutes_1 = require("./projectRoutes");
const repositoryRoutes_1 = require("./repositoryRoutes");
const authorizationRoutes_1 = require("./authorizationRoutes");
class MainRoute {
    routes(app) {
        new projectRoutes_1.ProjectRoutes().routes(app);
        new repositoryRoutes_1.RepositoryRoutes().routes(app);
        new authorizationRoutes_1.AuthorizationRoutes().routes(app);
    }
}
exports.MainRoute = MainRoute;
//# sourceMappingURL=mainRoute.js.map