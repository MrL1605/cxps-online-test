import {STORE} from "./store.js";

export const services = (() => {
    let baseURL = "/api";
    return {
        listTests: (clb, errClb) => {
            fetch(`${baseURL}/questions`, {method: 'get'})
                .then(response => response.json())
                .then(jsonData => clb(jsonData))
                .catch((err) => {
                    console.error("ERROR Occurred:", err);
                    errClb(err);
                });
        },
        getTestQuestions: (testName, clb, errClb) => {
            fetch(`${baseURL}/questions/${testName}`, {method: 'get'})
                .then(response => response.json())
                .then(jsonData => clb(jsonData))
                .catch((err) => {
                    console.error("ERROR Occurred:", err);
                    errClb(err);
                });
        },
        submitTestAnswers: (answers, clb, errClb) => {
            fetch(`${baseURL}/submit/${answers["testName"]}`,
                {
                    headers: {'Content-Type': 'application/json'},
                    method: "POST",
                    body: JSON.stringify(answers)
                })
                .then(response => clb(response.text()))
                .catch((err) => {
                    console.error("ERROR Occurred:", err);
                    errClb(err);
                });
        },
        listSubmissions: (clb, errClb) => {
            fetch(`${baseURL}/submissions`,
                {method: 'get', headers: {"Auth-Token": STORE.privateKey}})
                .then(response => response.json())
                .then(jsonData => clb(jsonData))
                .catch((err) => {
                    console.error("ERROR Occurred:", err);
                    errClb(err);
                });
        },
        evaluate: (name, clb, errClb) => {
            fetch(`${baseURL}/eval/${name}`,
                {method: 'get', headers: {"Auth-Token": STORE.privateKey}})
                .then(response => response.json())
                .then(jsonData => clb(jsonData))
                .catch((err) => {
                    console.error("ERROR Occurred:", err);
                    errClb(err);
                });
        }
    };
})();
