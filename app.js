const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app=express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.post("/", function(req, res){
    const query=req.body.cityName;
    //Insert API key in below api variable withing inverted commas
    const api="api key here"
    const unit="metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+api+"&units="+unit;
    https.get(url, (response)=>{
        response.on("data",(data)=>{
        const weatherData = JSON.parse(data) 
        const temp = weatherData.main.temp
        const weatherDescription = weatherData.weather[0].description
        const icon=weatherData.weather[0].icon
        const imageUrl="https://openweathermap.org/img/wn/"+icon+"@2x.png"
        res.set("Content-Type", "text/html")
        res.write("<img src="+imageUrl+">")
        res.write("<br>The weather is currently "+weatherDescription+"<br>")
        res.write(" The temperature in "+query+" is: "+temp+" degrees Celcius.")
        res.end()
        })
    })
})

const server = app.listen(process.env.PORT || 5000, () => {
  const port = server.address().port;
  console.log(`Express is working on port ${port}`);
});
