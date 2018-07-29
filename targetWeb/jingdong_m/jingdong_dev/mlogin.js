function CtoH(b) {
    for (var c = b.selectionEnd, f = b.value, g = "", h = 0; h < f.length; h++)
        g = 12288 == f.charCodeAt(h) ? g + String.fromCharCode(f.charCodeAt(h) - 12256) : 65280 < f.charCodeAt(h) && 65375 > f.charCodeAt(h) ? g + String.fromCharCode(f.charCodeAt(h) - 65248) : g + String.fromCharCode(f.charCodeAt(h));
    b.value = g;
    b.setSelectionRange(c, c);
    return g
}
function refreshAuth() {
    var b = "/cgi-bin/m/authcode?mod\x3dlogin\x26v\x3d" + Math.random();
    $("#imgCode").attr("src", b)
}
function refreshSmsAuth() {
    var b = "/cgi-bin/m/authcode?mod\x3dsmslogin\x26v\x3d" + Math.random();
    $("#smsImgCode").attr("src", b);
    $("#smsCode").val("")
}
function toast(b, c) {
    c || (c = 2E3);
    $(".toast").html(b);
    $(".toast-ui").show();
    clearTimeout(f);
    var f = setTimeout(function() {
        clearTimeout(f);
        $(".toast-ui").hide()
    }, c)
}
function getParamStrExcludeAccount() {
    var b = []
        , c = location.search;
    if (-1 != c.indexOf("?"))
        for (var c = c.substr(1).split("\x26"), f = 0; f < c.length; f++) {
            var g = c[f].split("\x3d")[0];
            "account" != g && b.push(g + "\x3d" + c[f].split("\x3d")[1])
        }
    return "?" + b.join("\x26")
}
function openApp(b, c) {
    function f(c) {
        function f() {
            h++;
            var l = +new Date - g;
            150 <= h ? (clearTimeout(b),
                c(0)) : 3300 < l ? (clearTimeout(b),
                c(1)) : b = setTimeout(f, 20)
        }
        var g = +new Date, h = 0, b;
        b = setTimeout(f, 20)
    }
    var g = navigator.userAgent.toLowerCase();
    if (-1 < g.indexOf("ios") || -1 < g.indexOf("iphone") || -1 < g.indexOf("mac") || -1 < g.indexOf("ipad") || -1 < g.indexOf("ipod"))
        window.location.href = b;
    else {
        var h = document.createElement("iframe");
        h.src = b;
        h.style.display = "none";
        document.body.appendChild(h);
        setTimeout(function() {
            document.body.removeChild(h)
        }, 2E3)
    }
    c && f(function(b) {
        c && c(b)
    })
}
$(function() {
    function b() {
        function b() {
            $(".sms-txt-input").on("input", function() {
                $(this).siblings("i").show();
                var a = $("#telphone").val();
                v() && n(a) ? $("#loginBtn").addClass("btn-active") : $("#loginBtn").removeClass("btn-active")
            })
        }
        function v() {
            var a = !0;
            $(".sms-txt-input").each(function() {
                if (!$(this).val())
                    return a = !1
            });
            return a
        }
        function z(a, e) {
            var k = {
                mobile: encodeURIComponent(a),
                country_code: e,
                s_token: str_kenString
            };
            setMaxDigits(131);
            var d = new RSAKeyPair("3","10001",str_rsaString,1024)
                , d = window.btoa(encryptedString(d, k.mobile, RSAAPP.PKCS1Padding, RSAAPP.RawEncoding));
            k.mobile = d;
            if (_need_ck) {
                d = $("#smsCode").val();
                if (0 === d.length) {
                    $(".notice").html(language.code_7);
                    return
                }
                k.authcode = d
            }
            k.risk_jd = "";
            try {
                k.risk_jd = getJdEid()
            } catch (H) {}
            var c = (new Date).getTime();
            $.ajax({
                url: "/cgi-bin/ml/dosendlogincode",
                type: "POST",
                data: k,
                dataType: "json",
                success: function(d) {
                    var e = (new Date).getTime() - c;
                    window.pl_report({
                        interfaceID: 393231,
                        loginName: a,
                        callTime: e,
                        status: d.errcode
                    });
                    if (0 == d.errcode)
                        $(".notice").html("\x26nbsp;"),
                            l = !1,
                            y(),
                            $("#img_code_box").hide().find("input").removeClass("sms-txt-input"),
                            _need_ck = !1,
                            $("#input-code").hide().find("input").removeClass("txt-input"),
                            m();
                    else
                        switch (d.needauth ? ($("#img_code_box").show().find("input").addClass("sms-txt-input"),
                            refreshSmsAuth(),
                            b(),
                            _need_ck = !0,
                            $("#input-code").show().find("input").addClass("txt-input"),
                            refreshAuth()) : ($("#img_code_box").hide().find("input").removeClass("sms-txt-input"),
                            b(),
                            _need_ck = !1,
                            $("#input-code").hide().find("input").removeClass("txt-input")),
                            m(),
                            d.errcode) {
                            case 7:
                                p({
                                    msg: language.code_38,
                                    btn: language.code_39,
                                    url: mregUrl + u
                                });
                                break;
                            case 179:
                                p({
                                    msg: language.code_40,
                                    btn: language.code_29,
                                    action: "changeLogin"
                                });
                                break;
                            default:
                                $(".notice").html(d.message)
                        }
                },
                error: function() {
                    _need_ck && refreshSmsAuth();
                    $(".notice").html(language.code_28);
                    var d = (new Date).getTime() - c;
                    window.pl_report({
                        interfaceID: 393231,
                        loginName: a,
                        callTime: d,
                        status: "255"
                    })
                }
            })
        }
        function y() {
            var a = (new Date).getTime()
                , e = setInterval(function() {
                var b = parseInt(((new Date).getTime() - a) / 1E3);
                120 > b ? $(".mesg-code").html(language.code_41 + "(" + (120 - b) + "s)") : ((b = $("#telphone").val()) ? n(b) ? ($(".notice").html("\x26nbsp;"),
                    $(".mesg-code").html(language.code_32).removeClass("mesg-disable")) : ($(".notice").html(language.code_37),
                    $(".mesg-code").html(language.code_32)) : $(".mesg-code").html(language.code_32),
                    l = !0,
                    clearInterval(e))
            }, 1E3)
        }
        function t(a, e, b) {
            $(b).show();
            $(e).hide();
            $("#header .txt-header").html(a)
        }
        function n(a) {
            return 86 == $(".area_code").attr("code").trim() ? /^1[3-9][0-9]{9}$/.test(a.trim()) : !0
        }
        function w() {
            $(".verify-input").val("");
            $(".verify-notice").html("");
            $(".verify-dialog").show();
            $(".verify-body").show()
        }
        function A() {
            var a = $("#telphone").val()
                , e = B();
            e.risk_jd = "";
            try {
                e.risk_jd = getJdEid()
            } catch (d) {}
            var b = (new Date).getTime();
            $.ajax({
                url: "/cgi-bin/ml/docheckreceiver",
                type: "POST",
                data: e,
                dataType: "json",
                success: function(d) {
                    var e = (new Date).getTime() - b;
                    window.pl_report({
                        interfaceID: 393233,
                        loginName: a,
                        callTime: e,
                        status: d.errcode
                    });
                    0 == d.errcode ? ($(".verify-body").hide(),
                        $(".verify-dialog").hide(),
                        mdUpdata("MLoginRegister_SMSLoginSuccess"),
                        d.hk_autologin ? $.ajax({
                            url: d.hk_url,
                            type: "get",
                            dataType: "jsonp",
                            timeout: 15E3,
                            complete: function() {
                                setTimeout(function() {
                                    location.href = d.succcb
                                }, 200)
                            }
                        }) : setTimeout(function() {
                            location.href = d.succcb
                        }, 200)) : $(".verify-notice").html(d.message)
                },
                error: function() {
                    $(".verify-notice").html(language.code_28);
                    var d = (new Date).getTime() - b;
                    window.pl_report({
                        interfaceID: 393233,
                        loginName: a,
                        callTime: d,
                        status: "255"
                    })
                }
            })
        }
        function p(a) {
            $(".btn-continue").removeAttr("href");
            $(".btn-continue").removeAttr("data-action");
            $(".pop-msg").html(a.msg);
            $(".btn-continue").attr("href", a.url).html(a.btn);
            $(".btn-continue").attr("data-action", a.action);
            $(".pop-dialog").show()
        }
        function m() {
            $(".txt-input").on("input", function() {
                $(this).siblings("i").show();
                q || (r() ? $("#loginBtn").addClass("btn-active") : $("#loginBtn").removeClass("btn-active"))
            })
        }
        function r() {
            var a = !0;
            $(".txt-input").each(function() {
                if (!$(this).val())
                    return a = !1
            });
            return a
        }
        function C() {
            $("#loginBtn").addClass("btn-active-disable").html(language.code_25);
            $(".notice").html("\x26nbsp;");
            var a = D()
                , e = $("#telphone").val();
            a.risk_jd = "";
            try {
                a.risk_jd = getJdEid()
            } catch (d) {}
            var c = (new Date).getTime();
            $.ajax({
                url: "/cgi-bin/ml/dosmslogin",
                type: "POST",
                data: a,
                dataType: "json",
                success: function(a) {
                    $("#loginBtn").removeClass("btn-active-disable").html(language.code_8);
                    var d = (new Date).getTime() - c;
                    window.pl_report({
                        interfaceID: 393232,
                        loginName: e,
                        callTime: d,
                        status: a.errcode
                    });
                    if (0 == a.errcode)
                        mdUpdata("MLoginRegister_SMSLoginSuccess"),
                            a.hk_autologin ? $.ajax({
                                url: a.hk_url,
                                type: "get",
                                dataType: "jsonp",
                                timeout: 15E3,
                                complete: function() {
                                    setTimeout(function() {
                                        location.href = a.succcb
                                    }, 200)
                                }
                            }) : setTimeout(function() {
                                location.href = a.succcb
                            }, 200);
                    else if (115 == a.errcode)
                        w();
                    else
                        switch (a.needauth ? ($("#img_code_box").show().find("input").addClass("sms-txt-input"),
                            _need_ck = !0,
                            refreshSmsAuth(),
                            b(),
                            $("#input-code").show().find("input").addClass("txt-input"),
                            refreshAuth()) : ($("#img_code_box").hide().find("input").removeClass("sms-txt-input"),
                            _need_ck = !1,
                            b(),
                            $("#input-code").hide().find("input").removeClass("txt-input")),
                            m(),
                            a.errcode) {
                            case 115:
                                w();
                                break;
                            default:
                                $(".notice").html(a.message)
                        }
                },
                error: function() {
                    $(".notice").html(language.code_28);
                    $("#loginBtn").removeClass("btn-active-disable").html(language.code_8);
                    var a = (new Date).getTime() - c;
                    window.pl_report({
                        interfaceID: 393232,
                        loginName: e,
                        callTime: a,
                        status: "255"
                    })
                }
            })
        }
        function x() {
            $("#loginBtn").addClass("btn-active-disable").html(language.code_25);
            $(".notice").html(" ");
            var a = E()
                , e = $("#username").val().trim();
            a.risk_jd = "";
            try {
                a.risk_jd = getJdEid()
            } catch (d) {}
            var c = (new Date).getTime();
            $.ajax({
                url: "/cgi-bin/m/domlogin",
                type: "POST",
                data: a,
                dataType: "json",
                success: function(a) {
                    $("#loginBtn").removeClass("btn-active-disable").html(language.code_8);
                    var d = (new Date).getTime() - c;
                    window.pl_report({
                        interfaceID: 393217,
                        loginName: e,
                        callTime: d,
                        status: a.errcode
                    });
                    if (0 == a.errcode)
                        mdUpdata("MLoginRegister_LoginSuccess"),
                            a.hk_autologin ? $.ajax({
                                url: a.hk_url,
                                type: "get",
                                dataType: "jsonp",
                                timeout: 15E3,
                                complete: function() {
                                    setTimeout(function() {
                                        location.href = a.succcb
                                    }, 200)
                                }
                            }) : setTimeout(function() {
                                location.href = a.succcb
                            }, 200);
                    else
                        switch (a.needauth ? (q || $("#loginBtn").removeClass("btn-active"),
                            $("#input-code").show().find("input").addClass("txt-input"),
                            _need_ck = !0,
                            refreshAuth(),
                            m(),
                            $("#img_code_box").show().find("input").addClass("sms-txt-input"),
                            refreshSmsAuth()) : ($("#input-code").hide().find("input").removeClass("txt-input"),
                            _need_ck = !1,
                            m(),
                            $("#img_code_box").hide().find("input").removeClass("sms-txt-input")),
                            b(),
                            a.errcode) {
                            case 6:
                                $(".notice").html(a.message);
                                break;
                            case 7:
                                $(".notice").html(a.message);
                                break;
                            case 257:
                                $(".notice").html(a.message);
                                break;
                            case 128:
                            case 129:
                            case 130:
                            case 131:
                            case 132:
                            case 133:
                            case 134:
                            case 135:
                            case 136:
                            case 137:
                            case 138:
                            case 139:
                            case 140:
                            case 141:
                            case 142:
                            case 143:
                                p({
                                    msg: a.message,
                                    btn: language.code_26,
                                    url: a.succcb
                                });
                                break;
                            case 100:
                                p({
                                    msg: language.code_27,
                                    btn: language.code_26,
                                    url: "tel:4006065500"
                                });
                                break;
                            case 103:
                                p({
                                    msg: a.message,
                                    btn: language.code_11,
                                    url: "https://passport.m.jd.com/findloginpassword/fillAccountName.action"
                                });
                                break;
                            case 105:
                                location.href = a.succcb;
                                break;
                            default:
                                $(".notice").html(a.message)
                        }
                },
                error: function() {
                    $(".notice").html(language.code_28);
                    $("#loginBtn").removeClass("btn-active-disable").html(language.code_8);
                    var a = (new Date).getTime() - c;
                    window.pl_report({
                        interfaceID: 393217,
                        loginName: e,
                        callTime: a,
                        status: "255"
                    })
                }
            })
        }
        function F(a) {
            var e;
            return (e = document.cookie.match(new RegExp("(^| )" + a + "\x3d([^;]*)(;|$)"))) ? unescape(e[2]) : null
        }
        function G() {
            var a = (new Date).getTime();
            clearInterval(g);
            g = setInterval(function() {
                $.ajax({
                    url: "/cgi-bin/m/tmauthchecktoken" + location.search + "\x26token\x3d" + c + "\x26ou_state\x3d" + f + "\x26okl_token\x3d" + F("okl_token"),
                    type: "get",
                    dataType: "json",
                    success: function(e) {
                        var b = (new Date).getTime() - a;
                        window.pl_report({
                            interfaceID: 1048581,
                            loginName: "",
                            callTime: b,
                            status: e.errcode
                        });
                        0 == e.errcode && (mdUpdata("MLoginRegister_MLoginSuccess"),
                            location.href = e.jump_url);
                        18E4 < b && clearInterval(g)
                    },
                    error: function(a) {
                        console.log(a)
                    }
                })
            }, 3E3)
        }
        function E() {
            var a = {};
            a.username = encodeURIComponent($.trim($("#username").val()));
            a.pwd = $.trim($("#password").val());
            var b = str_rsaString;
            setMaxDigits(131);
            var b = new RSAKeyPair("3","10001",b,1024)
                , c = window.btoa(encryptedString(b, a.pwd, RSAAPP.PKCS1Padding, RSAAPP.RawEncoding));
            a.pwd = c;
            b = window.btoa(encryptedString(b, a.username, RSAAPP.PKCS1Padding, RSAAPP.RawEncoding));
            a.username = b;
            a.remember = h;
            a.s_token = str_kenString;
            try {
                a.dat = getDat(a.username, a.pwd),
                    a.wlfstk_datk = getDat(a.username, a.pwd)
            } catch (d) {}
            _need_ck && (a.authcode = $("#code").val().trim());
            return a
        }
        function D() {
            var a = {};
            a.mobile = encodeURIComponent($("#telphone").val());
            a.country_code = $(".area_code").attr("code");
            a.checkcode = $("#telCode").val();
            a.s_token = str_kenString;
            setMaxDigits(131);
            var b = new RSAKeyPair("3","10001",str_rsaString,1024)
                , b = window.btoa(encryptedString(b, a.mobile, RSAAPP.PKCS1Padding, RSAAPP.RawEncoding));
            a.mobile = b;
            try {
                a.dat = getDat(a.mobile, a.checkcode)
            } catch (k) {}
            return a
        }
        function B() {
            var a = {};
            a.mobile = encodeURIComponent($("#telphone").val());
            a.country_code = $(".area_code").attr("code");
            a.hisconsignee = $(".verify-input").val();
            a.s_token = str_kenString;
            setMaxDigits(131);
            var b = new RSAKeyPair("3","10001",str_rsaString,1024)
                , b = window.btoa(encryptedString(b, a.mobile, RSAAPP.PKCS1Padding, RSAAPP.RawEncoding));
            a.mobile = b;
            try {
                a.dat = getDat(a.mobile, a.hisconsignee)
            } catch (k) {}
            return a
        }
        $("#loginOneStep").on("click", function() {
            var a = this
                , b = kpkeyBtn ? {
                remember: h,
                kpkey: theRequest.kpkey
            } : {
                remember: h
            };
            if (!$(this).hasClass("btn-invalid")) {
                $(this).addClass("btn-invalid");
                $(this).html(language.code_20);
                var g = (new Date).getTime();
                $.ajax({
                    url: "/cgi-bin/m/tmauthreflogurl?s_token\x3d" + str_kenString + "\x26v\x3d" + (new Date).getTime(),
                    type: "get",
                    dataType: "json",
                    data: b,
                    success: function(b) {
                        var d = (new Date).getTime() - g;
                        f = b.ou_state;
                        window.pl_report({
                            interfaceID: 1048577,
                            loginName: "",
                            callTime: d,
                            status: b.errcode
                        });
                        0 == b.errcode ? ($(a).css("display", b.onekeylog_switch),
                            c = b.token,
                        1 != b.checklogin && (b.need_poll && G(),
                            openApp(b.onekeylog_url, function(b) {
                                b || kpkeyBtn || toast('"' + language.code_21 + '"\uff0c\x3ca href\x3d"javascript:;" style\x3d"color:#f23030;" class\x3d"J_ping" report-eventid\x3d"MLoginRegister_Msetup"\x3e"' + language.code_22 + '"\x3c/a\x3e', 4E3);
                                $(a).removeClass("btn-invalid").html(language.code_9)
                            }))) : (toast(b.message),
                            $(a).removeClass("btn-invalid").html(language.code_9))
                    },
                    error: function() {
                        toast(language.code_23);
                        $(a).removeClass("btn-invalid").html(language.code_9)
                    }
                })
            }
        });
        kpkeyBtn && $("#loginOneStep").trigger("click");
        _need_ck && ($("#code").addClass("txt-input"),
            $("#smsCode").addClass("sms-txt-input"));
        isAccountInp && ($("#username").attr("readonly", "readonly"),
            $("#username").addClass("input-disable"));
        $(".J_ping").on("click", function() {
            var a = $(this).attr("report-eventid");
            mdUpdata(a)
        });
        $(".toast").on("click", function() {
            if ($(this).find("a.J_ping")) {
                var a = $(this).find("a.J_ping").attr("report-eventid");
                mdUpdata(a);
                setTimeout(function() {
                    window.location.href = "//h5.m.jd.com/active/download/download.html?channel\x3djd-mlogin"
                }, 100)
            }
        });
        $(".username-login, .sms-login").on("click", function() {
            if (!$(this).hasClass("login-selected")) {
                $(".notice").html("\x26nbsp;");
                $(this).addClass("login-selected").siblings().removeClass("login-selected");
                var a = $(this).attr("content-id");
                a && ($("#" + a).addClass("login-wrap-active").siblings(".login-wrap").removeClass("login-wrap-active"),
                    "username_login" == a ? ($("#loginBtn").attr("report-eventid", "MLoginRegister_Login"),
                        $(".findpwd").attr("report-eventid", "MLoginRegister_FindPassword"),
                        $(".quickReg").attr("report-eventid", "MLoginRegister_PhoneRegister"),
                        $(".quick-qq").attr("report-eventid", "MLoginRegister_QQLogin"),
                        $(".quick-wx").attr("report-eventid", "MLoginRegister_WxLogin"),
                        $("#loginOneStep").attr("report-eventid", "MLoginRegister_MLogin"),
                        r() ? $("#loginBtn").addClass("btn-active") : $("#loginBtn").removeClass("btn-active")) : ($("#loginBtn").attr("report-eventid", "MLoginRegister_SMSLogin"),
                        $(".findpwd").attr("report-eventid", "MLoginRegister_ForgetPassword"),
                        $(".quickReg").attr("report-eventid", "MLoginRegister_SMSQuickRegister"),
                        $(".quick-qq").attr("report-eventid", "MLoginRegister_SMSQQLogin"),
                        $(".quick-wx").attr("report-eventid", "MLoginRegister_SMSWxLogin"),
                        $("#loginOneStep").attr("report-eventid", "MLoginRegister_SMS_MLogin"),
                        a = $("#telphone").val(),
                        v() && n(a) ? $("#loginBtn").addClass("btn-active") : $("#loginBtn").removeClass("btn-active")))
            }
        });
        b();
        $("#smsImgCode").on("click", function() {
            refreshSmsAuth()
        });
        $("#telphone").on("input", function() {
            $(this).val() && l && n($(this).val()) ? $(".mesg-code").removeClass("mesg-disable") : $(".mesg-code").addClass("mesg-disable")
        });
        $(".mesg-code").on("click", function() {
            if ($(this).hasClass("mesg-disable"))
                return !1;
            var a = $("#telphone").val()
                , b = $(".area_code").attr("code");
            n(a) ? ($(".notice").html("\x26nbsp;"),
            l && z(a, b)) : $(".notice").html(language.code_37)
        });
        $(".area-box").on("click", function() {
            $(".drop").show();
            "" == $(".area").html() && $.fn.CityPicker();
            t(language.code_42, ".page", ".area")
        });
        $(document).off("tap", "dd").on("tap", "dd", function() {
            t(language.code_1, ".area", ".page");
            var a = $(this).children(".number").attr("area_code");
            $(".area_code").html("+" + a).attr("code", a);
            mdUpdata("MLoginRegister_SpecAreaCode");
            setTimeout(function() {
                $(".drop").hide()
            }, 500)
        });
        $(".verify-cancel").on("click", function() {
            $(".verify-body").hide();
            $(".verify-dialog").hide()
        });
        $(".verify-continue").on("click", function() {
            $(".verify-input").val() ? A() : $(".verify-notice").html(language.code_43)
        });
        $("#imgCode").on("click", function() {
            refreshAuth()
        });
        $(".quickReg").on("click", function() {
            setTimeout(function() {
                location.href = mregUrl + u
            }, 100)
        });
        $(".findpwd").on("click", function() {
            setTimeout(function() {
                location.href = "/cgi-bin/m/mfindpwd" + location.search
            }, 100)
        });
        $(".quick-qq").on("click", function() {
            setTimeout(function() {
                location.href = "/cgi-bin/m/qqlogin"
            }, 100)
        });
        $(".quick-wx").on("click", function() {
            setTimeout(function() {
                location.href = "/cgi-bin/m/wxlogin"
            }, 100)
        });
        $(".icon-goback").on("click", function() {
            "block" == $(".page").css("display") ? window.history.back() : (t(language.code_1, ".area", ".page"),
                $(".drop").hide())
        });
        $("#remberme").on("click", function(a) {
            h = !h
        });
        $(".label-checkbox").on("click", function() {
            var a = $(this).find("input").prop("checked");
            a ? $(this).siblings("input").attr("type", "password") : $(this).siblings("input").attr("type", "text");
            $(this).find("input").prop("checked", !a)
        });
        $(".btn-cancel").on("click", function() {
            $(this).parents(".pop-dialog").hide()
        });
        $(".btn-continue").on("click", function() {
            "changeLogin" === $(this).attr("data-action") && $(".username-login").trigger("click");
            $(this).parents(".pop-dialog").hide()
        });
        var q = !1;
        $(".acc-input").on("focus", function() {
            $(this).attr("readonly") || $(this).siblings("i").show()
        }).on("blur", function() {
            var a = this;
            setTimeout(function() {
                $(a).siblings("i").hide()
            }, 200)
        });
        $(".icon-clear").on("click", function() {
            $(this).siblings("input").val("").focus();
            $(this).hide();
            q || ($("#telphone").val() || $(".mesg-code").addClass("mesg-disable"),
                r() ? $("#loginBtn").addClass("btn-active") : $("#loginBtn").removeClass("btn-active"))
        });
        m();
        $("#loginBtn").on("click", function() {
            if (q)
                r() ? x() : $(".notice").html(language.code_24);
            else if ($(this).hasClass("btn-active"))
                $(".login-tab .sms-login").hasClass("login-selected") ? C() : x();
            else
                return !1
        })
    }
    var c = null
        , f = null
        , g = null
        , h = !0
        , l = !0
        , u = getParamStrExcludeAccount();
    $(document).ready(function() {
        b()
    })
});
