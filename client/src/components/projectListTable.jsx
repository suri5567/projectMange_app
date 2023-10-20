
import Table from 'react-bootstrap/Table';
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
		      let res = await axios.patch(`https://mern-app-cv74.onrender.com/projectDetails/editProject/${id}`, {status: text});
		      setEditingWorkItem(Math.random(2))
		    }catch(err){
		      console.log(err)
		       alert("Internal server error!!!")
		    }
		  }
  return (
    <div className='p-lg-3 p-md-3 p-sm-1'>
		{list ? ( 
      <Table responsive="sm">
        <thead className='table-info'>
          <tr>
		  	<th style={{whiteSpace:"nowrap"}}>Project Name</th>
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
				<tr key={item._id}> 
						<td>
							<p style={{fontWeight:"bold"}}>{item?.projectInfo}</p>
							<p>{changeTimeDate(item?.startDate)} to {changeTimeDate(item?.endDate)}</p>
						</td>
						<td>{item?.reason}</td>
						<td>{item?.type}</td>
						<td>{item?.division}</td>
						<td>{item?.category}</td>
						<td>{item?.priority}</td>
						<td>{item?.department}</td>
						<td>{item?.location}</td>
						<td id="bold"><b>{item?.status}</b></td>
						<td>
							<div className='d-flex gap-3'>
								<button className='btn btn-primary rounded-pill ps-4 pe-4' id="btn1" onClick={() => handleProjectEdit("Running....", item._id)}>Start</button>
								<button className='btn btn-outline-primary outlined rounded-pill ps-4 pe-4' id="btn2" onClick={() => handleProjectEdit("Closed", item._id)}>Close</button>
								<button className='btn btn-outline-primary outlined rounded-pill ps-4 pe-4' id="btn3" onClick={() => handleProjectEdit("Cancelled", item._id)}>Cancel</button>
							</div>
						</td>
				</tr>
			))
		}
        </tbody>
      </Table>
		):<div style={{fontSize:"20px", fontWeight:"bold"}}>Loading data please wait.....</div>}
    </div>
  );
}

export default ProjectTable;