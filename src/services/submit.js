const {SubmitModal} = require("../modals");
const {writeSubmit} = require("../helper");


const submitTest = (req, res) => {

    try {
        let submission = Object.assign(new SubmitModal(), req.body);
        writeSubmit(submission);
        res.send(201);
    } catch (err) {
        console.error("Could not parse submission", err);
        res.send("Could not parse submission", 500);
    }
};

module.exports.submitTest = submitTest;
