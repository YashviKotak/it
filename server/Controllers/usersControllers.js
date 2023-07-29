const moment = require('moment/moment');
const users=require('../models/userSchema');
const csv=require('fast-csv')
const fs=require('fs')
const BASE_URL=process.env.BASE_URL


// exports.userpost=async(req,resp)=>{
//     // console.log(req.file)
//     // console.log(req.body)
//     const file=req.file.filename;
//     const {fname,lname,mobile,email,gender,location,status}=req.body;
//     if(!fname || !lname || !mobile || !email || !gender || !location || !status || !file){
//         resp.status(401).json("All Inputs is Required")
//     }
//     try {
//         const peruser=await users.findOne({email:email})
//         if(peruser){
//             resp.status(401).json("This user is already exist in database") 
//         }
//         else{
//             const datecreated=moment(new Date()).format("YYYY-MM-DD hh:mm:ss")
//             const userData=new users({
//                 fname,lname,mobile,email,gender,location,status,profile:file,datecreated
//             });
//             await userData.save()
//             resp.status(200).json(userData)
//         }
//     } catch (error) {
//         resp.status(401).json(error);
//         console.log("catch block error")
//     }
// }

exports.userpost = async (req, res) => {
    const file = req.file.filename;
    const { fname, lname, email, mobile, gender, location, status } = req.body;

    if (!fname || !lname || !email || !mobile || !gender || !location || !status || !file) {
        res.status(401).json("All Inputs is required")
    }

    try {
        const preuser = await users.findOne({ email: email });

        if (preuser) {
            res.status(401).json("This user already exist in our databse")
        } else {

            const datecreated = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");

            const userData = new users({
                fname, lname, email, mobile, gender, location, status, profile: file, datecreated
            });
            await userData.save();
            res.status(200).json(userData);
        }
    } catch (error) {
        res.status(401).json(error);
        console.log("catch block error")
    }
};

exports.userget=async (req,resp)=>{
    const search=req.query.search || ""
    const gender = req.query.gender || ""
    const status = req.query.status || ""
    const sort=req.query.sort || ""
    const page=req.query.page || 1
    const ITEM_PER_PAGE = 4;
    const query={
        fname:{$regex:search,$options:"i"}
    }

    if (gender !== "All") {
        query.gender = gender
    }

    if (status !== "All") {
        query.status = status
    }
    try {

        const skip = (page-1)*ITEM_PER_PAGE

        const count=await users.countDocuments(query)

        const userdata=await users.find(query)
        .sort({datecreated:sort=="new"?-1:1})
        .limit(ITEM_PER_PAGE)
        .skip(skip)

        const pageCount=Math.ceil(count/ITEM_PER_PAGE);
        

        resp.status(200).json({
            userdata,
            Pagination:{
              count,pageCount
            }
        })
    } catch (error) {
        resp.status(401).json(error) 
    }
}

exports.singleuserget=async(req,resp)=>{
    try {
        const {id}=req.params;
        const userdata=await users.findOne({_id:id})
        resp.status(200).json(userdata)
    } catch (error) {
        resp.status(401).json(error) 
    }
}

exports.useredit = async (req, res) => {
    const { id } = req.params;
    const { fname, lname, email, mobile, gender, location, status, user_profile } = req.body;
    const file = req.file ? req.file.filename : user_profile

    const dateUpdated = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");

    try {
        const updateuser = await users.findByIdAndUpdate({ _id: id }, {
            fname, lname, email, mobile, gender, location, status, profile: file, dateUpdated
        }, {
            new: true
        });

        await updateuser.save();
        res.status(200).json(updateuser);
    } catch (error) {
        res.status(401).json(error)
    }
}


exports.userdelete = async (req, res) => {
    const { id } = req.params;
    try {
        const deletuser = await users.findByIdAndDelete({ _id: id });
        res.status(200).json(deletuser);
    } catch (error) {
        res.status(401).json(error)
    }
}

exports.userExport=async(req,res)=>{
     try {
        const userdata=await users.find();

        const csvStream= csv.format({headers:true})
        if(!fs.existsSync("public/files/export")){
            if(!fs.existsSync("public/files")){
                fs.mkdirSync("public/files/")
            }

            if(!fs.existsSync("public/files/export")){
                fs.mkdirSync("public/files/export")
            }
        }

        const writablestream=fs.createWriteStream(
            "public/files/export/users.csv"
        )

        csvStream.pipe(writablestream);

        writablestream.on("finish",function(){
            res.status(200).json({
                downloadURL:`${BASE_URL}/files/export/users.csv`
            })
        })
        
        if(userdata.length>0){
            userdata.map((user)=>{
                csvStream.write({
                    FirstName:user.fname?user.fname:'-',
                    LastName:user.lname?user.lname:'-',
                    Email:user.email?user.email:'-',
                    Phone:user.mobile?user.mobile:'-',
                    Gender:user.gender?user.gender:'-',
                    Status:user.status?user.status:'-',
                    Profile:user.profile?user.profile:'-',
                    Location:user.location?user.location:'-',
                    DateCreated:user.datecreated?user.datecreated:'-',
                    DateUpdated:user.dateUpdated?user.dateUpdated:'-'
                })
            })
        }

        csvStream.end();
        writablestream.end();

     } catch (error) {
        res.status(401).json(error)
     }
}