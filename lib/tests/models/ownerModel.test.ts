import { User } from "../../models/userModel";
import { Owner } from "./../../models/ownerModel";

describe("test owner class constructor", () => {
  it("should create a new basic class with id and name", () => {
    const owner: Owner = new Owner("1","test name");
    expect(owner).toMatchObject({
      id: "1",
      name: "test name"
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
