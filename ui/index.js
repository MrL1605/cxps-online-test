import {ListTestsPage} from "./pages/list-tests.js";
import {TestCompletePage} from "./pages/test-complete.js";
import {ListSubmissionsPage} from "./pages/list-submissions.js";
import {HeaderComponent} from "./components/header.js";
import {PAGES, STORE} from "./services/store.js";
import {TestPage} from "./pages/test.js";
import {helper} from "./helper.js";

export const AppModule = (function () {
    let self = {
        render() {

            console.log("Rendering Root Page");
            if (typeof isAdmin !== "undefined" && isAdmin) {
                STORE.privateKey = btoa(prompt("Enter the private key", ""));
                STORE.page = PAGES.LIST_SUBMISSIONS;
                console.log("That would be admin page.");
            }

            const rerender = () => self.render();

            // First render a base empty structure
            helper.replaceInnerHTML("page-root", `
                <div>
                    ${HeaderComponent.render()}
                    <div class="container">
                        <div class="row">
                            <div class="col s2"></div>
                            <div class="col s8" id="page-content">
                            </div>
                            <div class="col s2"></div>
                        </div>
                    </div>
                </div>`);

            // Then populate the empty structure with with child components/pages.
            switch (STORE.page) {
                case PAGES.LIST_TESTS:
                    ListTestsPage
                        .init("page-content", rerender);
                    break;
                case PAGES.TEST:
                    TestPage
                        .init("page-content", rerender);
                    break;
                case PAGES.TEST_COMPLETE:
                    TestCompletePage
                        .init("page-content", rerender);
                    break;
                case PAGES.LIST_SUBMISSIONS:
                    ListSubmissionsPage
                        .init("page-content", rerender);
                case PAGES.SUBMISSION:
                    ListSubmissionsPage
                        .init("page-content", rerender);
            }

        }
    };
    return self;
})();

AppModule.render();
