var getNodeInfo = function () {
    if (window.packet && $ === packet) {
        if ($($0).hasClass("incache")) {
            if ($($0).data("-view-")) {
                return $($0).data("-view-");
            }
        }
    }
    return {Mes: "it is not packet module"};
};
chrome.devtools.panels.elements.createSidebarPane("Packet Properties", function (sidebar) {
    function updateElementProperties() {
        sidebar.setExpression("(" + getNodeInfo.toString() + ")()");
    }
    updateElementProperties();
    chrome.devtools.panels.elements.onSelectionChanged.addListener(updateElementProperties);
});
chrome.devtools.panels.create("PacketJS", "images/a.png", "tab.html");