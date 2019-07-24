module.exports.QuestionModal = class QuestionModal {
    constructor() {
        this.question = "";
        this.type = "";
        this.code = "";
        this.lang = "";
        this.image = "";
        this.options = [];
        this.optionIsCode = false;
        this.answer = -1;
    }
};

module.exports.UIQuestionModal = class UIQuestionModal {
    constructor() {
        this.question = "";
        this.optionIsCode = false;
        this.type = "";
        this.code = "";
        this.lang = "";
        this.image = "";
        this.options = [];
    }

    fromQuestion(ques) {
        this.question = ques.question;
        this.type = ques.type;
        this.code = ques.code;
        this.lang = "";
        this.image = ques.image;
        this.options = ques.options;
        this.optionIsCode = ques.optionIsCode;
        return this;
    }
};

module.exports.SubmitModal = class SubmitModal {
    constructor() {
        this.candidateName = "";
        this.candidateEmailAdd = "";
        this.candidateExp = -1;
        this.testName = "";
        this.answers = [];
    }
};


