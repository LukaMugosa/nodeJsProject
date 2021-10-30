module.exports = {
	httpCodes: {
		HTTP_OK: 200,
		HTTP_CREATED: 201,
		NO_CONTENT: 204,
		BAD_REQUEST: 400,
		UNAUTHENTICATED: 401,
		ACCESS_FORBIDDEN: 403,
		NOT_FOUND: 404,
		UNPROCESSABLE_ENTITY: 422,
		SERVER_ERROR: 500
	},
	errorMessages: {
		UNAUTHENTICATED: {
			code: "E100",
			message: "Unauthenticated"
		},
		NOT_FOUND: {
			code: "E101",
			message: "Entity not found"
		},
		SERVER_ERROR: {
			code: "E102",
			message: "Server error"
		},
		BAD_REQUEST: {
			code: "E103",
			message: "Bad action"
		},
		USERNAME_EXISTS: {
			code: "E104",
			message: "Username already exists"
		},
		CANT_CHANGE_USERNAME: {
			code: "E105",
			message: "You are not allowed to change Your username."
		},
		CANT_CHANGE_COUNTRY: {
			code: "E106",
			message: "You are not allowed to change Your country."
		},
		EXTERNAL_SERVICE_FAILED: {
			code: "E107",
			message: "External api has failed"
		},
		FRIENDSHIP_EXISTS: {
			code: "E108",
			message: "This friendship already exists."
		},
		FRIENDSHIP_WITH_SELF: {
			code: "E109",
			message: "This friendship cannot be established."
		},
		ACHIEVEMENT_CANNOT_BE_CLAIMED: {
			code: "E110",
			message: "This achievement cannot be claimed."
		},
		INVALID_LEVELS_SENT: {
			code: "E111",
			message: "The sent levels do not belong to selected achievement."
		},
		INSUFFICIENT_FUNDS: {
			code: "E112",
			message: "You don't have enough points."
		},
		SLOT_LIMIT_REACHED: {
			code: "E113",
			message: "Slot limit has been reached."
		},
		SOMETHING_WENT_WRONG: {
			code: "E114",
			message: "Something went wrong. Try again later."
		},
		ALREADY_UNLOCKED: {
			code: "E115",
			message: "Skin is already unlocked."
		},
		IS_NOT_UNLOCKED: {
			code: "E116",
			message: "Skin is has not been unlocked."
		},
		ACCESS_FORBIDDEN: {
			code: "E117",
			message: "Access forbidden."
		}
	}
}
