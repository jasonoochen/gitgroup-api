import { Request, Response, Application, Router } from "express";
import { Authorization } from "./../models/authorization";
import { Issue } from "../models/issueModel";

export class IssueRoutes {
  private router: Router;

  constructor() {
    this.router = Router();

    this.router.get("/:name/:repos", async (req: Request, res: Response) => {
      const issues = await Issue.getAllIssues(
        req.params.name,
        req.params.repos
      );
      res.status(200).send(issues);
    });

    // this.router.get("/project_issues/:userId/:projectId",(async))
  }

  public routes(app: Application): void {
    app.use("/issues", this.router);
  }
}
