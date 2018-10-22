"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userModel_1 = require("../../models/userModel");
describe("test user class constructor", () => {
    it("should create a new user object with basic name and id", () => {
        const user = new userModel_1.User("test name", "1");
        expect(user).toMatchObject({
            id: "1",
            name: "test name"
        });
    });
});
//# sourceMappingURL=userModel.test.js.map