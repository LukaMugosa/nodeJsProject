const RequestHandler = require('../utils/RequestHandler');
const {httpCodes} = require('../errors/ExceptionErrors');
const PlayService = require('../services/PlayService');
const {sendErrorMessage} = require('../errors/ExceptionTranslator');
module.exports = {

	async storeResult(req, res) {
		try {
			const play = await PlayService.storeUserResult(req.body, req.headers['authorization']);
			RequestHandler.sendResponse(res, play, httpCodes.HTTP_OK);
		}catch (e) {
			sendErrorMessage(res, e);
		}
	}

}