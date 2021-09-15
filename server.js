// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api", (req, res)=>{
  res.json({ unix: new Date().getTime() , utc : new Date().toUTCString() });
})

app.get("/api/:date?", (req, res)=> {
  let date_string = req.params.date
  if (/\d{5,}/.test(date_string)) {
    let dateInt = parseInt(date_string);
    res.json({ 
      unix: dateInt.valueOf(),
      utc: new Date(dateInt).toUTCString() 
    });
  }else if (/^\d{4,}/.test(date_string)) {
    let dateObject = new Date(date_string);
      res.json({
        unix : dateObject.valueOf() , 
        utc : dateObject.toUTCString()   
      });
  }else{
    let dateObject = new Date(date_string);
    let dateNew = new Date(dateObject.valueOf() - (dateObject.getTimezoneOffset() * 60 * 1000));
    if (dateObject == 'Invalid Date'){
      res.json({ error : "Invalid Date" });
    }else{
      res.json({
        unix : dateNew.valueOf() , 
        utc : dateNew.toUTCString()   
      });
    }
  }
})


// listen for requests :) 
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
