import * as mongoose from "mongoose";
import { Repository } from "./repositoryModel";
import { Collaborator } from "./collaboratorModel";
import { Request } from "express";
import { github } from "../remoteConnection/github/githubAPI";
import { User } from "./userModel";

// export const ProjectMongoModel = mongoose.model("Project", ProjectSchema);

export class Project {
  private id: string;
  private name: string;
  private owner_id: string;
  private repositories: Repository[];
  private collaborators: Collaborator[];

  constructor(
    id?: string,
    name?: string,
    owner_id?: string,
    repositories?: Repository[],
    collaborators?: Collaborator[]
  ) {
    if (id) this.id = id;
    if (name) this.name = name;
    if (owner_id) this.owner_id = owner_id;
    if (repositories) this.repositories = repositories.slice(0);
    if (collaborators) this.collaborators = collaborators.slice(0);
  }

  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getRepositories(): Repository[] {
    return this.repositories;
  }

  public getCollaborators(): Collaborator[] {
    return this.collaborators;
  }

  public static async getProjects(req: Request): Promise<Project[]> {
    const token = req.headers.authorization;
    const userGitRes = await github(token).get("/user");
    const userGitData = userGitRes.data;
    const userMongo = new User.UserMongoModel();
    const userMongoData = await userMongo.findOne({
      node_id: userGitData.node_id
    });
    if (!userMongoData) return [];
    if (!userMongoData.projects) return [];
    let result: Project[] = [];
    for (const project of userMongoData.projects) {
      const projectObj: Project = new Project(
        project._id,
        project.name,
        project.owner_id
      );
      result.push(projectObj);
    }
    return result;
  }

  public async saveToMongo() {
    const project: Object = {
      name: this.name,
      owner_id: this.owner_id
    };
    // get user from mongo db
    const userMongo = new User.UserMongoModel();

    const userMongoData = await userMongo.findOne({ node_id: this.owner_id });

    if (!userMongoData.projects) {
      userMongoData.projects = [project];
    } else {
      userMongoData.projects.push(project);
    }

    const newUserMongo = new User.UserMongoModel(userMongoData);
    const result = await newUserMongo.save();
  }

  public static ProjectSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    owner_id: {
      type: String,
      required: true
    }
  });
}
