const monggose = require('mongoose');
const User = require('./User');
const Product = require('./Product');

require('dotenv').config();

const Schema = monggose.Schema;

const favoriteSchema = Schema(
	{
		userId: { type: monggose.ObjectId, ref: User },
		favorite: [{ type: monggose.ObjectId, ref: Product }],
	},
	{
		timestamp: true,
	}
);

const Favorite = monggose.model('Favorite', favoriteSchema);

module.exports = Favorite;
