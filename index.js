// index.js
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

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

// timestamp get method with date parameter
app.get("/api/:date", (req, res) => {
  let input = req.params.date;
  var dt = null;
  var isValid = true;
  if (input.includes('-')) {
      dt = new Date(input);
  } else {
      dt = new Date(Number(input));
  }
  if (dt == 'Invalid Date')
      isValid = false;
  //console.log(dt);
  if (!isValid) {
      res.json({ error: "Invalid Date" });
  } else {
      let unix = dt.getTime();
      let utc = dt.toUTCString();
      res.json({ "unix": unix, "utc": `${utc}` });
  }
});

// timestamp get method without date parameter
app.get("/api/", (req, res) => {
  let dt = new Date();
  let unix = dt.getTime();
  let utc = dt.toUTCString();
  res.json({ "unix": unix, "utc": `${utc}` });
});