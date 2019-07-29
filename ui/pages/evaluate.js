import {ErrorAlertComponent} from "../components/alert.js";
import {QuestionComponent} from "../components/question.js";
import {services} from "../services/questions.js";
import {PAGES, STORE} from "../services/store.js";
import {helper} from "../helper.js";

export const EvaluatePage = (function () {
    let id, parentClb, name = "", questions = [], submission = {}, errorMsg, self = {};

    const registerListeners = () => {
        let goBackListener = () => {
            helper.setCorrectAnswers([]);
            helper.setSelectedAnswers([]);
            helper.setPage(PAGES.LIST_SUBMISSIONS);
            STORE.submissionName = "";
            parentClb();
        };
        document.getElementById("go-back")
            .addEventListener("click", goBackListener);
        document.getElementById("go-back-top")
            .addEventListener("click", goBackListener);
    };

    const errClb = (err) => {
        errorMsg = err + "<br>You might want to refresh the window";
        self.render();
    };

    self = {
        init(_id, clb) {
            id = _id;
            name = STORE.submissionName;
            parentClb = clb;

            services.evaluate(name, (_submission) => {
                submission = _submission;
                services.getTestQuestions(submission["testName"], (q) => {
                    questions = q;
                    helper.setSelectedAnswers(submission.answers);
                    helper.setCorrectAnswers(submission.correctAnswers);
                    self.render();
                    registerListeners();
                }, (e) => errClb(e));
            }, (e) => errClb(e));
        },
        render: () => {
            if (!id)
                return;

            let questionContent = questions
                .map((_, indQ) => `<div id="${indQ}-question" class="row"></div>`)
                .join("\n");

            helper.replaceInnerHTML(id, `
                <div>
                    <div class="component-title">
                        <h4>Submission</h4>
                        <table>
                            <tr>
                                <th>Name: </th>
                                <td>${submission.candidateName}</td>
                            </tr>
                            <tr>
                                <th>Email: </th>
                                <td>${submission.candidateEmailAdd}</td>
                            </tr>
                            <tr>
                                <th>Work Experience: </th>
                                <td>${submission.candidateExp}</td>
                            </tr>
                            <tr>
                                <th>Test: </th>
                                <td>${helper.tName(submission.testName)}</td>
                            </tr>
                            <tr>
                                <th>Score: </th>
                                <td>${submission.score} / ${submission.totalScore}</td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div style="margin: 30px 0">
                    <div class="btn btn-large waves-effect waves-light" id="go-back-top">
                        Go Back
                    </div>
                </div>
                
                ${questionContent}

                <div style="margin-top: 30px">
                    <div class="btn btn-large waves-effect waves-light" id="go-back">
                        Go Back
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
