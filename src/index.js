const bodyParser = require("body-parser");
const files = require("serve-static");
const path = require("path");
const serve = files(path.join(__dirname, '../ui'));

const app = require("restana")({
    disableResponseEvent: true,
    errorHandler: (err, req, res) => {
        console.error("Error Occurred", err);
        res.send(err);
    }
});

app.use(bodyParser.json());
app.use(serve);
app.all("/hello", (req, res) => {
    res.send("Reached over here");
});

// Add listener to get questions as response
app
    .get("/api/questions", require("./services/questions").getTests)
    .get("/api/questions/:test_name", require("./services/questions").getTestQuestions)
    .post("/api/submit/:test_name", require("./services/submit").submitTest)
    .get("/api/submissions", require("./services/evaluate").getSubmissions)
    .get("/api/eval/:submission_name", require("./services/evaluate").evaluateSubmission)
;


app.start(3000).then(() => {
    console.log("Static Server is started on port [3000]");
});

