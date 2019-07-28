import {helper} from "../helper.js";

export const ErrorAlertComponent = (function () {

    let id, content, dialog, parentClb, self;

    const registerListeners = () => {
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
            dialog = M.Modal.init(document.getElementById(id + "-dialog"));
            registerListeners();
            return self;
        },
        show() {
            dialog.open();
        },
        close() {
            dialog.close();
            parentClb("closed");
        },
        render: () => {
            helper.replaceInnerHTML(id, `
                <div class="modal" id="${id}-dialog">
                    <div class="modal-content">
                        <h4>Error Occurred</h4>
                        <p>${content}</p>
                    </div>
                    <div class="modal-footer">
                        <button class="modal-close waves-effect waves-green btn-flat"
                                id="${id}-dialog-close-btn">
                            Dismiss
                        </button>
                    </div>
                </div>
                `);
        }
    };
    return self;
})();
