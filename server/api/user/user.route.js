import authMiddleware from "@middleware/authMiddleware";
import UserController from "./user.controller";

const router = require("express").Router();

class UserRoutes {
    constructor() {
        this.router = router;
        this.controller = UserController;

        this.initRoutes();
    }

    initRoutes() {
		this.router.get("/me", authMiddleware, (req, res, next) => this.controller.loggedInUser(req, res, next));
 	}
}

module.exports = new UserRoutes().router;
