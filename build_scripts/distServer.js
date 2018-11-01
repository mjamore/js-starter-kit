/* eslint-disable no-console */

import express from 'express';
import path from 'path';
import opn from 'opn';
import compression from 'compression';

const port = process.env.WEB_SERVER_PORT || 3001;
const app = express();

// Middleware configuration
// TO-DO: Make this actually work.  I think webpack-dev-server is causing an issue
app.use(compression());
app.disable('x-powered-by');
app.use(express.static('dist'));

// Application routes
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.get('/users', (req, res) => {
	res.json([
		{"id": 1, "firstName": "Bob", "lastName": "Smith", "email": "bob@gmail.com"},
		{"id": 2, "firstName": "Tammy", "lastName": "Norton", "email": "tnorton@yahoo.com"},
		{"id": 3, "firstName": "Tina", "lastName": "Lee", "email": "lee.tina@hotmail.com"}
	]);
});

app.listen(port, (err) => {
	if(err) {
		console.log(err);
	} else {
		opn(`http://localhost:${port}`);
	}
});
