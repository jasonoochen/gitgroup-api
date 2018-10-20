import { Card } from "../../models/cardModel";

describe("Test the construct of the Card class", () => {
  it("should create the correct object", () => {
    const cardObj = new Card(
      "1",
      "test title",
      "test body",
      "open",
      "test note"
    );
    expect(cardObj).toMatchObject({
      id: "1",
      title: "test title",
      body: "test body",
      state: "open",
      note: "test note"
    });
  });
});
