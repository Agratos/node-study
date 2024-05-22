const exporess = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const indexRouter = require('./routes/index');
const app = exporess();

require('dotenv').config();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // req.body 가 객체로 인식
app.use('/api', indexRouter);

const mongoURI = process.env.LOCAL_DB_ADDRESS;
mongoose
	.connect(mongoURI)
	.then(() => console.log('monggose connected...'))
	.catch((error) => console.log('DB connection fail', error));

app.listen(process.env.PORT || 5000, () => {
	console.log('server on', process.env.PORT || 5000);
});
