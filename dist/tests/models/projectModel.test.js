"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const projectModel_1 = require("../../models/projectModel");
describe("test saveToMongo() function", () => {
    it("should save the project to the mongodb and set its id", () => {
        jest
            .spyOn(projectModel_1.ProjectModel.prototype, "save")
            .mockImplementationOnce(callback => {
            const pro = {
                id: "test id",
                name: "test name"
            };
            const err = null;
            callback(err, pro);
        });
        const projectObj = new projectModel_1.Project("test name");
        projectObj.saveToMongo();
        expect(typeof projectObj.getId()).toEqual("string");
    });
});
//# sourceMappingURL=projectModel.test.js.map