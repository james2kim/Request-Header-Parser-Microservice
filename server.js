// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();
const useragent = require('express-useragent');
const requestIp = require('request-ip');



// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
const cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// inside middleware handler
const ipMiddleware = function(req, res, next) {
 const clientIp = requestIp.getClientIp(req); 
 next();
};
//As Connect Middleware
app.use(requestIp.mw())


app.use(useragent.express());



// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

 

app.get("/api/whoami", (req,res) => {
const ipaddress = req.clientIp;
 const language = req.headers["accept-language"]
const software=req.get('User-Agent');
  
 res.json({ipaddress,language,software})
})


// listen for requests :)
var listener = app.listen(process.env.PORT||3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
