import {services} from "../services/questions.js";
import {ErrorAlertComponent} from "../components/alert.js";
import {QuestionComponent} from "../components/question.js";
import {helper} from "../helper.js";
import {PAGES, STORE} from "../services/store.js";

export const TestPage = (function () {
    let id, questions = [], errorMsg = "", parentClb, self;

    const getValFromId = (_i) => {
        let _ele = document.getElementById(_i);
        if (_ele.classList.contains("invalid") || !_ele.value) {
            _ele.focus();
            throw new Error(`Invalid content in input[${_i}]`);
        }
        return _ele.value;
    };

    const registerListeners = () => {
        document.getElementById("submit-test")
            .addEventListener("click", () => {
                let submission;
                try {
                    submission = {
                        candidateName: getValFromId("first_name") + " " + getValFromId("last_name"),
                        candidateEmailAdd: getValFromId("email"),
                        candidateExp: getValFromId("experience"),
                        testName: STORE.testName,
                        answers: JSON.parse(JSON.stringify(STORE.selectedAnswers)),
                    };
                } catch (ignore) {
                }
                services.submitTestAnswers(submission, () => {
                    STORE.page = PAGES.TEST_COMPLETE;
                    STORE.testName = "";
                    STORE.selectedAnswers = [];
                    parentClb();
                }, (err) => {
                    console.error("ERROR Occurred", err);
                    errorMsg = err + "<br>You might want to refresh the window";
                    self.render();
                    registerListeners();
                });
            });
    };


    self = {
        init(_id, clb) {
            id = _id;
            parentClb = clb;
            services.getTestQuestions(STORE.testName, (ques) => {
                questions = ques;
                // Set a default answer by default
                STORE.selectedAnswers = [];
                // TODO: Fix this, not all answers default to -1, need to handle [], ""
                ques.forEach(() => STORE.selectedAnswers.push(-1));
                self.render();
                registerListeners();
            }, (err) => {
                console.error("ERROR Occurred", err);
                errorMsg = err + "<br>You might want to refresh the window";
                self.render();
                registerListeners();
            });
        },
        render() {

            let questionContent = questions
                .map((_, indQ) => `<div id="${indQ}-question" class="row"></div>`)
                .join("\n");

            helper.replaceInnerHTML(id, `
                
                <div class="">
                    <h3 class="">
                        ${helper.tName(STORE.testName)}
                    </h3>
                    <p>
                        Please select answers for following questions, and click on submit in the end of the page 
                        when done with all the questions. 
                    </p>
                    <p>
                        The test is not timed but it should be completed within 1hr 30min. 
                        You can ask for extra time if you need it to complete the test.
                    </p>
                    
                    <div class="row">
                        <form class="col s12">
                            <div class="row">
                                <div class="input-field col s6">
                                    <input class="validate" id="first_name" type="text" minlength="1">
                                    <label for="first_name">First Name</label>
                                </div>
                                <div class="input-field col s6">
                                    <input class="validate" id="last_name" type="text" minlength="1">
                                    <label for="last_name">Last Name</label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="input-field col s12">
                                    <input class="validate" id="experience" type="number" 
                                        value="1.0" min="1.0" step="any">
                                    <label for="experience" class="active">Work Experience</label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="input-field col s12">
                                    <input class="validate" id="email" type="email">
                                    <label for="email">Email</label>
                                </div>
                            </div>
                        </form>
                    </div>
                    
                    ${questionContent}
                    
                    <div style="margin-top: 30px">
                        <div class="btn btn-large waves-effect waves-light" id="submit-test">
                            Submit
                        </div>
                    </div>
                </div>
                <div id="${id}-error">
                </div>
            `);

            questions.forEach((eachQ, indQ) => {
                return QuestionComponent(`${indQ}-question`, eachQ, indQ);
            });

            if (errorMsg)
                ErrorAlertComponent.init(id + "-error", errorMsg, _event => {
                    if (_event === "closed") errorMsg = "";
                }).show();

        }
    };
    return self;
})();
