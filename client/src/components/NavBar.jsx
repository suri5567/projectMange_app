import React, { useContext } from 'react'
import highlightedProject from "../assets/create-project-active.svg";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import "../styles/navbar.css";
import { ContextApi } from '../contextApi';
import createProject from "../assets/create-project.svg";
import highlightedDb from "../assets/Dashboard-active.svg";
import dashboardSvg from "../assets/Dashboard.svg";
import logoutIcon from "../assets/Logout.svg";
import projectListSvg from "../assets/Project-list.svg";
import highlightedDbList from "../assets/Project-list-active.svg";

const Navbar = () => {
	const { logout } = useContext(ContextApi);
	const { pathname } = useLocation();
	const navigate = useNavigate();

	const logoutUser = () => {
		logout();
		navigate("/");
	}

	return (
		<div className="sidePanel">
			<div className="childContainer">
				<div className='mainDiv d-flex justify-content-between'>
					<div className='d-flex flex-grow-1 align-items-center justify-content-center pt-1 pb-1'>
						<Link to={"/dashboard"}>
							<img src={pathname === "/dashboard" ? highlightedDb : dashboardSvg} alt='' />
						</Link>
					</div>
				</div>
				<div className='d-flex justify-content-between' >
					<div className='d-flex flex-grow-1 align-items-center justify-content-center pt-1 pb-1'>
						<Link to={"/projectList"}>
							<img src={pathname === "/projectList" ? highlightedDbList : projectListSvg} alt='' />
						</Link>
					</div>
				</div>
				<p className='createProjectInfo'></p>
				<div className='d-flex justify-content-between' >
					<div className='d-flex flex-grow-1 align-items-center justify-content-center pt-1 pb-1'>
						<Link to={"/createproject"}>
							<img src={pathname === "/createproject" ? highlightedProject : createProject} alt='' />
						</Link>
					</div>
				</div>
			</div>
			<div className="logoutInfo">
				<img src={logoutIcon} alt='' onClick={() => logoutUser()} style={{ paddingTop: "28px" }} />
			</div>
		</div>
	)
}

export default Navbar