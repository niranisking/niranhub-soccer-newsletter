const express = require('express')

const bodyParser = require('body-parser')

const request = require("request")

const https = require('node:https')

const PORT = "5700"



app = express();

app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static("public"))

app.post("/", function(req, res ){


    const firstName = req.body.firstname

    const lastName = req.body.lastname

    const email = req.body.email

    var data = {

        members: [
            {
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }
        }
        ]

    }

    const jsonData = JSON.stringify(data)

 
    const url = "https://us21.api.mailchimp.com/3.0/lists/6cc3435f98"

    const options = {
        method: "POST",
        auth: "TechGuyNiran:624247c08c379b7fe34058a1c947ae2d-us21"
    }


    const request = https.request(url, options, function(response){
        response.on("data", function(data){

            if (response.statusCode === 200) {

                res.sendFile(__dirname + "/success.html")
            }

            else if (response.statusCode !==200 ) {

                res.sendFile(__dirname + "/failure.html")
            }
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();
})



app.post("/failure", function(req, res){
    res.redirect("/")
})



app.get("/", function(req, res){

    res.sendFile(__dirname + "/signup.html")

})


app.listen(PORT, function(){
    console.log("app started on port 5700...")
})