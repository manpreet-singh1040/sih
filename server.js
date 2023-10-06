const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const mongoose=require('mongoose');
//const { string } = require('mathjs');

const app=express();
app.use(cors());
app.use(bodyParser.json());

//testing
/*app.get('/',(req,res)=>{
    console.log(req.body);
    res.json({hey:`hello MF`});
})*/

//mongoose connection
mongoose.connect("mongodb://127.0.0.1:27017/sih")
.then(()=>{console.log(`Database connected`)})
.catch((err)=>{console.log(`mongoose error`,err)});

//import models from different databases
const user=require('./models/agency');
const distressCall=require('./models/distressCall');





app.get('/',async(req,res)=>{
    try{
         const data=await user.find({});
         res.json(data);
         //const curUser=await user.find({userName:req.body.userName})
         //res.json(curUser);

    }
    catch{
           res.send({"err":"error"});
    }

})

app.delete('/',async(req,res)=>{

   
    
           const delUser=await user.find({userName:req.body.userName});
           const mes=await user.findByIdAndDelete(delUser[0]._id);
           if(!mes){
            res.json({message:"user not delete"});
           }
           res.json({message:"user delete"});
           

           
    
   
})


app.post('/user',async (req,res)=>{
     await user.create({
        userName:req.body.userName,
        email:req.body.email,
        password:req.body.password,
        agencyName:req.body.agencyName,
        phoneNumber:req.body.phoneNumber,
        address:req.body.address,
        latitude:req.body.latitude,
        longitude:req.body.longitude,
     })
     .then(()=>{res.json({mes:`created successfully`});})
     .catch((err)=>{res.json({err})
    });
})



app.post('/',async(req,res)=>{

    
   try{
        await distressCall.create({
            name:req.body.name,
            contactNumber:req.body.contactNumber,
            longitude:req.body.longitude,
            latitude:req.body.latitude,
            typeOfDisaster:req.body.typeOfDisaster
        })
        console.log(`request added`);
       const latituderange= require('./functions/latituderange');
        const longitituderange=require('./functions/longitiuderange');
        const sortedAgency=require('./functions/sortedAgency');
        const x=req.body.latitude;
        const y=req.body.longitude;
        const xrange=latituderange.fun(50,x,y);
        const yrange=longitituderange.fun(50,x,y);
        const resagency=await user.find({$and:[
            {latitude:{ $gte:x-xrange, $lte:x+xrange}},{longitude:{$gte:y-yrange,  $lte:y+yrange}}
        ]});
        console.log(`range of x is ${x-xrange}-${x+xrange} and for y is ${y-yrange}-${y+yrange}`);
        res.json(resagency);
       // res.json({mes:"user added"});
    }
    catch(err){
        res.json({err:err});

    }
    

})



app.listen(3000,()=>console.log(`server running`));