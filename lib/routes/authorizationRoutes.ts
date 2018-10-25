import { Router, Request, Response, Application } from "express";
import * as url from "url";
import { Authorization } from "./../models/authorization";

export class AuthorizationRoutes {
  private router: Router;

  constructor() {
    this.router = Router();

    this.router.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "http://localhost:3000");
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
      );
      next();
    });

    //[method: get, url: /user/auth] - used to get the github authorization request page
    this.router.get("/", async (req: Request, res: Response) => {
      const auth: Authorization = new Authorization();
      return res.redirect(
        url.format({
          pathname: auth.getGithubAuthUrl(),
          query: {
            client_id: auth.getClientId()
          }
        })
      );
    });

    this.router.post("/callback", (req: Request, res: Response) => {});
  }

  public routes(app: Application): void {
    app.use("/user/auth", this.router);
  }
}
