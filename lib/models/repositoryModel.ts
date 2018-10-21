import { Issue } from "./issueModel";
import { Kanban } from "./kanbanModel";
import { Collaborator } from "./collaboratorModel";
import { githubApi } from "remoteConnection/github/githubAPI";

export class Repository {
  private id: string;
  private name: string;
  private owner: string; // owner name
  private description: string;
  private issues: Issue[];
  private kanbans: Kanban[];
  private collaborators: Collaborator[];
  constructor(
    name: string,
    owner: string,
    issues: Issue[],
    kanbans: Kanban[],
    collaborators: Collaborator[],
    id?: string
  ) {
    if (id) this.id = id;
    this.name = name;
    this.owner = owner;
    this.issues = issues.slice(0);
    this.kanbans = kanbans.slice(0);
    this.collaborators = collaborators.slice(0);
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

  public async save(): Promise<any> {
    const post: any = {
      name: this.name,
      description: this.description
    };
    let result: any;
    try {
      result = await githubApi.post("/user/repos", post);
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
