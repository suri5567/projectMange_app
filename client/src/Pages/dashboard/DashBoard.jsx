import config from '../../config';
import React, { useEffect, useState } from 'react';
import Charts from '../../components/Charts';
import axios from 'axios';
import "../../styles/dashBoardPage.css";
import Navbar from '../../components/NavBar';
import HeadTop from '../../Pages/utility/Heading';

const DashBoard = () => {
	const [counter, setCounter] = useState({});
    const apiUrl = `${config.backendBaseUrl}/counterData/getCounterInfo`;
	  const getCount = async() => {
	    try{
	      let res = await axios.get(apiUrl);
	      setCounter(res.data);
	    }catch(err){
	      console.log(err)
	    }
	  }

	  useEffect(()=>{
	    getCount();
	  }, [])

	return (
		<div className='d-flex dashboard'>
			<Navbar />
			<div className='dashboard-main'>
				<HeadTop title={"Dashboard"} />
				<div className='d-flex justify-content-between gap-4 statusInfo' >
					<div className="cardInfo shadow-sm p-3 pt-2 bg-white rounded ">
						<p>Total Projects</p>
						<h2>{counter?.totalProjects}</h2>
					</div>
					<div className="cardInfo shadow-sm p-3 bg-white rounded pt-2 ">
						<p>Closed</p>
						<h2>{counter?.closedProjects}</h2>
					</div>
					<div className="cardInfo shadow-sm p-3 bg-white rounded pt-2 ">
						<p>Running</p>
						<h2>{counter?.runningProjects}</h2>
					</div>
					<div className="cardInfo shadow-sm p-3 bg-white rounded pt-2 ">
						<p>Closure Delay</p>
						<h2>{counter?.runningExpiredProjects}</h2>
					</div>
					<div className="cardInfo shadow-sm p-3 bg-white rounded pt-2 ">
						<p>Cancelled</p>
						<h2>{counter?.cancelledProjects}</h2>
					</div>
				</div>
				<div className='chartInfo'>
					<h5 className='mb-4 mt-4' style={{color:"white"}}>Department Wise-Total vs Closed</h5>
					<Charts />
				</div>
			</div>
		</div>
	)
}

export default DashBoard