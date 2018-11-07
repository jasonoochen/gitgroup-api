import { User } from "../../models/userModel";

let testUser : User;
describe("test user class constructor", () => {
  it("should create a new user object with basic name and id", () => {
    const user: User = new User("1", "test name"); 
    expect(user).toMatchObject({
      id: "1",
      name: "test name"
    });
  });
});

beforeEach(() => {
  testUser = new User("1", "test name");
});

describe("The function getId()", () => {
  it("should return the correct id of the User object", () => {
    expect(testUser.getId()).toEqual("1");
  });
});

describe("The function getName()", () => {
  it("should return the correct name of the User object", () => {
    expect(testUser.getName()).toEqual("test name");
  });
});
