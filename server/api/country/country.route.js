const router = require("express").Router();
const CountryController = require("./country.controller");

class CountryRoutes {
    constructor() {
        this.router = router;
        this.controller = CountryController;

        this.parameterizedRoute();
        this.initRoutes();
    }

    parameterizedRoute() {
        this.router.param("id", async (req, res, next, id) => {
            const response = await this.controller.params(req, res, next, id);

            if (response != undefined) {
                next(response.errors);
            }
        });
    }

    initRoutes() {
        this.router.get("/countries", (req, res, next) => this.controller.index(req, res, next));
        this.router.get("/countries/:id", (req, res, next) => this.controller.getById(req, res, next));
    }
}

module.exports = new CountryRoutes().router;