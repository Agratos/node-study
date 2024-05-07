const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const Schema = mongoose.Schema;

const usersSchema = Schema(
	{
		email: {
			type: String,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

// 데이터를 보낼때 password를 제외
usersSchema.methods.toJSON = function () {
	const obj = this._doc;
	delete obj.password;
	delete obj.updatedAt;
	delete obj.__v;
	return obj;
};

usersSchema.methods.generateToken = function () {
	const token = jwt.sign({ _id: this._id }, JWT_SECRET_KEY, { expiresIn: '1d' });
	return token;
};
const User = mongoose.model('User', usersSchema);

module.exports = User;
