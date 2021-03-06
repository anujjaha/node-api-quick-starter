import GeneralError from "@util/generalError";
import BaseController from "@api/BaseController";
import UserRepository from "./user.repository";

class UserController extends BaseController {
    constructor() {
        super();
        this.repository = UserRepository;
    }

    loggedInUser(req, res) {
    	res.send(super.successResponse(req.user.transform()));
    }
}

module.exports = new UserController();
