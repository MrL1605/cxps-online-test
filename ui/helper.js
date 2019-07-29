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
        addIfNotExists(_arr, _ele) {
            if (_arr.indexOf(_ele) === -1)
                _arr.push(_ele);
        },
        removeIfExists(_arr, _ele) {
            let _ind = _arr.indexOf(_ele);
            if (_ind !== -1)
                _arr.splice(_ind, 1);
        },
        getSubFormattedDate(sub) {
            return new Date(parseInt(sub.split("-")[0])).toLocaleString();
        },
        getSubName(sub) {
            return sub.split("-")[1];
        },
        updateAnswer(q_ind, answer) {
            STORE.selectedAnswers[q_ind] = answer;
            helper.updateLocalStorage();
        },
        setTestName: (_name) => {
            STORE.testName = _name;
            helper.updateLocalStorage();
        },
        setPage: (_page) => {
            STORE.page = _page;
            helper.updateLocalStorage();
        },
        setSelectedAnswers: (_arr) => {
            STORE.selectedAnswers = _arr;
            helper.updateLocalStorage();
        },
        setCorrectAnswers: (_arr) => {
            STORE.correctAnswers = _arr;
            helper.updateLocalStorage();
        },
        updateLocalStorage: () => {
            localStorage.setItem("STORE.testName", STORE.testName);
            localStorage.setItem("STORE.page", STORE.page);
            localStorage.setItem("STORE.selectedAnswers", JSON.stringify(STORE.selectedAnswers));
            localStorage.setItem("STORE.correctAnswers", JSON.stringify(STORE.correctAnswers));
        },
        restoreFromLocalStorage: () => {
            if (localStorage.getItem("STORE.testName"))
                STORE.testName = localStorage.getItem("STORE.testName");
            if (localStorage.getItem("STORE.page"))
                STORE.page = localStorage.getItem("STORE.page");
            if (localStorage.getItem("STORE.selectedAnswers"))
                STORE.selectedAnswers = JSON.parse(localStorage.getItem("STORE.selectedAnswers"));
            if (localStorage.getItem("STORE.correctAnswers"))
                STORE.correctAnswers = JSON.parse(localStorage.getItem("STORE.correctAnswers"));
        }
    };
})();
