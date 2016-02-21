var inspectHost = "";
var ports = {};
var handler = {
    ui: function (message, sender, sendResponse) {
        if (message.type === "clean") {
            chrome.storage.sync.get(function (a) {
                var hostlist = a["rocuistage"];
                var n = hostlist.clean;
                var tim = parseInt(hostlist.time), since = 0;
                if (tim !== 0) {
                    since = (new Date()).getTime() - tim * 1000 * 60 * 60;
                }
                console.log(since);
                chrome.browsingData.remove({
                    "since": since
                }, n, function () {
                    ports["ui"].postMessage({
                        type: "refresh"
                    });
                });
            });
        } else if (message.type === "host") {
            inspectHost = message.data;
            console.log(inspectHost);
        } else if (message.type === "stage") {
            chrome.storage.sync.get(function (a) {
                var hostlist = a["rocuistage"];
                if (!hostlist) {
                    hostlist = {
                        clean: {
                            appcache: false,
                            cache: true,
                            cookies: false,
                            downloads: false,
                            fileSystems: false,
                            formData: false,
                            history: false,
                            indexedDB: false,
                            localStorage: false,
                            pluginData: false,
                            passwords: false,
                            webSQL: false
                        },
                        time: 0
                    };
                    chrome.storage.sync.set({"rocuistage": hostlist});
                }
                ports["ui"].postMessage({
                    type: "stagelist",
                    data: hostlist
                });
            });
        } else if (message.type === "savestage") {
            var def = {
                appcache: false,
                cache: true,
                cookies: false,
                downloads: false,
                fileSystems: false,
                formData: false,
                history: false,
                indexedDB: false,
                localStorage: false,
                pluginData: false,
                passwords: false,
                webSQL: false
            };
            for (var i in message.data) {
                def[i] = message.data[i];
            }
            chrome.storage.sync.get(function (a) {
                var hostlist = a["rocuistage"];
                hostlist = {
                    clean: def,
                    time: message.time
                };
                chrome.storage.sync.remove("rocuistage");
                chrome.storage.sync.set({"rocuistage": hostlist});
            });
        } else if (message.type === "console") {
            console.log(message.data);
        } else if (message.type === "openrocui") {
            chrome.tabs.create({
                url: "http://www.axesjs.org"
            });
        }
    },
    inject: function (message, sender, sendResponse) {
    }
};
chrome.runtime.onConnect.addListener(function (port) {
    ports[port.name] = port;
    port.onMessage.addListener(handler[port.name]);
    port.onDisconnect.addListener(function (port) {
        ports[port.name] = null;
    });
});

//console.log(chrome.extension.getViews());
var task = null;
chrome.webRequest.onBeforeRequest.addListener(function (details) {
    if (details.url.indexOf(inspectHost) !== -1) {
        if (!task) {
            task = setTimeout(function () {
                console.log("--------refresh list-------");
                if (ports["ui"]) {
                    ports["ui"].postMessage({
                        type: "refreshlist"
                    });
                }
                task = null;
            }, 1000);
        }
    }
}, {urls: ["<all_urls>"]}, ["blocking"]);