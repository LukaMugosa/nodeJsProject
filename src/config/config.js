require('dotenv').config();
const db = require('./database');
module.exports = {
	app: {
		port: process.env.APP_PORT || 3000,
		url: process.env.APP_URL || 'http://localhost:3000'
	},
	db: {
		database: db.database,
		user: db.username,
		password: db.password,
		options: {
			dialect: db.dialect,
			host: db.host
		}
	},
	auth: {
		jwtSecret: process.env.JWT_SECRET || 'secret',
		refreshJwtSecret: process.env.JWT_REFRESH_SECRET || 'refresh_secret',
		jwtTTL: process.env.JWT_TTL || "3600",
		refreshJwtTTL: process.env.JWT_TTL_REFRESH || "18400"
	},
	ipTrace: {
		wildcard: "###ipadress###",
		baseUrl: `https://ipapi.co/###ipadress###/json/`,
		defaultCountryISOCode: "ME",
		defaultCountryID: 242,
	},
	gamePlay: {
		maxPlayersPerDivision: 100,
		numberOfBots: 300
	},
	storage: {
		wallpapersStoragePath: '/AssetBundles/AlbumImages'
	}
}