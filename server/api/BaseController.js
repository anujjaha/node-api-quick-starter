import config from "@config";
import _ from "lodash";

class BaseController {
    queryParameter(params) {
        // page number
        let page = parseInt(params.page) || 0;

        // page  limit
        let limit = parseInt(params.limit) || 10;

        // record offset
        let offset = (page==0) ? 0 : limit * (page - 1);

        return {
            offset: offset,
            limit: limit,
            order : [
                [
                    params.orderBy || 'id',
                    params.sortBy || 'DESC'
                ]
            ],
            filter: params.filter || ''
        }
    }

    /**
     * Success Response
     */
    successResponse(data, message, key = "data", code = 200)
    {
        return {
            status: true,
            message: message ? message : 'Success',
            code: 200,
            [key]: data
        };
    }

    /**
     * Failure Response
     */
    failureResponse(error, message, errorCode = 204)
    {
        return {
            status: false,
            error: error,
            message: message ? message : 'Failure',
            code: 200,
            errorCode: errorCode
        };
    }

    /**
     * Paginate Response
     *
     */
    paginateResponse(data, params, message = 'Success') {
        return {
            status: true,
            code: 200,
            message: message,
            paginate: {
                currentPage: (params.offset / params.limit) + 1,
                perPage: params.limit,
                total: data.count,
                pageCount: Math.ceil(data.count / params.limit),
                order: params.order,
                filterBy: params.filter
            },
            data : data.rows
        };
    }

    /**
     * respond.
     */
    respond(data, message) {
        return {
            status: 1,
            status_code: 200,
            errors: null,
            message: message,
            data : data
        };
    }

    /**
     * respond.
     */
    respondWithPagination(data, params) {
        return {
            status: 1,
            status_code: 200,
            errors: null,
            message: "",
            data : data.rows,
            paginate: {
                current_page: (params.offset / params.limit) + 1,
                per_page: params.limit,
                total_count: data.count,
                total_page: Math.ceil(data.count / params.limit),
                order: params.order,
                filter: params.filter
            }
        };
    }

    respondWithError(error, message, code) {
        return {
            status: 0,
            status_code: code || 500,
            errors: error,
            message: message,
            data : []
        };
    }
}

module.exports = BaseController;