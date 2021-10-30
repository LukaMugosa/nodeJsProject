const Joi = require("joi");
const ExceptionTranslator = require("../errors/ExceptionTranslator");
const {sendResponse} = require("../utils/RequestHandler");
const {httpCodes} = require("../errors/ExceptionErrors");
module.exports = {
    validateAchievementClaim(req, res, next) {
        const schema = Joi.object({
            achievementId: Joi.number().required().min(1).integer(),
            currentLevelId: Joi.number().required().min(1).integer(),
        });
        const error = ExceptionTranslator.validateRequest(schema, req);
        if(error) {
            return sendResponse(res, error, httpCodes.UNPROCESSABLE_ENTITY);
        }
        next();
    }
}