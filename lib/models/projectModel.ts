import * as mongoose from "mongoose";
import { Request } from "express";
import { Repository } from "./repositoryModel";
import { Collaborator } from "./collaboratorModel";
import { github } from "../remoteConnection/github/githubAPI";
import { User } from "./userModel";

export class Project {
  private id: string;
  private name: string;
  private owner_id: string;
  private description: string;
  private repositories: Repository[];
  private collaborators: Collaborator[];

  constructor(
    id?: string,
    name?: string,
    owner_id?: string,
    description?: string,
    repositories?: Repository[],
    collaborators?: Collaborator[]
  ) {
    if (id) this.id = id;
    if (name) this.name = name;
    if (owner_id) this.owner_id = owner_id;
    if (description) this.description = description;
    if (repositories) this.repositories = repositories.slice(0);
    if (collaborators) this.collaborators = collaborators.slice(0);
  }

  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getDescription(): string {
    return this.description;
  }

  public setDescription(description: string): void {
    this.description = description;
  }

  public getRepositories(): Repository[] {
    return this.repositories;
  }

  public getCollaborators(): Collaborator[] {
    return this.collaborators;
  }

  public static ProjectSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    owner_id: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    repositories: [Repository.RepositoryMongoModel.schema]
  });

  public static ProjectMongoModel = mongoose.model(
    "projects",
    Project.ProjectSchema
  );

  /*************************************************************************
   * Given a project ID, get all the names of repositories of that project.
   * @param projectId
   * @returns {string[]} - the list of the names of the repositories
   */
  public static async getReposNamesOfProject(projectId: string) {
    const projectMongoData = await Project.ProjectMongoModel.findById(
      projectId
    );
    if (!projectMongoData) return [];
    if (!projectMongoData.repositories) return [];
    let result: string[] = [];
    for (const repos of projectMongoData.repositories) {
      result.push(repos.name);
    }
    return result;
  }

  // /**************************************************************************
  //  * Get projects of the user who send the request.
  //  * @param req the request which is sent by user
  //  * @returns {Promise<Project[]>} - a list of projects
  //  */
  // public static async getProjects(req: Request): Promise<Project[]> {
  //   const token = req.headers.authorization;
  //   const userGitRes = await github(token).get("/user");
  //   const userGitData = userGitRes.data;
  //   const userMongoData = await User.UserMongoModel.findOne({
  //     node_id: userGitData.node_id
  //   });
  //   if (!userMongoData) return [];
  //   if (!userMongoData.projects) return [];
  //   let result: Project[] = [];
  //   for (const project of userMongoData.projects) {
  //     const projectObj: Project = new Project(
  //       project._id,
  //       project.name,
  //       project.owner_id
  //     );
  //     result.push(projectObj);
  //   }
  //   return result;
  // }

  /************************************************************************
   * Get the projects of the user
   * @param token the access token
   * @param userId the node_id of the user
   */
  public static async getProjectsOfUser(userId: string): Promise<Project[]> {
    const userMongoData = await User.UserMongoModel.findOne({
      node_id: userId
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

  public async saveToMongo(req: Request) {
    const user: User = await User.getUser(req);
    this.owner_id = user.getId();
    let project: Object = {
      name: this.name,
      owner_id: this.owner_id,
      description: this.description,
      repositories: this.repositories
    };

    const projectMongo = new Project.ProjectMongoModel(project);
    const savedProject = await projectMongo.save();
    project["_id"] = savedProject._id;
    this.id = savedProject._id;

    // get user from mongo db
    let userMongoData = await User.UserMongoModel.findOne({
      node_id: this.owner_id
    });

    if (!userMongoData) {
      const userMongo = new User.UserMongoModel({
        node_id: this.owner_id,
        name: user.getName()
      });
      userMongoData = await userMongo.save();
    }

    if (!userMongoData.projects) {
      userMongoData.projects = [project];
    } else {
      userMongoData.projects.push(project);
    }

    const newUserMongo = new User.UserMongoModel(userMongoData);
    const result = await newUserMongo.save();

    return result;
  }
}
