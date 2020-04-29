
! function (e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t(require("preact")) : "function" == typeof define && define.amd ? define(["preact"], t) : e.preactRenderToString = t(e.preact)
}(this, function (e) {
    var t = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|^--/i,
        n = function (e) {
            return String(e).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
        },
        r = function (e, t) {
            return String(e).replace(/(\n+)/g, "$1" + (t || "\t"))
        },
        o = function (e, t, n) {
            return String(e).length > (t || 40) || !n && -1 !== String(e).indexOf("\n") || -1 !== String(e).indexOf("<")
        },
        i = {};

    function a(e) {
        var n = "";
        for (var r in e) {
            var o = e[r];
            null != o && (n && (n += " "), n += i[r] || (i[r] = r.replace(/([A-Z])/g, "-$1").toLowerCase()), n += ": ", n += o, "number" == typeof o && !1 === t.test(r) && (n += "px"), n += ";")
        }
        return n || void 0
    }

    function l(e, t) {
        for (var n in t) e[n] = t[n];
        return e
    }

    function s(e, t) {
        return Array.isArray(t) ? t.reduce(s, e) : null != t && !1 !== t && e.push(t), e
    }
    var c = {
            shallow: !0
        },
        f = [],
        p = /^(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)$/,
        u = function () {};
    g.render = g;

    function g(t, i, c, d, _, h) {
        if (null == t || "boolean" == typeof t) return "";
        Array.isArray(t) && (t = e.createElement(e.Fragment, null, t));
        var v = t.type,
            m = t.props,
            y = !1;
        i = i || {};
        var x, b = (c = c || {}).pretty,
            S = b && "string" == typeof b ? b : "\t";
        if ("object" != typeof t && !v) return n(t);
        if ("function" == typeof v) {
            if (y = !0, !c.shallow || !d && !1 !== c.renderRootComponent) {
                if (v === e.Fragment) {
                    var w = "",
                        k = [];
                    s(k, t.props.children);
                    for (var O = 0; O < k.length; O++) w += (O > 0 && b ? "\n" : "") + g(k[O], i, c, !1 !== c.shallowHighOrder, _, h);
                    return w
                }
                var C, A = t.__c = {
                    __v: t,
                    context: i,
                    props: t.props,
                    setState: u,
                    forceUpdate: u,
                    __h: []
                };
                if (e.options.__r && e.options.__r(t), v.prototype && "function" == typeof v.prototype.render) {
                    var j = v.contextType,
                        F = j && i[j.__c],
                        H = null != j ? F ? F.props.value : j.__ : i;
                    (A = t.__c = new v(m, H)).__v = t, A._dirty = A.__d = !0, A.props = m, null == A.state && (A.state = {}), null == A._nextState && null == A.__s && (A._nextState = A.__s = A.state), A.context = H, v.getDerivedStateFromProps ? A.state = l(l({}, A.state), v.getDerivedStateFromProps(A.props, A.state)) : A.componentWillMount && A.componentWillMount(), A.state = A._nextState !== A.state ? A._nextState : A.__s !== A.state ? A.__s : A.state, C = A.render(A.props, A.state, A.context)
                } else {
                    var T = v.contextType,
                        $ = T && i[T.__c];
                    C = v.call(t.__c, m, null != T ? $ ? $.props.value : T.__ : i)
                }
                return A.getChildContext && (i = l(l({}, i), A.getChildContext())), g(C, i, c, !1 !== c.shallowHighOrder, _, h)
            }
            v = (x = v).displayName || x !== Function && x.name || function (e) {
                var t = (Function.prototype.toString.call(e).match(/^\s*function\s+([^( ]+)/) || "")[1];
                if (!t) {
                    for (var n = -1, r = f.length; r--;)
                        if (f[r] === e) {
                            n = r;
                            break
                        } n < 0 && (n = f.push(e) - 1), t = "UnnamedComponent" + n
                }
                return t
            }(x)
        }
        var L, M = "";
        if (m) {
            var R = Object.keys(m);
            c && !0 === c.sortAttributes && R.sort();
            for (var q = 0; q < R.length; q++) {
                var D = R[q],
                    E = m[D];
                if ("children" !== D && (!D.match(/[\s\n\\/='"\0<>]/) && (c && c.allAttributes || "key" !== D && "ref" !== D))) {
                    if ("className" === D) {
                        if (m.class) continue;
                        D = "class"
                    } else _ && D.match(/^xlink:?./) && (D = D.toLowerCase().replace(/^xlink:?/, "xlink:"));
                    "style" === D && E && "object" == typeof E && (E = a(E));
                    var N = c.attributeHook && c.attributeHook(D, E, i, c, y);
                    if (N || "" === N) M += N;
                    else if ("dangerouslySetInnerHTML" === D) L = E && E.__html;
                    else if ((E || 0 === E || "" === E) && "function" != typeof E) {
                        if (!(!0 !== E && "" !== E || (E = D, c && c.xml))) {
                            M += " " + D;
                            continue
                        }
                        if ("value" === D) {
                            if ("select" === v) {
                                h = E;
                                continue
                            }
                            "option" === v && h == E && (M += " selected")
                        }
                        M += " " + D + '="' + n(E) + '"'
                    }
                }
            }
        }
        if (b) {
            var P = M.replace(/^\n\s*/, " ");
            P === M || ~P.indexOf("\n") ? b && ~M.indexOf("\n") && (M += "\n") : M = P
        }
        if (M = "<" + v + M + ">", String(v).match(/[\s\n\\/='"\0<>]/)) throw new Error(v + " is not a valid HTML tag name in " + M);
        var U = String(v).match(p);
        U && (M = M.replace(/>$/, " />"));
        var W, z = [];
        if (L) b && o(L) && (L = "\n" + S + r(L, S)), M += L;
        else if (m && s(W = [], m.children).length) {
            for (var I = b && ~M.indexOf("\n"), Z = !1, B = 0; B < W.length; B++) {
                var G = W[B];
                if (null != G && !1 !== G) {
                    var J = g(G, i, c, !0, "svg" === v || "foreignObject" !== v && _, h);
                    if (b && !I && o(J) && (I = !0), J)
                        if (b) {
                            var K = J.length > 0 && "<" != J[0];
                            Z && K ? z[z.length - 1] += J : z.push(J), Z = K
                        } else z.push(J)
                }
            }
            if (b && I)
                for (var Q = z.length; Q--;) z[Q] = "\n" + S + r(z[Q], S)
        }
        if (z.length) M += z.join("");
        else if (c && c.xml) return M.substring(0, M.length - 1) + " />";
        return U || (b && ~M.indexOf("\n") && (M += "\n"), M += "</" + v + ">"), M
    }
    return g.shallowRender = function (e, t) {
        return g(e, t, c)
    }, g
});
//# sourceMappingURL=index.js.map