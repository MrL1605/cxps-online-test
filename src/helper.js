const sanitize = require("string-sanitizer");
const fs = require("fs");
const path = require("path");
const {QuestionModal} = require("./modals");

module.exports.QUES_DIRNAME = "questions_dir";
module.exports.SUBS_DIRNAME = "submission_dir";

module.exports.getAllTests = (dir) => {
    let questionnaire = {tests: []};
    fs.readdirSync(path.join(__dirname, dir)).forEach((file) => {
        let absFile = path.join(__dirname, dir, file),
            fileName = path.basename(absFile).trim().split(".")[0].trim();
        // Skip if this is not a file
        if (!fs.statSync(absFile).isFile())
            return;

        // Else read the file and hope it has valid questions
        try {
            let testQuestions = [];
            JSON.parse(fs.readFileSync(absFile).toString("UTF-8"))
                .forEach((ques) => {
                    try {
                        testQuestions.push(Object.assign(new QuestionModal(), ques));
                    } catch (err) {
                        console.error("ERROR: Not the correct syntax for Question", err);
                    }
                });
            questionnaire[fileName] = testQuestions;
            questionnaire.tests.push(fileName);
        } catch (err) {
            console.error("ERROR: Not correctly formatted file", err);
        }
    });
    return questionnaire;
};


module.exports.writeSubmit = (submission) => {
    let cName = sanitize.sanitize(submission["candidateName"]);
    let absFile = path.join(__dirname, this.SUBS_DIRNAME, `${cName}-${new Date().getTime()}.json`);
    fs.writeFileSync(absFile, JSON.stringify(submission));
};
