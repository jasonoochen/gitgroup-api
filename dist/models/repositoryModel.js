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
const issueModel_1 = require("./issueModel");
const githubAPI_1 = require("../remoteConnection/github/githubAPI");
class Repository {
    constructor(id, name, owner, description, issues, kanbans, collaborators) {
        this.id = id;
        this.name = name;
        this.owner = owner;
        this.description = description;
        if (issues)
            this.issues = issues.slice(0);
        if (kanbans)
            this.kanbans = kanbans.slice(0);
        if (collaborators)
            this.collaborators = collaborators.slice(0);
    }
    getId() {
        return this.id;
    }
    getName() {
        return this.name;
    }
    getOwner() {
        return this.owner;
    }
    getDescription() {
        return this.description;
    }
    setDescription(description) {
        this.description = description;
    }
    getIssues() {
        const issues = this.issues.slice(0);
        return issues;
    }
    getKanbans() {
        const kanbans = this.kanbans.slice(0);
        return kanbans;
    }
    getCollaborators() {
        const collaborators = this.collaborators.slice(0);
        return collaborators;
    }
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            let reposDatas;
            let reposes = [];
            reposDatas = yield githubAPI_1.githubApi.get("/user/repos", {
                params: {
                    type: "owner"
                }
            });
            for (let data of reposDatas.data) {
                const issues = yield issueModel_1.Issue.getAllIssues(data.owner.login, data.name);
                reposes.push(new Repository(data.node_id, data.name, data.owner.login, data.description, issues));
            }
            return reposes;
        });
    }
    save() {
        return __awaiter(this, void 0, void 0, function* () {
            const post = {
                name: this.name,
                description: this.description
            };
            let result;
            try {
                result = yield githubAPI_1.githubApi.post("/user/repos", post);
                this.owner = result.data.owner.login;
                this.id = result.data.node_id;
                // save issues
                // save kanbans
                // save collaborators
            }
            catch (error) {
                throw error;
            }
            return result;
        });
    }
}
exports.Repository = Repository;
//# sourceMappingURL=repositoryModel.js.map