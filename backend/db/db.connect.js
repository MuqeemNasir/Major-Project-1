const mongoose = require('mongoose')
require('dotenv').config()

const mongoURI = process.env.MONGODB_URI

if(!mongoURI){
    console.error("MONGODB_URI is not defined in .env")
    process.exit(1)
}

const initializeDatabase = async() =>{
    try{
        await mongoose.connect(mongoURI)
        console.log("Connected Successfully")
    }catch(error){
        console.log("Connection Failed", error)
        process.exit(1)
    }
}

module.exports = { initializeDatabase }