// Mailchimp2 API key: a4bb2e88e5e32c06baa3a58a35d41e6c-us21
// mailchimp2 List Id: ae5f34a94e


const express = require('express')
const bodyParser = require('body-parser')
const https = require('https')

const app = express()

app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:true}))


app.get("/", (req, res)=>{
    res.sendFile(__dirname + "/signup.html")
})

app.post('/', (req,res)=>{
    const firstName = req.body.fname;
    const lastName = req.body.lname;
    const email = req.body.email;
    

    const data = {
        members:[
            {
                email_address : email,
                status : "subscribed",
                merge_fields:{
                    FNAME:firstName,
                    LNAME:lastName
                }
            }
        ]
    }
    var JSONData = JSON.stringify(data)

    const url = "https://us21.api.mailchimp.com/3.0/lists/35cc034da4"
    const options = {
        method:'POST',
        auth:"ngaraug:8d12c81941e22ff6a14f586fc2a1d709-us21"
    }

    const request = https.request(url, options, (response)=>{
        response.on("data", (data)=>{
            // console.log(JSON.parse(data))
            JSON.parse(data)
        })
        if(response.statusCode === 200){
            res.sendFile(__dirname + '/success.html')
        }else{
            res.sendFile(__dirname + '/failure.html')
        }
        
    })
    request.write(JSONData)
    request.end()
})

app.post('/fail', (req, res)=>{
    res.redirect('/')
})


app.listen(process.env.PORT || 3000, ()=>console.log("Server started on port 3000!"))


// Mailchimp1 API Key: 8d12c81941e22ff6a14f586fc2a1d709-us21
// Mailchimp2 List ID: 35cc034da4
// mailchimp1 url: https://${dc}.api.mailchimp.com/3.0/lists/{list_id}

