const DivisionService = require('../services/DivisionService');
const {sendResponse} = require('../utils/RequestHandler');
const {httpCodes} = require("../errors/ExceptionErrors");
const {sendErrorMessage} = require("../errors/ExceptionTranslator");
module.exports = {
    async fetchAllDivisions (req, res) {
        try {
            const divisions = await DivisionService.getAllDivisions();
            sendResponse(res, divisions, httpCodes.HTTP_OK);
        } catch (e) {
            sendErrorMessage(res, e);
        }
    }
}