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
const userModel_1 = require("./userModel");
const githubAPI_1 = require("../remoteConnection/github/githubAPI");
class Owner extends userModel_1.User {
    constructor(name, id, repositories, projects) {
        super(name, id ? id : undefined, repositories ? repositories : undefined);
        if (projects)
            this.projects = projects.slice(0);
    }
    /**
     * According to the github token, return the user information of that token owner
     * @returns the Promise of the owner
     */
    static getMe() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userDate = yield githubAPI_1.githubApi.get("/user");
                if (!userDate.data)
                    return userDate;
                // get repositories
                // get projects
                return new userModel_1.User(userDate.data.login, userDate.data.node_id);
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.Owner = Owner;
//# sourceMappingURL=ownerModel.js.map