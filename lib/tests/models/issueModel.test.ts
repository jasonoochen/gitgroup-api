import { Issue } from "../../models/issueModel";

let testIssue: Issue;

describe("Test the constructor of the Issue.", () => {
  it("should create a new Issue object when the input is correct.", () => {
    const issueObj: Issue = new Issue(
      "test title",
      "test body",
      "open",
      "test owner",
      "test repos",
      "1"
    );
    expect(issueObj).toMatchObject({
      id: "1",
      title: "test title",
      body: "test body",
      state: "open",
      owner: "test owner",
      repos: "test repos"
    });
  });
  it("should throw a RangeError when the input state is neither 'open' nor 'close'", () => {
    const constructorWithWrongInput = () => {
      return new Issue(
        "test title",
        "test body",
        "NorOpenClose",
        "test owner",
        "test repos",
        "1"
      );
    };
    expect(constructorWithWrongInput).toThrow(RangeError);
  });
});

beforeEach(() => {
  testIssue = new Issue(
    "test title",
    "test body",
    "open",
    "test owner",
    "test repos",
    "1"
  );
});

describe("The function getId()", () => {
  it("should return the correct id of the Issue object", () => {
    expect(testIssue.getId()).toEqual("1");
  });
});
