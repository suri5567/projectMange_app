import React from 'react'
import '../styles/projecTable.css'
import axios from 'axios';


const ProjectTable = ({ list, setEditingWorkItem }) => {
	
	const monthsInfo = [
		"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	
	const changeTimeDate = (dateInfo) => {
		const date = new Date(dateInfo);
		return `${monthsInfo[date.getMonth()]}-${date.getDate()}, ${date.getFullYear()}`;
	}

	  const handleProjectEdit = async(text, id) => {
	    try{
	      let res = await axios.patch(`https://project-manage-mern-app.onrender.com/projectDetails/editProject/${id}`, {status: text});
	      setEditingWorkItem(Math.random(2))
	    }catch(err){
	      console.log(err)
	       alert("Internal server error!!!")
	    }
	  }

	return (
		<div className="dashboard" id="container1" >
			<table className='table'>
				<thead>
					<tr className='table-primary'>
						<th>Project Name</th>
						<th>Reason</th>
						<th>Type</th>
						<th>Division</th>
						<th>Category</th>
						<th>Priority</th>
						<th>Dept</th>
						<th>Location</th>
						<th>Status</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{
						list?.map((item) => (
							<tr key={item._id} >
								<td>
									<p>{item?.projectInfo}</p>
									<p>{changeTimeDate(item?.startDate)} to {changeTimeDate(item?.endDate)}</p>
								</td>
								<td>{item?.reason}</td>
								<td>{item?.type}</td>
								<td>{item?.division}</td>
								<td>{item?.category}</td>
								<td>{item?.priority}</td>
								<td>{item?.department}</td>
								<td>{item?.location}</td>
								<td id="bold">{item?.status}</td>
								<td>
									<div className='d-flex gap-3'>
										<button id="btn1" onClick={() => handleProjectEdit("Running....", item._id)}>Start</button>
										<button id="btn2" onClick={() => handleProjectEdit("Closed", item._id)}>Close</button>
										<button id="btn3" onClick={() => handleProjectEdit("Cancelled", item._id)}>Cancel</button>
									</div>
								</td>
							</tr>
						))
					}
				</tbody>
			</table>
		</div>
	)
}

export default ProjectTable