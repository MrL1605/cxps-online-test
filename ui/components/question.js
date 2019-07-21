import {helper} from "../helper.js";

export const QuestionComponent = (function () {
    let id, ques, ques_ind, update, self;

    const optionsContent = () => {
        // If no options are found return empty string to make sure nothing is rendered.
        if (!ques["options"] || ques["options"].length === 0)
            return "";

        switch (ques["type"]) {
            case "option":
                // Option is default as well. So pass through switch case for now
                break;
            case "multi":
                // Case for multiple choice questions
                return ques["options"]
                    .map((o, o_ind) => `
                        <li>
                            <label class="test-option-checkbox" for="${ques_ind}-${o_ind}-checkbox-option">
                                <input type="checkbox" class="filled-in"
                                    id="${ques_ind}-${o_ind}-checkbox-option" name="${ques_ind}-checkbox-option">
                                <span>${o}</span>
                            </label>                        
                        </li>
                        `)
                    .join("\n");
            default:
                // Option is default as well. So pass through switch case for now
                break;
        }
        return ques["options"]
            .map((o, o_ind) => `
                <li>
                    <label class="test-option-radio" for="${ques_ind}-${o_ind}-radio-option">
                        <input type="radio" id="${ques_ind}-${o_ind}-radio-option" name="${ques_ind}-radio-option">
                        <span>${o}</span>
                    </label>
                </li>
                `)
            .join("\n");
    };

    const registerListeners = () => {

    };

    self = {
        init(_id, _ques, _ind, clb) {
            id = _id;
            ques = _ques;
            ques_ind = _ind;
            update = clb;
            self.render();
            registerListeners();
            return self;
        },
        render() {

            let codeBlockContent = "", imageContent = "";
            if (ques["code"])
                codeBlockContent = `<pre><code class="language-java">${ques["code"].trim()}</code></pre>`;

            if (ques["image"])
                imageContent = `<img src="assets/ext-images/${ques["image"]}" alt="question-related-image"/>`;

            let ele = helper.replaceInnerHTML(id, `
                <h4>${ques_ind + 1}: ${ques["question"]}</h4>
                <ul class="test-question-options">
                    ${codeBlockContent}
                    ${imageContent}
                    ${optionsContent(ques, ques_ind)}
                </ul>
            `);

            Prism.highlightAllUnder(ele, true);
        }
    };
    return self;
})();

