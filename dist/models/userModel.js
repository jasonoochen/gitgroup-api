"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * User Class
 * @author Runbo Zhao
 */
class User {
    constructor(name, id, repositories) {
        if (id)
            this.id = id;
        if (repositories)
            this.repositories = repositories.slice(0);
        this.name = name;
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
}
exports.User = User;
//# sourceMappingURL=userModel.js.map