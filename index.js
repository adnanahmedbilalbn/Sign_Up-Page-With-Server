//jshint esversion:6

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const request = require("request")

const https = require("https");

const { response } = require("express");

app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static("public"));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html")
    
})

app.post("/",function(req,res){
    const email = (req.body.email)
    const Password = (req.body.Password)
    const FirstName = (req.body.FNAME)
    const LastName = (req.body.LNAME)

    console.log(response.statusCode);

    // console.log(email,pass,FirstName,LastName);

    const data = {
        members: [
            {
            email_address : email,
            status:"subscribed",
            merge_fields:{
                PASS: Password,
                FNAME: FirstName,
                LNAME: LastName,

            }
        }
    ]
};

    const jsonData = JSON.stringify(data);

    const url = "https://us8.api.mailchimp.com/3.0/lists/dbaabbce11"

    const options = {
        method : "POST",
        auth : "adnan1:bcde5813e0c125bbde7d2ddffd0cd825-us8"

    }

 const request = https.request(url,options,function(response){

    if(response.statusCode == 200){
        res.sendFile(__dirname+"/success.html")
    }
    else{
        res.sendFile(__dirname+"/failiure.html")
    }

    response.on("data",function(data){
        console.log(JSON.parse(data));
    })
    })

    request.write(jsonData)
    request.end();
    
});

app.post("/failiure",function(req,res){
    res.redirect("/");
});

app.listen(process.env.PORT||3000,function(){
    console.log("server started hosting at 3000")
});

// URL : https://us8.api.mailchimp.com/3.0/dbaabbce11
// API_KEY : a7031c65711d96d20fdae1aedb15ad2e-us8
// LIST ID : dbaabbce11 dbaabbce11