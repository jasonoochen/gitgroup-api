// /lib/routes/crmRoutes.ts
import { Request, Response, Application, Router } from "express";
import { ProjectController } from "./../controllers/projectController";
import { Authorization } from './../models/authorization';
import { User } from './../models/userModel';

export class ProjectRoutes {
  private router: Router;
  public projectController: ProjectController = new ProjectController();

  constructor() {
    this.router = Router();

    this.router.post(
      '/new',
      Authorization.authenticate,
      async (req: Request, res:Response) => {
        const user: User = await User.getUser(req);
         
      }
    )
  }

  public routes(app: Application): void {
    app.use('/project', this.router);
  }
}
