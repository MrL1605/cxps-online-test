import {PAGES, STORE} from "../services/store.js";
import {helper} from "../helper.js";

export const TestCompletePage = (function () {
    let id, parentClb, self;

    const registerListeners = () => {
        document
            .getElementById(`${id}-go-back-btn`)
            .addEventListener("click", () => {
                STORE.page = PAGES.LIST_TESTS;
                parentClb("");
            });
    };

    self = {
        init(_id, clb) {
            id = _id;
            parentClb = clb;
            self.render();
            registerListeners();
        },
        render() {
            helper.replaceInnerHTML(id, `
                <div class="row">
                    <div class="col s3"></div>
                    <div class="col s6">
                        <div class="test-complete-card-square card">
                            <div class="card-image">
                                <h2 class="card-title">Done</h2>
                            </div>
                            <div class="card-content">
                                You have successfully submit the test.
                            </div>
                            <div class="card-action">
                                <a class="btn indigo darken-1" id="${id}-go-back-btn">
                                    Go Home Screen
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="col s3"></div>
                </div>
            `);
        }
    };
    return self;
})();
