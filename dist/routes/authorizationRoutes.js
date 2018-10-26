"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authorization_1 = require("./../models/authorization");
class AuthorizationRoutes {
    constructor() {
        this.router = express_1.Router();
        this.router.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "http://localhost:3000/");
            res.header("Access-Control-Allow-Headers");
            next();
        });
        //[method: get, url: /user/auth] - used to get the github authorization request page
        this.router.get("/", (req, res) => __awaiter(this, void 0, void 0, function* () {
            const auth = new authorization_1.Authorization();
            return res.redirect("https://www.google.com"
            // url.format({
            //   pathname: auth.getGithubAuthUrl(),
            //   query: {
            //     client_id: auth.getClientId()
            //   }
            // })
            );
        }));
        this.router.post("/callback", (req, res) => { });
    }
    routes(app) {
        app.use("/user/auth", this.router);
    }
}
exports.AuthorizationRoutes = AuthorizationRoutes;
//# sourceMappingURL=authorizationRoutes.js.map