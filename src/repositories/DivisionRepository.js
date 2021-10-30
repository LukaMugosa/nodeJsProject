const {Division} = require('../models');
module.exports = {
    async findAllDivisions() {
        return await Division.findAll();
    }
}