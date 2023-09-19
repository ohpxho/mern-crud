const config = require('../config/config.js');
const app = require('./express');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise

mongoose.connect(
	config.mongoURI, 
	{ 
		useNewUrlParser: true,
 		useUnifiedTopology: true 
 	} 
);

mongoose.connection.on('error', (err) => {
 throw new Error(err);
})

app.listen(config.port, (err) => {
	if(err) console.error(err);
	console.info(`Server started on port: ${config.port}`);
});