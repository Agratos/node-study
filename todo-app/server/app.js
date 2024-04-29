const exporess = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const indexRouter = require('./routes/index');
const app = exporess();

app.use(cors());
app.use(bodyParser.json());
app.use('/api', indexRouter);

const mongoURL = 'mongodb://127.0.0.1:27017/todo-app';

mongoose
	.connect(mongoURL, { useNewUrlParser: true })
	.then(() => {
		console.log('mongoose connected');
	})
	.catch((error) => {
		console.log('DB connection fail: ', error);
	});

app.listen(5000, () => {
	console.log('server on 5000');
});
