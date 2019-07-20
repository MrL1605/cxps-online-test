/*
const https = require("https");
const bodyParser = require("body-parser");

*/
/*
const service = require('restana')({
    server: https.createServer({
        "ignoreTrailingSlash": false
    })
});

service.use(bodyParser.json());

service.all("/", (req, res) => {
    res.send("Reached over here");
});
*/


// service.start(3000);
// .then(() => {
//     console.log("Server is started on port [3000]");
// })


const files = require("serve-static");
const path = require("path");
console.log(__dirname);
const serve = files(path.join(__dirname, '../ui'));

const app = require("restana")({
    disableResponseEvent: true
});

app.use(serve);
app.start(3000, () => {
    console.log("Static Server is started on port [3000]");
});

