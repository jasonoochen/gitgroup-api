import { Request } from "express";
import * as config from "config";
import { Repository } from "./repositoryModel";
import { github } from "../remoteConnection/github/githubAPI";

/**
 * User Class
 * @author Runbo Zhao
 */
export class User {
  private id: string;
  private name: string;
  private repositories: Repository[];

  constructor(id?: string, name?: string, repositories?: Repository[]) {
    if (id) this.id = id;
    if (name) this.name = name;
    if (repositories) this.repositories = repositories.slice(0);
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

  public static async getUser(req: Request): Promise<User> {
    const token = req.headers.authorization;
    const githubRes = await github(token).get("/user");
    const data = githubRes.data;
    const user = new User(data.node_id, data.login);
    return user;
  }
}
