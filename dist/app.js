"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// lib/app.ts
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const config = require("config");
const mainRoute_1 = require("./routes/mainRoute");
class App {
    constructor() {
        this.routeProvider = new mainRoute_1.MainRoute();
        this.app = express();
        this.config();
        this.mongoUrl = `mongodb://${config.get("mongo.user")}:${config.get("mongo.password")}@${config.get("mongo.url")}`;
        this.mongoSetup();
        this.routeProvider.routes(this.app);
    }
    config() {
        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }
    mongoSetup() {
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl);
    }
}
exports.default = new App().app;
//# sourceMappingURL=app.js.map