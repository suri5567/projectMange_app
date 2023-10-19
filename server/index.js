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

app.use(cors({
	origin: ['http://localhost:5173', 'https://6530f45a20bf3d00a2575042--stately-maamoul-c108a0.netlify.app/'],
	methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
	credentials: true,
}));
app.use(cookieParser()); 
const PORT = process.env.PORT1 || 5500;
app.use(express.json())

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