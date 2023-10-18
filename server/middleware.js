import express from 'express'
import {getUserToken} from './utility.js'
import cookieParser from 'cookie-parser';

const app = express();
app.use(cookieParser()); 

export const checkAlreadyLoggedIn = (req, res) => {
	const cookieUid = req.cookies?.uid;
	// console.log("cookieUid", cookieUid);
	try {
	  if (!cookieUid) {
		return res.status(403).json({ msg: "Cookie not found!!!" });
	  } else {
		const loginStatus = getUserToken(cookieUid);
		if (!loginStatus) {
		  res.clearCookie('uid'); 
		  return res.status(403).json({ msg: "Invalid user!!!" });
		} else {
		  return res.status(200).json({ msg: "User Already loggedIn !!!" });
		}
	  }
	} catch (error) {
	  return res.status(500).json({ msg: "Internal server error" });
	}
  }
  