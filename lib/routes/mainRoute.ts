import { Application } from "express";
import { ProjectRoutes } from "./projectRoutes";
import { RepositoryRoutes } from "./repositoryRoutes";
import { AuthorizationRoutes } from "./authorizationRoutes";

export class MainRoute {
  public routes(app: Application): void {
    new ProjectRoutes().routes(app);
    new RepositoryRoutes().routes(app);
    new AuthorizationRoutes().routes(app);
  }
}
