
import { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DashBord from './Pages/dashboard/DashBoard';
import CreateProject from './Pages/createproject/CreateProject';
import Login from './Pages/login/Login';
import { ContextApi } from './contextApi';
import ProjectList from './Pages/projectlist/ProjectList';
// import axios from 'axios';

function App() {
	const [auth, setAuth] = useState(false);
	const login = () => {
		setAuth(true);
	}

	const logout = () => {
		setAuth(false);
	};

	// const apiUrl = `https://mern-app-cv74.onrender.com/userAuth/check-auth`;

	// const getAuthData = async () => {
	// 	const response = await axios.get(apiUrl, {
	// 		withCredentials: true
	// 	  });

	// 	console.log("response", response);
	// 	try {
	// 		if (response?.status == 200) {
	// 			login();
	// 		} else {
	// 			logout();
	// 		}
	// 	}
	// 	catch (error) {
	// 		console.error('Error checking authentication:', error);
	// 	};
	// }

	// useEffect(() => {
	// 	getAuthData();
	// }, []);



	return (
		<ContextApi.Provider
			value={{ auth, login, logout }}
		>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={auth ? <Navigate to="/dashboard" /> : <Login />} />
					<Route
						path="/dashboard"
						element={auth ? <DashBord /> : <Navigate to="/" />}
					/>
					<Route
						path="/createproject"
						element={auth ? <CreateProject /> : <Navigate to="/" />}
					/>
					<Route
						path="/projectlist"
						element={auth ? <ProjectList /> : <Navigate to="/" />}
					/>
				</Routes>
			</BrowserRouter>
		</ContextApi.Provider>
	)
}

export default App
