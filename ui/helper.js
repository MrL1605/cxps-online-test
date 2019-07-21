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
            // componentHandler.downgradeElements(idEle);
            idEle.innerHTML = _content;
            // componentHandler.upgradeElement(idEle);
            return idEle;
        }
    };
})();
