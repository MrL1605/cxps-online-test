import {HeaderComponent} from "./components/header.js";
import {ListTests} from "./pages/list-tests.js";

export const AppModule = (function () {
    return {
        render() {

            console.log("Rendering again");
            document.getElementById("page-root").innerHTML = `
                <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
                    ${HeaderComponent.render()}
                    <main class="mdl-layout__content">
                        <div class="mdl-grid">
                            <div class="mdl-cell mdl-cell--3-col"></div>
                            <div class="mdl-cell mdl-cell--6-col" id="page-content">
                            </div>
                            <div class="mdl-cell mdl-cell--3-col"></div>
                        </div>
                    </main>
                </div>`;

            ListTests
                .init("page-content");

        }
    }
})();

AppModule.render();
