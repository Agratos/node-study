const Product = require('../models/Product');

const productController = {};

productController.createProduct = async (req, res) => {
	try {
		const { sku, name, image, category, description, price, stock, status } = req.body;
		const product = new Product({ sku, name, image, category, description, price, stock, status });
		await product.save();
		res.status(200).json({ status: 'success', product });
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

		const condition = {
			...(name && { name: { $regex: name, $options: 'i' } }),
			isDeleted: false,
		};

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

productController.getProductDetail = async (req, res) => {
	try {
		const productId = req.params.id;
		const product = await Product.findOne({ _id: productId });
		if (!product) throw new Error('상품이 존재하지 않습니다.');
		res.status(200).json({ status: 'success', product });
	} catch (error) {
		res.status(400).json({ status: 'fail', error: error.message });
	}
};

productController.updateProduct = async (req, res) => {
	try {
		const productId = req.params.id;
		const { sku, name, image, category, description, price, stock, status } = req.body;
		const product = await Product.findByIdAndUpdate(
			{ _id: productId },
			{ sku, name, image, category, description, price, stock, status },
			{ new: true }
		);
		if (!product) throw new Error('상품이 존재하지 않습니다.');
		res.status(200).json({ status: 'success' });
	} catch (error) {
		res.status(400).json({ status: 'fail', error: error.message });
	}
};

productController.deleteProduct = async (req, res) => {
	try {
		const productId = req.params.id;
		const product = await Product.findByIdAndUpdate({ _id: productId }, { isDeleted: true }, { new: true });
		if (!product) throw new Error('상품이 존재하지 않습니다.');
		res.status(200).json({ status: 'success' });
	} catch (error) {
		res.status(400).json({ status: 'fail', error: error.message });
	}
};

productController.getNewSku = async (req, res) => {
	try {
		const lastDocument = await Product.findOne({}, null, { sort: { _id: -1 } });

		let temp = Number(lastDocument.sku.replace('sku', '')) + 1;
		let newSku = `sku${String(temp).padStart(3, '0')}`;

		res.status(200).json({ status: 'success', sku: newSku });
	} catch (error) {
		res.status(400).json({ status: 'fail', error: error.message });
	}
};

productController.checkStock = async (item) => {
	// 내가 사려는 아이템 재고 정보들고오기
	// 내가 사려는 아이템 qty, 재고 비교
	// 재고가 불충분하다면 불충분 메시지와함께 데이터 반환

	const product = await Product.findById(item.productId);

	if (product.stock[item.size] < item.qty) {
		return { isVerify: false, message: `${product.name}의 ${item.size}재고가 부족합니다` };
	}
	const newStock = { ...product.stock };

	newStock[item.size] -= item.qty;
	product.stock = newStock;
	await product.save();
	return { isVerify: true };
};

productController.checkItemListStock = async (itemList) => {
	const insufficientStockItems = [];
	// 재고 확인 로직
	await Promise.all(
		itemList.map(async (item) => {
			const stockCheck = await productController.checkStock(item);
			if (!stockCheck.isVerify) {
				insufficientStockItems.push({ item, message: stockCheck.message });
			}
			return stockCheck;
		})
	);

	return insufficientStockItems;
};

module.exports = productController;
