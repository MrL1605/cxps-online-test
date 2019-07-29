import {services} from "../services/questions.js";
import {helper} from "../helper.js";
import {ErrorAlertComponent} from "../components/alert.js";
import {PAGES, STORE} from "../services/store.js";


export const ListSubmissionsPage = (function () {
    let id, parentClb, submissions = [], errorMsg, self = {};

    const registerListeners = () => {
        for (let eachSub of submissions) {
            document
                .getElementById(eachSub)
                .addEventListener("click", () => {
                    helper.setPage(PAGES.SUBMISSION);
                    STORE.submissionName = eachSub;
                    parentClb();
                });
        }
    };

    self = {
        init(_id, clb) {
            id = _id;
            parentClb = clb;

            services.listSubmissions((_submissions) => {
                submissions = _submissions;
                self.render();
                registerListeners();
            }, (err) => {
                errorMsg = err + "<br>You might want to refresh the window";
                self.render();
            });
        },
        render: () => {
            if (!id)
                return;

            let subContent = submissions.reverse().map((eachSub) => `
                <tr id="${eachSub}">
                    <td>${helper.getSubName(eachSub)}</td>
                    <td>${helper.getSubFormattedDate(eachSub)}</td>
                </tr>
                `).join("\n");

            helper.replaceInnerHTML(id, `
                <div>
                    <div class="component-title">
                        <h4>Submissions</h4>
                        <h6>Select a submission to view the score and evaluate code</h6>
                    </div>

                    <table class="responsive-table centered highlight">
                        <thead>
                        <tr>
                            <th>Submission Name</th>
                            <th>Submitted on</th>
                        </tr>
                        </thead>
                        <tbody>
                        ${subContent}                        
                        </tbody>
                    </table>
                </div>
                <div id="${id}-error">
                </div>
                `);

            if (errorMsg)
                ErrorAlertComponent.init(id + "-error", errorMsg, _event => {
                    if (_event === "closed") errorMsg = "";
                }).show();

        }
    };
    return self;
})();
