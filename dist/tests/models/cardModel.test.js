"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cardModel_1 = require("../../models/cardModel");
describe("Test the construct of the Card class", () => {
    it("should create the correct object", () => {
        const cardObj = new cardModel_1.Card("1", "test title", "test body", "open", "test owner", "test repos", "test note");
        expect(cardObj).toMatchObject({
            id: "1",
            title: "test title",
            body: "test body",
            state: "open",
            note: "test note",
            owner: "test owner",
            repos: "test repos"
        });
    });
});
//# sourceMappingURL=cardModel.test.js.map