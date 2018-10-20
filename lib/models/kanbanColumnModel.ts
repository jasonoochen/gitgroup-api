import { Card } from "./cardModel";
import { githubApiPreview } from "remoteConnection/github/githubAPI";

export class KanbanColumn {
  private id: string;
  private kanbanId: string;
  private name: string;
  private cards: Card[];

  constructor(kanbanId: string, name: string, cards: Card[], id?: string) {
    if (id) this.id = id;
    this.kanbanId = kanbanId;
    this.name = name;
    this.cards = cards;
  }

  public getId(): string {
    return this.id;
  }

  public getKanbanId(): string {
    return this.kanbanId;
  }

  public getName(): string {
    return this.name;
  }

  public setName(colName: string): void {
    this.name = colName;
  }

  public getCards(): Card[] {
    let cards: Card[] = [];
    for (let card of this.cards) {
      cards.push(card);
    }
    return cards;
  }

  public async save(): Promise<any> {
    const post = {
      name: this.name
    };
    let result: any;
    try {
      result = await githubApiPreview.post(
        `/projects/${this.kanbanId}/columns`,
        post
      );
      this.id = result.data.node_id;
    } catch (error) {
      throw error;
    }
    return result;
  }
}
