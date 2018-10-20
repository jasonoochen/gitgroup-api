import { User } from "../../models/userModel";

describe("test class User", () => {
  test("function getMe() should return the Promise of my user information", () => {
    return User.getMe()
      .then(user => {
        console.log(user);
        expect(typeof user.getId()).toBe("string");
        expect(typeof user.getName()).toBe("string");
      })
      .catch(err => {
        console.log(err);
      });
  });
});
