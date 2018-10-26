// /lib/routes/crmRoutes.ts
import { Request, Response, Application } from "express";
import { ProjectController } from "./../controllers/projectController";

export class ProjectRoutes {
  public projectController: ProjectController = new ProjectController();

  public routes(app: Application): void {
    app.route("/").get((req: Request, res: Response) => {
      res.status(200).send({
        message: "GET request successfulll!!!!"
      });
    });

    app.route("/project").post(this.projectController.addNewProject);
    app.route("/project").get(this.projectController.getAllProjects);
  }
}
