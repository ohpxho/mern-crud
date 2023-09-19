const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const compress = require('compression');

//comment out before building for production
const devBundle = require('./devBundle')

const app = express()

//comment out before building for production
devBundle.compile(app)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(compress())
app.use(helmet({
    contentSecurityPolicy: false
}))
app.use(cors())

const CURRENT_WORKING_DIR = process.cwd();
app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')));

const userRoutes = require('./api/routes/user.routes');
const authRoutes = require('./api/routes/auth.routes');
app.use('/', userRoutes);
app.use('/', authRoutes);

const template = require('../template.js');

app.get('*', (req, res) => {
	res.status(200).send(template());
});

app.use((err, req, res, next) => {
	if (err.name === 'UnauthorizedError') {
		res.status(401).json({"error" : err.name + ": " + err.message})
	} else if (err) {
		res.status(400).json({"error" : err.name + ": " + err.message})
		console.log(err)
	}
})

module.exports = app