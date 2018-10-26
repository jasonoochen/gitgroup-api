"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const projectRoutes_1 = require("./projectRoutes");
class MainRoute {
    routes(app) {
        new projectRoutes_1.ProjectRoutes().routes(app);
    }
}
exports.MainRoute = MainRoute;
//# sourceMappingURL=mainRoute.js.map