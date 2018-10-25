import axios from "axios";
import * as config from "config";

const githubApi = axios.create({
  baseURL: `${config.get("github.apiUrl")}`,
  headers: { Authorization: `token ${config.get("github.token")}` }
});

const githubApiPreview = axios.create({
  baseURL: `${config.get("github.apiUrl")}`,
  headers: {
    Authorization: `token ${config.get("github.token")}`,
    Accept: "application/vnd.github.inertia-preview+json"
  }
});

const githubGetTokenApi = axios.create({
  baseURL: "https://github.com/login/oauth/access_token"
});

const githubAuthUrl = "https://github.com/login/oauth/authorize";

export { githubApi, githubApiPreview, githubAuthUrl, githubGetTokenApi };
