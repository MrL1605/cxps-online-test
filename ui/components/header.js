export const HeaderComponent = (function () {
    return {
        render: () => {
            return `
                <header class="mdl-layout__header">
                    <div class="mdl-layout__header-row">
                        <span class="mdl-layout-title">Title</span>
                        <div class="mdl-layout-spacer"></div>
                    </div>
                </header>
            `;
        }
    };
})();
