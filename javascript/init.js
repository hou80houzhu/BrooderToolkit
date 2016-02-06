var getNodeInfo = function () {
    if (window.brooder && $ === brooder) {
        if ($($0).hasClass("incache")) {
            if ($($0).data("-view-")) {
                return $($0).data("-view-");
            }
        }
    }
    return {Mes: "it is not brooder module"};
};
chrome.devtools.panels.elements.createSidebarPane("Brooder Properties", function (sidebar) {
    function updateElementProperties() {
        sidebar.setExpression("(" + getNodeInfo.toString() + ")()");
    }
    updateElementProperties();
    chrome.devtools.panels.elements.onSelectionChanged.addListener(updateElementProperties);
});
chrome.devtools.panels.create("Brooder", "images/a.png", "tab.html");