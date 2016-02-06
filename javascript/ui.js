var port = chrome.extension.connect({name: "ui"});
port.onMessage.addListener(function (msg) {
    if (msg.type === "refresh") {
        if ($(".cleanandrefresh").length > 0) {
            $(".cleanandrefresh").removeClass("fa-spin");
        }
        chrome.devtools.inspectedWindow.reload();
    } else if (msg.type === "refreshlist") {
        var a = $(".loadinfo");
        if (a.length > 0) {
            $(".loadinfo").click();
        }
    } else if (msg.type === "stagelist") {
        var hostlist = msg.data;
        $(".cleantime").val(hostlist.time);
        $(".line input[type='checkbox']").each(function () {
            var val = $(this).attr("value");
            var n = hostlist.clean[val];
            if (n) {
                $(this).get(0).checked = true;
            } else {
                $(this).get(0).checked = false;
            }
            $(this).parent().click(function () {
                var c = {};
                $(".line input[type='checkbox']").each(function () {
                    c[$(this).val()] = $(this).get(0).checked;
                });
                port.postMessage({
                    type: "savestage",
                    data: c,
                    time: $(".cleantime").val()
                });
            });
        });
    }
});
getInspectInfo("inspectHost", null, function (a) {
    port.postMessage({
        type: "host",
        data: a
    });
});

