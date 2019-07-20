import {IndexPage} from "./pages/index.js";

export const AppModule = (function () {
    return {
        render() {
            console.log("Rendering again");
            IndexPage.setId("page-id" + new Date().getTime());
            document.getElementById("page-root").innerHTML = IndexPage.render();
            IndexPage.setListeners();
        }
    }
})();

AppModule.render();
