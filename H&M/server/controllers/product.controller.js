const Product = require('../models/Product');

const productController = {};

productController.createProduct = async (req, res, next) => {
	try {
		const { sku, name, size, image, category, description, price, stock, status } = req.body;
		const product = new Product({ sku, name, size, image, category, description, price, stock, status });
		await product.save();
		//res.status(200).json({ status: 'success', product });
		next();
	} catch (error) {
		res.status(400).json({ status: 'fail', error: error.message });
	}
};

productController.getProducts = async (req, res) => {
	try {
		const { page, name, pageSize = 1 } = req.query;
		// if (name) {
		// 	const products = await Product.find({ name: {$reges:name, $option: "i"} });
		// } else {
		// 	const products = await Product.find({});
		// }

		const condition = name ? { name: { $regex: name, $options: 'i' } } : {};

		let query = Product.find(condition);
		let response = { status: 'success' };
		if (page) {
			// limit 몇개를 보낼지
			// skip 몇개를 건더뛰고 보여줄건지
			query.skip((page - 1) * pageSize).limit(pageSize);

			// 최종 몇개 페이지인지
			const totalItemNum = await Product.find(condition).count();
			const totalPageNum = Math.ceil(totalItemNum / pageSize);
			response.totalPageNum = totalPageNum;
		}
		const productList = await query.exec();

		response.data = productList;

		// setTimeout(() => {
		// 	res.status(200).json(response);
		// }, 10000);
		res.status(200).json(response);
	} catch (error) {
		res.status(400).json({ status: 'fail', error: error.message });
	}
};

module.exports = productController;