var setCheckbox = function () {
    port.postMessage({
        type: "stage"
    });
};
(function ($) {
    $().ready(function () {
        getInspectInfo("check", null, function (a) {
            if (a) {
                $(".mainmask").addClass("hide");
                var currentone = "";
                var currenttwo = "";
                var currentfour = "";
                var currentfive = "";
                $(".one .loadinfo").click(function () {
                    $(this).eq(0).addClass("fa-spin");
                    getInspectInfo("loadedpacket", null, function (data, b) {
                        $(".one .loadinfo").eq(0).removeClass("fa-spin");
                        var str = "<ul class='packetlist'>";
                        for (var i in data.packets) {
                            str += "<li" + (currentone === data.packets[i] ? " class='active'" : "") + "><span class='adapt'>" + data.packets[i] + "</span></li>";
                        }
                        str += "</ul>";
                        $(".tab.one .content").eq(0).html(str);
                        $(".one .packetlist li").each(function () {
                            $(this).click(function () {
                                $(".one .packetlist li").each(function () {
                                    $(this).removeClass("active");
                                });
                                $(this).addClass("active");
                                currentone = $(this).children(0).html();
                                $(".one .adaptname").html($(this).children(0).html());
                                getInspectInfo("getAdaptInfo", $(this).children(0).html(), function (data, b) {
                                    var str = "";
                                    str += "<div><span>shortName</span>:<span>" + data.shortName + "</span></div>";
                                    str += "<div><span>parent</span>:<span>" + data.parent + "</span></div>";
                                    str += "<div><span>packet</span>:<span>" + data.packet + "</span></div>";
                                    str += "<div><span>tagName</span>:<span>" + data.tagName + "</span></div>";
                                    str += "<div><span>className</span>:<span>" + data.className + "</span></div>";
                                    str += "<div><span>fullClassName</span>:<span>" + data.fullClassName + "</span></div>";
                                    str += "<div class='xtitle active xxtitle'><i class='fa fa-caret-right'></i> parent extend</div>";
                                    str += "<div class='pextend'>";
                                    if (data.extendlink.length > 0) {
                                        str += "<ul>";
                                        for (var i in data.extendlink) {
                                            str += "<li>" + data.extendlink[i] + "</li>";
                                        }
                                        str += "</ul>";
                                    } else {
                                        str += "<div class='nodesc'>no defined</div>";
                                    }
                                    str += "</div>";
                                    str += "<div class='xtitle active xxtitle'><i class='fa fa-caret-right'></i> multi extend</div>";
                                    str += "<div class='mextend'>";
                                    if (data.mapping.length > 0) {
                                        str += "<ul>";
                                        for (var i in data.mapping) {
                                            str += "<li>" + data.mapping[i] + "</li>";
                                        }
                                        str += "</ul>";
                                    } else {
                                        str += "<div class='nodesc'>no defined</div>";
                                    }
                                    str += "</div>";
                                    $(".basicinfo").html(str);
                                    str = "";
                                    if (data.option.length > 0) {
                                        for (var i = data.option.length - 1; i >= 0; i--) {
                                            var k = false;
                                            str += "<div class='xtitle active xxtitle'" + (i === data.option.length - 1 || data.option.length === 1 ? " style='border-top:0;'" : "") + "><i class='fa fa-caret-right'></i> " + data.option[i].name + " (" + data.option[i].is + ")</div>";
                                            for (var m in data.option[i].props) {
                                                k = true;
                                                break;
                                            }
                                            if (k) {
                                                str += "<ul>";
                                                for (var t in data.option[i].props) {
                                                    str += "<li>" + data.option[i].props[t] + "</li>";
                                                }
                                                str += "</ul>";
                                            } else {
                                                str += "<div class='nodesc'>no defined</div>";
                                            }
                                        }
                                    } else {
                                        str = "<div class='nodesc'>no defined</div>";
                                    }
                                    $(".optioninfo").html(str);
                                    str = "";
                                    if (data.methods.length > 0) {
                                        for (var i = data.methods.length - 1; i >= 0; i--) {
                                            var k = false;
                                            str += "<div class='xtitle active xxtitle'" + (i === data.option.length - 1 || data.methods.length === 1 ? " style='border-top:0;'" : "") + "><i class='fa fa-caret-right'></i> " + data.methods[i].name + " (" + data.methods[i].is + ")</div>";
                                            for (var m in data.methods[i].props) {
                                                k = true;
                                                break;
                                            }
                                            if (k) {
                                                str += "<ul>";
                                                for (var t in data.methods[i].props) {
                                                    str += "<li>" + data.methods[i].props[t] + "</li>";
                                                }
                                                str += "</ul>";
                                            } else {
                                                str += "<div class='nodesc'>no defined</div>";
                                            }
                                        }
                                    } else {
                                        str = "<div class='nodesc'>no defined</div>";
                                    }
                                    $(".methodinfo").html(str);
                                    if (data.privator.length > 0) {
                                        str = "<ul>";
                                        for (var i in data.privator) {
                                            str += "<li>" + data.privator[i] + "</li>";
                                        }
                                        str += "</ul>";
                                    } else {
                                        str = "<div class='nodesc'>no defined</div>";
                                    }
                                    $(".privateinfo").html(str);
                                    if (data.staticor.length > 0) {
                                        str = "<ul>";
                                        for (var i in data.staticor) {
                                            str += "<li>" + data.staticor[i] + "</li>";
                                        }
                                        str += "</ul>";
                                    } else {
                                        str = "<div class='nodesc'>no defined</div>";
                                    }
                                    $(".staticinfo").html(str);
                                    $(".xxtitle").click(function () {
                                        if ($(this).hasClass("active")) {
                                            $(this).removeClass("active").next().hide();
                                        } else {
                                            $(this).addClass("active").next().show();
                                        }
                                        if ($(this).parent().children(0).get(0) === $(this).get(0)) {
                                            $(this).addClass("istop");
                                        }
                                        var a = $(this).parent().find(".xxtitle");
                                        if (a.eq(a.length - 1).get(0) === $(this).get(0)) {
                                            $(this).addClass("isbottom");
                                        }
                                    });
                                });
                            });
                        });
                        var cd = $(".one li.active");
                        if (cd.length > 0) {
                            cd.click();
                        } else {
                            var c = $(".one .packetlist li").eq(0);
                            if (c.length > 0) {
                                c.click();
                            }
                        }
                    });
                });
                $(".two .loadinfo").click(function () {
                    $(this).eq(0).addClass("fa-spin");
                    getInspectInfo("getOptionList", null, function (data, b) {
                        $(".two .loadinfo").eq(0).removeClass("fa-spin");
                        var str = "<ul class='packetlist'>";
                        for (var i in data) {
                            str += "<li" + (currenttwo === data[i] ? " class='active'" : "") + "><span class='adapt'>" + data[i] + "</span></li>";
                        }
                        str += "</ul>";
                        $(".tab.two .content").eq(0).html(str);
                        $(".two .packetlist li").each(function () {
                            $(this).click(function () {
                                $(".two .packetlist li").each(function () {
                                    $(this).removeClass("active");
                                });
                                $(this).addClass("active");
                                currenttwo = $(this).children(0).html();
                                $(".two .adaptname").html($(this).children(0).html());
                                getInspectInfo("getOption", $(this).children(0).html(), function (data, b) {
                                    $(".two .r-right .content").tree(data);
                                });
                            });
                        });
                        var cd = $(".two li.active");
                        if (cd.length > 0) {
                            cd.click();
                        } else {
                            var c = $(".two .packetlist li").eq(0);
                            if (c.length > 0) {
                                c.click();
                            }
                        }
                    });
                });
                $(".three .loadinfo").click(function () {
                    $(this).eq(0).addClass("fa-spin");
                    getInspectInfo("getPacketList", null, function (data, b) {
                        $(".three .loadinfo").eq(0).removeClass("fa-spin");
                        var str = "<div class='xtitle active cctp' style='border-top:0;'><i class='fa fa-caret-right'></i> css</div>";
                        str += "<ul class='packetlist'>";
                        for (var i in data.css) {
                            var path = data.css[i];
                            str += "<li><span class='adapt'>" + path + "</span><div class='lbtn' title='reload'><i class='fa fa-refresh'></i></div></li>";
                        }
                        str += "</ul>";
                        str += "<div class='xtitle active cctp'><i class='fa fa-caret-right'></i> javascript</div>";
                        str += "<ul class='packetlist'>";
                        for (var i in data.js._data) {
                            var path = data.js._data[i].data;
                            str += "<li><span class='adapt'>" + path + "</span><div class='lbtn' title='reload (exp)'><i class='fa fa-refresh'></i></div></li>";
                        }
                        str += "</ul>";
                        str += "<div class='xtitle active cctp'><i class='fa fa-caret-right'></i> html</div>";
                        str += "<ul class='packetlist'>";
                        for (var i in data.html._data) {
                            var path = data.html._data[i].data;
                            str += "<li><span class='adapt'>" + path + "</span></li>";
                        }
                        str += "</ul>";
                        str += "<div class='xtitle active cctp'><i class='fa fa-caret-right'></i> image</div>";
                        str += "<ul class='packetlist'>";
                        for (var i in data.image._data) {
                            var path = data.image._data[i].data;
                            str += "<li><span class='adapt'>" + path + "</span></li>";
                        }
                        str += "</ul>";
                        str += "<div class='xtitle active cctp'><i class='fa fa-caret-right'></i> text</div>";
                        str += "<ul class='packetlist'>";
                        for (var i in data.text._data) {
                            var path = data.text._data[i].data;
                            str += "<li><span class='adapt'>" + path + "</span></li>";
                        }
                        str += "</ul>";
                        $(".tab.three .content").eq(0).html(str);
                        $(".cctp").click(function () {
                            if ($(this).hasClass("active")) {
                                $(this).removeClass("active").next().hide();
                            } else {
                                $(this).addClass("active").next().show();
                            }
                            if ($(this).parent().children(0).get(0) === $(this).get(0)) {
                                $(this).addClass("istop");
                            }
                            var a = $(this).parent().find(".cctp");
                            if (a.eq(a.length - 1).get(0) === $(this).get(0)) {
                                $(this).addClass("isbottom");
                            }
                        });
                        $(".three .packetlist li").each(function () {
                            $(this).find("span").click(function () {
                                chrome.devtools.panels.openResource($(this).html(), 0);
                            });
                            $(this).find("div").click(function () {
                                var path = $(this).parent().children(0).html();
                                var b = path.split("\.")[1];
                                if (b === "js") {
                                    getInspectInfo("reloadPreJs", path);
                                } else {
                                    getInspectInfo("reloadPreCss", path);
                                }
                            });
                        });
                    });
                });
                $(".five .loadinfo").click(function () {
                    $(this).eq(0).addClass("fa-spin");
                    getInspectInfo("getRequireList", null, function (data, b) {
                        $(".five .loadinfo").eq(0).removeClass("fa-spin");
                        var str = "<ul class='packetlist'>";
                        for (var i in data) {
                            str += "<li" + (currentfour === i ? " class='active'" : "") + "><span class='adapt'>" + i + "</span></li>";
                        }
                        str += "</ul>";
                        $(".tab.five .content").eq(0).html(str);
                        $(".five .packetlist li").each(function () {
                            $(this).click(function () {
                                $(".five .packetlist li").each(function () {
                                    $(this).removeClass("active");
                                });
                                $(this).addClass("active");
                                currentfour = $(this).children(0).html();
                                $(".five .adaptname").html($(this).children(0).html());
                                getInspectInfo("getRequire", $(this).children(0).html(), function (data, b) {
                                    $(".five .r-right .content").tree(data);
                                });
                            });
                        });
                        var cd = $(".five li.active");
                        if (cd.length > 0) {
                            cd.click();
                        } else {
                            var c = $(".five .packetlist li").eq(0);
                            if (c.length > 0) {
                                c.click();
                            }
                        }
                    });
                });
                $(".six .loadinfo").click(function () {
                    $(this).eq(0).addClass("fa-spin");
                    getInspectInfo("getDomList", null, function (data, b) {
                        $(".six .loadinfo").eq(0).removeClass("fa-spin");
                        var str = "<ul class='packetlist'>";
                        for (var i in data) {
                            str += "<li" + (currentfive === i ? " class='active'" : "") + "><span class='adapt'>" + i + "</span></li>";
                        }
                        str += "</ul>";
                        $(".tab.six .content").eq(0).html(str);
                        $(".six .packetlist li").each(function () {
                            $(this).click(function () {
                                $(".six .packetlist li").each(function () {
                                    $(this).removeClass("active");
                                });
                                $(this).addClass("active");
                                currentfive = $(this).children(0).html();
                                $(".six .adaptname").html($(this).children(0).html());
                                getInspectInfo("getDom", $(this).children(0).html(), function (data, b) {
//                                    $(".six .r-right .content").get(0).innerText=data;
                                    $(".six .r-right .content").tree(data);
                                });
                            });
                        });
                        var cd = $(".six li.active");
                        if (cd.length > 0) {
                            cd.click();
                        } else {
                            var c = $(".six .packetlist li").eq(0);
                            if (c.length > 0) {
                                c.click();
                            }
                        }
                    });
                });
                $(".seven .loadinfo").click(function () {
                    $(this).eq(0).addClass("fa-spin");
                    getInspectInfo("getJSONList", null, function (data, b) {
                        $(".seven .loadinfo").eq(0).removeClass("fa-spin");
                        var str = "<ul class='packetlist'>";
                        for (var i in data) {
                            str += "<li" + (currentfive === i ? " class='active'" : "") + "><span class='adapt'>" + i + "</span></li>";
                        }
                        str += "</ul>";
                        $(".tab.seven .content").eq(0).html(str);
                        $(".seven .packetlist li").each(function () {
                            $(this).click(function () {
                                $(".seven .packetlist li").each(function () {
                                    $(this).removeClass("active");
                                });
                                $(this).addClass("active");
                                currentfive = $(this).children(0).html();
                                $(".seven .adaptname").html($(this).children(0).html());
                                getInspectInfo("getJSON", $(this).children(0).html(), function (data, b) {
//                                    $(".seven .r-right .content").get(0).innerText=data;
                                    $(".seven .r-right .content").tree(data);
                                });
                            });
                        });
                        var cd = $(".seven li.active");
                        if (cd.length > 0) {
                            cd.click();
                        } else {
                            var c = $(".seven .packetlist li").eq(0);
                            if (c.length > 0) {
                                c.click();
                            }
                        }
                    });
                });
                $("input[type='text']").each(function () {
                    $(this).bind("keyup", function () {
                        var val = $(this).val();
                        $(this).parent(2).find("li").each(function () {
                            if ($(this).children(0).html().indexOf(val) !== -1) {
                                $(this).show();
                            } else {
                                $(this).hide();
                            }
                        });
                    }).bind("focus", function () {
                        $(this).val("");
                        $(this).parent(2).find("li").each(function () {
                            $(this).show();
                        });
                    });
                });
                $(".list li").each(function () {
                    $(this).click(function () {
                        $(".list li").each(function () {
                            $(this).removeClass("active");
                        });
                        $(this).addClass("active");
                        $(".tab").each(function () {
                            $(this).removeClass("active");
                        });
                        var a = ".tab." + $(this).attr("to");
                        $(a).addClass("active");
                    });
                });
                $(".cleanandrefresh").click(function () {
                    $(this).addClass("fa-spin");
                    port.postMessage({
                        type: "clean"
                    });
                });
                $(".cleantime").bind("change", function () {
                    var c = {};
                    $(".line input[type='checkbox']").each(function () {
                        c[$(this).val()] = $(this).get(0).checked;
                    });
                    port.postMessage({
                        type: "savestage",
                        data: c,
                        time: $(".cleantime").val()
                    });
                });
                $(".cct").click(function () {
                    if ($(this).hasClass("active")) {
                        $(this).removeClass("active").next().hide();
                    } else {
                        $(this).addClass("active").next().show();
                    }
                    if ($(this).parent().children(0).get(0) === $(this).get(0)) {
                        $(this).addClass("istop");
                    }
                    var a = $(this).parent().find(".cct");
                    if (a.eq(a.length - 1).get(0) === $(this).get(0)) {
                        $(this).addClass("isbottom");
                    }
                });
                $(".reloadcss").click(function () {
                    getInspectInfo("reloadCss");
                });
                $(".loadinfo").click();
                $(".list li").eq(0).click();
                setCheckbox();
            }
        });
        $(".getrocuilink").click(function () {
            port.postMessage({
                type: "openrocui"
            });
        });
    });
})(brooder);