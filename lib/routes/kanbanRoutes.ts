import { Application, Request, Response, Router } from "express";
import { Authorization } from "./../models/authorization";
import { Kanban } from "../models/kanbanModel";
import { KanbanColumn } from "../models/kanbanColumnModel";
import { Card } from "../models/cardModel";

export class KanbanRoutes {
  private router: Router;

  constructor() {
    this.router = Router();

    /**
     * POST /kanban/new - create a new kanban
     * receive:
     * {
     *  name*: kanbanName,
     *  state: default close,
     *  due*: kanban due day
     *  projectId*: the project id which the kanban belongs to
     *  columns:
     *  cards:
     * }
     */
    this.router.post("/new", async (req: Request, res: Response) => {
      let { name, due, projectId, columns } = req.body;
      if (!columns) {
        const toDoCol = new KanbanColumn(undefined, "To Do");
        const inCol = new KanbanColumn(undefined, "In Progress");
        const reviewCol = new KanbanColumn(undefined, "In Review");
        const doneCol = new KanbanColumn(undefined, "Done");
        columns = [toDoCol, inCol, reviewCol, doneCol];
      }
      const theKanban = new Kanban(
        undefined,
        name,
        "open",
        due,
        projectId,
        columns,
        []
      );
      const savedKanban = await theKanban.saveToMongo();
      res.status(200).send(savedKanban);
    });

    /**
     * get all kanbans for a project
     */
    this.router.get("/:projectId", async (req: Request, res: Response) => {
      const kanbans = await Kanban.getAllKanbansOfProject(req.params.projectId);
      res.status(200).send(kanbans);
    });

    this.router.get(
      "/kanban_id/:kanbanId",
      async (req: Request, res: Response) => {
        const theKanban = await Kanban.getKanbanById(req.params.kanbanId);
        res.status(200).send(theKanban);
      }
    );
  }

  /**
   * Bound all the routes
   * @param app express application
   */
  public routes(app: Application) {
    app.use("/kanban", this.router);
  }
}
