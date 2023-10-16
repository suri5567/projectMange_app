
import {AuthModel} from '../model/userAuth.js'

export const handleLogin = async(req, res)=>{
    const {email, password} = req.body;
	console.log(email, password);
	try{
		if(!req.body || !email || !password){
			return res.status(400).json({msg:"Improper Credientials!!!"})
		}else{
			const normalizedEmail = email.toLowerCase();
			const userData = await AuthModel.findOne({ email: normalizedEmail });
		  console.log("user", userData);
		  if(!userData){
			return res.status(404).json({msg:"user not found !!!"})
		  }else{
			if(userData.password!==password){
		       return res.status(403).json({msg:"Invalid User!!!"})		
			}else{
				return res.status(201).json({msg: "Login Successfully Done !!!"})
			}
		  }
		}
	}catch(error){
       return res.status(500).json({msg:"Internal server error"})
	}
}

