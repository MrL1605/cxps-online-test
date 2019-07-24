import {STORE} from "./services/store.js";

export const helper = (function () {
    return {
        tName(_str) {
            return _str.replace(/_/g, " ").replace(/-/g, " ")
                .split(" ")
                .map((word) => word.slice(0, 1).toUpperCase() + word.slice(1, word.length))
                .join(" ");
        },
        replaceInnerHTML(_id, _content) {
            let idEle = document.getElementById(_id);
            idEle.innerHTML = _content;
            return idEle;
        },
        updateAnswer(q_ind, answer) {
            STORE.selectedAnswers[q_ind] = answer;
        },
        addIfNotExists(_arr, _ele) {
            if (_arr.indexOf(_ele) === -1)
                _arr.push(_ele);
        },
        removeIfExists(_arr, _ele) {
            let _ind = _arr.indexOf(_ele);
            if (_ind !== -1)
                _arr.splice(_ele, 1);
        },
        getSubFormattedDate(sub) {
            return new Date(parseInt(sub.split("-")[1])).toLocaleString();
        },
        getSubName(sub) {
            return sub.split("-")[0];
        }
    };
})();
