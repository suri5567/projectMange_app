// import config from '../../config';
import logo from "../../assets/Logo.svg";
import React, { useEffect, useState } from 'react';
import "../../styles/listOfProjects.css";
import Table from '../../components/projectListTable';
import HandlePagination from '../../components/Pagination';
import axios from 'axios';
import HeadTop from '../utility/Heading';
import Navbar from '../../components/NavBar';


const ProjectList = () => {
	let active = true;
	const [searchTerm, setSearchTerm] = useState("");
	const [list, setList] = useState([]);
	const [editingWorkItem, setEditingWorkItem] = useState(0);
	const [sortingOption, setSortingOption] = useState("");
	const [currentPage, setCurrentPage] = useState(1);

	const handleSearch = (e) => {
		setSearchTerm(e.target.value);
	}


	useEffect(() => {
	  loadProjects();
	}, [currentPage, sortingOption, searchTerm, editingWorkItem]);

	const apiUrl = `https://mern-app-cv74.onrender.com/projectDetails/getAllData?page=${currentPage}&limit=5&sort=${sortingOption}&searchTerm=${searchTerm}`;
	
	const loadProjects = async() => {
		try{
		  let res = await axios.get(apiUrl);
		  setList(res?.data);
		}catch(err){
		  console.log(err)
		}
	  }

	return (
		<div className='d-flex dashboard'>
			<Navbar />
			<div className='dashboard-main'>
				<HeadTop iconImg={<span className={"fa fa-fw fa-chevron-left field-icon"}></span>} active={active} title={"Project Lists"} />
				<div className='tableContainer1'>
					<div className="tableContainer2">

						 <div className='d-flex justify-content-between functionality-menu'>
							<div className="d-flex justify-content-start align-items-center search1">
								<span className="fa fa-search search-icon"></span>
								<input type="text" className="form-control search" placeholder="Search something ..." onChange={handleSearch} />
							</div>
							<div className="d-flex align-items-center justify-content-center sorting">
								<p>Sort By</p>
								<select onChange={(e) => setSortingOption(e.target.value)}>
									<option value="department">department</option>
									<option value="reason">reason</option>
									<option value="priority">priority</option>
									<option value="type">type</option>
									<option value="location">location</option>
									<option value="division">division</option>
									<option value="category">category</option>
								</select>
							</div>
						</div> 
						<Table list={list?.projects} setEditingWorkItem={setEditingWorkItem} />
					</div>
					<div className='handlePage'>
						<HandlePagination totalPages={list?.totalPages} active={currentPage} handlePage={setCurrentPage} />
					</div>
				</div>
			</div>
		</div>
	);
}

export default ProjectList;
