import mongoose from 'mongoose';

const projectDetailSchema = new mongoose.Schema({
	projectInfo:
		{ type: String, required: true },
	department:
		{ type: String, required: true },
	division:
		{ type: String, required: true },
	category:
		{ type: String, required: true },
	location:
		{ type: String, required: true },
	priority:
		{ type: String, required: true },
	endDate:
		{ type: String, required: true },
	reason:
		{ type: String, required: true },
	startDate:
		{ type: String, required: true },
	status:
		{ type: String, required: true },
	type: { type: String, required: true },
})

export const ProjectDetailschema = mongoose.model("projectDetailInfo", projectDetailSchema); 