import { Router, Request, Response, Application } from "express";
import { Authorization } from "../models/authorization";

export class AuthorizationRoutes {
  private router: Router;

  constructor() {
    this.router = Router();

    //[method: get, url: /user/auth] - used to get the github authorization request page
    this.router.get("/", async (req: Request, res: Response) => {
      const page = await new Authorization().requestId();
      res
        .status(200)
        .header({ "Access-Control-Allow-Origin": "*" })
        .send(page.data);
    });

    this.router.post("/callback", (req: Request, res: Response) => {});
  }

  public routes(app: Application): void {
    app.use("/user/auth", this.router);
  }
}
