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
class KanbanColumn {
    constructor(kanbanId, name, cards, id) {
        if (id)
            this.id = id;
        this.kanbanId = kanbanId;
        this.name = name;
        this.cards = cards;
    }
    getId() {
        return this.id;
    }
    getKanbanId() {
        return this.kanbanId;
    }
    getName() {
        return this.name;
    }
    setName(colName) {
        this.name = colName;
    }
    getCards() {
        let cards = [];
        for (let card of this.cards) {
            cards.push(card);
        }
        return cards;
    }
    save() {
        return __awaiter(this, void 0, void 0, function* () {
            const post = {
                name: this.name
            };
            let result;
            try {
                result = yield githubAPI_1.githubApiPreview.post(`/projects/${this.kanbanId}/columns`, post);
                this.id = result.data.node_id;
            }
            catch (error) {
                throw error;
            }
            return result;
        });
    }
}
exports.KanbanColumn = KanbanColumn;
//# sourceMappingURL=kanbanColumnModel.js.map