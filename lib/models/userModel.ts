import axios from "axios";
import * as config from "config";
import { Repository } from "./repositoryModel";

export class User {
  private id: string;
  private name: string;
  private repositories: Repository[];
  constructor() {}
  public getId(): string {
    return this.id;
  }
  public getName(): string {
    return this.name;
  }
  public getRepositories(): Repository[] {
    return this.repositories;
  }
  public static async getMe(): Promise<any> {
    const instanceAxios = axios.create({
      baseURL: `${config.get("github.apiUrl")}/user`,
      headers: { "Authorization:": `token ${config.get("github.token")}` }
    });
    const userDate: any = await instanceAxios.get("");
    return userDate;
  }
}
