import Sequelize from "sequelize";

class BaseModel extends Sequelize.Model {
    static getById(modelId) {

    	console.log('modelId', modelId);
    	
        return this.findOne({
            where: { id: modelId },
        });
    }
}

module.exports = BaseModel;
