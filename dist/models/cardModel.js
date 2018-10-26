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
class Card extends issueModel_1.Issue {
    constructor(id, title, body, state, owner, repos, note) {
        super(title, body, state, owner, repos, id);
        this.note = note;
    }
    /**
     * get the note
     * @returns the note of the card
     */
    getNote() {
        return this.note;
    }
    /**
     * change the note of the card
     * @param note set the note of the card
     */
    setNote(note) {
        this.note = note;
    }
    /**
     * @returns get the column id the card belongs to
     */
    getColId() {
        return this.columnId;
    }
    /**
     * save the card
     * @returns the result of the save
     */
    save() {
        return __awaiter(this, void 0, void 0, function* () {
            const post = {
                note: this.note,
                content_id: this.getId(),
                content_type: "Issue" // future change: there may be another choice - PullRequest
            };
            const result = yield githubAPI_1.githubApiPreview.post(`/projects/columns/cards/${this.columnId}`, post);
            return result;
        });
    }
}
exports.Card = Card;
//# sourceMappingURL=cardModel.js.map