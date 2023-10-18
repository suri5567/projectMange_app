import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

export const setUserCookie = (user) => {
	const payload = {
	  userId: user._id,
	  email: user.email,
	  password:user.password
	};
	return jwt.sign(payload, process.env.JWT_SCREAT_KEY);
  }

export const getUserToken=(token)=>{
  return jwt.verify(token, process.env.JWT_SCREAT_KEY);
}