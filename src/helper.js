const sanitize = require("string-sanitizer");
const fs = require("fs");
const path = require("path");
const {SubmitModal, QuestionModal} = require("./modals");

module.exports.QUES_DIRNAME = "../questions_dir";
module.exports.SUBS_DIRNAME = "../submission_dir";

const getAllTests = (dir) =>
    fs.readdirSync(path.join(__dirname, dir))
        .filter(f => fs.statSync(path.join(__dirname, dir, f)).isFile())
        .map(f => path.basename(path.join(__dirname, dir, f)).trim().split(".")[0].trim());


const getTestQuestionnaire = (dir, name) => {
    let questionnaire = [];
    let absFile = path.join(__dirname, dir, name + ".json");

    // Skip if this is not a file
    try {
        if (!fs.statSync(absFile).isFile())
            return;
    } catch (err) {
        console.error("ERROR: File stats reading error", err);
        return;
    }

    // Else read the file and hope it has valid questions
    try {
        JSON.parse(fs.readFileSync(absFile).toString("UTF-8"))
            .forEach((ques) => {
                try {
                    questionnaire.push(Object.assign(new QuestionModal(), ques));
                } catch (err) {
                    console.error("ERROR: Not the correct syntax for Question", err);
                }
            });
    } catch (err) {
        console.error("ERROR: Not correctly formatted file", err);
        return;
    }
    return questionnaire;
};


const writeSubmit = (submission) => {
    let cName = sanitize.sanitize(submission["candidateName"]);
    let absFile = path.join(__dirname, this.SUBS_DIRNAME, `${cName}-${new Date().getTime()}.json`);
    fs.writeFileSync(absFile, JSON.stringify(submission));
};

const getAllSubmissionsList = (dir) =>
    fs.readdirSync(path.join(__dirname, dir))
        .filter((f) => fs.statSync(path.join(__dirname, dir, f)).isFile() && f.endsWith(".json"));


const getSubmission = (dir, name) =>
    Object.assign(new SubmitModal(), JSON.parse(fs.readFileSync(path.join(__dirname, dir, name)).toString("UTF-8")));


module.exports.getAllTests = getAllTests;
module.exports.getTestQuestionnaire = getTestQuestionnaire;
module.exports.writeSubmit = writeSubmit;
module.exports.getAllSubmissionsList = getAllSubmissionsList;
module.exports.getSubmission = getSubmission;
