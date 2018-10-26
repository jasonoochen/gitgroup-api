"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const config = require("config");
const githubApi = axios_1.default.create({
    baseURL: `${config.get("github.apiUrl")}`,
    headers: { Authorization: `token ${config.get("github.token")}` }
});
exports.githubApi = githubApi;
const githubApiPreview = axios_1.default.create({
    baseURL: `${config.get("github.apiUrl")}`,
    headers: {
        Authorization: `token ${config.get("github.token")}`,
        Accept: "application/vnd.github.inertia-preview+json"
    }
});
exports.githubApiPreview = githubApiPreview;
const githubGetTokenApi = axios_1.default.create({
    baseURL: "https://github.com/login/oauth/access_token"
});
exports.githubGetTokenApi = githubGetTokenApi;
const githubAuthUrl = "https://github.com/login/oauth/authorize";
exports.githubAuthUrl = githubAuthUrl;
//# sourceMappingURL=githubAPI.js.map