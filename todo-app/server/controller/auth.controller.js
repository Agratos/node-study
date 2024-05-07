require('dotenv').config();
const jwt = require('jsonwebtoken');

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const authController = {};

authController.authenticate = async (req, res, next) => {
	try {
		const tokenString = req.headers.authorization;
		if (!tokenString || !tokenString.startsWith('Bearer ')) {
			throw new Error('Invalid token');
		}

		const token = tokenString.replace('Bearer ', '');

		jwt.verify(token, JWT_SECRET_KEY, (error, payload) => {
			if (error) throw new Error('Invalid token');

			//res.status(200).json({ status: 'Success', userId: payload._id });
			req.userId = payload._id;
			next();
		});
	} catch (error) {
		res.status(400).json({ status: 'fail', message: error.message });
	}
};

module.exports = authController;
