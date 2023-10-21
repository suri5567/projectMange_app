// ProjectCard.js
import React from "react";
import '../styles/projectCard.css'
import { Box, Text, Button, Heading } from "@chakra-ui/react";
import axios from 'axios';



const ProjectCard = ({
	projectInfo,
	StartDate,
	EndDate,
	Reason,
	Type,
	Division,
	Category,
	Priority,
	Department,
	Location,
	Status,
	setEditingWorkItem,
	id,
}) => {

	const handleProjectEdit = async (text, id) => {
		try {
			let res = await axios.patch(`https://mern-app-cv74.onrender.com/projectDetails/editProject/${id}`, { status: text });
			console.log("res", res)
			setEditingWorkItem(Math.random(2));
		} catch (err) {
			console.log(err);
			alert("Internal server error!!!");
		}
	}

	return (
		<Box border="1px solid lightgray cardtable" backgroundColor={"white"} borderRadius="15px" borderColor="gray" p={5} marginTop={"20px"} style={{ boxShadow: "0px 5px 5px  lightgray", padding:"16px" }}>
			<div className="d-flex justify-content-between">
				<Heading fontSize="lg" fontWeight="600" color="gray.700">
					{projectInfo}
				</Heading>
				<Text fontSize="sm" className="" fontWeight="bold" color="blue.600">
					{Status}
				</Text>
			</div>
			<Text fontSize="sm" style={{ color: "#808080" }}>
				{StartDate} to {EndDate}
			</Text>

			<Text fontSize="sm" >
				<span style={{ color: "#808080" }}>Reason: <span className="topisc">{Reason}</span></span>
			</Text>
			<div className="d-flex">
				<Text fontSize="sm" >
					<span style={{ color: "#808080" }}>Type: <span className="topisc">{Type}</span></span>{" "}
				</Text>{<div className="dot-div"></div>}
				<Text fontSize="sm" >
					<span style={{ color: "#808080" }}>Category: <span className="topisc">{Category}</span></span>
				</Text>
			</div>
			<div className="d-flex">
				<Text fontSize="sm" >
					<span style={{ color: "#808080" }}>Div:<span className="topisc">{Division}</span></span>{"  "}
				</Text>
				<Text fontSize="sm">
					<span style={{ color: "#808080" }}>Dept: <span className="topisc">{Department}</span></span>
				</Text>
			</div>
			<Text fontSize="sm">
				<span style={{ color: "#808080" }}>Location: <span className="topisc">{Location}</span></span>
			</Text>
			<Text fontSize="sm">
				<span style={{ color: "#808080" }}>Priority: <span className="topisc">{Priority}</span></span>
			</Text>
			<Box mt={4}>
				<div className="btn-toolbar ms-3 flex-nowrap" role="toolbar" aria-label="Toolbar with button groups">
					<div className="btn-group me-2 " role="group" aria-label="First group">
						<Button
							size="sm"
							borderRadius="md"
							colorScheme="blue"
							variant="solid"
							className="btn btn-primary rounded-pill ps-4 pe-4"
							fontWeight={400}
							w="100%"
							onClick={() => handleProjectEdit("Running", id)}
						>
							Start
						</Button>
					</div>
					<div className="btn-group me-2" role="group" aria-label="First group">
						<Button
							size="sm"
							borderRadius="md"
							className="btn btn-outline-primary rounded-pill ps-4 pe-4"
							colorScheme="blue"
							variant="outline"
							fontWeight={400}

							w="100%"
							onClick={() => handleProjectEdit("Closed", id)}
						>
							Close
						</Button>
					</div>
					<div className="btn-group me-2" role="group" aria-label="First group">
						<Button
							size="sm"
							className="btn btn-outline-primary rounded-pill ps-4 pe-4"
							borderRadius="md"
							colorScheme="blue"
							variant="outline"
							fontWeight={400}

							w="100%"
							onClick={() => handleProjectEdit("Cancelled", id)}
						>
							Cancel
						</Button>
					</div>
				</div>
			</Box>
		</Box>
	);
};

export default ProjectCard;
