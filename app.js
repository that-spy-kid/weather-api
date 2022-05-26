const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res)=> {

    res.sendFile(__dirname + "/index.html");
});

app.post("/", (req,res)=>{


 const querry = req.body.cityName;
    const apiKey = "c177e8706039f194d11c2cf23ed6b810";
    const unit = "metric";

    const url = "https://api.openweathermap.org/data/2.5/weather?appid=" + apiKey + "&q=" + querry + "&units=" + unit;
   
    https.get(url, (response)=> {
           console.log(response.statusCode);
           response.on("data", (data)=>{
           const weatherData = JSON.parse(data);
          const temperature = weatherData.main.temp;
          const desc = weatherData.weather[0].description;
          const icon = weatherData.weather[0].icon;
          const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
          res.write("<h1> The temperature in "+ querry+ " is " + temperature + " 'C</h1>");
         res.write("<h2>The weather is bit "+ desc + " </h2>");
         res.write("<img src=" + imageURL + ">");
         res.send();
    });
   });
});


app.listen(3000, () =>
{
 console.log("Server is Listening on port 3000");
});