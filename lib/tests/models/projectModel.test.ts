import { Project, ProjectModel } from "../../models/projectModel";

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

    const projectObj: Project = new Project("test name");
    projectObj.saveToMongo();
    expect(typeof projectObj.getId()).toEqual("string");
  });
});
