import { Request, Response, Application, Router } from "express";
import { Authorization } from "./../models/authorization";
import { Issue } from "../models/issueModel";
import { Project } from "../models/projectModel";
import { Card } from "../models/cardModel";

export class CardRoutes {
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

    this.router.get(
      "/project_cards/:username/:projectId",
      async (req: Request, res: Response) => {
        const reposNames: string[] = await Project.getReposNamesOfProject(
          req.params.projectId
        );
        const result: Issue[] = [];
        for (let reposName of reposNames) {
          const issues: Issue[] = await Issue.getAllIssues(
            req.params.username,
            reposName
          );
          result.push(...issues);
        }
        res.status(200).send(result);
      }
    );
  }

  public routes(app: Application): void {
    app.use("/cards", this.router);
  }
}
