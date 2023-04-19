// declare dependencies
var express = require('express');
var app = express();
const port = 3000

// start the server
app.listen(port, () => {
    //console.log(`Timestamp app listening on port ${port}`)
})

// http get method
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

app.get("/api/", (req, res) => {
    let dt = new Date();
    let unix = dt.getTime();
    let utc = dt.toUTCString();
    res.json({ "unix": unix, "utc": `${utc}` });
});