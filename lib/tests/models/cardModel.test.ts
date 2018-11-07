import { Card } from "../../models/cardModel";

describe("Test the construct of the Card class", () => {
  it("should create the correct object", () => {
    const cardObj = new Card(
      "1",
      "test title",
      "test body",
      "test owner",
      "test repos",
      "open",
      "test note"
    );
    expect(cardObj).toMatchObject({
      id: "1",
      title: "test title",
      body: "test body",
      owner: "test owner",
      repos: "test repos",
      state: "open",
      note: "test note"
    });
  });
});
