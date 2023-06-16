const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
port = 3000;

mongoose.connect(process.env.DATABASE_URL, {
	useNewUrlParser: true,
});

const db = mongoose.connection;
db.on('error', (err) => console.log(err));
db.once('open', () =>
	console.log('connected to database')
);

app.use(express.json());

const subscribersRouter = require('./routes/subscribers');

app.use('/subscribers', subscribersRouter);

app.listen(port, () => {
	console.log('Server Started ');
});
