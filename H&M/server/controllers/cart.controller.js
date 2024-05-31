const { populate } = require('dotenv');
const Cart = require('../models/Cart');

const cartController = {};

cartController.addItemToCart = async (req, res) => {
	try {
		const { userId } = req;
		const { productId, size, qty } = req.body;

		// 유저를 가지고 카트 찾기
		// 유저가 만든 카트가 없다, 만들어주기
		// 카트에 들어가있는 아이템이냐?
		// 그렇다면 에러 ( 이미 아이템이 카트에 있습니다)
		// 카트에 아이템 추가

		let cart = await Cart.findOne({ userId });

		if (!cart) {
			cart = new Cart({ userId });
			await cart.save();
		}

		const existItem = cart.items.find((item) => item.productId.equals(productId) && item.size === size);
		if (existItem) {
			throw new Error('아이템이 이미 카트에 담겨 있습니다.');
		}

		cart.items = [...cart.items, { productId, size, qty }];
		await cart.save();

		return res.status(200).json({ status: 'success', data: cart, cartItemQty: cart.items.length });
	} catch (error) {
		res.status(400).json({ status: 'fail', error: error.message });
	}
};

cartController.getCart = async (req, res) => {
	try {
		const { userId } = req;
		const cart = await Cart.findOne({ userId }).populate({
			path: 'items',
			populate: {
				path: 'productId',
				model: 'Product',
			},
		});

		return res.status(200).json({ status: 'success', data: cart.items });
	} catch (error) {
		res.status(400).json({ status: 'fail', error: error.message });
	}
};

cartController.deleteCart = async (req, res) => {
	try {
		const { userId } = req;
		const cartItemId = req.params.id;
		console.log(cartItemId);
		const cart = await Cart.findOneAndUpdate(
			{ userId },
			{ $pull: { items: { productId: cartItemId } } },
			{ new: true }
		);

		if (!cart) throw new Error('삭제 할 수 없습니다.');

		return res.status(200).json({ status: 'success' });
	} catch (error) {
		res.status(400).json({ status: 'fail', error: error.message });
	}
};

cartController.updateCart = async (req, res) => {
	try {
		const { userId } = req;
		const cartItemId = req.params.id;
		const { qty } = req.body;
		const cart = await Cart.findOneAndUpdate(
			{ userId, 'items.productId': cartItemId }, // 찾을 조건
			{ $set: { 'items.$.qty': qty } }, // 업데이트 조건
			{ new: true }
		);

		if (!cart) throw new Error('업데이트 할 수 없습니다.');

		return res.status(200).json({ status: 'success' });
	} catch (error) {
		res.status(400).json({ status: 'fail', error: error.message });
	}
};

cartController.getCartItemCount = async (req, res) => {
	try {
		const { userId } = req;
		const cart = await Cart.findOne({ userId });
		console.log(cart.items.length);
		return res.status(200).json({ status: 'success', data: cart.items.length });
	} catch (error) {
		res.status(400).json({ status: 'fail', error: error.message });
	}
};

module.exports = cartController;
