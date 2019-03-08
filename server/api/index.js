const router = require("express").Router();
const countryModule = require("./country/country.route");
const userModule = require("./user/user.route");

class ApiRoutes {
    constructor() {
        this.router = router;

        this.loadRoutes();
    }

    loadRoutes()
    {
        this.router.use("/", userModule);
        this.router.use("/", countryModule);
    }
}

module.exports = new ApiRoutes().router;