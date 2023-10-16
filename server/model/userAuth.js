import mongoose from 'mongoose';

const userAuthSchema = new mongoose.Schema({
	email:{
		type:String,
		required:true,
	},
	password:{
		type:String,
		required:true,
	}
})

export const AuthModel = mongoose.model("authModel", userAuthSchema);