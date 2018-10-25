import * as config from "config";
import {
  githubAuthUrl,
  githubGetTokenApi
} from "../remoteConnection/github/githubAPI";
import { AxiosResponse } from "axios";

export class Authorization {
  private client_id: string;
  private client_secret: string;
  private githubAuthUrl: string;

  constructor() {
    this.client_id = config.get("github.client_id");
    this.client_secret = config.get("github.client_secret");
    this.githubAuthUrl = githubAuthUrl;
  }

  public getClientId(): string {
    return this.client_id;
  }

  public getGithubAuthUrl(): string {
    return this.githubAuthUrl;
  }

  public getToken(code: string) {
    githubGetTokenApi.post("/", {
      params: {
        client_id: this.client_id,
        client_secret: this.client_secret,
        code: code
      }
    });
  }
}
