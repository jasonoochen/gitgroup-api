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
const userModel_1 = require("./../models/userModel");
class UserRoutes {
    constructor() {
        this.router = express_1.Router();
        /**
         * GET /user
         */
        this.router.get("/", authorization_1.Authorization.authenticate, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user = yield userModel_1.User.getUser(req);
            res.status(200).send(user);
        }));
    }
    /**
     * Bound all the routes
     * @param app express application
     */
    routes(app) {
        app.use("/user", this.router);
    }
}
exports.UserRoutes = UserRoutes;
//# sourceMappingURL=userRoutes.js.map