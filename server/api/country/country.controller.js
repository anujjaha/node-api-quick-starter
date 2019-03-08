import CountryRepository from "./country.repository";
import GeneralError from "@util/generalError";
import logger from "@util/logger";
import BaseController from "@api/BaseController";
import CountryTransformer from "./country.transformer";
import { transformPromise } from "@helpers";

class CountryController extends BaseController {
    constructor() {
        super();
        this.repository = CountryRepository;
    }

    async params(req, res, next, id) {
        if (isNaN(id)) {
            return super.respondWithError(new GeneralError("Id should be numeric", 422), null, 422);
            //return super.failureResponse(new GeneralError("Id should be numeric", 422), null, 422);
        }

        const [error, country] = await transformPromise(this.repository.getById(id));

        if (error !== null) {
            logger.error(error);
            next();
        }

        if(country)
        {
            req.country = CountryTransformer.transform(country);
        }

        next();
    }

    async index(req, res, next) {
        const queryString = req.query;
        const queryConfig = super.queryParameter(queryString);

        if (queryString.hasOwnProperty("dropdown") && queryString.dropdown == "true") {
            queryConfig.attributes = ["id", "name"];
        }

        const [error, countries] = await transformPromise(this.repository.paginate(queryConfig));
            
        // Transform Data
        countries.rows = CountryTransformer.transformCollection(countries.rows);
        
        if (error !== null) {
            logger.error(error);
            res.send(super.failureResponse(error, error.error_message, 500));
        }

        res.send(super.paginateResponse(countries, queryConfig));
    }

    getById(req, res, next) {
        const country = req.country;

        if (country) {
            res.send(super.successResponse(country));
        } else {
            
            res.send(super.failureResponse(["Country not found"], "Country not found", 404));
        }
    }
}

module.exports = new CountryController();