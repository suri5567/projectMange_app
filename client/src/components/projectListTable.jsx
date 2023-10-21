30
import React from "react";
import { ButtonGroup, useMediaQuery } from "@chakra-ui/react";
import ProjectCard from "./ProjectCard";
import axios from 'axios';
import { Table, Icon, Thead, Tbody, Tr, Th, Td, TableContainer, Heading, Text, Button } from "@chakra-ui/react";

const ProjectTable = ({ list, setEditingWorkItem }) => {
	const [isMobile] = useMediaQuery("(max-width: 768px)");

	const monthsInfo = [
		"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

	const changeTimeDate = (dateInfo) => {
		const date = new Date(dateInfo);
		return `${monthsInfo[date.getMonth()]}-${date.getDate()}, ${date.getFullYear()}`;
	}

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
		<>
			{isMobile ? (
				list?.map((ele) => (
					<ProjectCard
						key={ele?._id}
						projectInfo={ele?.projectInfo}
						Category={ele?.category}
						Division={ele?.division}
						Location={ele?.location}
						StartDate={ele?.startDate}
						EndDate={ele?.endDate}
						Priority={ele?.priority}
						Status={ele?.status}
						Type={ele?.type}
						Reason={ele?.reason}
						Department={ele?.department}
						id={ele?._id}
						setEditingWorkItem={setEditingWorkItem}
					/>
				))
			) : (
				
				<TableContainer borderRadius={5} w={"100%"} boxShadow="md" style={{marginLeft:"0"}}>
				<Table size={"sm"} variant="simple" w={"100%"} >
				  <Thead style={{backgroundColor:"rgba(0, 0, 0, 0.08)"}}>
					<Tr>
					  <Th style={{ padding: "10px", margin: "18px" }}>Project Name</Th>
					  <Th style={{ padding: "14px", margin: "8px" }}>Reason</Th>
					  <Th style={{ padding: "14px", margin: "8px" }}>Type</Th>
					  <Th style={{ padding: "14px", margin: "8px" }}>Division</Th>
					  <Th style={{ padding: "14px", margin: "8px" }}>Category</Th>
					  <Th style={{ padding: "14px", margin: "8px" }}>Priority</Th>
					  <Th style={{ padding: "14px", margin: "8px" }}>Dept</Th>
					  <Th style={{ padding: "14px", margin: "8px" }}>Location</Th>
					  <Th style={{ padding: "14px", margin: "8px" }}>Status</Th>
					  <Th></Th>
					</Tr>
				  </Thead>
				  <Tbody w={"100%"}>
					{list?.map((item, index) => (
					  <Tr key={item._id} bgColor={index % 2 === 0 ? 'gray.100' : 'white'}>
						<Td style={{ padding: "8px", margin: "8px" }}>
						  <Heading fontWeight={600} fontSize={"17px"} color={"gray.700"}>
							{item.projectInfo}
						  </Heading>
						  <Text fontSize={"13px"} color={"gray.500"}>
							{changeTimeDate(item?.startDate)} to {changeTimeDate(item?.endDate)}
						  </Text>
						</Td>
						<Td style={{ padding: "15px", margin: "15px" }}>{item?.reason}</Td>
						<Td style={{ padding: "15px", margin: "8px" }}>{item?.type}</Td>
						<Td style={{ padding: "15px", margin: "8px" }}>{item?.division}</Td>
						<Td style={{ padding: "15px", margin: "8px" }}>{item?.category}</Td>
						<Td style={{ padding: "15px", margin: "8px" }}>{item?.priority}</Td>
						<Td style={{ padding: "15px", margin: "8px" }}>{item?.department}</Td>
						<Td style={{ padding: "15px", margin: "8px" }}>{item?.location}</Td>
						<Td style={{ padding: "15px", margin: "8px" }} fontWeight={"bold"}>{item?.status}</Td>
						<Td style={{ padding: "8px", margin: "8px" }} display={"flex"} gap={5}>
						<div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
						  <div className="btn-group me-2" role="group" aria-label="First group">
						  <Button
							size={"sm"}
							borderRadius={20}
							className="btn btn-primary rounded-pill ps-4 pe-4"
							colorScheme="blue"
							variant={"solid"}
							fontWeight={400}
							w={"80px"}
							p={2}
							_hover={{ bg: 'blue.500' }}
							onClick={() => handleProjectEdit("Running", item?._id)}
						  >
							Start
						  </Button>
						  </div>
						  <div className="btn-group me-2" role="group" aria-label="First group">
						  <Button
							size={"sm"}
							borderRadius={20}
							className="btn btn-outline-primary rounded-pill ps-4 pe-4"
							colorScheme="blue"
							p={2}
							w={"80px"}
							fontWeight={400}
							variant={"outline"}
							_hover={{ bg: 'blue.500' }}
							onClick={() => handleProjectEdit("Closed", item._id)}
						  >
							Close
						  </Button>
						  </div>
						  <div className="btn-group me-2" role="group" aria-label="First group">
						  <Button
							size={"sm"}
							borderRadius={20}
							colorScheme="blue"
							fontWeight={400}
							p={2}
							w={"80px"}
							variant={"outline"}
							_hover={{ bg: 'blue.500' }}
							onClick={() => handleProjectEdit("Cancelled", item._id)}
							className="btn btn-outline-primary rounded-pill ps-4 pe-4"
						  >
							Cancel
						  </Button>
						  </div>
						  </div>
						</Td>
					  </Tr>
					))}
				  </Tbody>
				</Table>
			  </TableContainer>
			)}
		</>
	);
};

export default ProjectTable;

