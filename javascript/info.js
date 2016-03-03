var infos = {
    check: function () {
        return window.bright && window.bright.debug && window.bright.debug.modules;
    },
    inspectHost: function () {
        return window.location.host;
    },
    loadedpacket: function () {
        var n = $.debug.modules.mapping, a = [];
        for (var i in n) {
            a.push(i);
        }
        return {
            packets: a
        };
    },
    getMethods: function (name) {
        var n = $.debug.modules.mapping, adapt = null, r = [];
        for (var i in n) {
            if (i === name) {
                adapt = n[i];
            }
        }
        for (var i in adapt.prototype) {
            r.push(adapt.prototype[i]);
        }
        return r;
    },
    getAdaptInfo: function (name) {
        var n = $.debug.modules.mapping, adapt = null, r = {
            extendlink: []
        };
        for (var i in n) {
            if (i === name) {
                adapt = n[i];
            }
        }
        if (adapt) {
            var inx = adapt.prototype.__adapt__;
            r.extendlink = inx._extendslink;
            r.mapping = [];
            r.packet = inx._packet||"''";
            r.tagName = adapt.prototype.tagName||"''";
            r.className = adapt.prototype.className||"''";
            r.fullClassName=adapt.prototype.fullClassName||"''";
            r.parent = inx._parent||"''";
            r.shortName = inx._shortName||"''";
            r.option = [];
            r.methods = [];
            r.privator = [];
            r.staticor = [];
            for (var i in inx._private) {
                r.privator.push(i);
            }
            for (var i in inx._static) {
                r.staticor.push(i);
            }
            for (var i in inx._mapping) {
                if (inx._extendslink.indexOf(i) === -1) {
                    r.mapping.push(i);
                }
            }
            if (inx._factory) {
                for (var i = inx._extendslink.length - 1; i > 0; i--) {
                    var n = inx._factory.get(inx._extendslink[i]), m = [];
                    if (n) {
                        for (var t in n.prototype.__adapt__._instance_props) {
                            var k = n.prototype.__adapt__._instance_props[t];
                            if ($.is.isFunction(n.prototype[k])) {
                                k = k + " " + n.prototype[k].toString().match(/function\s*([^(]*)\(.*\)/)[0].substring(9);
                            }
                            m.push(k);
                        }
                        r.methods.push({
                            name: inx._extendslink[i],
                            is: "parent",
                            props: m
                        });
                    }
                }
                for (var i in r.mapping) {
                    var n = inx._factory.get(r.mapping[i]), m = [];
                    if (n) {
                        for (var t in n.prototype.__adapt__._instance_props) {
                            var k = n.prototype.__adapt__._instance_props[t];
                            if ($.is.isFunction(n.prototype[k])) {
                                k = k + " " + n.prototype[k].toString().match(/function\s*([^(]*)\(.*\)/)[0].substring(9);
                            }
                            m.push(k);
                        }
                        r.methods.push({
                            name: r.mapping[i],
                            is: "multi",
                            props: m
                        });
                    }
                }
                var n = inx._factory.get(inx._extendslink[0]), m = [];
                if (n) {
                    for (var t in n.prototype.__adapt__._instance_props) {
                        var k = n.prototype.__adapt__._instance_props[t];
                        if ($.is.isFunction(n.prototype[k])) {
                            k = k + " " + n.prototype[k].toString().match(/function\s*([^(]*)\(.*\)/)[0].substring(9);
                        }
                        m.push(k);
                    }
                    r.methods.push({
                        name: inx._extendslink[0],
                        is: "self",
                        props: m
                    });
                }
                for (var i = inx._extendslink.length - 1; i > 0; i--) {
                    var n = inx._factory.get(inx._extendslink[i]), m = [], q = [], qq = [];
                    if (n) {
                        r.option.push({
                            name: inx._extendslink[i],
                            is: "parent",
                            props: n.prototype.__adapt__._original_option
                        });
                    }
                }
                for (var i in r.mapping) {
                    var n = inx._factory.get(r.mapping[i]), m = [], q = [], qq = [];
                    if (n) {
                        r.option.push({
                            name: r.mapping[i],
                            is: "multi",
                            props: n.prototype.__adapt__._original_option
                        });
                    }
                }
                var n = inx._factory.get(inx._extendslink[0]), m = [], q = [], qq = [];
                if (n) {
                    r.option.push({
                        name: inx._extendslink[0],
                        is: "self",
                        props: n.prototype.__adapt__._original_option
                    });
                }
            } else {
                r.methods.push({
                    name: "adapt",
                    is: "self",
                    props: $.debug.modules.mapping["adapt"].prototype.__adapt__._instance_props
                });
            }
        }
        return r;
    },
    getOptionList: function () {
        var a = $.debug.options, r = [];
        for (var i in a) {
            r.push(i);
        }
        return r;
    },
    getRequireList: function () {
        var a=$.debug.require,b={};
        for(var i in a){
            for(var t in a[i]){
                b[i]="";
                break;
            }
        }
        return b;
    },
    getRequire: function (name) {
        var a = $.debug.require[name];
        if (a) {
            return a;
        } else {
            return {};
        }
    },
    getDomList: function () {
        return $.debug.doms;
    },
    getDom: function (name) {
        var a = $.debug.doms[name];
        if (a) {
            return a;
        } else {
            return "";
        }
    },
    getOption: function (name) {
        var a = $.debug.options[name];
        if (a) {
            return a;
        } else {
            return {};
        }
    },
    getPacketList: function () {
        return $.debug.resource;
    },
    getJSONList:function(){
        return $.debug.json;
    },
    getJSON:function(name){
        return $.debug.json[name];
    },
    reloadCss: function () {
        $("link").each(function () {
            $(this).attr("href", $(this).attr("href").split("?")[0] + "?reload=" + Math.round(Math.random() * 1000000000));
        });
    },
    reloadPreCss: function (css) {
        var dstr = "<div id='___brighttoolkit___' style='" +
                "-webkit-box-shadow:0 0 15px #00A185;font-family: proxima-nova,Helvetica, Arial, sans-serif;" +
                "background:#24D0AE;color:black;line-height:25px;padding:0 10px 0 10px;border-top:1px solid #00A185;" +
                "-webkit-transition:all .5s ease-out;" +
                "font-size:12px;position:fixed;left:0;right:0;bottom:0;" +
                "'><i class='fa fa-refresh fa-spin'></i> BrightToolkit:Loading Css...</div>";
        var loadingbar = $(dstr).appendTo("body"),has=false;
        $("link").each(function () {
            var a = $(this).attr("href").split("?")[0];
            if (a === css) {
                has=true;
                $(this).remove();
                $("<link href='"+a+ "?reload=" + Math.round(Math.random() * 1000000000)+"' type='text/css' rel='stylesheet'>").bind("load",function(){
                    loadingbar.html("BrightToolkit:File loaded");
                    setTimeout(function () {
                        loadingbar.bind("webkitTransitionEnd", function () {
                            loadingbar.remove();
                        }).css("bottom", "-25px");
                    }, 2000);
                }).appendTo("head");
            }
        });
        if(!has){
            loadingbar.remove();
        }
    },
    reloadPreJs: function (js) {
        var dstr = "<div id='___brighttoolkit___' style='" +
                "-webkit-box-shadow:0 0 15px #00A185;font-family: proxima-nova,Helvetica, Arial, sans-serif;" +
                "background:#24D0AE;color:black;line-height:25px;padding:0 10px 0 10px;border-top:1px solid #00A185;" +
                "-webkit-transition:all .5s ease-out;z-index:999999999;" +
                "font-size:12px;position:fixed;left:0;right:0;bottom:0;" +
                "'><i class='fa fa-refresh fa-spin'></i> BrightToolkit:Loading Javascript...</div>";
        var loadingbar = $(dstr).appendTo("body");
        $.ajax({
            url: js,
            dataType: "text",
            success: function (str) {
                loadingbar.html("BrightToolkit:File loaded");
                setTimeout(function () {
                    loadingbar.bind("webkitTransitionEnd", function () {
                        loadingbar.remove();
                    }).css("bottom", "-25px");
                }, 2000);
                var packet = {
                    isNote: /\/\*[\w\W]*?\*\//,
                    isInfo: /@([\s\S]*?);/g,
                    isPacketTag: /[",\']@[A-Za-z0-9_-]+\.[A-Za-z0-9_-]*[",\']/g,
                    isCurrentTag: /[",\']@\.[A-Za-z0-9_-]*[",\']/g
                };
                var a = str.match(packet.isNote), n = {"_packets_": {}, "packet": "", require: [], css: []};
                if (a && a.length > 0) {
                    var b = a[0];
                    b.match(packet.isInfo).forEach(function (a) {
                        var d = a.split(" ");
                        if (d.length >= 2) {
                            var key = d[0].substring(1, d[0].length), value = d[1].substring(0, d[1].length - 1);
                            if (key === "require") {
                                var t = value.split(":");
                                if (t.length > 1) {
                                    if (n._packets_[t[1]]) {
                                        console.info("[packet] maybe the packet with name of " + n.packet + " contain duplicate packet shortname,it is " + t[1]);
                                    }
                                    n._packets_[t[1]] = t[0];
                                } else {
                                    var m = t[0].split("\.");
                                    if (n._packets_[m[m.length - 1]]) {
                                        console.info("[packet] maybe the packet with name of " + n.packet + " contain duplicate packet shortname,it is " + m[m.length - 1]);
                                    }
                                    n._packets_[m[m.length - 1]] = t[0];
                                }
                                value = js;
                            } else if (key === "css") {
                                value = "";
                            } else if (key === "packet") {
                                n.packet = value;
                            } else {
                                n[key] = value;
                            }
                            n["path"] = js;
                            if (n[key]) {
                                if (n[key].indexOf(value) === -1) {
                                    n[key].push(value);
                                }
                            }
                        }
                    });
                } else {
                    console.info("======file has no packet note=========");
                }
                str = str.replace(packet.isPacketTag, function (str) {
                    var a = str.split("\."), index = 0, key = a[1].substring(0, a[1].length - 1), index = a[0].substring(2);
                    if (n._packets_[index]) {
                        return "\"" + n._packets_[index] + "." + key + "\"";
                    } else {
                        throw Error("[packet] packet can not find with tag of " + str + ",packet is " + n.packet);
                    }
                }).replace(packet.isCurrentTag, function (str) {
                    return "\"" + n.packet + "." + str.split("\.")[1];
                });

                var xcode = "//# sourceURL=" + js + "\r\n$.___info=info;\r\n" + str + "\r\n$.___info=null;";
                try {
                    (new Function("info", "$", xcode))(n, packet);
                } catch (e) {
                    packet.___info = null;
                    console.error(e.stack);
                }
            }
        });
    }
};
window.getInspectInfo = function (type, data, fnx) {
    var fn = infos[type];
    chrome.devtools.inspectedWindow.eval("(" + fn.toString() + ")('" + (data || "") + "')", fnx);
};