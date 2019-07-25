import {helper} from "../helper.js";
import {STORE} from "../services/store.js";

export const QuestionComponent = (function (_id, _ques, _ind) {
    let id, ques, ques_ind, currentAnswer, self;

    const answerContent = () => {

        const wrapAround = (opts) => `<div class="test-question-options"><ul>${opts}</ul></div>`;
        const optionAsCode = (_opt) => {
            return ques["optionIsCode"] ?
                `<pre><code class="language-java">${_opt.trim()}</code></pre>` :
                `<span>${_opt.trim()}</span>`;
        };
        const getSelectedTxtAnswer = () => {
            if (STORE.selectedAnswers[ques_ind] && STORE.selectedAnswers[ques_ind] !== -1)
                return STORE.selectedAnswers[ques_ind];
            else return "";
        };
        const getSelectedCheckedAnswer = (opt_ind) => {
            if (STORE.selectedAnswers[ques_ind] && STORE.selectedAnswers[ques_ind] !== -1 &&
                STORE.selectedAnswers[ques_ind].indexOf(opt_ind) !== -1)
                return "checked";
            return "";
        };
        const getSelectedOptionAnswer = (opt_ind) => {
            if ((STORE.selectedAnswers[ques_ind] || STORE.selectedAnswers[ques_ind] === 0) &&
                STORE.selectedAnswers[ques_ind] !== -1 &&
                STORE.selectedAnswers[ques_ind] === opt_ind)
                return "checked";
            return "";
        };
        const hlRightChecked = (opt_ind) => {
            if (STORE.correctAnswers[ques_ind] && STORE.correctAnswers[ques_ind] !== -1 &&
                STORE.correctAnswers[ques_ind].indexOf(opt_ind) !== -1)
                return "teal lighten-4";
            return "";
        };
        const hlRightOpt = (opt_ind) => {
            if ((STORE.correctAnswers[ques_ind] || STORE.correctAnswers[ques_ind] === 0) &&
                STORE.correctAnswers[ques_ind] !== -1 &&
                STORE.correctAnswers[ques_ind] === opt_ind)
                return "teal lighten-4";
            return "";
        };

        switch (ques["type"]) {
            case "option":
                // If no options are found return empty string to make sure nothing is rendered.
                if (!ques["options"] || ques["options"].length === 0)
                    return "";
                // Option is default as well. So pass through switch case for now
                break;
            case "multi":
                // If no options are found return empty string to make sure nothing is rendered.
                if (!ques["options"] || ques["options"].length === 0)
                    return "";

                // Case for multiple choice questions
                return wrapAround(ques["options"]
                    .map((o, o_ind) => `
                        <li>
                            <label class="test-option-checkbox ${hlRightChecked(o_ind)}" 
                                    for="${ques_ind}-${o_ind}-checkbox-option">
                                <input type="checkbox" class="filled-in" ${getSelectedCheckedAnswer(o_ind)}
                                    id="${ques_ind}-${o_ind}-checkbox-option" name="${ques_ind}-checkbox-option">
                                <span>${optionAsCode(o)}</span>
                            </label>                        
                        </li>
                        `)
                    .join("\n"));
            case "text":
                return `
                    <div class="input-field col s12">
                        <textarea id="${ques_ind}-text-area" 
                            class="materialize-textarea">${getSelectedTxtAnswer()}</textarea>
                        <label for="${ques_ind}-text-area">Solution</label>
                    </div>
                `;
            default:
                // Option is default as well. So pass through switch case for now
                break;
        }
        return wrapAround(ques["options"]
            .map((o, o_ind) => `
                <li>
                    <label class="test-option-radio ${hlRightOpt(o_ind)}" for="${ques_ind}-${o_ind}-radio-option">
                        <input type="radio" ${getSelectedOptionAnswer(o_ind)}
                                id="${ques_ind}-${o_ind}-radio-option" name="${ques_ind}-radio-option">
                        <span>${optionAsCode(o)}</span>
                    </label>
                </li>
                `)
            .join("\n"));
    };

    const registerListeners = () => {
        switch (ques["type"]) {
            default:
            case "option":
                // No need to update currentAnswer
                currentAnswer = -1;
                ques["options"].forEach((o, o_ind) => {
                    document
                        .getElementById(`${ques_ind}-${o_ind}-radio-option`)
                        .addEventListener("click", () => helper.updateAnswer(ques_ind, o_ind));
                });
                break;
            case "multi":
                // Store the current selection in currentAnswer
                currentAnswer = [];
                ques["options"].forEach((o, o_ind) => {
                    let optionEle = document
                        .getElementById(`${ques_ind}-${o_ind}-checkbox-option`);
                    optionEle
                        .addEventListener("click", () => {
                            if (optionEle.checked)
                                helper.addIfNotExists(currentAnswer, o_ind);
                            else
                                helper.removeIfExists(currentAnswer, o_ind);
                            helper.updateAnswer(ques_ind, currentAnswer);
                        });
                });
                break;
            case "text":
                // No need to update currentAnswer
                currentAnswer = "";
                let txtEle = document.getElementById(`${ques_ind}-text-area`);
                txtEle.addEventListener("focus", () => helper.updateAnswer(ques_ind, txtEle.value));
                txtEle.addEventListener("blur", () => helper.updateAnswer(ques_ind, txtEle.value));
                break;
        }
    };

    self = {
        init(_id, _ques, _ind) {
            id = _id;
            ques = _ques;
            ques_ind = _ind;
            self.render();
            registerListeners();
            return self;
        },
        render() {

            let codeBlockContent = "", imageContent = "";
            if (ques["code"])
                codeBlockContent = `<div class="question-custom-block"><pre><code class="language-java">${ques["code"].trim()}</code></pre></div>`;

            if (ques["image"])
                imageContent = `<img class="question-custom-block col s12"
                    src="assets/ext-images/${ques["image"]}" alt="question-related-image"/>`;


            let ele = helper.replaceInnerHTML(id, `
                <div class="col s12">
                    <h4>${ques_ind + 1}: ${ques["question"]}</h4>
                    ${codeBlockContent}
                    ${imageContent}
                    ${answerContent(ques, ques_ind)}                
                </div>
            `);

            Prism.highlightAllUnder(ele, false);
            M.updateTextFields();
        }
    };
    return self.init(_id, _ques, _ind);
});

