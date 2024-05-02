const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const indexRouter = require('./routes/index');
const app = express();

require('dotenv').config();

app.use(
	cors({
		origin: '*',
	})
);
app.use(bodyParser.json());
app.use(
	'/api',
	(req, res, next) => {
		console.log('Received a request from:', req.origin);
		next();
	},
	indexRouter
);

const mongoURL = process.env.MONGODB_URI;

mongoose
	.connect(mongoURL, { useNewUrlParser: true })
	.then(() => {
		console.log('mongoose connected');
	})
	.catch((error) => {
		console.log('DB connection fail: ', error);
	});

app.listen(process.env.PORT || 5000, () => {
	console.log(`server on ${process.env.PORT || 5000}`);
});
