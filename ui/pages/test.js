import {services} from "../services/questions.js";
import {ErrorAlertComponent} from "../components/alert.js";
import {QuestionComponent} from "../components/question.js";
import {helper} from "../helper.js";
import {STORE, PAGES} from "../services/store.js";

export const TestPage = (function () {
    let id, questions = [], selectedAnswers = [], errorMsg = "", parentClb, self;

    const registerListeners = () => {
        document.getElementById("submit-test")
            .addEventListener("click", () => {
                // services.submitTestAnswers()
                STORE.page = PAGES.TEST_COMPLETE;
                parentClb();
            });
    };


    self = {
        init(_id, clb) {
            id = _id;
            parentClb = clb;
            services.getTestQuestions(STORE.testName, (ques) => {
                questions = ques;
                // Set a default answer by default
                ques.forEach(() => selectedAnswers.push(-1));
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
                .map((_, indQ) => `<div id="${indQ}-question"></div>`)
                .join("\n");

            helper.replaceInnerHTML(id, `
                
                <div class="mdl-cell mdl-cell--12-col">
                    <h3 class="mdl-typography--text-capitalize">
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
                                    <input class="validate" id="first_name" type="text">
                                    <label for="first_name">First Name</label>
                                </div>
                                <div class="input-field col s6">
                                    <input class="validate" id="last_name" type="text">
                                    <label for="last_name">Last Name</label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="input-field col s12">
                                    <input class="validate" id="experience" type="number" 
                                        value="1.0" min="1.0" step="any">
                                    <label for="experience" class="active">Experience</label>
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
                return QuestionComponent
                    .init(`${indQ}-question`, eachQ, indQ);
            });

            if (errorMsg)
                ErrorAlertComponent.init(id + "-error", errorMsg, _event => {
                    if (_event === "closed") errorMsg = "";
                }).show();

        }
    };
    return self;
})();
