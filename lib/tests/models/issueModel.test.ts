import { Issue } from "../../models/issueModel";

let testIssue: Issue;

describe("Test the constructor of the Issue.", () => {
  it("should create a new Issue object when the input is correct.", () => {
    const issueObj: Issue = new Issue(       /*adjust orders to match constructor*/
      "1",
      "test title",
      "test body",
      "test owner",
      "test repos",
      "open"
    );
    expect(issueObj).toMatchObject({        /*adjust orders to match constructor*/
      id: "1",
      title: "test title",
      body: "test body",
      owner: "test owner",
      repos: "test repos",
      state: "open"
    });
  });
  it("should throw a RangeError when the input state is neither 'open' nor 'close'", () => {
    const constructorWithWrongInput = () => {   /*adjust orders to match constructor*/
      return new Issue(
        "1",
        "test title",
        "test body",
        "test owner",
        "test repos",
        "Noropenclose"
      );
    };
    expect(constructorWithWrongInput).toThrow(RangeError);
  });
});

beforeEach(() => {
  testIssue = new Issue(
    "1",
    "test title",
    "test body",
    "test owner",
    "test repos",
    "open"
  );
});

describe("The function getId()", () => {
  it("should return the correct id of the Issue object", () => {
    expect(testIssue.getId()).toEqual("1");
  });
});
