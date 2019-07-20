import {services} from "../services/questions.js";
import {PAGES, STORE} from "../services/store.js";
import {AppModule} from "../index.js";
import {errorAlert} from "../components/alert.js";

export const ListTests = (function () {
    let id = "",
        errorMsg = "",
        tests = [],
        self;

    const registerListeners = () => {
        tests.forEach((eachTest) => {
            document
                .getElementById(`${id}-${eachTest}-start-test`)
                .addEventListener("click", () => {
                    STORE.page = PAGES.QUESTION;
                    STORE.testName = eachTest;
                    AppModule.render();
                });
        });
    };

    self = {
        init: (_id) => {
            id = _id;

            services.listTests((_tests) => {
                tests = _tests;
                self.render();
            }, (err) => {
                errorMsg = err + "<br>You might want to refresh the window";
                self.render();
            });
            registerListeners();
        },
        render: () => {
            if (!id)
                return;

            let testContent = tests.map((eachTest) =>
                `
                <div class="tests-card-square mdl-card mdl-shadow--2dp">
                    <div class="mdl-card__title mdl-card--expand">
                        <h2 class="mdl-card__title-text ">${eachTest}</h2>
                    </div>
                    <div class="mdl-card__actions mdl-card--border">
                        <a id="${id}-${eachTest}-start-test" class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
                            Start Test
                        </a>
                    </div>
                </div>
                `
            );

            document.getElementById(id).innerHTML = `
                <div>
                    <div class="component-title">
                        <h2>Tests</h2>
                        <h5>Select a test to start it</h5>
                    </div>
                
                    <div class="mdl-grid">
                        <div class="mdl-cell mdl-cell--1-col"></div>
                        <div class="mdl-cell mdl-cell--1-col" id="page-content">
                            ${testContent}
                        </div>
                        <div class="mdl-cell mdl-cell--1-col"></div>
                    </div>
                </div>
                <div id="${id}-error">
                </div>
                `;

            if (errorMsg)
                errorAlert.init(id + "-error", errorMsg, _event => {
                    if (_event === "closed") errorMsg = "";
                }).show();

        }
    };
    return self;
})();

