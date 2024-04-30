const exporess = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const indexRouter = require('./routes/index');
const app = exporess();

require('dotenv').config();

app.use(cors());
app.use(bodyParser.json());
app.use('/api', indexRouter);

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
