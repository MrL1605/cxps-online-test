const atob = require("atob");
const {SUBS_DIRNAME, QUES_DIRNAME, getSubmission, getAllSubmissionsList, getTestQuestionnaire} = require("../helper");


const validateSession = (req, res) => {
    if ("auth-token" in req["headers"] &&
        req["headers"]["auth-token"] &&
        atob(req["headers"]["auth-token"]) === "cxpsletshire") {
        return true;
    }
    res.send("Authentication Token incorrect", 401);
    return false;
};

const getSubmissions = (req, res) => {

    if (!validateSession(req, res))
        return;

    let submissionsList = getAllSubmissionsList(SUBS_DIRNAME);
    res.send(submissionsList, 200);
};

const evaluateSubmission = (req, res) => {

    if (!validateSession(req, res))
        return;

    let submission_name = req.params["submission_name"];
    let submit = {
        ...getSubmission(SUBS_DIRNAME, submission_name + ".json"),
        score: 0, totalScore: 0, correctAnswers: []
    };
    if (!submit["testName"]) {
        console.error("ERROR: No such submission found", submit, submission_name);
        res.send("Could not find any such submission with name [" + submission_name + "]",
            404, {"Content-Type": "text/plain"});
        return;
    }

    const questionnaire = getTestQuestionnaire(QUES_DIRNAME, submit["testName"]);
    if (!questionnaire || questionnaire.length === 0) {
        console.error("ERROR: No such test found.");
        res.send("ERROR: No such test found.", 404);
    }
    for (let quesInd in questionnaire) {
        if (questionnaire[quesInd]["answer"] || questionnaire[quesInd]["answer"] === 0) {
            submit.correctAnswers.push(questionnaire[quesInd]["answer"]);
        } else {
            submit.correctAnswers.push(-1);
        }
        switch (questionnaire[quesInd]["type"]) {
            default:
            case "option":
                if (submit["answers"][quesInd] === questionnaire[quesInd]["answer"])
                    submit["score"] += 1;
                submit["totalScore"] += 1;
                break;
            case "multi":
                if (submit["answers"][quesInd].sort().join(",") ===
                    questionnaire[quesInd]["answer"].sort().join(","))
                    submit["score"] += 1;
                submit["totalScore"] += 1;
                break;
            case "text":
            // Ignore this, can't be verified
        }
    }
    res.send(submit, 200);
};

module.exports.evaluateSubmission = evaluateSubmission;
module.exports.getSubmissions = getSubmissions;
