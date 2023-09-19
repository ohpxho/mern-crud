const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const { expressjwt } = require('express-jwt');
const config = require('../../../config/config');

const signin = async (req, res) => {
	try {
		let user = await User.findOne({email: req.body.email});
		if(!user) return res.status(400).json({error: 'User not found'});
		if(!user.authenticate(req.body.password)) return res.status(400).json({error: 'Email or password is incorrect'});

		const token = jwt.sign({_id: user._id}, config.jwtSecret);

		res.cookie('t', token, { expire: new Date() + 9999 })
		
		return res.status(200).json({
		 	token,
		 	user: {
		 		_id: user._id,
		 		name: user.name,
		 		email: user.email
			}
		})
	} catch(err) {
		console.log(err);
		return res.status(400).json({error: 'Could not sign in'});
	}
};

const signout = (req, res) => {	
	res.clearCookie('t');
	res.status(200).json({message: 'signed out'});
};

const requireSignin = expressjwt({
	secret: config.jwtSecret,
 	requestProperty: 'auth',
 	algorithms: ["HS256"]
});

const hasAuthorization = (req, res, next) => {
	const authorized = req.profile && req.auth && req.profile._id == req.auth._id;
	if(!authorized) res.status(400).json({error: 'User is not authorized'});
	next();
}

module.exports = { signin, signout, requireSignin, hasAuthorization }

