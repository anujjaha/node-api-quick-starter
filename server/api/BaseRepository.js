class BaseRepository {
    constructor(model) {
        this.model = model;
    }

    find(query) {
        // Search by attributes
        if (typeof query === "object") {
            return this.model.findOne(query);
        }

        // Search by id ( findById deprecrated)
        if (typeof query === "number") {
            return this.model.findByPk(query);
        }
    }

    all(query = null) {
        if (query != null || query != {}) {
            return this.model.findAll(query);
        }

        return this.model.findAll();
    }

    paginate(query = null) {
        return this.model.findAndCountAll(query);
    }
}

module.exports = BaseRepository;