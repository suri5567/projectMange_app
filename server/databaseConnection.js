import mongoose from "mongoose"


export const databaseConnection = (url)=>{
    return mongoose.connect(url, 
		{
		useNewUrlParser: true,
		useUnifiedTopology: true,
		writeConcern:
		 {
		  w: 'majority',
		},
})
}
