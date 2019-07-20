import {AppModule} from "../index.js"

export const ModalService = (() => {
    return {
        show(modalName) {
            console.log("Logged", modalName);
            this.rerender();
        },
        rerender() {
            AppModule.render();
        }
    };
})();

