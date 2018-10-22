// lib/app.ts
import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";
import * as config from "config";
import { MainRoute } from "./routes/mainRoute";

class App {
  public app: express.Application;
  public mongoUrl: string;
  public routeProvider: MainRoute = new MainRoute();

  constructor() {
    this.app = express();
    this.config();
    this.mongoUrl = `mongodb://${config.get("mongo.user")}:${config.get(
      "mongo.password"
    )}@${config.get("mongo.url")}`;
    this.mongoSetup();
    this.routeProvider.routes(this.app);
  }

  private config(): void {
    // support application/json type post data
    this.app.use(bodyParser.json());
    //support application/x-www-form-urlencoded post data
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }

  private mongoSetup(): void {
    mongoose.Promise = global.Promise;
    mongoose.connect(this.mongoUrl);
  }
}

export default new App().app;
