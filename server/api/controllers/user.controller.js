const User = require('../models/user.model');
const assignIn = require('lodash/assignIn');
const errorHandler = require('../helpers/dbErrorHandler');

const create = async (req, res) => {
	const user = new User(req.body);
	try {
		if(req.body.password == '' || req.body.password == undefined) return res.status(400).json({error: 'Password is required'})
		
		await user.save();
		return res.status(200).json({message: 'Successfully signed up!'})
	} catch(err) {
		return res.status(400).json({error: errorHandler.getErrorMessage(err)})
	}
};

const list = async (req, res) => {
	try {
		let users = await User.find().select('name email updated created');
		res.status(200).json(users);
	} catch(err) {
		return res.status(400).json({error: errorHandler.getErrorMessage(err)});
	}
};

const userByID = async (req, res, next, id) => {
	try {
		let user = await User.findById(id);
		if(!user) return res.status(400).json({error: 'User not found'});
		req.profile = user;
		next();
	} catch(err) {
		return res.status(400).json({error: "Couldn't retrieve user"});
	}
};

const read = (req, res) => {
	req.profile.hashed_password = undefined;
	req.profile.salt = undefined;
	return res.status(200).json(req.profile);
};

const update = async (req, res) => {
	try {
		let user = req.profile;
		user = assignIn(user, req.body);
		user.updated = Date.now();
		await user.save();
		user.hashed_password = undefined;
		user.salt = undefined;
		return res.status(200).json(user);
	} catch(err) {
		return res.status(400).json({error: errorHandler.getErrorMessage(err)})
	}
};

const remove = async (req, res) => {
	try {
		let user = req.profile;
		let deletedUser = await User.deleteOne({_id: user._id});
		console.log(deletedUser)
		deletedUser.hashed_password = undefined;
		deletedUser.salt = undefined;
		res.status(200).json(deletedUser);
	} catch(err) {
		return res.status(400).json({error: errorHandler.getErrorMessage(err)});
	}
};

module.exports = {create, list, userByID, read, update, remove}
