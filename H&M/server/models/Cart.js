const monggose = require('mongoose');
const User = require('./User');
const Product = require('./Product');

const Schema = monggose.Schema;

const cartSchema = Schema(
	{
		userId: { type: monggose.ObjectId, ref: User },
		items: [
			{
				productId: { type: monggose.ObjectId, ref: Product },
				size: { type: String, required: true },
				qty: { type: Number, required: true, default: 1 },
			},
		],
	},
	{
		timestamp: true,
	}
);

cartSchema.methods.toJSON = function () {
	const obj = this._doc;
	delete obj.__v;
	delete obj.updatedAt;
	delete obj.createdAt;

	return obj;
};

const Cart = monggose.model('Cart', cartSchema);

module.exports = Cart;
