"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = require("config");
const githubAPI_1 = require("../remoteConnection/github/githubAPI");
class Authorization {
    constructor() {
        this.client_id = config.get("github.client_id");
        this.client_secret = config.get("github.client_secret");
        this.githubAuthUrl = githubAPI_1.githubAuthUrl;
    }
    getClientId() {
        return this.client_id;
    }
    getGithubAuthUrl() {
        return this.githubAuthUrl;
    }
    getToken(code) {
        githubAPI_1.githubGetTokenApi.post("/", {
            params: {
                client_id: this.client_id,
                client_secret: this.client_secret,
                code: code
            }
        });
    }
}
exports.Authorization = Authorization;
//# sourceMappingURL=authorization.js.map