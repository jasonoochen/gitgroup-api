import { Application } from "express";
import { ProjectRoutes } from "./projectRoutes";

export class MainRoute {
  public routes(app: Application): void {
    new ProjectRoutes().routes(app);
  }
}
