import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { databaseConnection } from './databaseConnection.js'
import userAuthentication from './routes/userAuth.js'
import projectAllDetails from './routes/projectInfo.js'
import getCounterValue from './routes/counterInfo.js'

// inislization
dotenv.config();
const app = express();
const PORT = 5500;
app.use(cookieParser()); 
app.use(cors({
	origin: ['http://localhost:5500', 'http://localhost:5173'],
	methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
	credentials: true,
}));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


// databse connection
databaseConnection(process.env.MONGO_STRING).then(() => {
	console.log("database is connected")
}).catch((error) => {
	console.log(error.message);
})

// routes
app.use('/userAuth', userAuthentication);
app.use('/projectDetails', projectAllDetails);
app.use("/counterData", getCounterValue)

// server start
app.listen(PORT, () => {
	console.log("server started at port", PORT);
})