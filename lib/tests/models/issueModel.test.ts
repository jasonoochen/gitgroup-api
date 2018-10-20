import { Issue } from "../../models/issueModel";

let testIssue: Issue;

describe("Test the constructor of the Issue.", () => {
  it("should create a new Issue object when the input is correct.", () => {
    const issueObj: Issue = new Issue("1", "test title", "test body", "open");
    expect(issueObj).toMatchObject({
      id: "1",
      title: "test title",
      body: "test body",
      state: "open"
    });
  });
  it("should throw a RangeError when the input state is neither 'open' nor 'close'", () => {
    const constructorWithWrongInput = () => {
      return new Issue("1", "test title", "test body", "norOpenClose");
    };
    expect(constructorWithWrongInput).toThrow(RangeError);
  });
});

beforeEach(() => {
  testIssue = new Issue("1", "test title", "test body", "open");
});

describe("The function getId()", () => {
  it("should return the correct id of the Issue object", () => {
    expect(testIssue.getId()).toEqual("1");
  });
});
