var getNodeInfo = function () {
    if (window.bright && $ === bright) {
        if ($($0).hasClass("incache")) {
            if ($($0).data("-view-")) {
                return $($0).data("-view-");
            }
        }
    }
    return {Mes: "it is not bright module"};
};
chrome.devtools.panels.elements.createSidebarPane("Bright Properties", function (sidebar) {
    function updateElementProperties() {
        sidebar.setExpression("(" + getNodeInfo.toString() + ")()");
    }
    updateElementProperties();
    chrome.devtools.panels.elements.onSelectionChanged.addListener(updateElementProperties);
});
chrome.devtools.panels.create("BrightJS", "images/a.png", "tab.html");