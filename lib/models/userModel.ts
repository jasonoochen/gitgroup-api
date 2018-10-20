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

  constructor(id: string, name: string) {
    this.id = id;
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

  /**
   * According to the github token, return the user information of that token owner
   * @returns the Promise of the owner
   */
  public static async getMe(): Promise<any> {
    const userDate: any = await githubApi.get("/user");
    if (!userDate.data) return userDate;
    return new User(userDate.data.node_id, userDate.data.login);
  }
}
