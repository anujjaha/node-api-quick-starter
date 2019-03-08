import BaseRepository from "@api/BaseRepository";
import { Country } from "@db/db-connect";
import { transformPromise } from "@helpers";

class CountryRepository extends BaseRepository {
    constructor() {
        super(Country);
    }

    async getById(id) {
        const [error, collection] = await transformPromise(this.find({
            where: { id },
            include: ["State"],
        }));

        return new Promise(((resolve, reject) => {
            if(collection)
            {
                resolve(collection);
            }

            if(error !== null) {
                reject(error);
            }

            reject(error);
        }));
    }

    async list(queryConfig) {
        const [error, collection] = await transformPromise(this.all(queryConfig));

        return new Promise(((resolve, reject) => {
            if (error !== null) {
                reject(error);
            }

            resolve(collection);
        }));
    }
}

module.exports = new CountryRepository();