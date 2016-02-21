(function ($) {
    $.fn.tab = function (option) {
        return new tab(this, option);
    };
    var tab = function (dom, option) {
        this.dom = dom;
        this.option = option;
        this.init();
        this.active(0);
        this._onactive = null;
    };
    tab.prototype.init = function () {
        var ths = this;
        this.dom.find(".tabtitle").each(function (i) {
            $(this).attr("num", i).click(function () {
                var num = $(this).attr("num");
                ths.dom.find(".tabtitle").each(function () {
                    $(this).removeClass("active");
                });
                $(this).addClass("active");
                ths.dom.find(".tabcon").each(function (i) {
                    if (i == num) {
                        $(this).addClass("active");
                    } else {
                        $(this).removeClass("active");
                    }
                });
                ths._onactive && ths._onactive(ths, num);
            });
        });
    };
    tab.prototype.active = function (num) {
        if (num >= 0 && num < this.dom.find(".tabtitle").length) {
            this.dom.find(".tabtitle").each(function (i) {
                if (i === num) {
                    $(this).addClass("active");
                } else {
                    $(this).removeClass("active");
                }
            });
            this.dom.find(".tabcon").each(function (i) {
                if (i === num) {
                    $(this).addClass("active");
                } else {
                    $(this).removeClass("active");
                }
            });
        }
        return this;
    };
    tab.prototype.onactive = function (fn) {
        this._onactive = fn;
        return this;
    };
    $().ready(function () {
        $(".usetab").each(function () {
            $(this).tab();
        });
    });
})(axes);