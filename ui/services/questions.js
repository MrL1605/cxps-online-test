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
        }
    };
})();
