import { Issue } from "./issueModel";
import { githubApiPreview } from "../remoteConnection/github/githubAPI";

export class Card extends Issue {
  private note: string;
  private columnId: string;

  constructor(
    id: string,
    title: string,
    body: string,
    owner: string,
    repos: string,
    state: string,
    note: string
  ) {
    super(id, title, body, owner, repos, state);
    this.note = note;
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

  /**
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
}
