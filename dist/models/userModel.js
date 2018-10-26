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
/**
 * User Class
 * @author Runbo Zhao
 */
class User {
    constructor(id, name, repositories) {
        if (id)
            this.id = id;
        if (name)
            this.name = name;
        if (repositories)
            this.repositories = repositories.slice(0);
    }
    /**
     * @returns the id of the user
     */
    getId() {
        return this.id;
    }
    /**
     * @returns the name of the user
     */
    getName() {
        return this.name;
    }
    /**
     * @returns all the repositories of the user
     */
    getRepositories() {
        return this.repositories;
    }
    static getUser(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = req.headers.authorization;
            const githubRes = yield githubAPI_1.github(token).get("/user");
            const data = githubRes.data;
            const user = new User(data.node_id, data.login);
            return user;
        });
    }
}
exports.User = User;
//# sourceMappingURL=userModel.js.map