import { User } from "../../models/userModel";

describe("test user class constructor", () => {
  it("should create a new user object with basic name and id", () => {
    const user: User = new User("test name", "1");
    expect(user).toMatchObject({
      id: "1",
      name: "test name"
    });
  });
});
