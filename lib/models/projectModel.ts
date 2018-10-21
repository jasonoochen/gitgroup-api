import * as mongoose from "mongoose";
import { Repository } from "./repositoryModel";
import { Collaborator } from "./collaboratorModel";

const Schema = mongoose.Schema;

export const ProjectSchema = new Schema({
  name: {
    type: String,
    required: true
  }
});
export const ProjectModel = mongoose.model("Project", ProjectSchema);

export class Project {
  private id: string;
  private name: string;
  private repositories: Repository[];
  private collaborators: Collaborator[];

  constructor(
    name: string,
    id?: string,
    repositories?: Repository[],
    collaborators?: Collaborator[]
  ) {
    this.name = name;
    if (id) this.id = id;
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

  public saveToMongo() {
    let project = new ProjectModel({
      name: this.name
    });
    // ...
    // save repositories and collaborators to mongoDB
    // ...
    project.save((err, project) => {
      if (err) throw err;
      this.id = project.id;
    });
  }
}
