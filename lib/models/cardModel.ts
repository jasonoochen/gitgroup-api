import * as mongoose from "mongoose";
export class CardMongo {
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
    kanbanId: {
      type: String,
      required: true
    },
    columnId: {
      type: String,
      required: true
    }
  });

  public static CardMongoModel = mongoose.model("cards", CardMongo.CardSchema);
}
import { Issue } from "./issueModel";
import { githubApiPreview } from "../remoteConnection/github/githubAPI";
import { KanbanMongo } from "./kanbanModel";
import { ProjectMongo } from "./projectModel";
import { KanbanColumn } from "./kanbanColumnModel";

export class Card extends Issue {
  private note: string;
  private kanbanId: string;
  private columnId: string;
  private id: string;

  constructor(
    issue: Issue,
    note: string,
    kanbanId: string,
    columnId: string,
    id?: string
  ) {
    super(
      issue.getIssueId(),
      issue.getTitle(),
      issue.getBody(),
      issue.getOwner(),
      issue.getRepos(),
      issue.getState()
    );
    this.note = note;
    if (kanbanId) this.kanbanId = kanbanId;
    if (columnId) this.columnId = columnId;
    else this.columnId = "0"; // the default value of the column name is 'To Do'
    if (id) this.id = id;
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

  public toCardOject(): any {
    return {
      issue_id: this.getIssueId(),
      title: this.getTitle(),
      body: this.getBody(),
      owner: this.getOwner(),
      repos: this.getRepos(),
      state: this.getState(),
      note: this.note,
      kanbanId: this.kanbanId,
      columnId: this.columnId
    };
  }

  public async saveToMongo() {
    const theId = this.id
      ? mongoose.Types.ObjectId(this.id)
      : mongoose.Types.ObjectId();
    const theCard = {
      _id: theId,
      issue_id: this.getIssueId(),
      title: this.getTitle(),
      body: this.getBody(),
      owner: this.getOwner(),
      repos: this.getRepos(),
      state: this.getState(),
      note: this.note,
      kanbanId: this.kanbanId,
      columnId: this.columnId
    };
    // return await KanbanMongo.KanbanMongoModel.findById(
    //   this.kanbanId,
    //   (error, doc) => {
    //     doc.columns.id(this.columnId).cards.push(theCard);
    //     doc.save();
    //   }
    // );
    let theKanban = await KanbanMongo.KanbanMongoModel.findById(this.kanbanId);
    if (!theKanban.includeIssueIds) theKanban.includeIssueIds = [];
    if (!theKanban.includeIssueIds.includes(theCard.issue_id))
      theKanban.includeIssueIds.push(theCard.issue_id);
    theKanban.columns.id(this.columnId).cards.push(theCard);
    await theKanban.save();
    return theCard;
  }

  /***********************************************************************************
   * save the card
   * @returns the result of the save
   */
  public async save(): Promise<any> {
    const post: any = {
      note: this.note,
      content_id: this.getIssueId(),
      content_type: "Issue" // future change: there may be another choice - PullRequest
    };
    const result = await githubApiPreview.post(
      `/projects/columns/cards/${this.columnId}`,
      post
    );
    return result;
  }

  public static async deleteACard(
    kanbanId: string,
    columnId: string,
    cardId: string
  ) {
    // return await KanbanMongo.KanbanMongoModel.findById(
    //   kanbanId,
    //   (error, doc) => {
    //     doc.columns
    //       .id(columnId)
    //       .cards.id(cardId)
    //       .remove();
    //     doc.save();
    //   }
    // );
    let theKanban = await KanbanMongo.KanbanMongoModel.findById(kanbanId);
    const deletedCard = theKanban.columns.id(columnId).cards.id(cardId);
    if (theKanban.includeIssueIds.includes(deletedCard.issue_id))
      theKanban.includeIssueIds = theKanban.includeIssueIds.filter(
        id => id !== deletedCard.issue_id
      );
    deletedCard.remove();
    theKanban.save();
    return deletedCard;
  }

  public static async getAllIssueCardsAndSaveToBackLog(kanbanId: string) {
    // according to the kanban id, get the project id
    const theKanban = await KanbanMongo.KanbanMongoModel.findById(kanbanId);
    const projectId = theKanban.projectId;

    // according to the project id, get the repositories[{_id, repository_id, name, owner_id, description, _url}]
    const theProject = await ProjectMongo.ProjectMongoModel.findById(projectId);
    const allRepositories = theProject.repositories;

    // get all the issues
    let issues: Issue[] = [];
    for (const repository of allRepositories) {
      const issuesOfRepos = await Issue.getAllIssues(
        repository.owner_id,
        repository.name
      );
      issues.push(...issuesOfRepos);
    }

    // transfer issues to cards
    let cards: Card[] = [];
    for (const issue of issues) {
      const card = new Card(issue, "", kanbanId, "");
      cards.push(card);
    }

    // create a new back log column to the kanban
    const theKanbanColumn = new KanbanColumn(kanbanId, "BackLog", cards);
    const result = await theKanbanColumn.saveToMongo();
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
