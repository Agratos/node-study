const { populate } = require('dotenv');
const Order = require('../models/Order');
const productController = require('./product.controller');
const { randomStringGenerator } = require('../utils/randomStringGenerator');
const User = require('../models/User');
const orderController = {};

orderController.createOrder = async (req, res) => {
	try {
		const { userId } = req;
		const { shipTo, contact, totalPrice, orderList } = req.body;

		const insufficientStockItems = await productController.checkItemListStock(orderList);

		if (insufficientStockItems.length > 0) {
			const errorMessage = insufficientStockItems.reduce((total, item) => (total += item.message), '');
			throw new Error(errorMessage);
		}

		const newOrder = new Order({
			userId,
			totalPrice,
			shipTo,
			contact,
			items: orderList,
			orderNum: randomStringGenerator(),
		});

		await newOrder.save();
		// save 후에 카트를 비워주자
		res.status(200).json({ status: 'success', orderNum: newOrder.orderNum });
	} catch (error) {
		res.status(400).json({ status: 'fail', error: error.message });
	}
};

orderController.getMyOrder = async (req, res) => {
	try {
		const userId = req.userId;
		const orderList = await Order.find({ userId }).populate(`items.productId`).populate({
			path: 'userId',
			select: 'email',
		});

		res.status(200).json({ status: 'success', orderList: orderList });
	} catch (error) {
		res.status(400).json({ status: 'fail', error: error.message });
	}
};

orderController.getOrderList = async (req, res) => {
	try {
		const { page, ordernum, pageSize = 1 } = req.query;
		const condition = {
			...(ordernum && { orderNum: { $regex: ordernum, $options: 'i' } }),
		};

		const query = Order.find(condition).populate(`items.productId`).populate({
			path: 'userId',
			select: 'email',
		});

		let response = { status: 'success' };
		if (page) {
			// limit 몇개를 보낼지
			// skip 몇개를 건더뛰고 보여줄건지
			query.skip((page - 1) * pageSize).limit(pageSize);

			// 최종 몇개 페이지인지
			const totalItemNum = await Order.find(condition).count();
			const totalPageNum = Math.ceil(totalItemNum / pageSize);
			response.totalPageNum = totalPageNum;
		}

		const orderList = await query.exec();
		response.data = orderList;

		res.status(200).json(response);
	} catch (error) {
		res.status(400).json({ status: 'fail', error: error.message });
	}
};

orderController.updateOrder = async (req, res) => {
	try {
		const orderId = req.params.id;
		const userId = req.userId;
		//const { level } = await User.findById(userId);
		const { status } = req.body;
		console.log(status);
		await Order.findByIdAndUpdate({ _id: orderId }, { status }, { new: true });

		res.status(200).json({ status: 'success' });
	} catch (error) {
		res.status(400).json({ status: 'fail', error: error.message });
	}
};

module.exports = orderController;
