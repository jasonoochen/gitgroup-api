import * as mongoose from "mongoose";
import { Request } from "express";
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

  // public static async saveUserToMongo(req: Request): Promise<any> {
  //   const token = req.headers.authorization;
  //   const githubRes = await github(token).get("/user");
  //   const data = githubRes.data;
  //   const userMongo = new User.UserMongoModel({
  //     node_id: data.node_id,
  //     name: data.login
  //   });
  //   const result = await userMongo.save();
  //   return result;
  // }

  /**
   * MongoDB related data
   */

  private static RepositorySchema = new mongoose.Schema({
    repository_id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    owner_id: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    }
  });

  private static ProjectSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    owner_id: {
      type: String,
      required: true
    },
    repositories: [User.RepositorySchema]
  });

  public static userSchema = new mongoose.Schema({
    node_id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    projects: [User.ProjectSchema],
    repository: [User.RepositorySchema]
  });
  public static UserMongoModel = mongoose.model("User", User.userSchema);
}
