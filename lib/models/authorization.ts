import * as config from "config";
import {
  githubAuthApi,
  githubGetTokenApi
} from "../remoteConnection/github/githubAPI";
import { AxiosResponse } from "axios";

export class Authorization {
  private client_id: string;
  private client_secret: string;

  constructor() {
    this.client_id = config.get("github.client_id");
    this.client_secret = config.get("github.client_secret");
  }

  public async requestId(): Promise<AxiosResponse<any>> {
    const gitHubRequestPage = await githubAuthApi.get("/", {
      params: {
        client_id: this.client_id
      }
    });
    return gitHubRequestPage;
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
