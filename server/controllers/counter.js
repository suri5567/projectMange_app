
import { ProjectDetailschema } from '../model/projectDetails.js'


export const handleCounter = async (req, res) => {
	try {
		const counters = await ProjectDetailschema.aggregate([
			{
				$group: {
					_id: null,
					totalProjects: { $sum: 1 },
					closedProjects: {
						$sum: {
							$cond: [{ $eq: ['$status', 'Closed'] }, 1, 0]
						}
					},
					runningProjects: {
						$sum: {
							$cond: [{ $eq: ['$status', 'Running'] }, 1, 0]
						}
					},
					runningExpiredProjects: {
						$sum: {
							$cond: [
								{
									$and: [
										{ $eq: ['$status', 'Running'] },
										{ $lt: ['$endDate', new Date()] }
									]
								},
								1,
								0
							]
						}
					},
					cancelledProjects: {
						$sum: {
							$cond: [{ $eq: ['$status', 'Cancelled'] }, 1, 0]
						}
					}
				}
			}
		]);

		if (counters.length > 0) {
			res.json(counters[0]);
		} else {
			res.json({
				totalProjects: 0,
				closedProjects: 0,
				runningProjects: 0,
				runningExpiredProjects: 0,
				cancelledProjects: 0
			});
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Internal server error' });
	}
}

