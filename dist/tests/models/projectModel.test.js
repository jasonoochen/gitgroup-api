"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const projectModel_1 = require("../../models/projectModel");
describe("test saveToMongo() function", () => {
    it("should save the project to the mongodb and set its id", () => {
        // let project = new ProjectModel({
        //   name: this.name
        // });
        // project.save = callback => {
        //   const pro = {
        //     id: "test id",
        //     name: "test name"
        //   };
        //   const err = {};
        //   callback(err, pro);
        // };
        const projectObj = new projectModel_1.Project("test name");
        projectObj.saveToMongo();
        expect(typeof projectObj.getId()).toEqual("string");
    });
});
//# sourceMappingURL=projectModel.test.js.map