// /lib/routes/crmRoutes.ts
import { Request, Response, Application, Router } from "express";
import { Authorization } from "./../models/authorization";
import { Project } from "../models/projectModel";

export class ProjectRoutes {
  private router: Router;

  constructor() {
    this.router = Router();

    this.router.post(
      "/new",
      Authorization.authenticate,
      async (req: Request, res: Response) => {
        const project = new Project(
          undefined,
          req.body.name,
          req.body.owner_id
        );
        const savedInfo = await project.saveToMongo(req);
        res.status(200).send(savedInfo);
      }
    );
  }

  public routes(app: Application): void {
    app.use("/project", this.router);
  }
}
