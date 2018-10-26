import { Request } from "express";
import { Issue } from "./issueModel";
import { Kanban } from "./kanbanModel";
import { Collaborator } from "./collaboratorModel";
import { github } from "../remoteConnection/github/githubAPI";

export class Repository {
  private id: string;
  private name: string;
  private owner: string; // owner name
  private description: string;
  private issues: Issue[]; // can get it using 'owner' and 'name' /repos/{owner}/{name}/issues
  private kanbans: Kanban[];
  private collaborators: Collaborator[];
  constructor(
    id?: string,
    name?: string,
    owner?: string,
    description?: string,
    issues?: Issue[],
    kanbans?: Kanban[],
    collaborators?: Collaborator[]
  ) {
    this.id = id;
    this.name = name;
    this.owner = owner;
    this.description = description;
    if (issues) this.issues = issues.slice(0);
    if (kanbans) this.kanbans = kanbans.slice(0);
    if (collaborators) this.collaborators = collaborators.slice(0);
  }

  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getOwner(): string {
    return this.owner;
  }

  public getDescription(): string {
    return this.description;
  }

  public setDescription(description: string): void {
    this.description = description;
  }

  public getIssues(): Issue[] {
    const issues: Issue[] = this.issues.slice(0);
    return issues;
  }

  public getKanbans(): Kanban[] {
    const kanbans: Kanban[] = this.kanbans.slice(0);
    return kanbans;
  }

  public getCollaborators(): Collaborator[] {
    const collaborators: Collaborator[] = this.collaborators.slice(0);
    return collaborators;
  }

  /**
   * Get all the repositories of owener from Github
   * @param {Request} req - the user request including the auth header
   * @returns {Promise<any>} if success, return Promise<Repository> , else, return Promise<any>
   */
  public static async getAll(req: Request): Promise<any> {
    let reposDatas: any;
    let reposes: Repository[] = [];
    const token = req.headers.authorization;
    reposDatas = await github(token).get("/user/repos", {
      params: {
        type: "owner"
      }
    });
    for (let data of reposDatas.data) {
      const issues = await Issue.getAllIssues(data.owner.login, data.name);
      reposes.push(
        new Repository(
          data.node_id,
          data.name,
          data.owner.login,
          data.description,
          issues
        )
      );
    }
    return reposes;
  }

  public async save(token: string): Promise<any> {
    const post: any = {
      name: this.name,
      description: this.description
    };
    let result: any;
    try {
      result = await github(token).post("/user/repos", post);
      this.owner = result.data.owner.login;
      this.id = result.data.node_id;
      // save issues
      // save kanbans
      // save collaborators
    } catch (error) {
      throw error;
    }
    return result;
  }
}
