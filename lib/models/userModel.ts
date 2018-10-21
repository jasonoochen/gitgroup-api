import * as config from "config";
import { Repository } from "./repositoryModel";
import { githubApi } from "../remoteConnection/github/githubAPI";

/**
 * User Class
 * @author Runbo Zhao
 */
export class User {
  private id: string;
  private name: string;
  private repositories: Repository[];

  constructor(name: string, id?: string, repositories?: Repository[]) {
    if (id) this.id = id;
    if (repositories) this.repositories = repositories.slice(0);
    this.name = name;
  }

  /**
   * @returns the id of the user
   */
  public getId(): string {
    return this.id;
  }

  /**
   * @returns the name of the user
   */
  public getName(): string {
    return this.name;
  }

  /**
   * @returns all the repositories of the user
   */
  public getRepositories(): Repository[] {
    return this.repositories;
  }
}
