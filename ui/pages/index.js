import {ModalService} from "../services/modal.js";

export const IndexPage = (function () {
    let id = "no-id";

    return {
        setId: (_id) => {
            id = _id;
        },
        setListeners: () => {
            document.getElementById(id + "-index-btn")
                .onclick = () => {
                    ModalService.show(id);
                };
        },
        render: () => {
            console.log("Showing pages", id);
            return `
                <div id="${id}">
                    <h2>Hey, you found me</h2>
                    <button id="${id}-index-btn" class='mdl-button mdl-js-button mdl-button--raised 
                                    mdl-js-ripple-effect mdl-button--accent'>
                        Love this
                    </button>
                </div>
            `;
        }
    };
})();
