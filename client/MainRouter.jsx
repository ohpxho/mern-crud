import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './auth/PrivateRoute';
import Home from './core/Home.jsx';
import Users from './user/Users.jsx';
import Signup from './user/Signup.jsx';
import Signin from './auth/Signin.jsx';
import Profile from './user/Profile.jsx';
import EditProfile from './user/EditProfile.jsx'

const MainRouter = () => {
	return (
		<div>
			<Routes>
				<Route path="/" element={<Home/>}/>
				<Route path="/users" element={<Users/>} />
				<Route path="/signup" element={<Signup/>}/>
				<Route path="/signin" element={<Signin/>}/>
				<Route path="/user/:userId" element={<Profile/>} />
				<Route path="/user/edit/:userId" element={<PrivateRoute/>}>
					<Route path="/user/edit/:userId" element={<EditProfile/>} />
				</Route>
			</Routes>
		</div>
	);
};

export default MainRouter;