
const express= require("express");
const app=express();
const https= require("https");
// const request= require("request");

const bodyparser= require("body-parser");
app.use(bodyparser.urlencoded({extended:true}))
app.use(express.static("public"))
app.get("/",function(req,res){
    res.sendFile(__dirname+"/signUp.html")
})
app.post("/",function(req,res){
    const firstName= req.body.fname;
    const lastName= req.body.lname;
    const email= req.body.email;

    const data={
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:
                    {
                        FNAME:firstName,
                        LNAME:lastName
                    }
                
            }
        ]
    }

    var jsonData=JSON.stringify(data);
    const url="https://us21.api.mailchimp.com/3.0/lists/2701e487a2"
    const options={
        method:"post",
        auth: "soumyak:c1511476d76506735b9a8773538e83a6-us21"
    }

    const request=https.request(url,options,function(response){
        if(response.statusCode===200){
            res.sendFile(__dirname+"/success.html")
        }
        else{
            res.sendFile(__dirname+"/failure.html")
        }
        response.on("data",function(data){
            console.log(JSON.parse(data))
        })
    })
    request.write(jsonData);
    request.end();
})
app.post("/failure",function(req,res){
    res.redirect("/")
})

app.listen( process.env.PORT || 3000 ,function(){
    console.log("your port is active on 3000")
})


//list id:  2701e487a2
//api key:  c1511476d76506735b9a8773538e83a6-us21
