const {sequelize} = require('../models');
const {GET_USER_FRIENDS_ORDERED_BY_METERS} = require("../constants/RawQueryConstants");
const {QueryTypes} = require("sequelize");
const {Achievement} = require('../models');
module.exports = {
	async test(req, res) {
		const data = [
			{
				id: 1,
				name: 'Luka Mugosa'
			},
			{
				id: 2,
				name: 'Ivana Djukic'
			},
			{
				id: 3,
				name: 'Andjela Mugosa'
			},
			{
				id: 4,
				name: req.headers['x-forwarded-for']
			},
			{
				id: 4,
				name: req.headers['x-forwarded-for']
			},
			{
				res: await Achievement.scope('withLevels').findAll()
			},
		]
		res.status(200).json(data);
	}
}