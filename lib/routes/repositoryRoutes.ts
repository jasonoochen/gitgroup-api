import { Repository } from "./../models/repositoryModel";
import { Application, Request, Response, Router } from "express";

export class RepositoryRoutes {
  private router: Router;
  constructor() {
    this.router = Router();
    this.router.get("/", async (req: Request, res: Response) => {
      const reposes: Repository[] = await Repository.getAll();
      res.status(200).send(reposes);
    });
  }
  public routes(app: Application): void {
    app.use("/repos", this.router);
  }
}
