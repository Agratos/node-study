const monggose = require('mongoose');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const Schema = monggose.Schema;

const userSchema = Schema(
	{
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		name: { type: String, required: true },
		level: { type: String, default: 'admin' }, //customer
	},
	{
		timestamp: true,
	}
);

userSchema.methods.toJSON = function () {
	const obj = this._doc;
	delete obj.password;
	delete obj.__v;
	delete obj.updatedAt;
	delete obj.createdAt;

	return obj;
};

userSchema.methods.generateToken = async function () {
	const token = await jwt.sign({ _id: this._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
	return token;
};

const User = monggose.model('User', userSchema);

module.exports = User;
