const bycript = require('bcryptjs');
const User = require('../models/User');

const authController = {};

authController.loginWithEmail = async (req, res) => {
	try {
		const { email, password } = req.body;
		let user = await User.findOne({ email });
		if (user) {
			const isMatch = await bycript.compare(password, user.password);
			if (isMatch) {
				// token
				const token = await user.generateToken();
				return res.status(200).json({ status: 'success', user, token });
			}
		} else {
			throw new Error('비밀번호와 이메일이 유효하지 않습니다.');
		}
	} catch (error) {
		res.status(400).json({ status: 'fail', error: error.message });
	}
};

module.exports = authController;
