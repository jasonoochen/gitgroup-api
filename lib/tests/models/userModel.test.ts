import { User } from "../../models/userModel";

test("basic", () => {
  User.getMe().then(d => {
    console.log(d.node_id);
    expect(0).toBe(0);
  });
});
