"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ownerModel_1 = require("./../../models/ownerModel");
describe("test owner class constructor", () => {
    it("should create a new basic class with id and name", () => {
        const owner = new ownerModel_1.Owner("test name", "1");
        expect(owner).toMatchObject({
            name: "test name",
            id: "1"
        });
    });
});
// return User.getMe()
// .then(user => {
//   console.log(user);
//   expect(typeof user.getId()).toBe("string");
//   expect(typeof user.getName()).toBe("string");
// })
// .catch(err => {
//   console.log(err);
// });
//# sourceMappingURL=ownerModel.test.js.map