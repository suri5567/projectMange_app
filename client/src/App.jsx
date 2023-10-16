import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import DashBord from './Pages/dashboard/DashBoard'
import CreateProject from './Pages/createproject/CreateProject'
import Login from './Pages/login/Login'
import { ContextApi } from './contextApi'
import ProjectList from './Pages/projectlist/ProjectList'

function App() {
	const [auth, setAuth] = useState(false);
	const login = () => {
		setAuth(true);
	}

	const logout = () => {
		setAuth(false);
	};

	return (
		<ContextApi.Provider
			value={{ auth, login, logout }}
		>

			<BrowserRouter>
				<>
					<Routes>
						<Route path="/" element={<Login />} />
						<Route path="/dashboard" element={<DashBord />} />
						<Route path="/createproject" element={<CreateProject />} />
						<Route path="/projectlist" element={<ProjectList />} />
					</Routes>
				</>
			</BrowserRouter>
		</ContextApi.Provider>
	)
}

export default App


