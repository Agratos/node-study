const monggose = require('mongoose');
const Schema = monggose.Schema;

const userSchema = Schema(
	{
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		name: { type: String, required: true },
		level: { tyhpe: String, default: 'customer' },
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

const User = monggose.model('User', userSchema);

module.exports = User;