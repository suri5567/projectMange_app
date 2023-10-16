import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import {databaseConnection} from './databaseConnection.js'
import userAuthentication from './routes/userAuth.js'
import projectAllDetails from './routes/projectInfo.js'
import getCounterValue from './routes/counterInfo.js'
// inslization
dotenv.config();
const app = express();


// port
const PORT  = 5500 || process.env.PORT1;
const BASE_URL = process.env.BASE_URL

// middlewares
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

// databse connection
databaseConnection(process.env.MONGO_STRING).then(()=>{
     console.log("database is connected")
}).catch((error)=>{
    console.log(error.message);
})

app.use('/userAuth', userAuthentication);
app.use('/projectDetails', projectAllDetails);
app.use("/counterData", getCounterValue)

app.listen(PORT, ()=>{
	console.log("server started at port", PORT);
})