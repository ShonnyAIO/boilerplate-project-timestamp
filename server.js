// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
const moment = require('moment');

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

/* // Solve the TimeStamp Microservices
const time = (time) => {
  let patterns = /^[0-9]*$/g;
  let isNum = patterns.test(time);
  let data = { unix: null, natural: null };
  if (isNum) {
    let date = new Date(parseInt(time));
    console.log(date);
    data = {
      unix: Number(time),
      utc: date.toUTCString()
    };
  } else {
    if (moment(time, 'MMMM DD YYYY').isValid()) {
      let date = moment(time, 'MMMM DD YYYY');
      data = {
        unix: Number(date.format('X')),
        utc: new Date(time).toUTCString()
      };
    } else {
      return { error: "Invalid Date" };
    }
  }
  return data;
}
 */

app.get("/api/", (req, res) => {
  const date = new Date();
  res.json({ unix: date.getTime(), utc: date.toUTCString() });
});


app.get("/api/:date", (req, res) => {
  const dateString = req.params.date;
  console.log(dateString);
  let date;
  if (!dateString) {
    date = date.setMinutes(date.getMinutes() - 3);
  } else {
    if (!isNaN(dateString)) {
      date = new Date(parseInt(dateString));
    } else {
      date = new Date(dateString);
    }
  }

  console.log(date);


  if (date.toString() === 'Invalid Date') {
    return res.json({ error: 'Invalid Date' });
  } else {
    console.log({ unix: date.getTime(), utc: date.toUTCString() });
    return res.json({
      unix: date.getTime(), utc: date.toUTCString()
    });
  }

});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
