import mongoose from 'mongoose'

let connectDB=async()=>{
    try{
         await mongoose.connect('mongodb://localhost:27017/userAuth')
         console.log('DB connected');
    }
    catch(err){
        throw err
    }    
}

export {connectDB}
