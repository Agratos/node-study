const express = require('express');
const app = express();
const port = 5000;

// app.get('/', (req, res) => {
// 	res.send('Hello World');
// });

const token = 'token';

const checkAuth = (req, res, next) => {
	console.log('admin permission');
	next();
};

const checkToken = (req, res, next) => {
	if (token) {
		next();
	}
	res.send('you dont have token');
};

const getUser = (req, res) => {
	res.send('user Info');
};

app.get('/users', checkAuth, checkToken, getUser);

app.listen(port, () => {
	console.log('Example app listening port 5000');
});
