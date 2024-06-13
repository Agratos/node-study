const Favorite = require('../models/Favorite');

const favoriteController = {};

favoriteController.getFavorite = async (req, res) => {
	try {
		const { userId } = req;
		const temp = await Favorite.findOne({ userId }).populate({
			path: 'favorite', // favorite 배열의 각 ObjectId를 Product 문서로 변환
			model: 'Product', // 참조할 모델 이름
		});

		return res.status(200).json({ status: 'success', data: temp?.favorite ?? [] });
	} catch (error) {
		res.status(400).json({ status: 'fail', error: error.message });
	}
};

favoriteController.updateFavorite = async (req, res) => {
	try {
		const { userId } = req;
		const objectId = req.params.id;

		const temp = await Favorite.findOneAndUpdate(
			{ userId },
			{ $push: { favorite: objectId } },
			{ new: true, upsert: true }
		);

		return res.status(200).json({ status: 'success' });
	} catch (error) {
		res.status(400).json({ status: 'fail', error: error.message });
	}
};

favoriteController.deleteFavorite = async (req, res) => {
	try {
		const { userId } = req;
		const objectId = req.params.id;
		await Favorite.findOneAndUpdate({ userId }, { $pull: { favorite: objectId } });

		return res.status(200).json({ status: 'success' });
	} catch (error) {
		res.status(400).json({ status: 'fail', error: error.message });
	}
};

module.exports = favoriteController;
