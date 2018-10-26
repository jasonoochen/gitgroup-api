import { Application } from "express";
import { ProjectRoutes } from "./projectRoutes";
import { RepositoryRoutes } from "./repositoryRoutes";
import { AuthorizationRoutes } from "./authorizationRoutes";
import { UserRoutes } from "./userRoutes";

export class MainRoute {
  public routes(app: Application): void {
    app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
      );
      next();
    });

    new UserRoutes().routes(app);
    new ProjectRoutes().routes(app);
    new RepositoryRoutes().routes(app);
    new AuthorizationRoutes().routes(app);
  }
}
