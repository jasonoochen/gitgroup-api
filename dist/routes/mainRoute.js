"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const projectRoutes_1 = require("./projectRoutes");
const repositoryRoutes_1 = require("./repositoryRoutes");
const authorizationRoutes_1 = require("./authorizationRoutes");
const userRoutes_1 = require("./userRoutes");
class MainRoute {
    routes(app) {
        app.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
            next();
        });
        new userRoutes_1.UserRoutes().routes(app);
        new projectRoutes_1.ProjectRoutes().routes(app);
        new repositoryRoutes_1.RepositoryRoutes().routes(app);
        new authorizationRoutes_1.AuthorizationRoutes().routes(app);
    }
}
exports.MainRoute = MainRoute;
//# sourceMappingURL=mainRoute.js.map