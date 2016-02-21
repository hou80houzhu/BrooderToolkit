var getNodeInfo = function () {
    if (window.axes && $ === axes) {
        if ($($0).hasClass("incache")) {
            if ($($0).data("-view-")) {
                return $($0).data("-view-");
            }
        }
    }
    return {Mes: "it is not axes module"};
};
chrome.devtools.panels.elements.createSidebarPane("Axes Properties", function (sidebar) {
    function updateElementProperties() {
        sidebar.setExpression("(" + getNodeInfo.toString() + ")()");
    }
    updateElementProperties();
    chrome.devtools.panels.elements.onSelectionChanged.addListener(updateElementProperties);
});
chrome.devtools.panels.create("AxesJS", "images/a.png", "tab.html");