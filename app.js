const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");


const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
const firstName = req.body.fName;
const lastName = req.body.lName;
const email = req.body.email;



const data ={
    members: [
        {
            email_address: email,
            status: "subscribed",
            merge_fields:{
                FNAME: firstName,
                LNAME: lastName
            }
        }
    ]
    
    };
    
    const jsonData = JSON.stringify(data);


    const url = "https://us21.api.mailchimp.com/3.0/lists/550fdf142f";

    const options = {
        method: "POST",
        auth: "Allen30:0e64708b57f849ad61ba46feb03a28e9-us21",
    }
    
    const request = https.request(url,options,function(response){
       
        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
            
        } else {
            res.sendFile(__dirname + "/failure.html");
        }
        
        response.on("data",function(data){
            console.log(JSON.parse(data));

        })
        
    })
    request.write(jsonData);
    request.end();

});
app.post("/failure.html",function(req,res){
    res.redirect("/");
});




// apiKey: 0e64708b57f849ad61ba46feb03a28e9-us21
// audience id: 550fdf142f









app.listen(process.env.PORT || 3000, function(){
    console.log("server is listening on port 3000");
});