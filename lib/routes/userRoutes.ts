import { Application, Request, Response, Router } from "express";
import { Authorization } from "./../models/authorization";
import { User } from "./../models/userModel";

export class UserRoutes {
  private router: Router;

  constructor() {
    this.router = Router();

    /**
     * GET /user
     */
    this.router.get(
      "/",
      Authorization.authenticate,
      async (req: Request, res: Response) => {
        const user = await User.getUser(req);
        res.status(200).send(user);
      }
    );
  }

  /**
   * Bound all the routes
   * @param app express application
   */
  public routes(app: Application) {
    app.use("/user", this.router);
  }
}
