import { Issue } from "./issueModel";
import { githubApiPreview } from "../remoteConnection/github/githubAPI";
import * as mongoose from "mongoose";

export class Card extends Issue {
  private note: string;
  private columnId: string;

  constructor(issue: Issue, note: string, columnId: string) {
    super(
      issue.getId(),
      issue.getTitle(),
      issue.getBody(),
      issue.getOwner(),
      issue.getRepos(),
      issue.getState()
    );
    this.note = note;
    if (columnId) this.columnId = columnId;
    else this.columnId = "0"; // the default value of the column name is 'To Do'
  }

  /**
   * get the note
   * @returns the note of the card
   */
  public getNote(): string {
    return this.note;
  }

  /**
   * change the note of the card
   * @param note set the note of the card
   */
  public setNote(note: string): void {
    this.note = note;
  }

  /**
   * @returns get the column id the card belongs to
   */
  public getColId(): string {
    return this.columnId;
  }

  public static CardSchema = new mongoose.Schema({
    issue_id: String,
    title: {
      type: String,
      required: true
    },
    body: String,
    owner: {
      type: String,
      required: true
    },
    repos: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    note: String,
    columnId: {
      type: String,
      required: true
    }
  });

  /***********************************************************************************
   * save the card
   * @returns the result of the save
   */
  public async save(): Promise<any> {
    const post: any = {
      note: this.note,
      content_id: this.getId(),
      content_type: "Issue" // future change: there may be another choice - PullRequest
    };
    const result = await githubApiPreview.post(
      `/projects/columns/cards/${this.columnId}`,
      post
    );
    return result;
  }

  // public async saveToMongo(userId: string) {
  //   let project: Object = {
  //     name: this.name,
  //     owner_id: this.owner_id,
  //     description: this.description,
  //     repositories: this.repositories
  //   };

  //   const projectMongo = new Project.ProjectMongoModel(project);
  //   const savedProject = await projectMongo.save();
  //   project["_id"] = savedProject._id;
  //   this.id = savedProject._id;

  //   // get user from mongo db
  //   let userMongoData = await User.UserMongoModel.findOne({
  //     node_id: this.owner_id
  //   });

  //   if (!userMongoData) {
  //     const userMongo = new User.UserMongoModel({
  //       node_id: this.owner_id,
  //       name: user.getName()
  //     });
  //     userMongoData = await userMongo.save();
  //   }

  //   if (!userMongoData.projects) {
  //     userMongoData.projects = [project];
  //   } else {
  //     userMongoData.projects.push(project);
  //   }

  //   const newUserMongo = new User.UserMongoModel(userMongoData);
  //   const result = await newUserMongo.save();

  //   return result;
  // }
}
