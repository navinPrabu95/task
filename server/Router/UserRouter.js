const express = require('express')
const router = express.Router()
const User = require('../Model/UserModel')

router.post('/add',(req,res)=>{

    const {firstName,lastName,gender,mobNo,email,address} = req.body

    if(!firstName || !lastName || !gender || !mobNo || !email || !address.length>0){
        res.status(401).json({ errMsg: "Please enter all fields" })
    }else{
       User.create(req.body).then(user => {
        res.status(200).json({ success: "Successfully Created",result:user })
    }).catch(error => {
        res.status(401).json({ error: "something went wrong",error })
    })
    
    }
})


router.get('/all',(req,res)=>{
    User.find().then(allData=>{
        res.status(200).json({ success: "Successfully Created",all:allData })
    }).catch(err=>{
        res.status(401).json({ error: "something went wrong",err })
    })
})

router.get('/customer/:id',(req,res)=>{
    const {id} = req.params
    User.findById({_id:id}).then(data=>{
        res.status(200).json({customer:data })
    }).catch(err=>{
        res.status(401).json({ error: "something went wrong",err })
    })
})

router.put('/update/:id',(req,res)=>{

    const {id} = req.params
    const {firstName,lastName,gender,mobNo,email} = req.body

    User.findOneAndUpdate({_id:id},
        {
            firstName: firstName,
            lastName: lastName,
            gender: gender,
            mobNo:mobNo,
            email:email
          },{ new: true }).then(data=>{
            res.status(200).json({customer:data })
        }).catch(err=>{
            res.status(401).json({ error: "something went wrong",err })
        })
})

router.delete('/delete/:id',(req,res)=>{

    const {id} = req.params
   
   User.findByIdAndDelete({_id:id}).then(data=>{
    res.status(200).json({delData:data })

   }).catch(err=>{
    res.status(401).json({ error: "something went wrong",err })
})
})


module.exports = router