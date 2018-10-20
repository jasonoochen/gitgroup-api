import { githubApiPreview } from "remoteConnection/github/githubAPI";

export class Issue {
  private id: string;
  private owner: string;
  private repos: string;
  private title: string;
  private body: string;
  private state: string;

  /**
   * The Issue Constructor
   * @param id the issue id
   * @param title the title of the issue
   * @param body the text body of the issue
   * @param state the state of the issue: open or close
   */
  public constructor(
    title: string,
    body: string,
    state: string,
    owner: string,
    repos: string,
    id?: string
  ) {
    if (id) this.id = id;
    this.title = title;
    this.body = body;
    this.owner = owner;
    this.repos = repos;
    if (state !== "close" && state !== "open")
      throw new RangeError("State must be 'close' or 'open'.");

    this.state = state;
  }

  /**
   * @returns the id of the issue
   */
  public getId(): string {
    return this.id;
  }

  /**
   * @returns the title of the issue
   */
  public getTitle(): string {
    return this.title;
  }

  /**
   * change the issue title
   * @param title the title of the issue
   */
  public setTitle(title: string): void {
    this.title = title;
  }

  /**
   * @returns the text body of the issue
   */
  public getBody(): string {
    return this.body;
  }

  /**
   * Change the issue body.
   * @param body the changed body you want of the issue
   */
  public setBody(body: string): void {
    this.body = body;
  }

  /**
   * @returns the state of the issue("open" or "close").
   */
  public getState(): string {
    return this.state;
  }

  /**
   * Close the issue
   */
  public close(): void {
    this.state = "close";
  }

  /**
   * Open the issue
   */
  public open(): void {
    this.state = "open";
  }

  public getOwner(): string {
    return this.owner;
  }

  public getRepos(): string {
    return this.repos;
  }
  /**
   * Get all issues for specific user and his repository
   * @param username
   * @param reposName
   */
  public static async getAllIssues(
    username: string,
    reposName: string
  ): Promise<any> {
    const issuesData: any = await githubApiPreview.get(
      `/repos/${username}/${reposName}/issues`
    );
    if (!issuesData.data) return issuesData;
    let issues: Issue[] = [];
    for (let issue of issuesData) {
      const issueData = issue.data;
      const issueObj = new Issue(
        issueData.title,
        issueData.body,
        issueData.string,
        issueData.user.login,
        issueData.repository.name,
        issueData.node_id
      );
      issues.push(issueObj);
    }
    return issues;
  }

  public async save(): Promise<any> {
    const post = {
      title: this.title,
      body: this.body
    };
    let result: any;
    try {
      result = await githubApiPreview.post(
        `/repos/${this.owner}/${this.repos}/issues`,
        post
      );
      this.id = result.data.node_id;
    } catch (error) {
      throw error;
    }
    return result;
  }
}
