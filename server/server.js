const express = require('express')
const PORT = 7000 || process.env.PORT
const mongoose = require('mongoose')
const {MONGO_URL} = require('./confiq/Env')
const User = require('./Router/UserRouter')
const cors =require('cors')



const app = express()
app.use(cors())
app.use(express.json())
app.use(User)

mongoose.set('strictQuery', true)


mongoose.connect(MONGO_URL,{ useNewUrlParser: true,useUnifiedTopology: true})

mongoose.connection.on('connected',()=>{
    console.log("DB connected sucessfully");
})

mongoose.connection.on('<--error from connection-->',()=>{
    console.log("DB not connected");
})

app.listen(PORT,()=>{
    console.log("Server initiated at"+ PORT);
})