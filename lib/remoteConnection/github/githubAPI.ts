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

export { githubApi, githubApiPreview };
