import express from 'express';
const router = express.Router();
import { handleCreateProject, handleEditExitingProject, handleGetProjectList, departmentWiseInfo } from '../controllers/projectInfo.js'

router.post('/createProject', handleCreateProject);
router.patch('/editProject/:id', handleEditExitingProject);
router.get('/getAllData', handleGetProjectList);
router.get("/departmentInfo", departmentWiseInfo);


export default router;