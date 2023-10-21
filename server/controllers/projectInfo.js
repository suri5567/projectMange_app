import { response } from 'express';
import { ProjectDetailschema } from '../model/projectDetails.js'

export const handleCreateProject = async (req, res) => {
	const { projectInfo, department, type, division, endDate, category, startDate, location, priority, status, reason } = req.body;
	try {
		if (!req.body || !projectInfo || !department || !type || !division || !endDate || !category || !startDate || !location || !priority || !status || !reason) {
			res.status(400).json({ msg: "Improper data entered!!!" })
		} else {
			const response = new ProjectDetailschema(req.body)
			response.save();
			return res.status(201).json({ msg: "Project created successfully Done !!!", Success: true })
		}

	} catch (error) {
		res.status(500).json({ msg: "internal server error" })
	}
}

export const handleEditExitingProject = async (req, res) => {
	const { id } = req.params;
	const { status } = req.body;
	try {
		const handleUpdateProject = await ProjectDetailschema.findByIdAndUpdate(
			id,
			{ status },
			{ new: true }
		);

		if (handleUpdateProject) {
			res.json({
				message: `Project successfully ${status}`,
				success: true,
			});
		} else {
			res.status(404).json({ message: 'Project not found' });
		}
	} catch (err) {
		console.log(err)
		res.status(500).json({ message: 'Internal server error' });
	}
};


export const handleGetProjectList = async (req, res) => {
	try {
		const searchTerm = req.query.searchTerm || '';
		const sort = req.query.sort || 'createdAt';
		const query = {};
		const page = parseInt(req.query.page) || 1;
		const limit = parseInt(req.query.limit) || 6;

		if (searchTerm) {
			query.$or = [
				{ projectTitle: { $regex: searchTerm, $options: 'i' } },
				{ category: { $regex: searchTerm, $options: 'i' } },
				{ division: { $regex: searchTerm, $options: 'i' } },
				{ location: { $regex: searchTerm, $options: 'i' } },
				{ department: { $regex: searchTerm, $options: 'i' } },
				{ priority: { $regex: searchTerm, $options: 'i' } },
				{ reason: { $regex: searchTerm, $options: 'i' } },
				{ type: { $regex: searchTerm, $options: 'i' } },
			];
		}

		const totalCount = await ProjectDetailschema.countDocuments(query);
		const totalPages = Math.ceil(totalCount / limit);

		const projects = await ProjectDetailschema.find(query)
			.sort({ [sort]: 1 })
			.skip((page - 1) * limit)
			.limit(limit);

		res.json({
			totalCount,
			projects,
			totalPages,
		});
	} catch (error) {
		console.error(err);
		res.status(500).json({ message: 'Internal server error' });
	}
};


export const departmentWiseInfo = async (req, res) => {
	try {
		const data = await ProjectDetailschema.aggregate([
			{
				$group: {
					_id: "$department",
					totalRegistered: { $sum: 1 },
					totalClosed: { $sum: { $cond: [{ $eq: ['$status', 'Closed'] }, 1, 0] } }
				}
			},
			{
				$group: {
					_id: null,
					departments: { $push: "$_id" },
					totalRegistered: { $push: "$totalRegistered" },
					totalClosed: { $push: "$totalClosed" }
				}
			}
		]);
		res.json(data[0]);
	} catch (err) {
		res.status(500).json({ message: 'Internal Server Error' });
	}
};
