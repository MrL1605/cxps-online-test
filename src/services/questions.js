const {UIQuestionModal} = require("../modals");
const {QUES_DIRNAME, getAllTests, getTestQuestionnaire} = require("../helper");

const getTestQuestions = (req, res) => {

    let testName = req.params["test_name"];
    let questionnaire = getTestQuestionnaire(QUES_DIRNAME, testName);
    if (!questionnaire || questionnaire.length === 0) {
        res.send(`Could not find the requested test with name [${testName}]`, 404);
    } else {
        let ques = questionnaire.map((q) => new UIQuestionModal().fromQuestion(q));
        res.send(ques, 200);
    }
};

const getTests = (req, res) => {
    let questionnaire = getAllTests(QUES_DIRNAME);
    res.send(questionnaire, 200);
};

module.exports.getTestQuestions = getTestQuestions;
module.exports.getTests = getTests;

