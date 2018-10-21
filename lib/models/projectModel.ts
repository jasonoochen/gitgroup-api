import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

export const ProjectSchema = new Schema({
  name: {
    type: String,
    required: true
  }
});

export class Project {
  private id: string;
  private name: string;
}
