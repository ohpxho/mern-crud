require('dotenv').config();

const config = {
	env: process.env.NODE_ENV || 'development',
	port: process.env.PORT || 3000,
	jwtSecret: process.env.JWT_SECRET || '',
	mongoURI: process.env.MONGODB_URI || ''
}

module.exports = config;