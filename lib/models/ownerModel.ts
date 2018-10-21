import { User } from "./userModel";
import { Project } from "./projectModel";
import { githubApi } from "../remoteConnection/github/githubAPI";
import { Repository } from "./repositoryModel";

export class Owner extends User {
  private projects: Project[];

  public constructor(
    name: string,
    id?: string,
    repositories?: Repository[],
    projects?: Project[]
  ) {
    super(name, id ? id : undefined, repositories ? repositories : undefined);
    if (projects) this.projects = projects.slice(0);
  }

  /**
   * According to the github token, return the user information of that token owner
   * @returns the Promise of the owner
   */
  public static async getMe(): Promise<any> {
    try {
      const userDate: any = await githubApi.get("/user");
      if (!userDate.data) return userDate;
      // get repositories
      // get projects
      return new User(userDate.data.login, userDate.data.node_id);
    } catch (error) {
      throw error;
    }
  }
}
