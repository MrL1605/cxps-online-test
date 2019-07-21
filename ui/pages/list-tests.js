import {services} from "../services/questions.js";
import {PAGES, STORE} from "../services/store.js";
import {helper} from "../helper.js";
import {ErrorAlertComponent} from "../components/alert.js";

export const ListTestsPage = (function () {
    let id = "",
        errorMsg = "",
        tests = [],
        parentClb,
        self;

    const registerListeners = () => {
        tests.forEach((eachTest) => {
            document
                .getElementById(`${id}-${eachTest}-start-test`)
                .addEventListener("click", () => {
                    STORE.page = PAGES.TEST;
                    STORE.testName = eachTest;
                    parentClb();
                });
        });
    };

    self = {
        init: (_id, clb) => {
            id = _id;
            parentClb = clb;

            services.listTests((_tests) => {
                tests = _tests;
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

            let testContent = tests.map((eachTest) =>
                `
                <div class="tests-card-square card">
                    <div class="card-image">
                        <span class="card-title">${helper.tName(eachTest)}</span>
                    </div>
                    <div class="card-action">
                        <a id="${id}-${eachTest}-start-test" class="btn indigo darken-1">
                            Start Test
                        </a>
                    </div>
                </div>
                `).join("\n");

            helper.replaceInnerHTML(id, `
                <div>
                    <div class="component-title">
                        <h4>Tests</h4>
                        <h6>Select a test to start it</h6>
                    </div>

                    <div class="row">
                        <div class="col s2"></div>
                        <div class="col s8">
                            ${testContent}
                        </div>
                        <div class="col s2"></div>
                    </div>
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

