"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const githubAPI_1 = require("../remoteConnection/github/githubAPI");
class Issue {
    /**
     * The Issue Constructor
     * @param id the issue id
     * @param title the title of the issue
     * @param body the text body of the issue
     * @param state the state of the issue: open or close
     */
    constructor(id, title, body, owner, repos, state) {
        this.id = id;
        this.title = title;
        this.body = body;
        this.owner = owner;
        this.repos = repos;
        if (state && state !== "close" && state !== "open")
            throw new RangeError("State must be 'close' or 'open'.");
        this.state = state;
    }
    /**
     * @returns the id of the issue
     */
    getId() {
        return this.id;
    }
    /**
     * @returns the title of the issue
     */
    getTitle() {
        return this.title;
    }
    /**
     * change the issue title
     * @param title the title of the issue
     */
    setTitle(title) {
        this.title = title;
    }
    /**
     * @returns the text body of the issue
     */
    getBody() {
        return this.body;
    }
    /**
     * Change the issue body.
     * @param body the changed body you want of the issue
     */
    setBody(body) {
        this.body = body;
    }
    /**
     * @returns the state of the issue("open" or "close").
     */
    getState() {
        return this.state;
    }
    /**
     * Close the issue
     */
    close() {
        this.state = "close";
    }
    /**
     * Open the issue
     */
    open() {
        this.state = "open";
    }
    getOwner() {
        return this.owner;
    }
    getRepos() {
        return this.repos;
    }
    /**
     * Get all issues for specific user and his repository
     * @param username
     * @param reposName
     */
    static getAllIssues(username, reposName) {
        return __awaiter(this, void 0, void 0, function* () {
            const issuesData = yield githubAPI_1.githubApiPreview.get(`/repos/${username}/${reposName}/issues`);
            if (!issuesData.data)
                return issuesData;
            let issues = [];
            for (let data of issuesData.data) {
                const reposUrl = data.repository_url;
                const repos = reposUrl.split("/").pop();
                const issueObj = new Issue(data.node_id, data.title, data.body, data.user.login, repos, data.state);
                issues.push(issueObj);
            }
            return issues;
        });
    }
    save() {
        return __awaiter(this, void 0, void 0, function* () {
            const post = {
                title: this.title,
                body: this.body
            };
            let result;
            try {
                result = yield githubAPI_1.githubApiPreview.post(`/repos/${this.owner}/${this.repos}/issues`, post);
                this.id = result.data.node_id;
            }
            catch (error) {
                throw error;
            }
            return result;
        });
    }
}
exports.Issue = Issue;
//# sourceMappingURL=issueModel.js.map