import {helper} from "../helper.js";

export const ErrorAlertComponent = (function () {

    let id, content, dialog, parentClb, self;

    const registerListeners = () => {
        if (!dialog.showModal) {
            dialogPolyfill.registerDialog(dialog);
        }
        document
            .getElementById(id + "-dialog-close-btn")
            .addEventListener("click", () => self.close());
    };

    self = {
        init(_id, _content, clb) {
            id = _id;
            content = _content;
            parentClb = clb;
            this.render();
            dialog = document.getElementById(id + "-dialog");
            registerListeners();
            return self;
        },
        show() {
            dialog.showModal();
        },
        close() {
            dialog.close();
            parentClb("closed");
        },
        render: () => {
            helper.replaceInnerHTML(id, `
                <dialog class="mdl-dialog" id="${id}-dialog">
                    <h3 class="mdl-dialog__title">Error Occurred</h3>
                    <div class="mdl-dialog__content">
                        <p>${content}</p>
                    </div>
                    <div class="mdl-dialog__actions">
                        <button class="mdl-button" id="${id}-dialog-close-btn" type="button">Close</button>
                    </div>
                </dialog>
                `);
        }
    };
    return self;
})();
