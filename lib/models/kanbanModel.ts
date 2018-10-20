import { KanbanColumn } from "./kanbanColumnModel";
import { githubApiPreview } from "remoteConnection/github/githubAPI";

export class Kanban {
  private id: string;
  private ownerName: string;
  private reposName: string;
  private name: string;
  private body: string;
  private state: string;
  private columns: KanbanColumn[];

  constructor(
    name: string,
    body: string,
    state: string,
    columns: KanbanColumn[],
    ownerName: string,
    reposName: string,
    id?: string
  ) {
    if (id) this.id = id;
    this.name = name;
    this.body = body;
    if (state !== "open" && state !== "close")
      throw new RangeError("The state is neither 'close' nor 'open'");
    this.columns = [];
    for (let column of columns) {
      this.columns.push(column);
    }
    this.ownerName = ownerName;
    this.reposName = reposName;
  }

  /**
   *
   */
  public getId(): string {
    return this.id;
  }

  /**
   *
   */
  public getOwnerName(): string {
    return this.ownerName;
  }

  /**
   *
   */
  public getReposName(): string {
    return this.reposName;
  }

  /**
   *
   */
  public getName(): string {
    return this.name;
  }

  /**
   *
   * @param name
   */
  public setName(name: string): void {
    this.name = name;
  }

  /**
   *
   */
  public getBody(): string {
    return this.body;
  }

  /**
   *
   * @param body
   */
  public setBody(body: string): void {
    this.body = body;
  }

  /**
   *
   */
  public getState(): string {
    return this.state;
  }

  /**
   *
   */
  public open(): void {
    this.state = "open";
  }

  /**
   *
   */
  public close(): void {
    this.state = "close";
  }

  /**
   *
   */
  public getColumns(): KanbanColumn[] {
    let result: KanbanColumn[] = [];
    for (let column of this.columns) {
      result.push(column);
    }
    return result;
  }

  /**
   *
   */
  public async save(): Promise<any> {
    const post: any = {
      name: this.name,
      body: this.body
    };
    let result;
    try {
      result = await githubApiPreview.post(
        `/repos/${this.ownerName}/${this.reposName}/projects`,
        post
      );
    } catch (error) {
      throw error;
    }
    this.id = result.data.node_id;
    return result;
  }
}
