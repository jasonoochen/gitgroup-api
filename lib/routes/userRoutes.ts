import { Application, Request, Response, Router } from "express";
import { Authorization } from "./../models/authorization";
import { Owner } from "./../models/ownerModel";

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
        const owner = await Owner.getOwner(req);
        res.status(200).send(owner);
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
