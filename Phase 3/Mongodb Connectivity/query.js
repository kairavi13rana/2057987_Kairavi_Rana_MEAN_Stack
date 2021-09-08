// load the module 
let mongoose = require("mongoose");
let bodyParser = require("body-parser");
let express = require("express");
let http = require("http");
//url 
let url = "mongodb://localhost:27017/Sample";
mongoose.pluralize(null);           // to avoid lower case collection creation and adding s.

let app = express();
// connect the database it return promise object 
mongoose.connect(url).
then(res=>console.log("connected")).
catch(err=>console.log(err))

//to use this db connection we have to call function 
let db = mongoose.connection;
db.once("open",()=> {
    // We have to defined schema which provide the structure for collection 
    let productSchema = mongoose.Schema({
        _id:Number,
        cname:String,
        des:String,
        amt:Number
    });
    let productModel = mongoose.model("CourseDetails",productSchema);

    app.use(bodyParser.urlencoded({extended:true}))

    app.get('/add_course',(request,response)=>{
        response.sendFile(__dirname+"\\add_course.html");
    });
        

    app.get('/delete_course',(request,response)=>{
        response.sendFile(__dirname+"\\delete_course.html");
    });

    app.get('/update_course',(request,response)=>{
        response.sendFile(__dirname+"\\update_course.html");
    });

    

    app.get('/index',(request,response)=>{
        response.sendFile(__dirname+"\\index.html");
    });


    app.post("/addCourse",(request,response)=>{
        console.log("Add");
        let addCourse = request.body;
        console.log(addCourse);
        productModel.insertMany(addCourse,(err,result)=>{
            if(!err){
                console.log(result)
            } else {
                console.log(err);
            }
            mongoose.disconnect(); 
        })
    })

    app.get("/deleteCourse",(request,response)=>{
        console.log("delete");
        let delCourse = request.query["cid"];
        console.log(delCourse);
        productModel.deleteOne({_id:delCourse},(err,result)=>{
            if(!err){
                if(result.deletedCount>0){
                    console.log("Response Deleted!")
                }else{
                    console.log("Request not deleted.")
                }
                console.log(result)
            } else {
                console.log(err);
            }
            mongoose.disconnect(); 
        })
    })

    app.get("/updateCourse",(request,response)=>{
        console.log("update");
        let uid = request.query["cid"];
        let usrAmt = request.query["amt"];
        let newdata = {$set:{amt:usrAmt}};
        console.log(newdata);
        productModel.updateOne({_id:uid},newdata,(err,result)=>{
            if(!err){
                console.log(result)
                if(result.modifiedCount>0 || result.matchedCount>0){
                    console.log("Updated successfully")
            }else {
                    console.log("Didn't update");
            }
               // console.log(result)
            } else {
                console.log(err);
            }
           // mongoose.disconnect(); 
        })
    })

    app.get('/fetch_course',(request,response)=>{
        productModel.find({},(err,doc)=> {
            response.writeHead(200,{"content-type":"text/html"});
            if(!err){   
                response.write("<h2>Fetched Data</h2>");  
                response.write("<a href='index'>Home</a>");  
                response.write("<table border=1><tr><th>Course ID</th><th>Course Name</th><th>Description</th><th>Amount</th></tr>");
                doc.forEach(rec=> {
                    response.write("<tr><td>"+rec._id+"</td><td>"+rec.cname+"</td><td>"+rec.des+"</td><td>"+rec.amt+"</td></tr>");
                });
                response.write("</table>");
                response.end();
            }else{
                console.log(err);
            }
            //mongoose.disconnect();
        })           
        
    })
 
    });


app.listen(9090,()=>console.log("Server running on port number 9090"))
