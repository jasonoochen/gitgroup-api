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
const githubAPI_1 = require("remoteConnection/github/githubAPI");
class Kanban {
    constructor(name, body, state, columns, ownerName, reposName, id) {
        if (id)
            this.id = id;
        this.name = name;
        this.body = body;
        if (state !== "open" && state !== "close")
            throw new RangeError("The state is neither 'close' nor 'open'");
        this.columns = [];
        for (let column of columns) {
            this.columns.push(column);
        }
        this.ownerName = ownerName;
        this.reposName = reposName;
    }
    /**
     *
     */
    getId() {
        return this.id;
    }
    /**
     *
     */
    getOwnerName() {
        return this.ownerName;
    }
    /**
     *
     */
    getReposName() {
        return this.reposName;
    }
    /**
     *
     */
    getName() {
        return this.name;
    }
    /**
     *
     * @param name
     */
    setName(name) {
        this.name = name;
    }
    /**
     *
     */
    getBody() {
        return this.body;
    }
    /**
     *
     * @param body
     */
    setBody(body) {
        this.body = body;
    }
    /**
     *
     */
    getState() {
        return this.state;
    }
    /**
     *
     */
    open() {
        this.state = "open";
    }
    /**
     *
     */
    close() {
        this.state = "close";
    }
    /**
     *
     */
    getColumns() {
        let result = [];
        for (let column of this.columns) {
            result.push(column);
        }
        return result;
    }
    /**
     *
     */
    save() {
        return __awaiter(this, void 0, void 0, function* () {
            const post = {
                name: this.name,
                body: this.body
            };
            let result;
            try {
                result = yield githubAPI_1.githubApiPreview.post(`/repos/${this.ownerName}/${this.reposName}/projects`, post);
            }
            catch (error) {
                throw error;
            }
            this.id = result.data.node_id;
            return result;
        });
    }
}
exports.Kanban = Kanban;
//# sourceMappingURL=kanbanModel.js.map