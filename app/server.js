projectData = {};
const path = require('path')
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const fetch = require('node-fetch');
const dotenv = require('dotenv');
dotenv.config({path:path.join(__dirname,'../.env')});

app.use(express.static("app/website"))
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const PORT = process.env.PORT || 3000;

app.get('/test', (req, res)=>{
    res.send(projectData)
})

app.post("/test", (req, res)=>{
   console.log(req.body)
   projectData ={
       date: req.body.date,
       temperature: req.body.temp,
       userFeeling: req.body.feeling
   }
})
app.get('/weather/:ZIP', (req,res)=>{
    const ZIP = req.params.ZIP;
    const api_KEY= process.env.API_KEY;
    const BASE_URL = `http://api.openweathermap.org/data/2.5/weather?q=${ZIP}&APPID=${api_KEY}&units=imperial`;
    fetch(`${BASE_URL}`)
      .then(RESPONSE => RESPONSE.json())
      .then(data => data)
      .then(data =>res.json(data))
});

app.listen(PORT,()=>{
    console.log(`server is running on port: ${PORT}`)
})