import '../../styles/dashBoardPage.css'
import React, { useState } from 'react';
import Navbar from '../../components/NavBar';
import Logo from "../../assets/Logo.svg";
import "../../styles/projectCreate.css";
import axios from "axios";
import HeadingTop from '../utility/Heading';

const ProjectForm = () => {
	const [formData, setFormData] = useState({projectInfo: "", department: "Strategy", division: "Compressor", category: "Quality A", location: "Pune", priority: "High", reason: "Business", type: "Internal", endDate: '', startDate: '' });
	const [submitError, setSubmitError] = useState("");
	const [errors, setErrors] = useState({
		projectInfo: "",
		start: "",
		end: ""
	});

	const active = true;

	const updateFormData = (e) => {
		const { name, value } = e.target;
		setErrors({ ...errors, [name]: '' });
		setFormData({ ...formData, [name]: value });
	  }
	  

	const validateForm = (data) => {
		let tempErrors = { ...errors };
		if ("projectInfo" in data) {
			tempErrors.projectInfo = data.projectInfo === "" ? "Please provide project theme" : "";
		}
		if ("startDate" in data) {
			tempErrors.start = data.startDate === "" ? "Start date is required" : "";
		}
		if ("endDate" in data) {
			tempErrors.end = data.endDate === "" ? "End date is required" : "";
		}
		setErrors({ ...tempErrors });
	}
	const apiUrl = `https://mern-app-cv74.onrender.com/projectDetails/createProject`;
	const registerProject = async (data) => {
		try {
			let res = await axios.post(apiUrl, data);
				// alert("Project details added successfully!!!");
				setSubmitError({msg:"Project Added successfully !!!"})
		} catch (error) {
			console.log(error.message)
		}
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		validateForm(formData);
		if (!errors.projectInfo && !errors.start && !errors.end) {
			registerProject({ ...formData, status: "Registered" });
		}
	}

	const getCurrentDate = () => {
		const currentDate = new Date();
		const day = currentDate.getDate();
		const month = currentDate.getMonth() + 1;
		const year = currentDate.getFullYear();
		const formattedDay = day < 10 ? `0${day}` : day;
		const formattedMonth = month < 10 ? `0${month}` : month;
		return `${year}-${formattedMonth}-${formattedDay}`;
	}

	const getMinEndDate = (startDate) => {
		const nextDate = new Date(startDate);
		nextDate.setDate(nextDate.getDate() + 1);
		const day = nextDate.getDate();
		const month = nextDate.getMonth() + 1;
		const year = nextDate.getFullYear();
		const formattedDay = day < 10 ? `0${day}` : day;
		const formattedMonth = month < 10 ? `0${month}` : month;
		return `${year}-${formattedMonth}-${formattedDay}`;
	}

	const handleStartDateBlur = (e) => {
		const startDate = e.target.value;
		if (startDate) {
		  setErrors({ ...errors, start: '' });
		}
	  }
	  
	  const handleEndDateBlur = (e) => {
		const endDate = e.target.value;
		if (endDate) {
		  setErrors({ ...errors, end: '' });
		}
	  }
	

	return (
		<div className='dashboard'>
			<Navbar />
			<div className='dashboard-main'>
				<HeadingTop iconSvg={<p className={"fa fa-fw fa-chevron-left field-icon-alt"}></p>} active={active} title={"Create Project"} />
				<div className="outerDiv">
					<div className="submitDiv shadow-lg bg-white rounded-2 pb-4">
						<form onSubmit={handleSubmit}>
							<div className='d-flex justify-content-between p-4 align-items-start'>
								<div className='w-100'>
									<input type='text' placeholder='Enter the project theme' className='themetitle' onChange={updateFormData} name='projectInfo' />
									{errors.projectInfo && <div style={{ color: "red", fontSize: "15px" }}>{errors.projectInfo}</div>}
								</div>
								<button className='submit-form-btn' type='submit'>Save Project</button>
							</div>
							<div className='form-option p-4'>
								<div className='single-form-option'>
									<p className='form-option-title'>Reason</p>
									<select onChange={updateFormData} name='reason' defaultValue={'Business'}>
										<option value="Business">Business</option>
										<option value="DealerShip">DealerShip</option>
										<option value="Social or NGO work">Social or NGO work</option>
									</select>
								</div>

								<div className='single-form-option'>
									<p className='form-option-title'>Type:</p>
									<select onChange={updateFormData} name='type' defaultValue={'Internal'}>
										<option value="Internal">Internal</option>
										<option value="External">External</option>
										<option value="Vendor">Vendor</option>
									</select>
								</div>

								<div className='single-form-option'>
									<p className='form-option-title'>Division</p>
									<select onChange={updateFormData} name='division' defaultValue={'Compressor'}>
										<option value="Compressor">Compressor</option>
										<option value="Boiler">Boiler</option>
										<option value="Electronic Module">Electronic Module</option>
										<option value="Seats">Seats</option>
										<option value="Harness">Harness</option>
									</select>
								</div>

								<div className='single-form-option'>
									<p className='form-option-title'>Category:</p>
									<select onChange={updateFormData} name='category' defaultValue={'Category A'}>
										<option value="Category A">Category A</option>
										<option value="Category B">Category B</option>
										<option value="Category C">Category C</option>
										<option value="Category D">Category D</option>
									</select>
								</div>

								<div className='single-form-option'>
									<p className='form-option-title'>Priority:</p>
									<select onChange={updateFormData} name='priority' defaultValue={'High'}>
										<option value="High">High</option>
										<option value="Low">Low</option>
										<option value="Medium">Medium</option>
									</select>
								</div>

								<div className='single-form-option'>
									<p className='form-option-title'>Department:</p>
									<select onChange={updateFormData} name='department' defaultValue={'Strategy'}>
										<option value="Strategy">Strategy</option>
										<option value="Quality">Quality</option>
										<option value="Finance">Finance</option>
										<option value="PPC">PPC</option>
									</select>
								</div>

								<div className='single-form-option'>
									<p className='form-option-title' style={{ color: errors.start ? "red" : "" }}>Project Start Date</p>
									<input type='date' onChange={updateFormData} name='startDate' min={getCurrentDate()} value={formData.startDate} onBlur={handleStartDateBlur} />
										{errors.start && <p style={{ color: "red", fontSize: "15px" }}>{errors.start}</p>}
								</div>

								<div className='single-form-option'>
									<p className='form-option-title' style={{ color: errors.end ? "red" : "" }}>Project End Date</p>
									<input type='date' onChange={updateFormData} min={getMinEndDate(formData.startDate)} name='endDate' value={formData.endDate}  onBlur={handleEndDateBlur}/>
									{errors.end && <p style={{ color: "red", fontSize: "15px" }}>{errors.end}</p>}
								</div>

								<div className='single-form-option'>
									<p className='form-option-title'>Location:</p>
									<select onChange={updateFormData} name='location' defaultValue={'Pune'}>
										<option value="Noida">Noida</option>
										<option value="Bangalore">Bangalore</option>
										<option value="Mumbai">Haryana</option>
										<option value="Delhi">Delhi</option>
										<option value="U.P">U.P</option>
										<option value="Chandigarh">Chandigarh</option>
									</select>
								</div>
							</div>
							<div className='d-flex justify-content-end status-option'>
								<span>Status: <h6>Registered</h6></span>
							</div>
							{submitError?.msg && <p style={{ color: 'red', fontSize: "20px", marginLeft:"35%", fontWeight:'bold' }}>{submitError.msg}</p>}
							<button className='submit-form-btn-2' type='submit'>Save Project</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ProjectForm;
