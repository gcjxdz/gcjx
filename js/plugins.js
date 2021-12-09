/*!
 * SlickNav Responsive Mobile Menu v1.0.10
 * (c) 2016 Josh Cope
 * licensed under MIT
 */
!(function (e, t, n) {
  function a(t, n) {
    (this.element = t),
      (this.settings = e.extend({}, i, n)),
      this.settings.duplicate ||
        n.hasOwnProperty("removeIds") ||
        (this.settings.removeIds = !1),
      (this._defaults = i),
      (this._name = s),
      this.init();
  }
  var i = {
      label: "MENU",
      duplicate: !0,
      duration: 200,
      easingOpen: "swing",
      easingClose: "swing",
      closedSymbol: "&#9658;",
      openedSymbol: "&#9660;",
      prependTo: "body",
      appendTo: "",
      parentTag: "a",
      closeOnClick: !1,
      allowParentLinks: !1,
      nestedParentLinks: !0,
      showChildren: !1,
      removeIds: !0,
      removeClasses: !1,
      removeStyles: !1,
      brand: "",
      animations: "jquery",
      init: function () {},
      beforeOpen: function () {},
      beforeClose: function () {},
      afterOpen: function () {},
      afterClose: function () {},
    },
    s = "slicknav",
    o = "slicknav",
    l = {
      DOWN: 40,
      ENTER: 13,
      ESCAPE: 27,
      LEFT: 37,
      RIGHT: 39,
      SPACE: 32,
      TAB: 9,
      UP: 38,
    };
  (a.prototype.init = function () {
    var n,
      a,
      i = this,
      s = e(this.element),
      r = this.settings;
    if (
      (r.duplicate ? (i.mobileNav = s.clone()) : (i.mobileNav = s),
      r.removeIds &&
        (i.mobileNav.removeAttr("id"),
        i.mobileNav.find("*").each(function (t, n) {
          e(n).removeAttr("id");
        })),
      r.removeClasses &&
        (i.mobileNav.removeAttr("class"),
        i.mobileNav.find("*").each(function (t, n) {
          e(n).removeAttr("class");
        })),
      r.removeStyles &&
        (i.mobileNav.removeAttr("style"),
        i.mobileNav.find("*").each(function (t, n) {
          e(n).removeAttr("style");
        })),
      (n = o + "_icon"),
      "" === r.label && (n += " " + o + "_no-text"),
      "a" == r.parentTag && (r.parentTag = 'a href="#"'),
      i.mobileNav.attr("class", o + "_nav"),
      (a = e('<div class="' + o + '_menu"></div>')),
      "" !== r.brand)
    ) {
      var c = e('<div class="' + o + '_brand">' + r.brand + "</div>");
      e(a).append(c);
    }
    (i.btn = e(
      [
        "<" +
          r.parentTag +
          ' aria-haspopup="true" role="button" tabindex="0" class="' +
          o +
          "_btn " +
          o +
          '_collapsed">',
        '<span class="' + o + '_menutxt">' + r.label + "</span>",
        '<span class="' + n + '">',
        '<span class="' + o + '_icon-bar"></span>',
        '<span class="' + o + '_icon-bar"></span>',
        '<span class="' + o + '_icon-bar"></span>',
        "</span>",
        "</" + r.parentTag + ">",
      ].join("")
    )),
      e(a).append(i.btn),
      "" !== r.appendTo ? e(r.appendTo).append(a) : e(r.prependTo).prepend(a),
      a.append(i.mobileNav);
    var p = i.mobileNav.find("li");
    e(p).each(function () {
      var t = e(this),
        n = {};
      if (
        ((n.children = t.children("ul").attr("role", "menu")),
        t.data("menu", n),
        n.children.length > 0)
      ) {
        var a = t.contents(),
          s = !1,
          l = [];
        e(a).each(function () {
          return e(this).is("ul")
            ? !1
            : (l.push(this), void (e(this).is("a") && (s = !0)));
        });
        var c = e(
          "<" +
            r.parentTag +
            ' role="menuitem" aria-haspopup="true" tabindex="-1" class="' +
            o +
            '_item"/>'
        );
        if (r.allowParentLinks && !r.nestedParentLinks && s)
          e(l)
            .wrapAll('<span class="' + o + "_parent-link " + o + '_row"/>')
            .parent();
        else {
          var p = e(l).wrapAll(c).parent();
          p.addClass(o + "_row");
        }
        r.showChildren ? t.addClass(o + "_open") : t.addClass(o + "_collapsed"),
          t.addClass(o + "_parent");
        var d = e(
          '<span class="' +
            o +
            '_arrow">' +
            (r.showChildren ? r.openedSymbol : r.closedSymbol) +
            "</span>"
        );
        r.allowParentLinks &&
          !r.nestedParentLinks &&
          s &&
          (d = d.wrap(c).parent()),
          e(l).last().after(d);
      } else 0 === t.children().length && t.addClass(o + "_txtnode");
      t
        .children("a")
        .attr("role", "menuitem")
        .click(function (t) {
          r.closeOnClick &&
            !e(t.target)
              .parent()
              .closest("li")
              .hasClass(o + "_parent") &&
            e(i.btn).click();
        }),
        r.closeOnClick &&
          r.allowParentLinks &&
          (t
            .children("a")
            .children("a")
            .click(function (t) {
              e(i.btn).click();
            }),
          t
            .find("." + o + "_parent-link a:not(." + o + "_item)")
            .click(function (t) {
              e(i.btn).click();
            }));
    }),
      e(p).each(function () {
        var t = e(this).data("menu");
        r.showChildren || i._visibilityToggle(t.children, null, !1, null, !0);
      }),
      i._visibilityToggle(i.mobileNav, null, !1, "init", !0),
      i.mobileNav.attr("role", "menu"),
      e(t).mousedown(function () {
        i._outlines(!1);
      }),
      e(t).keyup(function () {
        i._outlines(!0);
      }),
      e(i.btn).click(function (e) {
        e.preventDefault(), i._menuToggle();
      }),
      i.mobileNav.on("click", "." + o + "_item", function (t) {
        t.preventDefault(), i._itemClick(e(this));
      }),
      e(i.btn).keydown(function (t) {
        var n = t || event;
        switch (n.keyCode) {
          case l.ENTER:
          case l.SPACE:
          case l.DOWN:
            t.preventDefault(),
              (n.keyCode === l.DOWN && e(i.btn).hasClass(o + "_open")) ||
                i._menuToggle(),
              e(i.btn).next().find('[role="menuitem"]').first().focus();
        }
      }),
      i.mobileNav.on("keydown", "." + o + "_item", function (t) {
        var n = t || event;
        switch (n.keyCode) {
          case l.ENTER:
            t.preventDefault(), i._itemClick(e(t.target));
            break;
          case l.RIGHT:
            t.preventDefault(),
              e(t.target)
                .parent()
                .hasClass(o + "_collapsed") && i._itemClick(e(t.target)),
              e(t.target).next().find('[role="menuitem"]').first().focus();
        }
      }),
      i.mobileNav.on("keydown", '[role="menuitem"]', function (t) {
        var n = t || event;
        switch (n.keyCode) {
          case l.DOWN:
            t.preventDefault();
            var a = e(t.target)
                .parent()
                .parent()
                .children()
                .children('[role="menuitem"]:visible'),
              s = a.index(t.target),
              r = s + 1;
            a.length <= r && (r = 0);
            var c = a.eq(r);
            c.focus();
            break;
          case l.UP:
            t.preventDefault();
            var a = e(t.target)
                .parent()
                .parent()
                .children()
                .children('[role="menuitem"]:visible'),
              s = a.index(t.target),
              c = a.eq(s - 1);
            c.focus();
            break;
          case l.LEFT:
            if (
              (t.preventDefault(),
              e(t.target)
                .parent()
                .parent()
                .parent()
                .hasClass(o + "_open"))
            ) {
              var p = e(t.target).parent().parent().prev();
              p.focus(), i._itemClick(p);
            } else
              e(t.target)
                .parent()
                .parent()
                .hasClass(o + "_nav") && (i._menuToggle(), e(i.btn).focus());
            break;
          case l.ESCAPE:
            t.preventDefault(), i._menuToggle(), e(i.btn).focus();
        }
      }),
      r.allowParentLinks &&
        r.nestedParentLinks &&
        e("." + o + "_item a").click(function (e) {
          e.stopImmediatePropagation();
        });
  }),
    (a.prototype._menuToggle = function (e) {
      var t = this,
        n = t.btn,
        a = t.mobileNav;
      n.hasClass(o + "_collapsed")
        ? (n.removeClass(o + "_collapsed"), n.addClass(o + "_open"))
        : (n.removeClass(o + "_open"), n.addClass(o + "_collapsed")),
        n.addClass(o + "_animating"),
        t._visibilityToggle(a, n.parent(), !0, n);
    }),
    (a.prototype._itemClick = function (e) {
      var t = this,
        n = t.settings,
        a = e.data("menu");
      a ||
        ((a = {}),
        (a.arrow = e.children("." + o + "_arrow")),
        (a.ul = e.next("ul")),
        (a.parent = e.parent()),
        a.parent.hasClass(o + "_parent-link") &&
          ((a.parent = e.parent().parent()), (a.ul = e.parent().next("ul"))),
        e.data("menu", a)),
        a.parent.hasClass(o + "_collapsed")
          ? (a.arrow.html(n.openedSymbol),
            a.parent.removeClass(o + "_collapsed"),
            a.parent.addClass(o + "_open"),
            a.parent.addClass(o + "_animating"),
            t._visibilityToggle(a.ul, a.parent, !0, e))
          : (a.arrow.html(n.closedSymbol),
            a.parent.addClass(o + "_collapsed"),
            a.parent.removeClass(o + "_open"),
            a.parent.addClass(o + "_animating"),
            t._visibilityToggle(a.ul, a.parent, !0, e));
    }),
    (a.prototype._visibilityToggle = function (t, n, a, i, s) {
      function l(t, n) {
        e(t).removeClass(o + "_animating"),
          e(n).removeClass(o + "_animating"),
          s || p.afterOpen(t);
      }
      function r(n, a) {
        t.attr("aria-hidden", "true"),
          d.attr("tabindex", "-1"),
          c._setVisAttr(t, !0),
          t.hide(),
          e(n).removeClass(o + "_animating"),
          e(a).removeClass(o + "_animating"),
          s ? "init" == n && p.init() : p.afterClose(n);
      }
      var c = this,
        p = c.settings,
        d = c._getActionItems(t),
        u = 0;
      a && (u = p.duration),
        t.hasClass(o + "_hidden")
          ? (t.removeClass(o + "_hidden"),
            s || p.beforeOpen(i),
            "jquery" === p.animations
              ? t.stop(!0, !0).slideDown(u, p.easingOpen, function () {
                  l(i, n);
                })
              : "velocity" === p.animations &&
                t.velocity("finish").velocity("slideDown", {
                  duration: u,
                  easing: p.easingOpen,
                  complete: function () {
                    l(i, n);
                  },
                }),
            t.attr("aria-hidden", "false"),
            d.attr("tabindex", "0"),
            c._setVisAttr(t, !1))
          : (t.addClass(o + "_hidden"),
            s || p.beforeClose(i),
            "jquery" === p.animations
              ? t
                  .stop(!0, !0)
                  .slideUp(u, this.settings.easingClose, function () {
                    r(i, n);
                  })
              : "velocity" === p.animations &&
                t.velocity("finish").velocity("slideUp", {
                  duration: u,
                  easing: p.easingClose,
                  complete: function () {
                    r(i, n);
                  },
                }));
    }),
    (a.prototype._setVisAttr = function (t, n) {
      var a = this,
        i = t
          .children("li")
          .children("ul")
          .not("." + o + "_hidden");
      n
        ? i.each(function () {
            var t = e(this);
            t.attr("aria-hidden", "true");
            var i = a._getActionItems(t);
            i.attr("tabindex", "-1"), a._setVisAttr(t, n);
          })
        : i.each(function () {
            var t = e(this);
            t.attr("aria-hidden", "false");
            var i = a._getActionItems(t);
            i.attr("tabindex", "0"), a._setVisAttr(t, n);
          });
    }),
    (a.prototype._getActionItems = function (e) {
      var t = e.data("menu");
      if (!t) {
        t = {};
        var n = e.children("li"),
          a = n.find("a");
        (t.links = a.add(n.find("." + o + "_item"))), e.data("menu", t);
      }
      return t.links;
    }),
    (a.prototype._outlines = function (t) {
      t
        ? e("." + o + "_item, ." + o + "_btn").css("outline", "")
        : e("." + o + "_item, ." + o + "_btn").css("outline", "none");
    }),
    (a.prototype.toggle = function () {
      var e = this;
      e._menuToggle();
    }),
    (a.prototype.open = function () {
      var e = this;
      e.btn.hasClass(o + "_collapsed") && e._menuToggle();
    }),
    (a.prototype.close = function () {
      var e = this;
      e.btn.hasClass(o + "_open") && e._menuToggle();
    }),
    (e.fn[s] = function (t) {
      var n = arguments;
      if (void 0 === t || "object" == typeof t)
        return this.each(function () {
          e.data(this, "plugin_" + s) ||
            e.data(this, "plugin_" + s, new a(this, t));
        });
      if ("string" == typeof t && "_" !== t[0] && "init" !== t) {
        var i;
        return (
          this.each(function () {
            var o = e.data(this, "plugin_" + s);
            o instanceof a &&
              "function" == typeof o[t] &&
              (i = o[t].apply(o, Array.prototype.slice.call(n, 1)));
          }),
          void 0 !== i ? i : this
        );
      }
    });
})(jQuery, document, window);

/*! lazysizes - v5.2.0 */
!(function (a, b) {
  var c = b(a, a.document, Date);
  (a.lazySizes = c),
    "object" == typeof module && module.exports && (module.exports = c);
})("undefined" != typeof window ? window : {}, function (a, b, c) {
  "use strict";
  var d, e;
  if (
    ((function () {
      var b,
        c = {
          lazyClass: "lazyload",
          loadedClass: "lazyloaded",
          loadingClass: "lazyloading",
          preloadClass: "lazypreload",
          errorClass: "lazyerror",
          autosizesClass: "lazyautosizes",
          srcAttr: "data-src",
          srcsetAttr: "data-srcset",
          sizesAttr: "data-sizes",
          minSize: 40,
          customMedia: {},
          init: !0,
          expFactor: 1.5,
          hFac: 0.8,
          loadMode: 2,
          loadHidden: !0,
          ricTimeout: 0,
          throttleDelay: 125,
        };
      e = a.lazySizesConfig || a.lazysizesConfig || {};
      for (b in c) b in e || (e[b] = c[b]);
    })(),
    !b || !b.getElementsByClassName)
  )
    return { init: function () {}, cfg: e, noSupport: !0 };
  var f = b.documentElement,
    g = a.HTMLPictureElement,
    h = "addEventListener",
    i = "getAttribute",
    j = a[h].bind(a),
    k = a.setTimeout,
    l = a.requestAnimationFrame || k,
    m = a.requestIdleCallback,
    n = /^picture$/i,
    o = ["load", "error", "lazyincluded", "_lazyloaded"],
    p = {},
    q = Array.prototype.forEach,
    r = function (a, b) {
      return (
        p[b] || (p[b] = new RegExp("(\\s|^)" + b + "(\\s|$)")),
        p[b].test(a[i]("class") || "") && p[b]
      );
    },
    s = function (a, b) {
      r(a, b) ||
        a.setAttribute("class", (a[i]("class") || "").trim() + " " + b);
    },
    t = function (a, b) {
      var c;
      (c = r(a, b)) &&
        a.setAttribute("class", (a[i]("class") || "").replace(c, " "));
    },
    u = function (a, b, c) {
      var d = c ? h : "removeEventListener";
      c && u(a, b),
        o.forEach(function (c) {
          a[d](c, b);
        });
    },
    v = function (a, c, e, f, g) {
      var h = b.createEvent("Event");
      return (
        e || (e = {}),
        (e.instance = d),
        h.initEvent(c, !f, !g),
        (h.detail = e),
        a.dispatchEvent(h),
        h
      );
    },
    w = function (b, c) {
      var d;
      !g && (d = a.picturefill || e.pf)
        ? (c && c.src && !b[i]("srcset") && b.setAttribute("srcset", c.src),
          d({ reevaluate: !0, elements: [b] }))
        : c && c.src && (b.src = c.src);
    },
    x = function (a, b) {
      return (getComputedStyle(a, null) || {})[b];
    },
    y = function (a, b, c) {
      for (c = c || a.offsetWidth; c < e.minSize && b && !a._lazysizesWidth; )
        (c = b.offsetWidth), (b = b.parentNode);
      return c;
    },
    z = (function () {
      var a,
        c,
        d = [],
        e = [],
        f = d,
        g = function () {
          var b = f;
          for (f = d.length ? e : d, a = !0, c = !1; b.length; ) b.shift()();
          a = !1;
        },
        h = function (d, e) {
          a && !e
            ? d.apply(this, arguments)
            : (f.push(d), c || ((c = !0), (b.hidden ? k : l)(g)));
        };
      return (h._lsFlush = g), h;
    })(),
    A = function (a, b) {
      return b
        ? function () {
            z(a);
          }
        : function () {
            var b = this,
              c = arguments;
            z(function () {
              a.apply(b, c);
            });
          };
    },
    B = function (a) {
      var b,
        d = 0,
        f = e.throttleDelay,
        g = e.ricTimeout,
        h = function () {
          (b = !1), (d = c.now()), a();
        },
        i =
          m && g > 49
            ? function () {
                m(h, { timeout: g }), g !== e.ricTimeout && (g = e.ricTimeout);
              }
            : A(function () {
                k(h);
              }, !0);
      return function (a) {
        var e;
        (a = !0 === a) && (g = 33),
          b ||
            ((b = !0),
            (e = f - (c.now() - d)),
            e < 0 && (e = 0),
            a || e < 9 ? i() : k(i, e));
      };
    },
    C = function (a) {
      var b,
        d,
        e = 99,
        f = function () {
          (b = null), a();
        },
        g = function () {
          var a = c.now() - d;
          a < e ? k(g, e - a) : (m || f)(f);
        };
      return function () {
        (d = c.now()), b || (b = k(g, e));
      };
    },
    D = (function () {
      var g,
        m,
        o,
        p,
        y,
        D,
        F,
        G,
        H,
        I,
        J,
        K,
        L = /^img$/i,
        M = /^iframe$/i,
        N = "onscroll" in a && !/(gle|ing)bot/.test(navigator.userAgent),
        O = 0,
        P = 0,
        Q = 0,
        R = -1,
        S = function (a) {
          Q--, (!a || Q < 0 || !a.target) && (Q = 0);
        },
        T = function (a) {
          return (
            null == K && (K = "hidden" == x(b.body, "visibility")),
            K ||
              !(
                "hidden" == x(a.parentNode, "visibility") &&
                "hidden" == x(a, "visibility")
              )
          );
        },
        U = function (a, c) {
          var d,
            e = a,
            g = T(a);
          for (
            G -= c, J += c, H -= c, I += c;
            g && (e = e.offsetParent) && e != b.body && e != f;

          )
            (g = (x(e, "opacity") || 1) > 0) &&
              "visible" != x(e, "overflow") &&
              ((d = e.getBoundingClientRect()),
              (g =
                I > d.left &&
                H < d.right &&
                J > d.top - 1 &&
                G < d.bottom + 1));
          return g;
        },
        V = function () {
          var a,
            c,
            h,
            j,
            k,
            l,
            n,
            o,
            q,
            r,
            s,
            t,
            u = d.elements;
          if ((p = e.loadMode) && Q < 8 && (a = u.length)) {
            for (c = 0, R++; c < a; c++)
              if (u[c] && !u[c]._lazyRace)
                if (!N || (d.prematureUnveil && d.prematureUnveil(u[c])))
                  ba(u[c]);
                else if (
                  (((o = u[c][i]("data-expand")) && (l = 1 * o)) || (l = P),
                  r ||
                    ((r =
                      !e.expand || e.expand < 1
                        ? f.clientHeight > 500 && f.clientWidth > 500
                          ? 500
                          : 370
                        : e.expand),
                    (d._defEx = r),
                    (s = r * e.expFactor),
                    (t = e.hFac),
                    (K = null),
                    P < s && Q < 1 && R > 2 && p > 2 && !b.hidden
                      ? ((P = s), (R = 0))
                      : (P = p > 1 && R > 1 && Q < 6 ? r : O)),
                  q !== l &&
                    ((D = innerWidth + l * t),
                    (F = innerHeight + l),
                    (n = -1 * l),
                    (q = l)),
                  (h = u[c].getBoundingClientRect()),
                  (J = h.bottom) >= n &&
                    (G = h.top) <= F &&
                    (I = h.right) >= n * t &&
                    (H = h.left) <= D &&
                    (J || I || H || G) &&
                    (e.loadHidden || T(u[c])) &&
                    ((m && Q < 3 && !o && (p < 3 || R < 4)) || U(u[c], l)))
                ) {
                  if ((ba(u[c]), (k = !0), Q > 9)) break;
                } else
                  !k &&
                    m &&
                    !j &&
                    Q < 4 &&
                    R < 4 &&
                    p > 2 &&
                    (g[0] || e.preloadAfterLoad) &&
                    (g[0] ||
                      (!o &&
                        (J ||
                          I ||
                          H ||
                          G ||
                          "auto" != u[c][i](e.sizesAttr)))) &&
                    (j = g[0] || u[c]);
            j && !k && ba(j);
          }
        },
        W = B(V),
        X = function (a) {
          var b = a.target;
          if (b._lazyCache) return void delete b._lazyCache;
          S(a),
            s(b, e.loadedClass),
            t(b, e.loadingClass),
            u(b, Z),
            v(b, "lazyloaded");
        },
        Y = A(X),
        Z = function (a) {
          Y({ target: a.target });
        },
        $ = function (a, b) {
          try {
            a.contentWindow.location.replace(b);
          } catch (c) {
            a.src = b;
          }
        },
        _ = function (a) {
          var b,
            c = a[i](e.srcsetAttr);
          (b = e.customMedia[a[i]("data-media") || a[i]("media")]) &&
            a.setAttribute("media", b),
            c && a.setAttribute("srcset", c);
        },
        aa = A(function (a, b, c, d, f) {
          var g, h, j, l, m, p;
          (m = v(a, "lazybeforeunveil", b)).defaultPrevented ||
            (d && (c ? s(a, e.autosizesClass) : a.setAttribute("sizes", d)),
            (h = a[i](e.srcsetAttr)),
            (g = a[i](e.srcAttr)),
            f && ((j = a.parentNode), (l = j && n.test(j.nodeName || ""))),
            (p = b.firesLoad || ("src" in a && (h || g || l))),
            (m = { target: a }),
            s(a, e.loadingClass),
            p && (clearTimeout(o), (o = k(S, 2500)), u(a, Z, !0)),
            l && q.call(j.getElementsByTagName("source"), _),
            h
              ? a.setAttribute("srcset", h)
              : g && !l && (M.test(a.nodeName) ? $(a, g) : (a.src = g)),
            f && (h || l) && w(a, { src: g })),
            a._lazyRace && delete a._lazyRace,
            t(a, e.lazyClass),
            z(function () {
              var b = a.complete && a.naturalWidth > 1;
              (p && !b) ||
                (b && s(a, "ls-is-cached"),
                X(m),
                (a._lazyCache = !0),
                k(function () {
                  "_lazyCache" in a && delete a._lazyCache;
                }, 9)),
                "lazy" == a.loading && Q--;
            }, !0);
        }),
        ba = function (a) {
          if (!a._lazyRace) {
            var b,
              c = L.test(a.nodeName),
              d = c && (a[i](e.sizesAttr) || a[i]("sizes")),
              f = "auto" == d;
            ((!f && m) ||
              !c ||
              (!a[i]("src") && !a.srcset) ||
              a.complete ||
              r(a, e.errorClass) ||
              !r(a, e.lazyClass)) &&
              ((b = v(a, "lazyunveilread").detail),
              f && E.updateElem(a, !0, a.offsetWidth),
              (a._lazyRace = !0),
              Q++,
              aa(a, b, f, d, c));
          }
        },
        ca = C(function () {
          (e.loadMode = 3), W();
        }),
        da = function () {
          3 == e.loadMode && (e.loadMode = 2), ca();
        },
        ea = function () {
          if (!m) {
            if (c.now() - y < 999) return void k(ea, 999);
            (m = !0), (e.loadMode = 3), W(), j("scroll", da, !0);
          }
        };
      return {
        _: function () {
          (y = c.now()),
            (d.elements = b.getElementsByClassName(e.lazyClass)),
            (g = b.getElementsByClassName(e.lazyClass + " " + e.preloadClass)),
            j("scroll", W, !0),
            j("resize", W, !0),
            j("pageshow", function (a) {
              if (a.persisted) {
                var c = b.querySelectorAll("." + e.loadingClass);
                c.length &&
                  c.forEach &&
                  l(function () {
                    c.forEach(function (a) {
                      a.complete && ba(a);
                    });
                  });
              }
            }),
            a.MutationObserver
              ? new MutationObserver(W).observe(f, {
                  childList: !0,
                  subtree: !0,
                  attributes: !0,
                })
              : (f[h]("DOMNodeInserted", W, !0),
                f[h]("DOMAttrModified", W, !0),
                setInterval(W, 999)),
            j("hashchange", W, !0),
            [
              "focus",
              "mouseover",
              "click",
              "load",
              "transitionend",
              "animationend",
            ].forEach(function (a) {
              b[h](a, W, !0);
            }),
            /d$|^c/.test(b.readyState)
              ? ea()
              : (j("load", ea), b[h]("DOMContentLoaded", W), k(ea, 2e4)),
            d.elements.length ? (V(), z._lsFlush()) : W();
        },
        checkElems: W,
        unveil: ba,
        _aLSL: da,
      };
    })(),
    E = (function () {
      var a,
        c = A(function (a, b, c, d) {
          var e, f, g;
          if (
            ((a._lazysizesWidth = d),
            (d += "px"),
            a.setAttribute("sizes", d),
            n.test(b.nodeName || ""))
          )
            for (
              e = b.getElementsByTagName("source"), f = 0, g = e.length;
              f < g;
              f++
            )
              e[f].setAttribute("sizes", d);
          c.detail.dataAttr || w(a, c.detail);
        }),
        d = function (a, b, d) {
          var e,
            f = a.parentNode;
          f &&
            ((d = y(a, f, d)),
            (e = v(a, "lazybeforesizes", { width: d, dataAttr: !!b })),
            e.defaultPrevented ||
              ((d = e.detail.width) &&
                d !== a._lazysizesWidth &&
                c(a, f, e, d)));
        },
        f = function () {
          var b,
            c = a.length;
          if (c) for (b = 0; b < c; b++) d(a[b]);
        },
        g = C(f);
      return {
        _: function () {
          (a = b.getElementsByClassName(e.autosizesClass)), j("resize", g);
        },
        checkElems: g,
        updateElem: d,
      };
    })(),
    F = function () {
      !F.i && b.getElementsByClassName && ((F.i = !0), E._(), D._());
    };
  return (
    k(function () {
      e.init && F();
    }),
    (d = {
      cfg: e,
      autoSizer: E,
      loader: D,
      init: F,
      uP: w,
      aC: s,
      rC: t,
      hC: r,
      fire: v,
      gW: y,
      rAF: z,
    })
  );
});

/*! lazysizes Data-bg - v5.2.0 */
!(function (a, b) {
  var c = function () {
    b(a.lazySizes), a.removeEventListener("lazyunveilread", c, !0);
  };
  (b = b.bind(null, a, a.document)),
    "object" == typeof module && module.exports
      ? b(require("lazysizes"))
      : a.lazySizes
      ? c()
      : a.addEventListener("lazyunveilread", c, !0);
})(window, function (a, b, c) {
  "use strict";
  function d(a, c) {
    if (!g[a]) {
      var d = b.createElement(c ? "link" : "script"),
        e = b.getElementsByTagName("script")[0];
      c ? ((d.rel = "stylesheet"), (d.href = a)) : (d.src = a),
        (g[a] = !0),
        (g[d.src || d.href] = !0),
        e.parentNode.insertBefore(d, e);
    }
  }
  var e,
    f,
    g = {};
  b.addEventListener &&
    ((f = /\(|\)|\s|'/),
    (e = function (a, c) {
      var d = b.createElement("img");
      (d.onload = function () {
        (d.onload = null), (d.onerror = null), (d = null), c();
      }),
        (d.onerror = d.onload),
        (d.src = a),
        d && d.complete && d.onload && d.onload();
    }),
    addEventListener(
      "lazybeforeunveil",
      function (a) {
        if (a.detail.instance == c) {
          var b, g, h, i;
          a.defaultPrevented ||
            ("none" == a.target.preload && (a.target.preload = "auto"),
            (b = a.target.getAttribute("data-link")),
            b && d(b, !0),
            (b = a.target.getAttribute("data-script")),
            b && d(b),
            (b = a.target.getAttribute("data-require")),
            b && (c.cfg.requireJs ? c.cfg.requireJs([b]) : d(b)),
            (h = a.target.getAttribute("data-bg")),
            h &&
              ((a.detail.firesLoad = !0),
              (g = function () {
                (a.target.style.backgroundImage =
                  "url(" + (f.test(h) ? JSON.stringify(h) : h) + ")"),
                  (a.detail.firesLoad = !1),
                  c.fire(a.target, "_lazyloaded", {}, !0, !0);
              }),
              e(h, g)),
            (i = a.target.getAttribute("data-poster")),
            i &&
              ((a.detail.firesLoad = !0),
              (g = function () {
                (a.target.poster = i),
                  (a.detail.firesLoad = !1),
                  c.fire(a.target, "_lazyloaded", {}, !0, !0);
              }),
              e(i, g)));
        }
      },
      !1
    ));
});

/*! js-cookie v3.0.0-rc.1 | MIT */
!(function (e, t) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = t())
    : "function" == typeof define && define.amd
    ? define(t)
    : ((e = e || self),
      (function () {
        var n = e.Cookies,
          r = (e.Cookies = t());
        r.noConflict = function () {
          return (e.Cookies = n), r;
        };
      })());
})(this, function () {
  "use strict";
  function e(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n) e[r] = n[r];
    }
    return e;
  }
  var t = {
    read: function (e) {
      return e.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent);
    },
    write: function (e) {
      return encodeURIComponent(e).replace(
        /%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,
        decodeURIComponent
      );
    },
  };
  return (function n(r, o) {
    function i(t, n, i) {
      if ("undefined" != typeof document) {
        "number" == typeof (i = e({}, o, i)).expires &&
          (i.expires = new Date(Date.now() + 864e5 * i.expires)),
          i.expires && (i.expires = i.expires.toUTCString()),
          (t = encodeURIComponent(t)
            .replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent)
            .replace(/[()]/g, escape)),
          (n = r.write(n, t));
        var c = "";
        for (var u in i)
          i[u] &&
            ((c += "; " + u), !0 !== i[u] && (c += "=" + i[u].split(";")[0]));
        return (document.cookie = t + "=" + n + c);
      }
    }
    return Object.create(
      {
        set: i,
        get: function (e) {
          if ("undefined" != typeof document && (!arguments.length || e)) {
            for (
              var n = document.cookie ? document.cookie.split("; ") : [],
                o = {},
                i = 0;
              i < n.length;
              i++
            ) {
              var c = n[i].split("="),
                u = c.slice(1).join("=");
              '"' === u[0] && (u = u.slice(1, -1));
              try {
                var f = t.read(c[0]);
                if (((o[f] = r.read(u, f)), e === f)) break;
              } catch (e) {}
            }
            return e ? o[e] : o;
          }
        },
        remove: function (t, n) {
          i(t, "", e({}, n, { expires: -1 }));
        },
        withAttributes: function (t) {
          return n(this.converter, e({}, this.attributes, t));
        },
        withConverter: function (t) {
          return n(e({}, this.converter, t), this.attributes);
        },
      },
      {
        attributes: { value: Object.freeze(o) },
        converter: { value: Object.freeze(r) },
      }
    );
  })(t, { path: "/" });
});

/**
 * Owl Carousel v2.2.0
 * Copyright 2013-2016 David Deutsch
 * Licensed under MIT (https://github.com/OwlCarousel2/OwlCarousel2/blob/master/LICENSE)
 */
!(function (t, e, i, s) {
  function n(e, i) {
    (this.settings = null),
      (this.options = t.extend({}, n.Defaults, i)),
      (this.$element = t(e)),
      (this._handlers = {}),
      (this._plugins = {}),
      (this._supress = {}),
      (this._current = null),
      (this._speed = null),
      (this._coordinates = []),
      (this._breakpoint = null),
      (this._width = null),
      (this._items = []),
      (this._clones = []),
      (this._mergers = []),
      (this._widths = []),
      (this._invalidated = {}),
      (this._pipe = []),
      (this._drag = {
        time: null,
        target: null,
        pointer: null,
        stage: { start: null, current: null },
        direction: null,
      }),
      (this._states = {
        current: {},
        tags: {
          initializing: ["busy"],
          animating: ["busy"],
          dragging: ["interacting"],
        },
      }),
      t.each(
        ["onResize", "onThrottledResize"],
        t.proxy(function (e, i) {
          this._handlers[i] = t.proxy(this[i], this);
        }, this)
      ),
      t.each(
        n.Plugins,
        t.proxy(function (t, e) {
          this._plugins[t.charAt(0).toLowerCase() + t.slice(1)] = new e(this);
        }, this)
      ),
      t.each(
        n.Workers,
        t.proxy(function (e, i) {
          this._pipe.push({ filter: i.filter, run: t.proxy(i.run, this) });
        }, this)
      ),
      this.setup(),
      this.initialize();
  }
  (n.Defaults = {
    items: 3,
    loop: !1,
    center: !1,
    rewind: !1,
    mouseDrag: !0,
    touchDrag: !0,
    pullDrag: !0,
    freeDrag: !1,
    margin: 0,
    stagePadding: 0,
    merge: !1,
    mergeFit: !0,
    autoWidth: !1,
    startPosition: 0,
    rtl: !1,
    smartSpeed: 250,
    fluidSpeed: !1,
    dragEndSpeed: !1,
    responsive: {},
    responsiveRefreshRate: 200,
    responsiveBaseElement: e,
    fallbackEasing: "swing",
    info: !1,
    nestedItemSelector: !1,
    itemElement: "div",
    stageElement: "div",
    refreshClass: "owl-refresh",
    loadedClass: "owl-loaded",
    loadingClass: "owl-loading",
    rtlClass: "owl-rtl",
    responsiveClass: "owl-responsive",
    dragClass: "owl-drag",
    itemClass: "owl-item",
    stageClass: "owl-stage",
    stageOuterClass: "owl-stage-outer",
    grabClass: "owl-grab",
  }),
    (n.Width = { Default: "default", Inner: "inner", Outer: "outer" }),
    (n.Type = { Event: "event", State: "state" }),
    (n.Plugins = {}),
    (n.Workers = [
      {
        filter: ["width", "settings"],
        run: function () {
          this._width = this.$element.width();
        },
      },
      {
        filter: ["width", "items", "settings"],
        run: function (t) {
          t.current = this._items && this._items[this.relative(this._current)];
        },
      },
      {
        filter: ["items", "settings"],
        run: function () {
          this.$stage.children(".cloned").remove();
        },
      },
      {
        filter: ["width", "items", "settings"],
        run: function (t) {
          var e = this.settings.margin || "",
            i = !this.settings.autoWidth,
            s = this.settings.rtl,
            n = {
              width: "auto",
              "margin-left": s ? e : "",
              "margin-right": s ? "" : e,
            };
          !i && this.$stage.children().css(n), (t.css = n);
        },
      },
      {
        filter: ["width", "items", "settings"],
        run: function (t) {
          var e =
              (this.width() / this.settings.items).toFixed(3) -
              this.settings.margin,
            i = null,
            s = this._items.length,
            n = !this.settings.autoWidth,
            o = [];
          for (t.items = { merge: !1, width: e }; s--; )
            (i = this._mergers[s]),
              (i =
                (this.settings.mergeFit && Math.min(i, this.settings.items)) ||
                i),
              (t.items.merge = i > 1 || t.items.merge),
              (o[s] = n ? e * i : this._items[s].width());
          this._widths = o;
        },
      },
      {
        filter: ["items", "settings"],
        run: function () {
          var e = [],
            i = this._items,
            s = this.settings,
            n = Math.max(2 * s.items, 4),
            o = 2 * Math.ceil(i.length / 2),
            r = s.loop && i.length ? (s.rewind ? n : Math.max(n, o)) : 0,
            a = "",
            h = "";
          for (r /= 2; r--; )
            e.push(this.normalize(e.length / 2, !0)),
              (a += i[e[e.length - 1]][0].outerHTML),
              e.push(this.normalize(i.length - 1 - (e.length - 1) / 2, !0)),
              (h = i[e[e.length - 1]][0].outerHTML + h);
          (this._clones = e),
            t(a).addClass("cloned").appendTo(this.$stage),
            t(h).addClass("cloned").prependTo(this.$stage);
        },
      },
      {
        filter: ["width", "items", "settings"],
        run: function () {
          for (
            var t = this.settings.rtl ? 1 : -1,
              e = this._clones.length + this._items.length,
              i = -1,
              s = 0,
              n = 0,
              o = [];
            ++i < e;

          )
            (s = o[i - 1] || 0),
              (n = this._widths[this.relative(i)] + this.settings.margin),
              o.push(s + n * t);
          this._coordinates = o;
        },
      },
      {
        filter: ["width", "items", "settings"],
        run: function () {
          var t = this.settings.stagePadding,
            e = this._coordinates,
            i = {
              width: Math.ceil(Math.abs(e[e.length - 1])) + 2 * t,
              "padding-left": t || "",
              "padding-right": t || "",
            };
          this.$stage.css(i);
        },
      },
      {
        filter: ["width", "items", "settings"],
        run: function (t) {
          var e = this._coordinates.length,
            i = !this.settings.autoWidth,
            s = this.$stage.children();
          if (i && t.items.merge)
            for (; e--; )
              (t.css.width = this._widths[this.relative(e)]),
                s.eq(e).css(t.css);
          else i && ((t.css.width = t.items.width), s.css(t.css));
        },
      },
      {
        filter: ["items"],
        run: function () {
          this._coordinates.length < 1 && this.$stage.removeAttr("style");
        },
      },
      {
        filter: ["width", "items", "settings"],
        run: function (t) {
          (t.current = t.current ? this.$stage.children().index(t.current) : 0),
            (t.current = Math.max(
              this.minimum(),
              Math.min(this.maximum(), t.current)
            )),
            this.reset(t.current);
        },
      },
      {
        filter: ["position"],
        run: function () {
          this.animate(this.coordinates(this._current));
        },
      },
      {
        filter: ["width", "position", "items", "settings"],
        run: function () {
          var t,
            e,
            i,
            s,
            n = this.settings.rtl ? 1 : -1,
            o = 2 * this.settings.stagePadding,
            r = this.coordinates(this.current()) + o,
            a = r + this.width() * n,
            h = [];
          for (i = 0, s = this._coordinates.length; s > i; i++)
            (t = this._coordinates[i - 1] || 0),
              (e = Math.abs(this._coordinates[i]) + o * n),
              ((this.op(t, "<=", r) && this.op(t, ">", a)) ||
                (this.op(e, "<", r) && this.op(e, ">", a))) &&
                h.push(i);
          this.$stage.children(".active").removeClass("active"),
            this.$stage
              .children(":eq(" + h.join("), :eq(") + ")")
              .addClass("active"),
            this.settings.center &&
              (this.$stage.children(".center").removeClass("center"),
              this.$stage.children().eq(this.current()).addClass("center"));
        },
      },
    ]),
    (n.prototype.initialize = function () {
      var e, i, n;
      (this.enter("initializing"),
      this.trigger("initialize"),
      this.$element.toggleClass(this.settings.rtlClass, this.settings.rtl),
      this.settings.autoWidth && !this.is("pre-loading")) &&
        ((e = this.$element.find("img")),
        (i = this.settings.nestedItemSelector
          ? "." + this.settings.nestedItemSelector
          : s),
        (n = this.$element.children(i).width()),
        e.length && 0 >= n && this.preloadAutoWidthImages(e));
      this.$element.addClass(this.options.loadingClass),
        (this.$stage = t(
          "<" +
            this.settings.stageElement +
            ' class="' +
            this.settings.stageClass +
            '"/>'
        ).wrap('<div class="' + this.settings.stageOuterClass + '"/>')),
        this.$element.append(this.$stage.parent()),
        this.replace(this.$element.children().not(this.$stage.parent())),
        this.$element.is(":visible")
          ? this.refresh()
          : this.invalidate("width"),
        this.$element
          .removeClass(this.options.loadingClass)
          .addClass(this.options.loadedClass),
        this.registerEventHandlers(),
        this.leave("initializing"),
        this.trigger("initialized");
    }),
    (n.prototype.setup = function () {
      var e = this.viewport(),
        i = this.options.responsive,
        s = -1,
        n = null;
      i
        ? (t.each(i, function (t) {
            e >= t && t > s && (s = Number(t));
          }),
          "function" ==
            typeof (n = t.extend({}, this.options, i[s])).stagePadding &&
            (n.stagePadding = n.stagePadding()),
          delete n.responsive,
          n.responsiveClass &&
            this.$element.attr(
              "class",
              this.$element
                .attr("class")
                .replace(
                  new RegExp(
                    "(" + this.options.responsiveClass + "-)\\S+\\s",
                    "g"
                  ),
                  "$1" + s
                )
            ))
        : (n = t.extend({}, this.options)),
        this.trigger("change", { property: { name: "settings", value: n } }),
        (this._breakpoint = s),
        (this.settings = n),
        this.invalidate("settings"),
        this.trigger("changed", {
          property: { name: "settings", value: this.settings },
        });
    }),
    (n.prototype.optionsLogic = function () {
      this.settings.autoWidth &&
        ((this.settings.stagePadding = !1), (this.settings.merge = !1));
    }),
    (n.prototype.prepare = function (e) {
      var i = this.trigger("prepare", { content: e });
      return (
        i.data ||
          (i.data = t("<" + this.settings.itemElement + "/>")
            .addClass(this.options.itemClass)
            .append(e)),
        this.trigger("prepared", { content: i.data }),
        i.data
      );
    }),
    (n.prototype.update = function () {
      for (
        var e = 0,
          i = this._pipe.length,
          s = t.proxy(function (t) {
            return this[t];
          }, this._invalidated),
          n = {};
        i > e;

      )
        (this._invalidated.all || t.grep(this._pipe[e].filter, s).length > 0) &&
          this._pipe[e].run(n),
          e++;
      (this._invalidated = {}), !this.is("valid") && this.enter("valid");
    }),
    (n.prototype.width = function (t) {
      switch ((t = t || n.Width.Default)) {
        case n.Width.Inner:
        case n.Width.Outer:
          return this._width;
        default:
          return (
            this._width - 2 * this.settings.stagePadding + this.settings.margin
          );
      }
    }),
    (n.prototype.refresh = function () {
      this.enter("refreshing"),
        this.trigger("refresh"),
        this.setup(),
        this.optionsLogic(),
        this.$element.addClass(this.options.refreshClass),
        this.update(),
        this.$element.removeClass(this.options.refreshClass),
        this.leave("refreshing"),
        this.trigger("refreshed");
    }),
    (n.prototype.onThrottledResize = function () {
      e.clearTimeout(this.resizeTimer),
        (this.resizeTimer = e.setTimeout(
          this._handlers.onResize,
          this.settings.responsiveRefreshRate
        ));
    }),
    (n.prototype.onResize = function () {
      return (
        !!this._items.length &&
        this._width !== this.$element.width() &&
        !!this.$element.is(":visible") &&
        (this.enter("resizing"),
        this.trigger("resize").isDefaultPrevented()
          ? (this.leave("resizing"), !1)
          : (this.invalidate("width"),
            this.refresh(),
            this.leave("resizing"),
            void this.trigger("resized")))
      );
    }),
    (n.prototype.registerEventHandlers = function () {
      t.support.transition &&
        this.$stage.on(
          t.support.transition.end + ".owl.core",
          t.proxy(this.onTransitionEnd, this)
        ),
        !1 !== this.settings.responsive &&
          this.on(e, "resize", this._handlers.onThrottledResize),
        this.settings.mouseDrag &&
          (this.$element.addClass(this.options.dragClass),
          this.$stage.on("mousedown.owl.core", t.proxy(this.onDragStart, this)),
          this.$stage.on(
            "dragstart.owl.core selectstart.owl.core",
            function () {
              return !1;
            }
          )),
        this.settings.touchDrag &&
          (this.$stage.on(
            "touchstart.owl.core",
            t.proxy(this.onDragStart, this)
          ),
          this.$stage.on(
            "touchcancel.owl.core",
            t.proxy(this.onDragEnd, this)
          ));
    }),
    (n.prototype.onDragStart = function (e) {
      var s = null;
      3 !== e.which &&
        (t.support.transform
          ? (s = {
              x: (s = this.$stage
                .css("transform")
                .replace(/.*\(|\)| /g, "")
                .split(","))[16 === s.length ? 12 : 4],
              y: s[16 === s.length ? 13 : 5],
            })
          : ((s = this.$stage.position()),
            (s = {
              x: this.settings.rtl
                ? s.left +
                  this.$stage.width() -
                  this.width() +
                  this.settings.margin
                : s.left,
              y: s.top,
            })),
        this.is("animating") &&
          (t.support.transform ? this.animate(s.x) : this.$stage.stop(),
          this.invalidate("position")),
        this.$element.toggleClass(
          this.options.grabClass,
          "mousedown" === e.type
        ),
        this.speed(0),
        (this._drag.time = new Date().getTime()),
        (this._drag.target = t(e.target)),
        (this._drag.stage.start = s),
        (this._drag.stage.current = s),
        (this._drag.pointer = this.pointer(e)),
        t(i).on(
          "mouseup.owl.core touchend.owl.core",
          t.proxy(this.onDragEnd, this)
        ),
        t(i).one(
          "mousemove.owl.core touchmove.owl.core",
          t.proxy(function (e) {
            var s = this.difference(this._drag.pointer, this.pointer(e));
            t(i).on(
              "mousemove.owl.core touchmove.owl.core",
              t.proxy(this.onDragMove, this)
            ),
              (Math.abs(s.x) < Math.abs(s.y) && this.is("valid")) ||
                (e.preventDefault(),
                this.enter("dragging"),
                this.trigger("drag"));
          }, this)
        ));
    }),
    (n.prototype.onDragMove = function (t) {
      var e = null,
        i = null,
        s = null,
        n = this.difference(this._drag.pointer, this.pointer(t)),
        o = this.difference(this._drag.stage.start, n);
      this.is("dragging") &&
        (t.preventDefault(),
        this.settings.loop
          ? ((e = this.coordinates(this.minimum())),
            (i = this.coordinates(this.maximum() + 1) - e),
            (o.x = ((((o.x - e) % i) + i) % i) + e))
          : ((e = this.settings.rtl
              ? this.coordinates(this.maximum())
              : this.coordinates(this.minimum())),
            (i = this.settings.rtl
              ? this.coordinates(this.minimum())
              : this.coordinates(this.maximum())),
            (s = this.settings.pullDrag ? (-1 * n.x) / 5 : 0),
            (o.x = Math.max(Math.min(o.x, e + s), i + s))),
        (this._drag.stage.current = o),
        this.animate(o.x));
    }),
    (n.prototype.onDragEnd = function (e) {
      var s = this.difference(this._drag.pointer, this.pointer(e)),
        n = this._drag.stage.current,
        o = (s.x > 0) ^ this.settings.rtl ? "left" : "right";
      t(i).off(".owl.core"),
        this.$element.removeClass(this.options.grabClass),
        ((0 !== s.x && this.is("dragging")) || !this.is("valid")) &&
          (this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed),
          this.current(this.closest(n.x, 0 !== s.x ? o : this._drag.direction)),
          this.invalidate("position"),
          this.update(),
          (this._drag.direction = o),
          (Math.abs(s.x) > 3 || new Date().getTime() - this._drag.time > 300) &&
            this._drag.target.one("click.owl.core", function () {
              return !1;
            })),
        this.is("dragging") &&
          (this.leave("dragging"), this.trigger("dragged"));
    }),
    (n.prototype.closest = function (e, i) {
      var s = -1,
        n = this.width(),
        o = this.coordinates();
      return (
        this.settings.freeDrag ||
          t.each(
            o,
            t.proxy(function (t, r) {
              return (
                "left" === i && e > r - 30 && r + 30 > e
                  ? (s = t)
                  : "right" === i && e > r - n - 30 && r - n + 30 > e
                  ? (s = t + 1)
                  : this.op(e, "<", r) &&
                    this.op(e, ">", o[t + 1] || r - n) &&
                    (s = "left" === i ? t + 1 : t),
                -1 === s
              );
            }, this)
          ),
        this.settings.loop ||
          (this.op(e, ">", o[this.minimum()])
            ? (s = e = this.minimum())
            : this.op(e, "<", o[this.maximum()]) && (s = e = this.maximum())),
        s
      );
    }),
    (n.prototype.animate = function (e) {
      var i = this.speed() > 0;
      this.is("animating") && this.onTransitionEnd(),
        i && (this.enter("animating"), this.trigger("translate")),
        t.support.transform3d && t.support.transition
          ? this.$stage.css({
              transform: "translate3d(" + e + "px,0px,0px)",
              transition: this.speed() / 1e3 + "s",
            })
          : i
          ? this.$stage.animate(
              { left: e + "px" },
              this.speed(),
              this.settings.fallbackEasing,
              t.proxy(this.onTransitionEnd, this)
            )
          : this.$stage.css({ left: e + "px" });
    }),
    (n.prototype.is = function (t) {
      return this._states.current[t] && this._states.current[t] > 0;
    }),
    (n.prototype.current = function (t) {
      if (t === s) return this._current;
      if (0 === this._items.length) return s;
      if (((t = this.normalize(t)), this._current !== t)) {
        var e = this.trigger("change", {
          property: { name: "position", value: t },
        });
        e.data !== s && (t = this.normalize(e.data)),
          (this._current = t),
          this.invalidate("position"),
          this.trigger("changed", {
            property: { name: "position", value: this._current },
          });
      }
      return this._current;
    }),
    (n.prototype.invalidate = function (e) {
      return (
        "string" === t.type(e) &&
          ((this._invalidated[e] = !0),
          this.is("valid") && this.leave("valid")),
        t.map(this._invalidated, function (t, e) {
          return e;
        })
      );
    }),
    (n.prototype.reset = function (t) {
      (t = this.normalize(t)) !== s &&
        ((this._speed = 0),
        (this._current = t),
        this.suppress(["translate", "translated"]),
        this.animate(this.coordinates(t)),
        this.release(["translate", "translated"]));
    }),
    (n.prototype.normalize = function (t, e) {
      var i = this._items.length,
        n = e ? 0 : this._clones.length;
      return (
        !this.isNumeric(t) || 1 > i
          ? (t = s)
          : (0 > t || t >= i + n) &&
            (t = ((((t - n / 2) % i) + i) % i) + n / 2),
        t
      );
    }),
    (n.prototype.relative = function (t) {
      return (t -= this._clones.length / 2), this.normalize(t, !0);
    }),
    (n.prototype.maximum = function (t) {
      var e,
        i,
        s,
        n = this.settings,
        o = this._coordinates.length;
      if (n.loop) o = this._clones.length / 2 + this._items.length - 1;
      else if (n.autoWidth || n.merge) {
        for (
          e = this._items.length,
            i = this._items[--e].width(),
            s = this.$element.width();
          e-- && !((i += this._items[e].width() + this.settings.margin) > s);

        );
        o = e + 1;
      } else
        o = n.center ? this._items.length - 1 : this._items.length - n.items;
      return t && (o -= this._clones.length / 2), Math.max(o, 0);
    }),
    (n.prototype.minimum = function (t) {
      return t ? 0 : this._clones.length / 2;
    }),
    (n.prototype.items = function (t) {
      return t === s
        ? this._items.slice()
        : ((t = this.normalize(t, !0)), this._items[t]);
    }),
    (n.prototype.mergers = function (t) {
      return t === s
        ? this._mergers.slice()
        : ((t = this.normalize(t, !0)), this._mergers[t]);
    }),
    (n.prototype.clones = function (e) {
      var i = this._clones.length / 2,
        n = i + this._items.length,
        o = function (t) {
          return t % 2 == 0 ? n + t / 2 : i - (t + 1) / 2;
        };
      return e === s
        ? t.map(this._clones, function (t, e) {
            return o(e);
          })
        : t.map(this._clones, function (t, i) {
            return t === e ? o(i) : null;
          });
    }),
    (n.prototype.speed = function (t) {
      return t !== s && (this._speed = t), this._speed;
    }),
    (n.prototype.coordinates = function (e) {
      var i,
        n = 1,
        o = e - 1;
      return e === s
        ? t.map(
            this._coordinates,
            t.proxy(function (t, e) {
              return this.coordinates(e);
            }, this)
          )
        : (this.settings.center
            ? (this.settings.rtl && ((n = -1), (o = e + 1)),
              (i = this._coordinates[e]),
              (i += ((this.width() - i + (this._coordinates[o] || 0)) / 2) * n))
            : (i = this._coordinates[o] || 0),
          (i = Math.ceil(i)));
    }),
    (n.prototype.duration = function (t, e, i) {
      return 0 === i
        ? 0
        : Math.min(Math.max(Math.abs(e - t), 1), 6) *
            Math.abs(i || this.settings.smartSpeed);
    }),
    (n.prototype.to = function (t, e) {
      var i = this.current(),
        s = null,
        n = t - this.relative(i),
        o = (n > 0) - (0 > n),
        r = this._items.length,
        a = this.minimum(),
        h = this.maximum();
      this.settings.loop
        ? (!this.settings.rewind && Math.abs(n) > r / 2 && (n += -1 * o * r),
          (s = (((((t = i + n) - a) % r) + r) % r) + a) !== t &&
            h >= s - n &&
            s - n > 0 &&
            ((i = s - n), (t = s), this.reset(i)))
        : this.settings.rewind
        ? (t = ((t % (h += 1)) + h) % h)
        : (t = Math.max(a, Math.min(h, t))),
        this.speed(this.duration(i, t, e)),
        this.current(t),
        this.$element.is(":visible") && this.update();
    }),
    (n.prototype.next = function (t) {
      (t = t || !1), this.to(this.relative(this.current()) + 1, t);
    }),
    (n.prototype.prev = function (t) {
      (t = t || !1), this.to(this.relative(this.current()) - 1, t);
    }),
    (n.prototype.onTransitionEnd = function (t) {
      return (
        (t === s ||
          (t.stopPropagation(),
          (t.target || t.srcElement || t.originalTarget) ===
            this.$stage.get(0))) &&
        (this.leave("animating"), void this.trigger("translated"))
      );
    }),
    (n.prototype.viewport = function () {
      var s;
      if (this.options.responsiveBaseElement !== e)
        s = t(this.options.responsiveBaseElement).width();
      else if (e.innerWidth) s = e.innerWidth;
      else {
        if (!i.documentElement || !i.documentElement.clientWidth)
          throw "Can not detect viewport width.";
        s = i.documentElement.clientWidth;
      }
      return s;
    }),
    (n.prototype.replace = function (e) {
      this.$stage.empty(),
        (this._items = []),
        e && (e = e instanceof jQuery ? e : t(e)),
        this.settings.nestedItemSelector &&
          (e = e.find("." + this.settings.nestedItemSelector)),
        e
          .filter(function () {
            return 1 === this.nodeType;
          })
          .each(
            t.proxy(function (t, e) {
              (e = this.prepare(e)),
                this.$stage.append(e),
                this._items.push(e),
                this._mergers.push(
                  1 *
                    e
                      .find("[data-merge]")
                      .addBack("[data-merge]")
                      .attr("data-merge") || 1
                );
            }, this)
          ),
        this.reset(
          this.isNumeric(this.settings.startPosition)
            ? this.settings.startPosition
            : 0
        ),
        this.invalidate("items");
    }),
    (n.prototype.add = function (e, i) {
      var n = this.relative(this._current);
      (i = i === s ? this._items.length : this.normalize(i, !0)),
        (e = e instanceof jQuery ? e : t(e)),
        this.trigger("add", { content: e, position: i }),
        (e = this.prepare(e)),
        0 === this._items.length || i === this._items.length
          ? (0 === this._items.length && this.$stage.append(e),
            0 !== this._items.length && this._items[i - 1].after(e),
            this._items.push(e),
            this._mergers.push(
              1 *
                e
                  .find("[data-merge]")
                  .addBack("[data-merge]")
                  .attr("data-merge") || 1
            ))
          : (this._items[i].before(e),
            this._items.splice(i, 0, e),
            this._mergers.splice(
              i,
              0,
              1 *
                e
                  .find("[data-merge]")
                  .addBack("[data-merge]")
                  .attr("data-merge") || 1
            )),
        this._items[n] && this.reset(this._items[n].index()),
        this.invalidate("items"),
        this.trigger("added", { content: e, position: i });
    }),
    (n.prototype.remove = function (t) {
      (t = this.normalize(t, !0)) !== s &&
        (this.trigger("remove", { content: this._items[t], position: t }),
        this._items[t].remove(),
        this._items.splice(t, 1),
        this._mergers.splice(t, 1),
        this.invalidate("items"),
        this.trigger("removed", { content: null, position: t }));
    }),
    (n.prototype.preloadAutoWidthImages = function (e) {
      e.each(
        t.proxy(function (e, i) {
          this.enter("pre-loading"),
            (i = t(i)),
            t(new Image())
              .one(
                "load",
                t.proxy(function (t) {
                  i.attr("src", t.target.src),
                    i.css("opacity", 1),
                    this.leave("pre-loading"),
                    !this.is("pre-loading") &&
                      !this.is("initializing") &&
                      this.refresh();
                }, this)
              )
              .attr(
                "src",
                i.attr("src") || i.attr("data-src") || i.attr("data-src-retina")
              );
        }, this)
      );
    }),
    (n.prototype.destroy = function () {
      for (var s in (this.$element.off(".owl.core"),
      this.$stage.off(".owl.core"),
      t(i).off(".owl.core"),
      !1 !== this.settings.responsive &&
        (e.clearTimeout(this.resizeTimer),
        this.off(e, "resize", this._handlers.onThrottledResize)),
      this._plugins))
        this._plugins[s].destroy();
      this.$stage.children(".cloned").remove(),
        this.$stage.unwrap(),
        this.$stage.children().contents().unwrap(),
        this.$stage.children().unwrap(),
        this.$element
          .removeClass(this.options.refreshClass)
          .removeClass(this.options.loadingClass)
          .removeClass(this.options.loadedClass)
          .removeClass(this.options.rtlClass)
          .removeClass(this.options.dragClass)
          .removeClass(this.options.grabClass)
          .attr(
            "class",
            this.$element
              .attr("class")
              .replace(
                new RegExp(this.options.responsiveClass + "-\\S+\\s", "g"),
                ""
              )
          )
          .removeData("owl.carousel");
    }),
    (n.prototype.op = function (t, e, i) {
      var s = this.settings.rtl;
      switch (e) {
        case "<":
          return s ? t > i : i > t;
        case ">":
          return s ? i > t : t > i;
        case ">=":
          return s ? i >= t : t >= i;
        case "<=":
          return s ? t >= i : i >= t;
      }
    }),
    (n.prototype.on = function (t, e, i, s) {
      t.addEventListener
        ? t.addEventListener(e, i, s)
        : t.attachEvent && t.attachEvent("on" + e, i);
    }),
    (n.prototype.off = function (t, e, i, s) {
      t.removeEventListener
        ? t.removeEventListener(e, i, s)
        : t.detachEvent && t.detachEvent("on" + e, i);
    }),
    (n.prototype.trigger = function (e, i, s, o, r) {
      var a = { item: { count: this._items.length, index: this.current() } },
        h = t.camelCase(
          t
            .grep(["on", e, s], function (t) {
              return t;
            })
            .join("-")
            .toLowerCase()
        ),
        l = t.Event(
          [e, "owl", s || "carousel"].join(".").toLowerCase(),
          t.extend({ relatedTarget: this }, a, i)
        );
      return (
        this._supress[e] ||
          (t.each(this._plugins, function (t, e) {
            e.onTrigger && e.onTrigger(l);
          }),
          this.register({ type: n.Type.Event, name: e }),
          this.$element.trigger(l),
          this.settings &&
            "function" == typeof this.settings[h] &&
            this.settings[h].call(this, l)),
        l
      );
    }),
    (n.prototype.enter = function (e) {
      t.each(
        [e].concat(this._states.tags[e] || []),
        t.proxy(function (t, e) {
          this._states.current[e] === s && (this._states.current[e] = 0),
            this._states.current[e]++;
        }, this)
      );
    }),
    (n.prototype.leave = function (e) {
      t.each(
        [e].concat(this._states.tags[e] || []),
        t.proxy(function (t, e) {
          this._states.current[e]--;
        }, this)
      );
    }),
    (n.prototype.register = function (e) {
      if (e.type === n.Type.Event) {
        if (
          (t.event.special[e.name] || (t.event.special[e.name] = {}),
          !t.event.special[e.name].owl)
        ) {
          var i = t.event.special[e.name]._default;
          (t.event.special[e.name]._default = function (t) {
            return !i ||
              !i.apply ||
              (t.namespace && -1 !== t.namespace.indexOf("owl"))
              ? t.namespace && t.namespace.indexOf("owl") > -1
              : i.apply(this, arguments);
          }),
            (t.event.special[e.name].owl = !0);
        }
      } else
        e.type === n.Type.State &&
          (this._states.tags[e.name]
            ? (this._states.tags[e.name] = this._states.tags[e.name].concat(
                e.tags
              ))
            : (this._states.tags[e.name] = e.tags),
          (this._states.tags[e.name] = t.grep(
            this._states.tags[e.name],
            t.proxy(function (i, s) {
              return t.inArray(i, this._states.tags[e.name]) === s;
            }, this)
          )));
    }),
    (n.prototype.suppress = function (e) {
      t.each(
        e,
        t.proxy(function (t, e) {
          this._supress[e] = !0;
        }, this)
      );
    }),
    (n.prototype.release = function (e) {
      t.each(
        e,
        t.proxy(function (t, e) {
          delete this._supress[e];
        }, this)
      );
    }),
    (n.prototype.pointer = function (t) {
      var i = { x: null, y: null };
      return (
        (t =
          (t = t.originalEvent || t || e.event).touches && t.touches.length
            ? t.touches[0]
            : t.changedTouches && t.changedTouches.length
            ? t.changedTouches[0]
            : t).pageX
          ? ((i.x = t.pageX), (i.y = t.pageY))
          : ((i.x = t.clientX), (i.y = t.clientY)),
        i
      );
    }),
    (n.prototype.isNumeric = function (t) {
      return !isNaN(parseFloat(t));
    }),
    (n.prototype.difference = function (t, e) {
      return { x: t.x - e.x, y: t.y - e.y };
    }),
    (t.fn.owlCarousel = function (e) {
      var i = Array.prototype.slice.call(arguments, 1);
      return this.each(function () {
        var s = t(this),
          o = s.data("owl.carousel");
        o ||
          ((o = new n(this, "object" == typeof e && e)),
          s.data("owl.carousel", o),
          t.each(
            [
              "next",
              "prev",
              "to",
              "destroy",
              "refresh",
              "replace",
              "add",
              "remove",
            ],
            function (e, i) {
              o.register({ type: n.Type.Event, name: i }),
                o.$element.on(
                  i + ".owl.carousel.core",
                  t.proxy(function (t) {
                    t.namespace &&
                      t.relatedTarget !== this &&
                      (this.suppress([i]),
                      o[i].apply(this, [].slice.call(arguments, 1)),
                      this.release([i]));
                  }, o)
                );
            }
          )),
          "string" == typeof e && "_" !== e.charAt(0) && o[e].apply(o, i);
      });
    }),
    (t.fn.owlCarousel.Constructor = n);
})(window.Zepto || window.jQuery, window, document),
  (function (t, e, i, s) {
    var n = function (e) {
      (this._core = e),
        (this._interval = null),
        (this._visible = null),
        (this._handlers = {
          "initialized.owl.carousel": t.proxy(function (t) {
            t.namespace && this._core.settings.autoRefresh && this.watch();
          }, this),
        }),
        (this._core.options = t.extend({}, n.Defaults, this._core.options)),
        this._core.$element.on(this._handlers);
    };
    (n.Defaults = { autoRefresh: !0, autoRefreshInterval: 500 }),
      (n.prototype.watch = function () {
        this._interval ||
          ((this._visible = this._core.$element.is(":visible")),
          (this._interval = e.setInterval(
            t.proxy(this.refresh, this),
            this._core.settings.autoRefreshInterval
          )));
      }),
      (n.prototype.refresh = function () {
        this._core.$element.is(":visible") !== this._visible &&
          ((this._visible = !this._visible),
          this._core.$element.toggleClass("owl-hidden", !this._visible),
          this._visible &&
            this._core.invalidate("width") &&
            this._core.refresh());
      }),
      (n.prototype.destroy = function () {
        var t, i;
        for (t in (e.clearInterval(this._interval), this._handlers))
          this._core.$element.off(t, this._handlers[t]);
        for (i in Object.getOwnPropertyNames(this))
          "function" != typeof this[i] && (this[i] = null);
      }),
      (t.fn.owlCarousel.Constructor.Plugins.AutoRefresh = n);
  })(window.Zepto || window.jQuery, window, document),
  (function (t, e, i, s) {
    var n = function (e) {
      (this._core = e),
        (this._loaded = []),
        (this._handlers = {
          "initialized.owl.carousel change.owl.carousel resized.owl.carousel":
            t.proxy(function (e) {
              if (
                e.namespace &&
                this._core.settings &&
                this._core.settings.lazyLoad &&
                ((e.property && "position" == e.property.name) ||
                  "initialized" == e.type)
              )
                for (
                  var i = this._core.settings,
                    s = (i.center && Math.ceil(i.items / 2)) || i.items,
                    n = (i.center && -1 * s) || 0,
                    o =
                      (e.property && void 0 !== e.property.value
                        ? e.property.value
                        : this._core.current()) + n,
                    r = this._core.clones().length,
                    a = t.proxy(function (t, e) {
                      this.load(e);
                    }, this);
                  n++ < s;

                )
                  this.load(r / 2 + this._core.relative(o)),
                    r && t.each(this._core.clones(this._core.relative(o)), a),
                    o++;
            }, this),
        }),
        (this._core.options = t.extend({}, n.Defaults, this._core.options)),
        this._core.$element.on(this._handlers);
    };
    (n.Defaults = { lazyLoad: !1 }),
      (n.prototype.load = function (i) {
        var s = this._core.$stage.children().eq(i),
          n = s && s.find(".owl-lazy");
        !n ||
          t.inArray(s.get(0), this._loaded) > -1 ||
          (n.each(
            t.proxy(function (i, s) {
              var n,
                o = t(s),
                r =
                  (e.devicePixelRatio > 1 && o.attr("data-src-retina")) ||
                  o.attr("data-src");
              this._core.trigger("load", { element: o, url: r }, "lazy"),
                o.is("img")
                  ? o
                      .one(
                        "load.owl.lazy",
                        t.proxy(function () {
                          o.css("opacity", 1),
                            this._core.trigger(
                              "loaded",
                              { element: o, url: r },
                              "lazy"
                            );
                        }, this)
                      )
                      .attr("src", r)
                  : (((n = new Image()).onload = t.proxy(function () {
                      o.css({
                        "background-image": "url(" + r + ")",
                        opacity: "1",
                      }),
                        this._core.trigger(
                          "loaded",
                          { element: o, url: r },
                          "lazy"
                        );
                    }, this)),
                    (n.src = r));
            }, this)
          ),
          this._loaded.push(s.get(0)));
      }),
      (n.prototype.destroy = function () {
        var t, e;
        for (t in this.handlers) this._core.$element.off(t, this.handlers[t]);
        for (e in Object.getOwnPropertyNames(this))
          "function" != typeof this[e] && (this[e] = null);
      }),
      (t.fn.owlCarousel.Constructor.Plugins.Lazy = n);
  })(window.Zepto || window.jQuery, window, document),
  (function (t, e, i, s) {
    var n = function (e) {
      (this._core = e),
        (this._handlers = {
          "initialized.owl.carousel refreshed.owl.carousel": t.proxy(function (
            t
          ) {
            t.namespace && this._core.settings.autoHeight && this.update();
          },
          this),
          "changed.owl.carousel": t.proxy(function (t) {
            t.namespace &&
              this._core.settings.autoHeight &&
              "position" == t.property.name &&
              this.update();
          }, this),
          "loaded.owl.lazy": t.proxy(function (t) {
            t.namespace &&
              this._core.settings.autoHeight &&
              t.element.closest("." + this._core.settings.itemClass).index() ===
                this._core.current() &&
              this.update();
          }, this),
        }),
        (this._core.options = t.extend({}, n.Defaults, this._core.options)),
        this._core.$element.on(this._handlers);
    };
    (n.Defaults = { autoHeight: !1, autoHeightClass: "owl-height" }),
      (n.prototype.update = function () {
        var e,
          i = this._core._current,
          s = i + this._core.settings.items,
          n = this._core.$stage.children().toArray().slice(i, s),
          o = [];
        t.each(n, function (e, i) {
          o.push(t(i).height());
        }),
          (e = Math.max.apply(null, o)),
          this._core.$stage
            .parent()
            .height(e)
            .addClass(this._core.settings.autoHeightClass);
      }),
      (n.prototype.destroy = function () {
        var t, e;
        for (t in this._handlers) this._core.$element.off(t, this._handlers[t]);
        for (e in Object.getOwnPropertyNames(this))
          "function" != typeof this[e] && (this[e] = null);
      }),
      (t.fn.owlCarousel.Constructor.Plugins.AutoHeight = n);
  })(window.Zepto || window.jQuery, window, document),
  (function (t, e, i, s) {
    var n = function (e) {
      (this._core = e),
        (this._videos = {}),
        (this._playing = null),
        (this._handlers = {
          "initialized.owl.carousel": t.proxy(function (t) {
            t.namespace &&
              this._core.register({
                type: "state",
                name: "playing",
                tags: ["interacting"],
              });
          }, this),
          "resize.owl.carousel": t.proxy(function (t) {
            t.namespace &&
              this._core.settings.video &&
              this.isInFullScreen() &&
              t.preventDefault();
          }, this),
          "refreshed.owl.carousel": t.proxy(function (t) {
            t.namespace &&
              this._core.is("resizing") &&
              this._core.$stage.find(".cloned .owl-video-frame").remove();
          }, this),
          "changed.owl.carousel": t.proxy(function (t) {
            t.namespace &&
              "position" === t.property.name &&
              this._playing &&
              this.stop();
          }, this),
          "prepared.owl.carousel": t.proxy(function (e) {
            if (e.namespace) {
              var i = t(e.content).find(".owl-video");
              i.length &&
                (i.css("display", "none"), this.fetch(i, t(e.content)));
            }
          }, this),
        }),
        (this._core.options = t.extend({}, n.Defaults, this._core.options)),
        this._core.$element.on(this._handlers),
        this._core.$element.on(
          "click.owl.video",
          ".owl-video-play-icon",
          t.proxy(function (t) {
            this.play(t);
          }, this)
        );
    };
    (n.Defaults = { video: !1, videoHeight: !1, videoWidth: !1 }),
      (n.prototype.fetch = function (t, e) {
        var i = t.attr("data-vimeo-id")
            ? "vimeo"
            : t.attr("data-vzaar-id")
            ? "vzaar"
            : "youtube",
          s =
            t.attr("data-vimeo-id") ||
            t.attr("data-youtube-id") ||
            t.attr("data-vzaar-id"),
          n = t.attr("data-width") || this._core.settings.videoWidth,
          o = t.attr("data-height") || this._core.settings.videoHeight,
          r = t.attr("href");
        if (!r) throw new Error("Missing video URL.");
        if (
          (s = r.match(
            /(http:|https:|)\/\/(player.|www.|app.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com)|vzaar\.com)\/(video\/|videos\/|embed\/|channels\/.+\/|groups\/.+\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/
          ))[3].indexOf("youtu") > -1
        )
          i = "youtube";
        else if (s[3].indexOf("vimeo") > -1) i = "vimeo";
        else {
          if (!(s[3].indexOf("vzaar") > -1))
            throw new Error("Video URL not supported.");
          i = "vzaar";
        }
        (s = s[6]),
          (this._videos[r] = { type: i, id: s, width: n, height: o }),
          e.attr("data-video", r),
          this.thumbnail(t, this._videos[r]);
      }),
      (n.prototype.thumbnail = function (e, i) {
        var s,
          n,
          o =
            i.width && i.height
              ? 'style="width:' + i.width + "px;height:" + i.height + 'px;"'
              : "",
          r = e.find("img"),
          a = "src",
          h = "",
          l = this._core.settings,
          c = function (t) {
            '<div class="owl-video-play-icon"></div>',
              (s = l.lazyLoad
                ? '<div class="owl-video-tn ' +
                  h +
                  '" ' +
                  a +
                  '="' +
                  t +
                  '"></div>'
                : '<div class="owl-video-tn" style="opacity:1;background-image:url(' +
                  t +
                  ')"></div>'),
              e.after(s),
              e.after('<div class="owl-video-play-icon"></div>');
          };
        return (
          e.wrap('<div class="owl-video-wrapper"' + o + "></div>"),
          this._core.settings.lazyLoad && ((a = "data-src"), (h = "owl-lazy")),
          r.length
            ? (c(r.attr(a)), r.remove(), !1)
            : void ("youtube" === i.type
                ? ((n = "//img.youtube.com/vi/" + i.id + "/hqdefault.jpg"),
                  c(n))
                : "vimeo" === i.type
                ? t.ajax({
                    type: "GET",
                    url: "//vimeo.com/api/v2/video/" + i.id + ".json",
                    jsonp: "callback",
                    dataType: "jsonp",
                    success: function (t) {
                      (n = t[0].thumbnail_large), c(n);
                    },
                  })
                : "vzaar" === i.type &&
                  t.ajax({
                    type: "GET",
                    url: "//vzaar.com/api/videos/" + i.id + ".json",
                    jsonp: "callback",
                    dataType: "jsonp",
                    success: function (t) {
                      (n = t.framegrab_url), c(n);
                    },
                  }))
        );
      }),
      (n.prototype.stop = function () {
        this._core.trigger("stop", null, "video"),
          this._playing.find(".owl-video-frame").remove(),
          this._playing.removeClass("owl-video-playing"),
          (this._playing = null),
          this._core.leave("playing"),
          this._core.trigger("stopped", null, "video");
      }),
      (n.prototype.play = function (e) {
        var i,
          s = t(e.target).closest("." + this._core.settings.itemClass),
          n = this._videos[s.attr("data-video")],
          o = n.width || "100%",
          r = n.height || this._core.$stage.height();
        this._playing ||
          (this._core.enter("playing"),
          this._core.trigger("play", null, "video"),
          (s = this._core.items(this._core.relative(s.index()))),
          this._core.reset(s.index()),
          "youtube" === n.type
            ? (i =
                '<iframe width="' +
                o +
                '" height="' +
                r +
                '" src="//www.youtube.com/embed/' +
                n.id +
                "?autoplay=1&v=" +
                n.id +
                '" frameborder="0" allowfullscreen></iframe>')
            : "vimeo" === n.type
            ? (i =
                '<iframe src="//player.vimeo.com/video/' +
                n.id +
                '?autoplay=1" width="' +
                o +
                '" height="' +
                r +
                '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>')
            : "vzaar" === n.type &&
              (i =
                '<iframe frameborder="0"height="' +
                r +
                '"width="' +
                o +
                '" allowfullscreen mozallowfullscreen webkitAllowFullScreen src="//view.vzaar.com/' +
                n.id +
                '/player?autoplay=true"></iframe>'),
          t('<div class="owl-video-frame">' + i + "</div>").insertAfter(
            s.find(".owl-video")
          ),
          (this._playing = s.addClass("owl-video-playing")));
      }),
      (n.prototype.isInFullScreen = function () {
        var e =
          i.fullscreenElement ||
          i.mozFullScreenElement ||
          i.webkitFullscreenElement;
        return e && t(e).parent().hasClass("owl-video-frame");
      }),
      (n.prototype.destroy = function () {
        var t, e;
        for (t in (this._core.$element.off("click.owl.video"), this._handlers))
          this._core.$element.off(t, this._handlers[t]);
        for (e in Object.getOwnPropertyNames(this))
          "function" != typeof this[e] && (this[e] = null);
      }),
      (t.fn.owlCarousel.Constructor.Plugins.Video = n);
  })(window.Zepto || window.jQuery, window, document),
  (function (t, e, i, s) {
    var n = function (e) {
      (this.core = e),
        (this.core.options = t.extend({}, n.Defaults, this.core.options)),
        (this.swapping = !0),
        (this.previous = s),
        (this.next = s),
        (this.handlers = {
          "change.owl.carousel": t.proxy(function (t) {
            t.namespace &&
              "position" == t.property.name &&
              ((this.previous = this.core.current()),
              (this.next = t.property.value));
          }, this),
          "drag.owl.carousel dragged.owl.carousel translated.owl.carousel":
            t.proxy(function (t) {
              t.namespace && (this.swapping = "translated" == t.type);
            }, this),
          "translate.owl.carousel": t.proxy(function (t) {
            t.namespace &&
              this.swapping &&
              (this.core.options.animateOut || this.core.options.animateIn) &&
              this.swap();
          }, this),
        }),
        this.core.$element.on(this.handlers);
    };
    (n.Defaults = { animateOut: !1, animateIn: !1 }),
      (n.prototype.swap = function () {
        if (
          1 === this.core.settings.items &&
          t.support.animation &&
          t.support.transition
        ) {
          this.core.speed(0);
          var e,
            i = t.proxy(this.clear, this),
            s = this.core.$stage.children().eq(this.previous),
            n = this.core.$stage.children().eq(this.next),
            o = this.core.settings.animateIn,
            r = this.core.settings.animateOut;
          this.core.current() !== this.previous &&
            (r &&
              ((e =
                this.core.coordinates(this.previous) -
                this.core.coordinates(this.next)),
              s
                .one(t.support.animation.end, i)
                .css({ left: e + "px" })
                .addClass("animated owl-animated-out")
                .addClass(r)),
            o &&
              n
                .one(t.support.animation.end, i)
                .addClass("animated owl-animated-in")
                .addClass(o));
        }
      }),
      (n.prototype.clear = function (e) {
        t(e.target)
          .css({ left: "" })
          .removeClass("animated owl-animated-out owl-animated-in")
          .removeClass(this.core.settings.animateIn)
          .removeClass(this.core.settings.animateOut),
          this.core.onTransitionEnd();
      }),
      (n.prototype.destroy = function () {
        var t, e;
        for (t in this.handlers) this.core.$element.off(t, this.handlers[t]);
        for (e in Object.getOwnPropertyNames(this))
          "function" != typeof this[e] && (this[e] = null);
      }),
      (t.fn.owlCarousel.Constructor.Plugins.Animate = n);
  })(window.Zepto || window.jQuery, window, document),
  (function (t, e, i, s) {
    var n = function (e) {
      (this._core = e),
        (this._timeout = null),
        (this._paused = !1),
        (this._handlers = {
          "changed.owl.carousel": t.proxy(function (t) {
            t.namespace && "settings" === t.property.name
              ? this._core.settings.autoplay
                ? this.play()
                : this.stop()
              : t.namespace &&
                "position" === t.property.name &&
                this._core.settings.autoplay &&
                this._setAutoPlayInterval();
          }, this),
          "initialized.owl.carousel": t.proxy(function (t) {
            t.namespace && this._core.settings.autoplay && this.play();
          }, this),
          "play.owl.autoplay": t.proxy(function (t, e, i) {
            t.namespace && this.play(e, i);
          }, this),
          "stop.owl.autoplay": t.proxy(function (t) {
            t.namespace && this.stop();
          }, this),
          "mouseover.owl.autoplay": t.proxy(function () {
            this._core.settings.autoplayHoverPause &&
              this._core.is("rotating") &&
              this.pause();
          }, this),
          "mouseleave.owl.autoplay": t.proxy(function () {
            this._core.settings.autoplayHoverPause &&
              this._core.is("rotating") &&
              this.play();
          }, this),
          "touchstart.owl.core": t.proxy(function () {
            this._core.settings.autoplayHoverPause &&
              this._core.is("rotating") &&
              this.pause();
          }, this),
          "touchend.owl.core": t.proxy(function () {
            this._core.settings.autoplayHoverPause && this.play();
          }, this),
        }),
        this._core.$element.on(this._handlers),
        (this._core.options = t.extend({}, n.Defaults, this._core.options));
    };
    (n.Defaults = {
      autoplay: !1,
      autoplayTimeout: 5e3,
      autoplayHoverPause: !1,
      autoplaySpeed: !1,
    }),
      (n.prototype.play = function (t, e) {
        (this._paused = !1),
          this._core.is("rotating") ||
            (this._core.enter("rotating"), this._setAutoPlayInterval());
      }),
      (n.prototype._getNextTimeout = function (s, n) {
        return (
          this._timeout && e.clearTimeout(this._timeout),
          e.setTimeout(
            t.proxy(function () {
              this._paused ||
                this._core.is("busy") ||
                this._core.is("interacting") ||
                i.hidden ||
                this._core.next(n || this._core.settings.autoplaySpeed);
            }, this),
            s || this._core.settings.autoplayTimeout
          )
        );
      }),
      (n.prototype._setAutoPlayInterval = function () {
        this._timeout = this._getNextTimeout();
      }),
      (n.prototype.stop = function () {
        this._core.is("rotating") &&
          (e.clearTimeout(this._timeout), this._core.leave("rotating"));
      }),
      (n.prototype.pause = function () {
        this._core.is("rotating") && (this._paused = !0);
      }),
      (n.prototype.destroy = function () {
        var t, e;
        for (t in (this.stop(), this._handlers))
          this._core.$element.off(t, this._handlers[t]);
        for (e in Object.getOwnPropertyNames(this))
          "function" != typeof this[e] && (this[e] = null);
      }),
      (t.fn.owlCarousel.Constructor.Plugins.autoplay = n);
  })(window.Zepto || window.jQuery, window, document),
  (function (t, e, i, s) {
    "use strict";
    var n = function (e) {
      (this._core = e),
        (this._initialized = !1),
        (this._pages = []),
        (this._controls = {}),
        (this._templates = []),
        (this.$element = this._core.$element),
        (this._overrides = {
          next: this._core.next,
          prev: this._core.prev,
          to: this._core.to,
        }),
        (this._handlers = {
          "prepared.owl.carousel": t.proxy(function (e) {
            e.namespace &&
              this._core.settings.dotsData &&
              this._templates.push(
                '<div class="' +
                  this._core.settings.dotClass +
                  '">' +
                  t(e.content)
                    .find("[data-dot]")
                    .addBack("[data-dot]")
                    .attr("data-dot") +
                  "</div>"
              );
          }, this),
          "added.owl.carousel": t.proxy(function (t) {
            t.namespace &&
              this._core.settings.dotsData &&
              this._templates.splice(t.position, 0, this._templates.pop());
          }, this),
          "remove.owl.carousel": t.proxy(function (t) {
            t.namespace &&
              this._core.settings.dotsData &&
              this._templates.splice(t.position, 1);
          }, this),
          "changed.owl.carousel": t.proxy(function (t) {
            t.namespace && "position" == t.property.name && this.draw();
          }, this),
          "initialized.owl.carousel": t.proxy(function (t) {
            t.namespace &&
              !this._initialized &&
              (this._core.trigger("initialize", null, "navigation"),
              this.initialize(),
              this.update(),
              this.draw(),
              (this._initialized = !0),
              this._core.trigger("initialized", null, "navigation"));
          }, this),
          "refreshed.owl.carousel": t.proxy(function (t) {
            t.namespace &&
              this._initialized &&
              (this._core.trigger("refresh", null, "navigation"),
              this.update(),
              this.draw(),
              this._core.trigger("refreshed", null, "navigation"));
          }, this),
        }),
        (this._core.options = t.extend({}, n.Defaults, this._core.options)),
        this.$element.on(this._handlers);
    };
    (n.Defaults = {
      nav: !1,
      navText: ["prev", "next"],
      navSpeed: !1,
      navElement: "div",
      navContainer: !1,
      navContainerClass: "owl-nav",
      navClass: ["owl-prev", "owl-next"],
      slideBy: 1,
      dotClass: "owl-dot",
      dotsClass: "owl-dots",
      dots: !0,
      dotsEach: !1,
      dotsData: !1,
      dotsSpeed: !1,
      dotsContainer: !1,
    }),
      (n.prototype.initialize = function () {
        var e,
          i = this._core.settings;
        for (e in ((this._controls.$relative = (
          i.navContainer
            ? t(i.navContainer)
            : t("<div>").addClass(i.navContainerClass).appendTo(this.$element)
        ).addClass("disabled")),
        (this._controls.$previous = t("<" + i.navElement + ">")
          .addClass(i.navClass[0])
          .html(i.navText[0])
          .prependTo(this._controls.$relative)
          .on(
            "click",
            t.proxy(function (t) {
              this.prev(i.navSpeed);
            }, this)
          )),
        (this._controls.$next = t("<" + i.navElement + ">")
          .addClass(i.navClass[1])
          .html(i.navText[1])
          .appendTo(this._controls.$relative)
          .on(
            "click",
            t.proxy(function (t) {
              this.next(i.navSpeed);
            }, this)
          )),
        i.dotsData ||
          (this._templates = [
            t("<div>")
              .addClass(i.dotClass)
              .append(t("<span>"))
              .prop("outerHTML"),
          ]),
        (this._controls.$absolute = (
          i.dotsContainer
            ? t(i.dotsContainer)
            : t("<div>").addClass(i.dotsClass).appendTo(this.$element)
        ).addClass("disabled")),
        this._controls.$absolute.on(
          "click",
          "div",
          t.proxy(function (e) {
            var s = t(e.target).parent().is(this._controls.$absolute)
              ? t(e.target).index()
              : t(e.target).parent().index();
            e.preventDefault(), this.to(s, i.dotsSpeed);
          }, this)
        ),
        this._overrides))
          this._core[e] = t.proxy(this[e], this);
      }),
      (n.prototype.destroy = function () {
        var t, e, i, s;
        for (t in this._handlers) this.$element.off(t, this._handlers[t]);
        for (e in this._controls) this._controls[e].remove();
        for (s in this.overides) this._core[s] = this._overrides[s];
        for (i in Object.getOwnPropertyNames(this))
          "function" != typeof this[i] && (this[i] = null);
      }),
      (n.prototype.update = function () {
        var t,
          e,
          i = this._core.clones().length / 2,
          s = i + this._core.items().length,
          n = this._core.maximum(!0),
          o = this._core.settings,
          r = o.center || o.autoWidth || o.dotsData ? 1 : o.dotsEach || o.items;
        if (
          ("page" !== o.slideBy && (o.slideBy = Math.min(o.slideBy, o.items)),
          o.dots || "page" == o.slideBy)
        )
          for (this._pages = [], t = i, e = 0, 0; s > t; t++) {
            if (e >= r || 0 === e) {
              if (
                (this._pages.push({
                  start: Math.min(n, t - i),
                  end: t - i + r - 1,
                }),
                Math.min(n, t - i) === n)
              )
                break;
              (e = 0), 0;
            }
            e += this._core.mergers(this._core.relative(t));
          }
      }),
      (n.prototype.draw = function () {
        var e,
          i = this._core.settings,
          s = this._core.items().length <= i.items,
          n = this._core.relative(this._core.current()),
          o = i.loop || i.rewind;
        this._controls.$relative.toggleClass("disabled", !i.nav || s),
          i.nav &&
            (this._controls.$previous.toggleClass(
              "disabled",
              !o && n <= this._core.minimum(!0)
            ),
            this._controls.$next.toggleClass(
              "disabled",
              !o && n >= this._core.maximum(!0)
            )),
          this._controls.$absolute.toggleClass("disabled", !i.dots || s),
          i.dots &&
            ((e =
              this._pages.length - this._controls.$absolute.children().length),
            i.dotsData && 0 !== e
              ? this._controls.$absolute.html(this._templates.join(""))
              : e > 0
              ? this._controls.$absolute.append(
                  new Array(e + 1).join(this._templates[0])
                )
              : 0 > e && this._controls.$absolute.children().slice(e).remove(),
            this._controls.$absolute.find(".active").removeClass("active"),
            this._controls.$absolute
              .children()
              .eq(t.inArray(this.current(), this._pages))
              .addClass("active"));
      }),
      (n.prototype.onTrigger = function (e) {
        var i = this._core.settings;
        e.page = {
          index: t.inArray(this.current(), this._pages),
          count: this._pages.length,
          size:
            i &&
            (i.center || i.autoWidth || i.dotsData ? 1 : i.dotsEach || i.items),
        };
      }),
      (n.prototype.current = function () {
        var e = this._core.relative(this._core.current());
        return t
          .grep(
            this._pages,
            t.proxy(function (t, i) {
              return t.start <= e && t.end >= e;
            }, this)
          )
          .pop();
      }),
      (n.prototype.getPosition = function (e) {
        var i,
          s,
          n = this._core.settings;
        return (
          "page" == n.slideBy
            ? ((i = t.inArray(this.current(), this._pages)),
              (s = this._pages.length),
              e ? ++i : --i,
              (i = this._pages[((i % s) + s) % s].start))
            : ((i = this._core.relative(this._core.current())),
              (s = this._core.items().length),
              e ? (i += n.slideBy) : (i -= n.slideBy)),
          i
        );
      }),
      (n.prototype.next = function (e) {
        t.proxy(this._overrides.to, this._core)(this.getPosition(!0), e);
      }),
      (n.prototype.prev = function (e) {
        t.proxy(this._overrides.to, this._core)(this.getPosition(!1), e);
      }),
      (n.prototype.to = function (e, i, s) {
        var n;
        !s && this._pages.length
          ? ((n = this._pages.length),
            t.proxy(this._overrides.to, this._core)(
              this._pages[((e % n) + n) % n].start,
              i
            ))
          : t.proxy(this._overrides.to, this._core)(e, i);
      }),
      (t.fn.owlCarousel.Constructor.Plugins.Navigation = n);
  })(window.Zepto || window.jQuery, window, document),
  (function (t, e, i, s) {
    "use strict";
    var n = function (i) {
      (this._core = i),
        (this._hashes = {}),
        (this.$element = this._core.$element),
        (this._handlers = {
          "initialized.owl.carousel": t.proxy(function (i) {
            i.namespace &&
              "URLHash" === this._core.settings.startPosition &&
              t(e).trigger("hashchange.owl.navigation");
          }, this),
          "prepared.owl.carousel": t.proxy(function (e) {
            if (e.namespace) {
              var i = t(e.content)
                .find("[data-hash]")
                .addBack("[data-hash]")
                .attr("data-hash");
              if (!i) return;
              this._hashes[i] = e.content;
            }
          }, this),
          "changed.owl.carousel": t.proxy(function (i) {
            if (i.namespace && "position" === i.property.name) {
              var s = this._core.items(
                  this._core.relative(this._core.current())
                ),
                n = t
                  .map(this._hashes, function (t, e) {
                    return t === s ? e : null;
                  })
                  .join();
              if (!n || e.location.hash.slice(1) === n) return;
              e.location.hash = n;
            }
          }, this),
        }),
        (this._core.options = t.extend({}, n.Defaults, this._core.options)),
        this.$element.on(this._handlers),
        t(e).on(
          "hashchange.owl.navigation",
          t.proxy(function (t) {
            var i = e.location.hash.substring(1),
              s = this._core.$stage.children(),
              n = this._hashes[i] && s.index(this._hashes[i]);
            void 0 !== n &&
              n !== this._core.current() &&
              this._core.to(this._core.relative(n), !1, !0);
          }, this)
        );
    };
    (n.Defaults = { URLhashListener: !1 }),
      (n.prototype.destroy = function () {
        var i, s;
        for (i in (t(e).off("hashchange.owl.navigation"), this._handlers))
          this._core.$element.off(i, this._handlers[i]);
        for (s in Object.getOwnPropertyNames(this))
          "function" != typeof this[s] && (this[s] = null);
      }),
      (t.fn.owlCarousel.Constructor.Plugins.Hash = n);
  })(window.Zepto || window.jQuery, window, document),
  (function (t, e, i, s) {
    function n(e, i) {
      var n = !1,
        o = e.charAt(0).toUpperCase() + e.slice(1);
      return (
        t.each((e + " " + a.join(o + " ") + o).split(" "), function (t, e) {
          return r[e] !== s ? ((n = !i || e), !1) : void 0;
        }),
        n
      );
    }
    function o(t) {
      return n(t, !0);
    }
    var r = t("<support>").get(0).style,
      a = "Webkit Moz O ms".split(" "),
      h = {
        transition: {
          end: {
            WebkitTransition: "webkitTransitionEnd",
            MozTransition: "transitionend",
            OTransition: "oTransitionEnd",
            transition: "transitionend",
          },
        },
        animation: {
          end: {
            WebkitAnimation: "webkitAnimationEnd",
            MozAnimation: "animationend",
            OAnimation: "oAnimationEnd",
            animation: "animationend",
          },
        },
      },
      l = function () {
        return !!n("transform");
      },
      c = function () {
        return !!n("perspective");
      },
      p = function () {
        return !!n("animation");
      };
    (function () {
      return !!n("transition");
    })() &&
      ((t.support.transition = new String(o("transition"))),
      (t.support.transition.end = h.transition.end[t.support.transition])),
      p() &&
        ((t.support.animation = new String(o("animation"))),
        (t.support.animation.end = h.animation.end[t.support.animation])),
      l() &&
        ((t.support.transform = new String(o("transform"))),
        (t.support.transform3d = c()));
  })(window.Zepto || window.jQuery, window, document);

/*!
 * Infinite Scroll PACKAGED v4.0.1
 * Automatically add next page
 *
 * Licensed GPLv3 for open source use
 * or Infinite Scroll Commercial License for commercial use
 *
 * https://infinite-scroll.com
 * Copyright 2018-2020 Metafizzy
 */
!(function (t, e) {
  "object" == typeof module && module.exports
    ? (module.exports = e(t, require("jquery")))
    : (t.jQueryBridget = e(t, t.jQuery));
})(window, function (t, e) {
  let i = t.console,
    n =
      void 0 === i
        ? function () {}
        : function (t) {
            i.error(t);
          };
  return function (i, o, s) {
    (s = s || e || t.jQuery) &&
      (o.prototype.option ||
        (o.prototype.option = function (t) {
          t && (this.options = Object.assign(this.options || {}, t));
        }),
      (s.fn[i] = function (t, ...e) {
        return "string" == typeof t
          ? (function (t, e, o) {
              let r,
                l = `$().${i}("${e}")`;
              return (
                t.each(function (t, h) {
                  let a = s.data(h, i);
                  if (!a)
                    return void n(
                      `${i} not initialized. Cannot call method ${l}`
                    );
                  let c = a[e];
                  if (!c || "_" == e.charAt(0))
                    return void n(`${l} is not a valid method`);
                  let u = c.apply(a, o);
                  r = void 0 === r ? u : r;
                }),
                void 0 !== r ? r : t
              );
            })(this, t, e)
          : ((r = t),
            this.each(function (t, e) {
              let n = s.data(e, i);
              n
                ? (n.option(r), n._init())
                : ((n = new o(e, r)), s.data(e, i, n));
            }),
            this);
        var r;
      }));
  };
}),
  (function (t, e) {
    "object" == typeof module && module.exports
      ? (module.exports = e())
      : (t.EvEmitter = e());
  })("undefined" != typeof window ? window : this, function () {
    function t() {}
    let e = t.prototype;
    return (
      (e.on = function (t, e) {
        if (!t || !e) return this;
        let i = (this._events = this._events || {}),
          n = (i[t] = i[t] || []);
        return n.includes(e) || n.push(e), this;
      }),
      (e.once = function (t, e) {
        if (!t || !e) return this;
        this.on(t, e);
        let i = (this._onceEvents = this._onceEvents || {});
        return ((i[t] = i[t] || {})[e] = !0), this;
      }),
      (e.off = function (t, e) {
        let i = this._events && this._events[t];
        if (!i || !i.length) return this;
        let n = i.indexOf(e);
        return -1 != n && i.splice(n, 1), this;
      }),
      (e.emitEvent = function (t, e) {
        let i = this._events && this._events[t];
        if (!i || !i.length) return this;
        (i = i.slice(0)), (e = e || []);
        let n = this._onceEvents && this._onceEvents[t];
        for (let o of i) {
          n && n[o] && (this.off(t, o), delete n[o]), o.apply(this, e);
        }
        return this;
      }),
      (e.allOff = function () {
        return delete this._events, delete this._onceEvents, this;
      }),
      t
    );
  }),
  (function (t, e) {
    "object" == typeof module && module.exports
      ? (module.exports = e(t))
      : (t.fizzyUIUtils = e(t));
  })(this, function (t) {
    let e = {
        extend: function (t, e) {
          return Object.assign(t, e);
        },
        modulo: function (t, e) {
          return ((t % e) + e) % e;
        },
        makeArray: function (t) {
          if (Array.isArray(t)) return t;
          if (null == t) return [];
          return "object" == typeof t && "number" == typeof t.length
            ? [...t]
            : [t];
        },
        removeFrom: function (t, e) {
          let i = t.indexOf(e);
          -1 != i && t.splice(i, 1);
        },
        getParent: function (t, e) {
          for (; t.parentNode && t != document.body; )
            if ((t = t.parentNode).matches(e)) return t;
        },
        getQueryElement: function (t) {
          return "string" == typeof t ? document.querySelector(t) : t;
        },
        handleEvent: function (t) {
          let e = "on" + t.type;
          this[e] && this[e](t);
        },
        filterFindElements: function (t, i) {
          return (t = e.makeArray(t))
            .filter((t) => t instanceof HTMLElement)
            .reduce((t, e) => {
              if (!i) return t.push(e), t;
              e.matches(i) && t.push(e);
              let n = e.querySelectorAll(i);
              return (t = t.concat(...n));
            }, []);
        },
        debounceMethod: function (t, e, i) {
          i = i || 100;
          let n = t.prototype[e],
            o = e + "Timeout";
          t.prototype[e] = function () {
            clearTimeout(this[o]);
            let t = arguments;
            this[o] = setTimeout(() => {
              n.apply(this, t), delete this[o];
            }, i);
          };
        },
        docReady: function (t) {
          let e = document.readyState;
          "complete" == e || "interactive" == e
            ? setTimeout(t)
            : document.addEventListener("DOMContentLoaded", t);
        },
        toDashed: function (t) {
          return t
            .replace(/(.)([A-Z])/g, function (t, e, i) {
              return e + "-" + i;
            })
            .toLowerCase();
        },
      },
      i = t.console;
    return (
      (e.htmlInit = function (n, o) {
        e.docReady(function () {
          let s = "data-" + e.toDashed(o),
            r = document.querySelectorAll(`[${s}]`),
            l = t.jQuery;
          [...r].forEach((t) => {
            let e,
              r = t.getAttribute(s);
            try {
              e = r && JSON.parse(r);
            } catch (e) {
              return void (
                i && i.error(`Error parsing ${s} on ${t.className}: ${e}`)
              );
            }
            let h = new n(t, e);
            l && l.data(t, o, h);
          });
        });
      }),
      e
    );
  }),
  (function (t, e) {
    "object" == typeof module && module.exports
      ? (module.exports = e(
          t,
          require("ev-emitter"),
          require("fizzy-ui-utils")
        ))
      : (t.InfiniteScroll = e(t, t.EvEmitter, t.fizzyUIUtils));
  })(window, function (t, e, i) {
    let n = t.jQuery,
      o = {};
    function s(t, e) {
      let r = i.getQueryElement(t);
      if (r) {
        if ((t = r).infiniteScrollGUID) {
          let i = o[t.infiniteScrollGUID];
          return i.option(e), i;
        }
        (this.element = t),
          (this.options = { ...s.defaults }),
          this.option(e),
          n && (this.$element = n(this.element)),
          this.create();
      } else console.error("Bad element for InfiniteScroll: " + (r || t));
    }
    (s.defaults = {}), (s.create = {}), (s.destroy = {});
    let r = s.prototype;
    Object.assign(r, e.prototype);
    let l = 0;
    (r.create = function () {
      let t = (this.guid = ++l);
      if (
        ((this.element.infiniteScrollGUID = t),
        (o[t] = this),
        (this.pageIndex = 1),
        (this.loadCount = 0),
        this.updateGetPath(),
        this.getPath && this.getPath())
      ) {
        this.updateGetAbsolutePath(),
          this.log("initialized", [this.element.className]),
          this.callOnInit();
        for (let t in s.create) s.create[t].call(this);
      } else console.error("Disabling InfiniteScroll");
    }),
      (r.option = function (t) {
        Object.assign(this.options, t);
      }),
      (r.callOnInit = function () {
        let t = this.options.onInit;
        t && t.call(this, this);
      }),
      (r.dispatchEvent = function (t, e, i) {
        this.log(t, i);
        let o = e ? [e].concat(i) : i;
        if ((this.emitEvent(t, o), !n || !this.$element)) return;
        let s = (t += ".infiniteScroll");
        if (e) {
          let i = n.Event(e);
          (i.type = t), (s = i);
        }
        this.$element.trigger(s, i);
      });
    let h = {
      initialized: (t) => `on ${t}`,
      request: (t) => `URL: ${t}`,
      load: (t, e) => `${t.title || ""}. URL: ${e}`,
      error: (t, e) => `${t}. URL: ${e}`,
      append: (t, e, i) => `${i.length} items. URL: ${e}`,
      last: (t, e) => `URL: ${e}`,
      history: (t, e) => `URL: ${e}`,
      pageIndex: function (t, e) {
        return `current page determined to be: ${t} from ${e}`;
      },
    };
    (r.log = function (t, e) {
      if (!this.options.debug) return;
      let i = `[InfiniteScroll] ${t}`,
        n = h[t];
      n && (i += ". " + n.apply(this, e)), console.log(i);
    }),
      (r.updateMeasurements = function () {
        this.windowHeight = t.innerHeight;
        let e = this.element.getBoundingClientRect();
        this.top = e.top + t.scrollY;
      }),
      (r.updateScroller = function () {
        let e = this.options.elementScroll;
        if (e) {
          if (
            ((this.scroller = !0 === e ? this.element : i.getQueryElement(e)),
            !this.scroller)
          )
            throw new Error(`Unable to find elementScroll: ${e}`);
        } else this.scroller = t;
      }),
      (r.updateGetPath = function () {
        let t = this.options.path;
        if (!t)
          return void console.error(
            `InfiniteScroll path option required. Set as: ${t}`
          );
        let e = typeof t;
        "function" != e
          ? "string" == e && t.match("{{#}}")
            ? this.updateGetPathTemplate(t)
            : this.updateGetPathSelector(t)
          : (this.getPath = t);
      }),
      (r.updateGetPathTemplate = function (t) {
        this.getPath = () => {
          let e = this.pageIndex + 1;
          return t.replace("{{#}}", e);
        };
        let e = t.replace(/(\\\?|\?)/, "\\?").replace("{{#}}", "(\\d\\d?\\d?)"),
          i = new RegExp(e),
          n = location.href.match(i);
        n &&
          ((this.pageIndex = parseInt(n[1], 10)),
          this.log("pageIndex", [this.pageIndex, "template string"]));
      });
    let a = [
        /^(.*?\/?page\/?)(\d\d?\d?)(.*?$)/,
        /^(.*?\/?\?page=)(\d\d?\d?)(.*?$)/,
        /(.*?)(\d\d?\d?)(?!.*\d)(.*?$)/,
      ],
      c = (s.getPathParts = function (t) {
        if (t)
          for (let e of a) {
            let i = t.match(e);
            if (i) {
              let [, t, e, n] = i;
              return { begin: t, index: e, end: n };
            }
          }
      });
    (r.updateGetPathSelector = function (t) {
      let e = document.querySelector(t);
      if (!e)
        return void console.error(
          `Bad InfiniteScroll path option. Next link not found: ${t}`
        );
      let i = e.getAttribute("href"),
        n = c(i);
      if (!n)
        return void console.error(
          `InfiniteScroll unable to parse next link href: ${i}`
        );
      let { begin: o, index: s, end: r } = n;
      (this.isPathSelector = !0),
        (this.getPath = () => o + (this.pageIndex + 1) + r),
        (this.pageIndex = parseInt(s, 10) - 1),
        this.log("pageIndex", [this.pageIndex, "next link"]);
    }),
      (r.updateGetAbsolutePath = function () {
        let t = this.getPath();
        if (t.match(/^http/) || t.match(/^\//))
          return void (this.getAbsolutePath = this.getPath);
        let { pathname: e } = location,
          i = t.match(/^\?/),
          n = e.substring(0, e.lastIndexOf("/")),
          o = i ? e : n + "/";
        this.getAbsolutePath = () => o + this.getPath();
      }),
      (s.create.hideNav = function () {
        let t = i.getQueryElement(this.options.hideNav);
        t && ((t.style.display = "none"), (this.nav = t));
      }),
      (s.destroy.hideNav = function () {
        this.nav && (this.nav.style.display = "");
      }),
      (r.destroy = function () {
        this.allOff();
        for (let t in s.destroy) s.destroy[t].call(this);
        delete this.element.infiniteScrollGUID,
          delete o[this.guid],
          n && this.$element && n.removeData(this.element, "infiniteScroll");
      }),
      (s.throttle = function (t, e) {
        let i, n;
        return (
          (e = e || 200),
          function () {
            let o = +new Date(),
              s = arguments,
              r = () => {
                (i = o), t.apply(this, s);
              };
            i && o < i + e ? (clearTimeout(n), (n = setTimeout(r, e))) : r();
          }
        );
      }),
      (s.data = function (t) {
        let e = (t = i.getQueryElement(t)) && t.infiniteScrollGUID;
        return e && o[e];
      }),
      (s.setJQuery = function (t) {
        n = t;
      }),
      i.htmlInit(s, "infinite-scroll"),
      (r._init = function () {});
    let { jQueryBridget: u } = t;
    return n && u && u("infiniteScroll", s, n), s;
  }),
  (function (t, e) {
    "object" == typeof module && module.exports
      ? (module.exports = e(t, require("./core")))
      : e(t, t.InfiniteScroll);
  })(window, function (t, e) {
    let i = e.prototype;
    Object.assign(e.defaults, {
      loadOnScroll: !0,
      checkLastPage: !0,
      responseBody: "text",
      domParseResponse: !0,
    }),
      (e.create.pageLoad = function () {
        (this.canLoad = !0),
          this.on("scrollThreshold", this.onScrollThresholdLoad),
          this.on("load", this.checkLastPage),
          this.options.outlayer && this.on("append", this.onAppendOutlayer);
      }),
      (i.onScrollThresholdLoad = function () {
        this.options.loadOnScroll && this.loadNextPage();
      });
    let n = new DOMParser();
    function o(t) {
      let e = document.createDocumentFragment();
      return t && e.append(...t), e;
    }
    return (
      (i.loadNextPage = function () {
        if (this.isLoading || !this.canLoad) return;
        let {
            responseBody: t,
            domParseResponse: e,
            fetchOptions: i,
          } = this.options,
          o = this.getAbsolutePath();
        (this.isLoading = !0), "function" == typeof i && (i = i());
        let s = fetch(o, i)
          .then((i) => {
            if (!i.ok) {
              let t = new Error(i.statusText);
              return this.onPageError(t, o, i), { response: i };
            }
            return i[t]().then(
              (s) => (
                "text" == t && e && (s = n.parseFromString(s, "text/html")),
                204 == i.status
                  ? (this.lastPageReached(s, o), { body: s, response: i })
                  : this.onPageLoad(s, o, i)
              )
            );
          })
          .catch((t) => {
            this.onPageError(t, o);
          });
        return this.dispatchEvent("request", null, [o, s]), s;
      }),
      (i.onPageLoad = function (t, e, i) {
        return (
          this.options.append || (this.isLoading = !1),
          this.pageIndex++,
          this.loadCount++,
          this.dispatchEvent("load", null, [t, e, i]),
          this.appendNextPage(t, e, i)
        );
      }),
      (i.appendNextPage = function (t, e, i) {
        let { append: n, responseBody: s, domParseResponse: r } = this.options;
        if (!("text" == s && r) || !n) return { body: t, response: i };
        let l = t.querySelectorAll(n),
          h = { body: t, response: i, items: l };
        if (!l || !l.length) return this.lastPageReached(t, e), h;
        let a = o(l),
          c = () => (
            this.appendItems(l, a),
            (this.isLoading = !1),
            this.dispatchEvent("append", null, [t, e, l, i]),
            h
          );
        return this.options.outlayer ? this.appendOutlayerItems(a, c) : c();
      }),
      (i.appendItems = function (t, e) {
        t &&
          t.length &&
          ((function (t) {
            let e = t.querySelectorAll("script");
            for (let t of e) {
              let e = document.createElement("script"),
                i = t.attributes;
              for (let t of i) e.setAttribute(t.name, t.value);
              (e.innerHTML = t.innerHTML), t.parentNode.replaceChild(e, t);
            }
          })((e = e || o(t))),
          this.element.appendChild(e));
      }),
      (i.appendOutlayerItems = function (i, n) {
        let o = e.imagesLoaded || t.imagesLoaded;
        return o
          ? new Promise(function (t) {
              o(i, function () {
                let e = n();
                t(e);
              });
            })
          : (console.error(
              "[InfiniteScroll] imagesLoaded required for outlayer option"
            ),
            void (this.isLoading = !1));
      }),
      (i.onAppendOutlayer = function (t, e, i) {
        this.options.outlayer.appended(i);
      }),
      (i.checkLastPage = function (t, e) {
        let i,
          { checkLastPage: n, path: o } = this.options;
        if (n) {
          if ("function" == typeof o) {
            if (!this.getPath()) return void this.lastPageReached(t, e);
          }
          "string" == typeof n ? (i = n) : this.isPathSelector && (i = o),
            i &&
              t.querySelector &&
              (t.querySelector(i) || this.lastPageReached(t, e));
        }
      }),
      (i.lastPageReached = function (t, e) {
        (this.canLoad = !1), this.dispatchEvent("last", null, [t, e]);
      }),
      (i.onPageError = function (t, e, i) {
        return (
          (this.isLoading = !1),
          (this.canLoad = !1),
          this.dispatchEvent("error", null, [t, e, i]),
          t
        );
      }),
      (e.create.prefill = function () {
        if (!this.options.prefill) return;
        let t = this.options.append;
        t
          ? (this.updateMeasurements(),
            this.updateScroller(),
            (this.isPrefilling = !0),
            this.on("append", this.prefill),
            this.once("error", this.stopPrefill),
            this.once("last", this.stopPrefill),
            this.prefill())
          : console.error(`append option required for prefill. Set as :${t}`);
      }),
      (i.prefill = function () {
        let t = this.getPrefillDistance();
        (this.isPrefilling = t >= 0),
          this.isPrefilling
            ? (this.log("prefill"), this.loadNextPage())
            : this.stopPrefill();
      }),
      (i.getPrefillDistance = function () {
        return this.options.elementScroll
          ? this.scroller.clientHeight - this.scroller.scrollHeight
          : this.windowHeight - this.element.clientHeight;
      }),
      (i.stopPrefill = function () {
        this.log("stopPrefill"), this.off("append", this.prefill);
      }),
      e
    );
  }),
  (function (t, e) {
    "object" == typeof module && module.exports
      ? (module.exports = e(t, require("./core"), require("fizzy-ui-utils")))
      : e(t, t.InfiniteScroll, t.fizzyUIUtils);
  })(window, function (t, e, i) {
    let n = e.prototype;
    return (
      Object.assign(e.defaults, { scrollThreshold: 400 }),
      (e.create.scrollWatch = function () {
        (this.pageScrollHandler = this.onPageScroll.bind(this)),
          (this.resizeHandler = this.onResize.bind(this));
        let t = this.options.scrollThreshold;
        (t || 0 === t) && this.enableScrollWatch();
      }),
      (e.destroy.scrollWatch = function () {
        this.disableScrollWatch();
      }),
      (n.enableScrollWatch = function () {
        this.isScrollWatching ||
          ((this.isScrollWatching = !0),
          this.updateMeasurements(),
          this.updateScroller(),
          this.on("last", this.disableScrollWatch),
          this.bindScrollWatchEvents(!0));
      }),
      (n.disableScrollWatch = function () {
        this.isScrollWatching &&
          (this.bindScrollWatchEvents(!1), delete this.isScrollWatching);
      }),
      (n.bindScrollWatchEvents = function (e) {
        let i = e ? "addEventListener" : "removeEventListener";
        this.scroller[i]("scroll", this.pageScrollHandler),
          t[i]("resize", this.resizeHandler);
      }),
      (n.onPageScroll = e.throttle(function () {
        this.getBottomDistance() <= this.options.scrollThreshold &&
          this.dispatchEvent("scrollThreshold");
      })),
      (n.getBottomDistance = function () {
        let e, i;
        return (
          this.options.elementScroll
            ? ((e = this.scroller.scrollHeight),
              (i = this.scroller.scrollTop + this.scroller.clientHeight))
            : ((e = this.top + this.element.clientHeight),
              (i = t.scrollY + this.windowHeight)),
          e - i
        );
      }),
      (n.onResize = function () {
        this.updateMeasurements();
      }),
      i.debounceMethod(e, "onResize", 150),
      e
    );
  }),
  (function (t, e) {
    "object" == typeof module && module.exports
      ? (module.exports = e(t, require("./core"), require("fizzy-ui-utils")))
      : e(t, t.InfiniteScroll, t.fizzyUIUtils);
  })(window, function (t, e, i) {
    let n = e.prototype;
    Object.assign(e.defaults, { history: "replace" });
    let o = document.createElement("a");
    return (
      (e.create.history = function () {
        if (!this.options.history) return;
        (o.href = this.getAbsolutePath()),
          (o.origin || o.protocol + "//" + o.host) == location.origin
            ? this.options.append
              ? this.createHistoryAppend()
              : this.createHistoryPageLoad()
            : console.error(
                `[InfiniteScroll] cannot set history with different origin: ${o.origin} on ${location.origin} . History behavior disabled.`
              );
      }),
      (n.createHistoryAppend = function () {
        this.updateMeasurements(),
          this.updateScroller(),
          (this.scrollPages = [
            { top: 0, path: location.href, title: document.title },
          ]),
          (this.scrollPage = this.scrollPages[0]),
          (this.scrollHistoryHandler = this.onScrollHistory.bind(this)),
          (this.unloadHandler = this.onUnload.bind(this)),
          this.scroller.addEventListener("scroll", this.scrollHistoryHandler),
          this.on("append", this.onAppendHistory),
          this.bindHistoryAppendEvents(!0);
      }),
      (n.bindHistoryAppendEvents = function (e) {
        let i = e ? "addEventListener" : "removeEventListener";
        this.scroller[i]("scroll", this.scrollHistoryHandler),
          t[i]("unload", this.unloadHandler);
      }),
      (n.createHistoryPageLoad = function () {
        this.on("load", this.onPageLoadHistory);
      }),
      (e.destroy.history = n.destroyHistory =
        function () {
          this.options.history &&
            this.options.append &&
            this.bindHistoryAppendEvents(!1);
        }),
      (n.onAppendHistory = function (t, e, i) {
        if (!i || !i.length) return;
        let n = i[0],
          s = this.getElementScrollY(n);
        (o.href = e),
          this.scrollPages.push({ top: s, path: o.href, title: t.title });
      }),
      (n.getElementScrollY = function (e) {
        if (this.options.elementScroll) return e.offsetTop - this.top;
        return e.getBoundingClientRect().top + t.scrollY;
      }),
      (n.onScrollHistory = function () {
        let t = this.getClosestScrollPage();
        t != this.scrollPage &&
          ((this.scrollPage = t), this.setHistory(t.title, t.path));
      }),
      i.debounceMethod(e, "onScrollHistory", 150),
      (n.getClosestScrollPage = function () {
        let e, i;
        e = this.options.elementScroll
          ? this.scroller.scrollTop + this.scroller.clientHeight / 2
          : t.scrollY + this.windowHeight / 2;
        for (let t of this.scrollPages) {
          if (t.top >= e) break;
          i = t;
        }
        return i;
      }),
      (n.setHistory = function (t, e) {
        let i = this.options.history;
        i &&
          history[i + "State"] &&
          (history[i + "State"](null, t, e),
          this.options.historyTitle && (document.title = t),
          this.dispatchEvent("history", null, [t, e]));
      }),
      (n.onUnload = function () {
        if (0 === this.scrollPage.top) return;
        let e = t.scrollY - this.scrollPage.top + this.top;
        this.destroyHistory(), scrollTo(0, e);
      }),
      (n.onPageLoadHistory = function (t, e) {
        this.setHistory(t.title, e);
      }),
      e
    );
  }),
  (function (t, e) {
    "object" == typeof module && module.exports
      ? (module.exports = e(t, require("./core"), require("fizzy-ui-utils")))
      : e(t, t.InfiniteScroll, t.fizzyUIUtils);
  })(window, function (t, e, i) {
    class n {
      constructor(t, e) {
        (this.element = t),
          (this.infScroll = e),
          (this.clickHandler = this.onClick.bind(this)),
          this.element.addEventListener("click", this.clickHandler),
          e.on("request", this.disable.bind(this)),
          e.on("load", this.enable.bind(this)),
          e.on("error", this.hide.bind(this)),
          e.on("last", this.hide.bind(this));
      }
      onClick(t) {
        t.preventDefault(), this.infScroll.loadNextPage();
      }
      enable() {
        this.element.removeAttribute("disabled");
      }
      disable() {
        this.element.disabled = "disabled";
      }
      hide() {
        this.element.style.display = "none";
      }
      destroy() {
        this.element.removeEventListener("click", this.clickHandler);
      }
    }
    return (
      (e.create.button = function () {
        let t = i.getQueryElement(this.options.button);
        t && (this.button = new n(t, this));
      }),
      (e.destroy.button = function () {
        this.button && this.button.destroy();
      }),
      (e.Button = n),
      e
    );
  }),
  (function (t, e) {
    "object" == typeof module && module.exports
      ? (module.exports = e(t, require("./core"), require("fizzy-ui-utils")))
      : e(t, t.InfiniteScroll, t.fizzyUIUtils);
  })(window, function (t, e, i) {
    let n = e.prototype;
    function o(t) {
      r(t, "none");
    }
    function s(t) {
      r(t, "block");
    }
    function r(t, e) {
      t && (t.style.display = e);
    }
    return (
      (e.create.status = function () {
        let t = i.getQueryElement(this.options.status);
        t &&
          ((this.statusElement = t),
          (this.statusEventElements = {
            request: t.querySelector(".infinite-scroll-request"),
            error: t.querySelector(".infinite-scroll-error"),
            last: t.querySelector(".infinite-scroll-last"),
          }),
          this.on("request", this.showRequestStatus),
          this.on("error", this.showErrorStatus),
          this.on("last", this.showLastStatus),
          this.bindHideStatus("on"));
      }),
      (n.bindHideStatus = function (t) {
        let e = this.options.append ? "append" : "load";
        this[t](e, this.hideAllStatus);
      }),
      (n.showRequestStatus = function () {
        this.showStatus("request");
      }),
      (n.showErrorStatus = function () {
        this.showStatus("error");
      }),
      (n.showLastStatus = function () {
        this.showStatus("last"), this.bindHideStatus("off");
      }),
      (n.showStatus = function (t) {
        s(this.statusElement),
          this.hideStatusEventElements(),
          s(this.statusEventElements[t]);
      }),
      (n.hideAllStatus = function () {
        o(this.statusElement), this.hideStatusEventElements();
      }),
      (n.hideStatusEventElements = function () {
        for (let t in this.statusEventElements) {
          o(this.statusEventElements[t]);
        }
      }),
      e
    );
  }),
  // theiaStickySidebar
  !(function (i) {
    i.fn.theiaStickySidebar = function (t) {
      function e(t, e) {
        var a = o(t, e);
        a ||
          (console.log(
            "TSS: Body width smaller than options.minWidth. Init is delayed."
          ),
          i(document).on(
            "scroll." + t.namespace,
            (function (t, e) {
              return function (a) {
                var n = o(t, e);
                n && i(this).unbind(a);
              };
            })(t, e)
          ),
          i(window).on(
            "resize." + t.namespace,
            (function (t, e) {
              return function (a) {
                var n = o(t, e);
                n && i(this).unbind(a);
              };
            })(t, e)
          ));
      }
      function o(t, e) {
        return (
          t.initialized === !0 ||
          (!(i("body").width() < t.minWidth) && (a(t, e), !0))
        );
      }
      function a(t, e) {
        t.initialized = !0;
        var o = i("#theia-sticky-sidebar-stylesheet-" + t.namespace);
        0 === o.length &&
          i("head").append(
            i(
              '<style id="theia-sticky-sidebar-stylesheet-' +
                t.namespace +
                '">.theiaStickySidebar:after {content: ""; display: table; clear: both;}</style>'
            )
          ),
          e.each(function () {
            function e() {
              (a.fixedScrollTop = 0),
                a.sidebar.css({ "min-height": "1px" }),
                a.stickySidebar.css({
                  position: "static",
                  width: "",
                  transform: "none",
                });
            }
            function o(t) {
              var e = t.height();
              return (
                t.children().each(function () {
                  e = Math.max(e, i(this).height());
                }),
                e
              );
            }
            var a = {};
            if (
              ((a.sidebar = i(this)),
              (a.options = t || {}),
              (a.container = i(a.options.containerSelector)),
              0 == a.container.length && (a.container = a.sidebar.parent()),
              a.sidebar.parents().css("-webkit-transform", "none"),
              a.sidebar.css({
                position: a.options.defaultPosition,
                overflow: "visible",
                "-webkit-box-sizing": "border-box",
                "-moz-box-sizing": "border-box",
                "box-sizing": "border-box",
              }),
              (a.stickySidebar = a.sidebar.find(".theiaStickySidebar")),
              0 == a.stickySidebar.length)
            ) {
              var s = /(?:text|application)\/(?:x-)?(?:javascript|ecmascript)/i;
              a.sidebar
                .find("script")
                .filter(function (i, t) {
                  return 0 === t.type.length || t.type.match(s);
                })
                .remove(),
                (a.stickySidebar = i("<div>")
                  .addClass("theiaStickySidebar")
                  .append(a.sidebar.children())),
                a.sidebar.append(a.stickySidebar);
            }
            (a.marginBottom = parseInt(a.sidebar.css("margin-bottom"))),
              (a.paddingTop = parseInt(a.sidebar.css("padding-top"))),
              (a.paddingBottom = parseInt(a.sidebar.css("padding-bottom")));
            var r = a.stickySidebar.offset().top,
              d = a.stickySidebar.outerHeight();
            a.stickySidebar.css("padding-top", 1),
              a.stickySidebar.css("padding-bottom", 1),
              (r -= a.stickySidebar.offset().top),
              (d = a.stickySidebar.outerHeight() - d - r),
              0 == r
                ? (a.stickySidebar.css("padding-top", 0),
                  (a.stickySidebarPaddingTop = 0))
                : (a.stickySidebarPaddingTop = 1),
              0 == d
                ? (a.stickySidebar.css("padding-bottom", 0),
                  (a.stickySidebarPaddingBottom = 0))
                : (a.stickySidebarPaddingBottom = 1),
              (a.previousScrollTop = null),
              (a.fixedScrollTop = 0),
              e(),
              (a.onScroll = function (a) {
                if (a.stickySidebar.is(":visible")) {
                  if (i("body").width() < a.options.minWidth) return void e();
                  if (a.options.disableOnResponsiveLayouts) {
                    var s = a.sidebar.outerWidth(
                      "none" == a.sidebar.css("float")
                    );
                    if (s + 50 > a.container.width()) return void e();
                  }
                  var r = i(document).scrollTop(),
                    d = "static";
                  if (
                    r >=
                    a.sidebar.offset().top +
                      (a.paddingTop - a.options.additionalMarginTop)
                  ) {
                    var c,
                      p = a.paddingTop + t.additionalMarginTop,
                      b =
                        a.paddingBottom +
                        a.marginBottom +
                        t.additionalMarginBottom,
                      l = a.sidebar.offset().top,
                      f = a.sidebar.offset().top + o(a.container),
                      h = 0 + t.additionalMarginTop,
                      g =
                        a.stickySidebar.outerHeight() + p + b <
                        i(window).height();
                    c = g
                      ? h + a.stickySidebar.outerHeight()
                      : i(window).height() -
                        a.marginBottom -
                        a.paddingBottom -
                        t.additionalMarginBottom;
                    var u = l - r + a.paddingTop,
                      S = f - r - a.paddingBottom - a.marginBottom,
                      y = a.stickySidebar.offset().top - r,
                      m = a.previousScrollTop - r;
                    "fixed" == a.stickySidebar.css("position") &&
                      "modern" == a.options.sidebarBehavior &&
                      (y += m),
                      "stick-to-top" == a.options.sidebarBehavior &&
                        (y = t.additionalMarginTop),
                      "stick-to-bottom" == a.options.sidebarBehavior &&
                        (y = c - a.stickySidebar.outerHeight()),
                      (y =
                        m > 0
                          ? Math.min(y, h)
                          : Math.max(y, c - a.stickySidebar.outerHeight())),
                      (y = Math.max(y, u)),
                      (y = Math.min(y, S - a.stickySidebar.outerHeight()));
                    var k =
                      a.container.height() == a.stickySidebar.outerHeight();
                    d =
                      (k || y != h) &&
                      (k || y != c - a.stickySidebar.outerHeight())
                        ? r + y - a.sidebar.offset().top - a.paddingTop <=
                          t.additionalMarginTop
                          ? "static"
                          : "absolute"
                        : "fixed";
                  }
                  if ("fixed" == d) {
                    var v = i(document).scrollLeft();
                    a.stickySidebar.css({
                      position: "fixed",
                      width: n(a.stickySidebar) + "px",
                      transform: "translateY(" + y + "px)",
                      left:
                        a.sidebar.offset().left +
                        parseInt(a.sidebar.css("padding-left")) -
                        v +
                        "px",
                      top: "0px",
                    });
                  } else if ("absolute" == d) {
                    var x = {};
                    "absolute" != a.stickySidebar.css("position") &&
                      ((x.position = "absolute"),
                      (x.transform =
                        "translateY(" +
                        (r +
                          y -
                          a.sidebar.offset().top -
                          a.stickySidebarPaddingTop -
                          a.stickySidebarPaddingBottom) +
                        "px)"),
                      (x.top = "0px")),
                      (x.width = n(a.stickySidebar) + "px"),
                      (x.left = ""),
                      a.stickySidebar.css(x);
                  } else "static" == d && e();
                  "static" != d &&
                    1 == a.options.updateSidebarHeight &&
                    a.sidebar.css({
                      "min-height":
                        a.stickySidebar.outerHeight() +
                        a.stickySidebar.offset().top -
                        a.sidebar.offset().top +
                        a.paddingBottom,
                    }),
                    (a.previousScrollTop = r);
                }
              }),
              a.onScroll(a),
              i(document).on(
                "scroll." + a.options.namespace,
                (function (i) {
                  return function () {
                    i.onScroll(i);
                  };
                })(a)
              ),
              i(window).on(
                "resize." + a.options.namespace,
                (function (i) {
                  return function () {
                    i.stickySidebar.css({ position: "static" }), i.onScroll(i);
                  };
                })(a)
              ),
              "undefined" != typeof ResizeSensor &&
                new ResizeSensor(
                  a.stickySidebar[0],
                  (function (i) {
                    return function () {
                      i.onScroll(i);
                    };
                  })(a)
                );
          });
      }
      function n(i) {
        var t;
        try {
          t = i[0].getBoundingClientRect().width;
        } catch (i) {}
        return "undefined" == typeof t && (t = i.width()), t;
      }
      var s = {
        containerSelector: "",
        additionalMarginTop: 0,
        additionalMarginBottom: 0,
        updateSidebarHeight: !0,
        minWidth: 0,
        disableOnResponsiveLayouts: !0,
        sidebarBehavior: "modern",
        defaultPosition: "relative",
        namespace: "TSS",
      };
      return (
        (t = i.extend(s, t)),
        (t.additionalMarginTop = parseInt(t.additionalMarginTop) || 0),
        (t.additionalMarginBottom = parseInt(t.additionalMarginBottom) || 0),
        e(t, this),
        this
      );
    };
  })(jQuery);

/**
 * sweetalert2.min
 */
!(function (t, e) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = e())
    : "function" == typeof define && define.amd
    ? define(e)
    : ((t = t || self).Sweetalert2 = e());
})(this, function () {
  "use strict";
  function r(t) {
    return (r =
      "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t &&
              "function" == typeof Symbol &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          })(t);
  }
  function a(t, e) {
    if (!(t instanceof e))
      throw new TypeError("Cannot call a class as a function");
  }
  function o(t, e) {
    for (var n = 0; n < e.length; n++) {
      var o = e[n];
      (o.enumerable = o.enumerable || !1),
        (o.configurable = !0),
        "value" in o && (o.writable = !0),
        Object.defineProperty(t, o.key, o);
    }
  }
  function c(t, e, n) {
    return e && o(t.prototype, e), n && o(t, n), t;
  }
  function s() {
    return (s =
      Object.assign ||
      function (t) {
        for (var e = 1; e < arguments.length; e++) {
          var n = arguments[e];
          for (var o in n)
            Object.prototype.hasOwnProperty.call(n, o) && (t[o] = n[o]);
        }
        return t;
      }).apply(this, arguments);
  }
  function u(t) {
    return (u = Object.setPrototypeOf
      ? Object.getPrototypeOf
      : function (t) {
          return t.__proto__ || Object.getPrototypeOf(t);
        })(t);
  }
  function l(t, e) {
    return (l =
      Object.setPrototypeOf ||
      function (t, e) {
        return (t.__proto__ = e), t;
      })(t, e);
  }
  function d() {
    if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
    if (Reflect.construct.sham) return !1;
    if ("function" == typeof Proxy) return !0;
    try {
      return (
        Date.prototype.toString.call(
          Reflect.construct(Date, [], function () {})
        ),
        !0
      );
    } catch (t) {
      return !1;
    }
  }
  function i(t, e, n) {
    return (i = d()
      ? Reflect.construct
      : function (t, e, n) {
          var o = [null];
          o.push.apply(o, e);
          var i = new (Function.bind.apply(t, o))();
          return n && l(i, n.prototype), i;
        }).apply(null, arguments);
  }
  function p(t, e) {
    return !e || ("object" != typeof e && "function" != typeof e)
      ? (function (t) {
          if (void 0 === t)
            throw new ReferenceError(
              "this hasn't been initialised - super() hasn't been called"
            );
          return t;
        })(t)
      : e;
  }
  function f(t, e, n) {
    return (f =
      "undefined" != typeof Reflect && Reflect.get
        ? Reflect.get
        : function (t, e, n) {
            var o = (function (t, e) {
              for (
                ;
                !Object.prototype.hasOwnProperty.call(t, e) &&
                null !== (t = u(t));

              );
              return t;
            })(t, e);
            if (o) {
              var i = Object.getOwnPropertyDescriptor(o, e);
              return i.get ? i.get.call(n) : i.value;
            }
          })(t, e, n || t);
  }
  function m(e) {
    return Object.keys(e).map(function (t) {
      return e[t];
    });
  }
  function h(t) {
    return Array.prototype.slice.call(t);
  }
  function g(t, e) {
    var n;
    (n = '"'
      .concat(
        t,
        '" is deprecated and will be removed in the next major release. Please use "'
      )
      .concat(e, '" instead.')),
      -1 === _.indexOf(n) && (_.push(n), N(n));
  }
  function v(t) {
    return t && Promise.resolve(t) === t;
  }
  function b(t) {
    return t instanceof Element || ("object" === r((e = t)) && e.jquery);
    var e;
  }
  function t(t) {
    var e = {};
    for (var n in t) e[t[n]] = "swal2-" + t[n];
    return e;
  }
  function y(t) {
    var e = Y();
    return e ? e.querySelector(t) : null;
  }
  function e(t) {
    return y(".".concat(t));
  }
  function n() {
    var t = Z();
    return h(t.querySelectorAll(".".concat(W.icon)));
  }
  function w() {
    var t = n().filter(function (t) {
      return ht(t);
    });
    return t.length ? t[0] : null;
  }
  function C() {
    return e(W.title);
  }
  function k() {
    return e(W.content);
  }
  function x() {
    return e(W.image);
  }
  function P() {
    return e(W["progress-steps"]);
  }
  function A() {
    return e(W["validation-message"]);
  }
  function B() {
    return y(".".concat(W.actions, " .").concat(W.confirm));
  }
  function S() {
    return y(".".concat(W.actions, " .").concat(W.cancel));
  }
  function E() {
    return e(W.actions);
  }
  function O() {
    return e(W.header);
  }
  function T() {
    return e(W.footer);
  }
  function L() {
    return e(W["timer-progress-bar"]);
  }
  function q() {
    return e(W.close);
  }
  function I() {
    var t = h(
        Z().querySelectorAll(
          '[tabindex]:not([tabindex="-1"]):not([tabindex="0"])'
        )
      ).sort(function (t, e) {
        return (
          (t = parseInt(t.getAttribute("tabindex"))),
          (e = parseInt(e.getAttribute("tabindex"))) < t ? 1 : t < e ? -1 : 0
        );
      }),
      e = h(
        Z().querySelectorAll(
          '\n  a[href],\n  area[href],\n  input:not([disabled]),\n  select:not([disabled]),\n  textarea:not([disabled]),\n  button:not([disabled]),\n  iframe,\n  object,\n  embed,\n  [tabindex="0"],\n  [contenteditable],\n  audio[controls],\n  video[controls],\n  summary\n'
        )
      ).filter(function (t) {
        return "-1" !== t.getAttribute("tabindex");
      });
    return (function (t) {
      for (var e = [], n = 0; n < t.length; n++)
        -1 === e.indexOf(t[n]) && e.push(t[n]);
      return e;
    })(t.concat(e)).filter(function (t) {
      return ht(t);
    });
  }
  function j() {
    return !Q() && !document.body.classList.contains(W["no-backdrop"]);
  }
  function M() {
    return Z().hasAttribute("data-loading");
  }
  function V(e, t) {
    var n;
    (e.textContent = ""),
      t &&
        ((n = new DOMParser().parseFromString(t, "text/html")),
        h(n.querySelector("head").childNodes).forEach(function (t) {
          e.appendChild(t);
        }),
        h(n.querySelector("body").childNodes).forEach(function (t) {
          e.appendChild(t);
        }));
  }
  function R(t, e) {
    if (e) {
      for (var n = e.split(/\s+/), o = 0; o < n.length; o++)
        if (!t.classList.contains(n[o])) return;
      return 1;
    }
  }
  function H(t, e, n) {
    var o, i;
    if (
      ((i = e),
      h((o = t).classList).forEach(function (t) {
        -1 === m(W).indexOf(t) &&
          -1 === m(K).indexOf(t) &&
          -1 === m(i.showClass).indexOf(t) &&
          o.classList.remove(t);
      }),
      e.customClass && e.customClass[n])
    ) {
      if ("string" != typeof e.customClass[n] && !e.customClass[n].forEach)
        return N(
          "Invalid type of customClass."
            .concat(n, '! Expected string or iterable object, got "')
            .concat(r(e.customClass[n]), '"')
        );
      pt(t, e.customClass[n]);
    }
  }
  var D = "SweetAlert2:",
    N = function (t) {
      console.warn("".concat(D, " ").concat(t));
    },
    U = function (t) {
      console.error("".concat(D, " ").concat(t));
    },
    _ = [],
    F = function (t) {
      return "function" == typeof t ? t() : t;
    },
    z = Object.freeze({
      cancel: "cancel",
      backdrop: "backdrop",
      close: "close",
      esc: "esc",
      timer: "timer",
    }),
    W = t([
      "container",
      "shown",
      "height-auto",
      "iosfix",
      "popup",
      "modal",
      "no-backdrop",
      "no-transition",
      "toast",
      "toast-shown",
      "toast-column",
      "show",
      "hide",
      "close",
      "title",
      "header",
      "content",
      "html-container",
      "actions",
      "confirm",
      "cancel",
      "footer",
      "icon",
      "icon-content",
      "image",
      "input",
      "file",
      "range",
      "select",
      "radio",
      "checkbox",
      "label",
      "textarea",
      "inputerror",
      "validation-message",
      "progress-steps",
      "active-progress-step",
      "progress-step",
      "progress-step-line",
      "loading",
      "styled",
      "top",
      "top-start",
      "top-end",
      "top-left",
      "top-right",
      "center",
      "center-start",
      "center-end",
      "center-left",
      "center-right",
      "bottom",
      "bottom-start",
      "bottom-end",
      "bottom-left",
      "bottom-right",
      "grow-row",
      "grow-column",
      "grow-fullscreen",
      "rtl",
      "timer-progress-bar",
      "timer-progress-bar-container",
      "scrollbar-measure",
      "icon-success",
      "icon-warning",
      "icon-info",
      "icon-question",
      "icon-error",
    ]),
    K = t(["success", "warning", "info", "question", "error"]),
    Y = function () {
      return document.body.querySelector(".".concat(W.container));
    },
    Z = function () {
      return e(W.popup);
    },
    Q = function () {
      return document.body.classList.contains(W["toast-shown"]);
    },
    $ = { previousBodyPadding: null };
  function J(t, e) {
    if (!e) return null;
    switch (e) {
      case "select":
      case "textarea":
      case "file":
        return mt(t, W[e]);
      case "checkbox":
        return t.querySelector(".".concat(W.checkbox, " input"));
      case "radio":
        return (
          t.querySelector(".".concat(W.radio, " input:checked")) ||
          t.querySelector(".".concat(W.radio, " input:first-child"))
        );
      case "range":
        return t.querySelector(".".concat(W.range, " input"));
      default:
        return mt(t, W.input);
    }
  }
  function X(t) {
    var e;
    t.focus(),
      "file" !== t.type && ((e = t.value), (t.value = ""), (t.value = e));
  }
  function G(t, e, n) {
    t &&
      e &&
      ("string" == typeof e && (e = e.split(/\s+/).filter(Boolean)),
      e.forEach(function (e) {
        t.forEach
          ? t.forEach(function (t) {
              n ? t.classList.add(e) : t.classList.remove(e);
            })
          : n
          ? t.classList.add(e)
          : t.classList.remove(e);
      }));
  }
  function tt(t, e, n) {
    n || 0 === parseInt(n)
      ? (t.style[e] = "number" == typeof n ? "".concat(n, "px") : n)
      : t.style.removeProperty(e);
  }
  function et(t, e) {
    var n = 1 < arguments.length && void 0 !== e ? e : "flex";
    (t.style.opacity = ""), (t.style.display = n);
  }
  function nt(t) {
    (t.style.opacity = ""), (t.style.display = "none");
  }
  function ot(t, e, n) {
    e ? et(t, n) : nt(t);
  }
  function it(t) {
    return !!(t.scrollHeight > t.clientHeight);
  }
  function rt(t) {
    var e = window.getComputedStyle(t),
      n = parseFloat(e.getPropertyValue("animation-duration") || "0"),
      o = parseFloat(e.getPropertyValue("transition-duration") || "0");
    return 0 < n || 0 < o;
  }
  function at(t, e) {
    var n = 1 < arguments.length && void 0 !== e && e,
      o = L();
    ht(o) &&
      (n && ((o.style.transition = "none"), (o.style.width = "100%")),
      setTimeout(function () {
        (o.style.transition = "width ".concat(t / 1e3, "s linear")),
          (o.style.width = "0%");
      }, 10));
  }
  function ct() {
    return "undefined" == typeof window || "undefined" == typeof document;
  }
  function st(t) {
    rn.isVisible() && dt !== t.target.value && rn.resetValidationMessage(),
      (dt = t.target.value);
  }
  function ut(t, e) {
    t instanceof HTMLElement
      ? e.appendChild(t)
      : "object" === r(t)
      ? bt(t, e)
      : t && V(e, t);
  }
  function lt(t, e) {
    var n = E(),
      o = B(),
      i = S();
    e.showConfirmButton || e.showCancelButton || nt(n),
      H(n, e, "actions"),
      Ct(o, "confirm", e),
      Ct(i, "cancel", e),
      e.buttonsStyling
        ? (function (t, e, n) {
            pt([t, e], W.styled),
              n.confirmButtonColor &&
                (t.style.backgroundColor = n.confirmButtonColor);
            n.cancelButtonColor &&
              (e.style.backgroundColor = n.cancelButtonColor);
            {
              var o;
              M() ||
                ((o = window
                  .getComputedStyle(t)
                  .getPropertyValue("background-color")),
                (t.style.borderLeftColor = o),
                (t.style.borderRightColor = o));
            }
          })(o, i, e)
        : (ft([o, i], W.styled),
          (o.style.backgroundColor =
            o.style.borderLeftColor =
            o.style.borderRightColor =
              ""),
          (i.style.backgroundColor =
            i.style.borderLeftColor =
            i.style.borderRightColor =
              "")),
      e.reverseButtons && o.parentNode.insertBefore(i, o);
  }
  var dt,
    pt = function (t, e) {
      G(t, e, !0);
    },
    ft = function (t, e) {
      G(t, e, !1);
    },
    mt = function (t, e) {
      for (var n = 0; n < t.childNodes.length; n++)
        if (R(t.childNodes[n], e)) return t.childNodes[n];
    },
    ht = function (t) {
      return !(
        !t || !(t.offsetWidth || t.offsetHeight || t.getClientRects().length)
      );
    },
    gt = '\n <div aria-labelledby="'
      .concat(W.title, '" aria-describedby="')
      .concat(W.content, '" class="')
      .concat(W.popup, '" tabindex="-1">\n   <div class="')
      .concat(W.header, '">\n     <ul class="')
      .concat(W["progress-steps"], '"></ul>\n     <div class="')
      .concat(W.icon, " ")
      .concat(K.error, '"></div>\n     <div class="')
      .concat(W.icon, " ")
      .concat(K.question, '"></div>\n     <div class="')
      .concat(W.icon, " ")
      .concat(K.warning, '"></div>\n     <div class="')
      .concat(W.icon, " ")
      .concat(K.info, '"></div>\n     <div class="')
      .concat(W.icon, " ")
      .concat(K.success, '"></div>\n     <img class="')
      .concat(W.image, '" />\n     <h2 class="')
      .concat(W.title, '" id="')
      .concat(W.title, '"></h2>\n     <button type="button" class="')
      .concat(W.close, '"></button>\n   </div>\n   <div class="')
      .concat(W.content, '">\n     <div id="')
      .concat(W.content, '" class="')
      .concat(W["html-container"], '"></div>\n     <input class="')
      .concat(W.input, '" />\n     <input type="file" class="')
      .concat(W.file, '" />\n     <div class="')
      .concat(
        W.range,
        '">\n       <input type="range" />\n       <output></output>\n     </div>\n     <select class="'
      )
      .concat(W.select, '"></select>\n     <div class="')
      .concat(W.radio, '"></div>\n     <label for="')
      .concat(W.checkbox, '" class="')
      .concat(
        W.checkbox,
        '">\n       <input type="checkbox" />\n       <span class="'
      )
      .concat(W.label, '"></span>\n     </label>\n     <textarea class="')
      .concat(W.textarea, '"></textarea>\n     <div class="')
      .concat(W["validation-message"], '" id="')
      .concat(W["validation-message"], '"></div>\n   </div>\n   <div class="')
      .concat(W.actions, '">\n     <button type="button" class="')
      .concat(W.confirm, '">OK</button>\n     <button type="button" class="')
      .concat(W.cancel, '">Cancel</button>\n   </div>\n   <div class="')
      .concat(W.footer, '"></div>\n   <div class="')
      .concat(W["timer-progress-bar-container"], '">\n     <div class="')
      .concat(W["timer-progress-bar"], '"></div>\n   </div>\n </div>\n')
      .replace(/(^|\n)\s*/g, ""),
    vt = function (t) {
      var e,
        n,
        o,
        i,
        r,
        a,
        c,
        s,
        u,
        l,
        d,
        p,
        f,
        m,
        h,
        g =
          !!(e = Y()) &&
          (e.parentNode.removeChild(e),
          ft(
            [document.documentElement, document.body],
            [W["no-backdrop"], W["toast-shown"], W["has-column"]]
          ),
          !0);
      ct()
        ? U("SweetAlert2 requires document to initialize")
        : (((n = document.createElement("div")).className = W.container),
          g && pt(n, W["no-transition"]),
          V(n, gt),
          (o =
            "string" == typeof (i = t.target)
              ? document.querySelector(i)
              : i).appendChild(n),
          (r = t),
          (a = Z()).setAttribute("role", r.toast ? "alert" : "dialog"),
          a.setAttribute("aria-live", r.toast ? "polite" : "assertive"),
          r.toast || a.setAttribute("aria-modal", "true"),
          (c = o),
          "rtl" === window.getComputedStyle(c).direction && pt(Y(), W.rtl),
          (s = k()),
          (u = mt(s, W.input)),
          (l = mt(s, W.file)),
          (d = s.querySelector(".".concat(W.range, " input"))),
          (p = s.querySelector(".".concat(W.range, " output"))),
          (f = mt(s, W.select)),
          (m = s.querySelector(".".concat(W.checkbox, " input"))),
          (h = mt(s, W.textarea)),
          (u.oninput = st),
          (l.onchange = st),
          (f.onchange = st),
          (m.onchange = st),
          (h.oninput = st),
          (d.oninput = function (t) {
            st(t), (p.value = d.value);
          }),
          (d.onchange = function (t) {
            st(t), (d.nextSibling.value = d.value);
          }));
    },
    bt = function (t, e) {
      t.jquery ? yt(e, t) : V(e, t.toString());
    },
    yt = function (t, e) {
      if (((t.textContent = ""), 0 in e))
        for (var n = 0; n in e; n++) t.appendChild(e[n].cloneNode(!0));
      else t.appendChild(e.cloneNode(!0));
    },
    wt = (function () {
      if (ct()) return !1;
      var t = document.createElement("div"),
        e = {
          WebkitAnimation: "webkitAnimationEnd",
          OAnimation: "oAnimationEnd oanimationend",
          animation: "animationend",
        };
      for (var n in e)
        if (Object.prototype.hasOwnProperty.call(e, n) && void 0 !== t.style[n])
          return e[n];
      return !1;
    })();
  function Ct(t, e, n) {
    var o;
    ot(
      t,
      n["show".concat((o = e).charAt(0).toUpperCase() + o.slice(1), "Button")],
      "inline-block"
    ),
      V(t, n["".concat(e, "ButtonText")]),
      t.setAttribute("aria-label", n["".concat(e, "ButtonAriaLabel")]),
      (t.className = W[e]),
      H(t, n, "".concat(e, "Button")),
      pt(t, n["".concat(e, "ButtonClass")]);
  }
  function kt(t, e) {
    var n,
      o,
      i,
      r,
      a,
      c,
      s,
      u,
      l = Y();
    l &&
      ((n = l),
      "string" == typeof (o = e.backdrop)
        ? (n.style.background = o)
        : o || pt([document.documentElement, document.body], W["no-backdrop"]),
      !e.backdrop &&
        e.allowOutsideClick &&
        N(
          '"allowOutsideClick" parameter requires `backdrop` parameter to be set to `true`'
        ),
      (i = l),
      (r = e.position) in W
        ? pt(i, W[r])
        : (N('The "position" parameter is not valid, defaulting to "center"'),
          pt(i, W.center)),
      (a = l),
      !(c = e.grow) ||
        "string" != typeof c ||
        ((s = "grow-".concat(c)) in W && pt(a, W[s])),
      H(l, e, "container"),
      (u = document.body.getAttribute("data-swal2-queue-step")) &&
        (l.setAttribute("data-queue-step", u),
        document.body.removeAttribute("data-swal2-queue-step")));
  }
  function xt(t, e) {
    (t.placeholder && !e.inputPlaceholder) ||
      (t.placeholder = e.inputPlaceholder);
  }
  var Pt = {
      promise: new WeakMap(),
      innerParams: new WeakMap(),
      domCache: new WeakMap(),
    },
    At = ["input", "file", "range", "select", "radio", "checkbox", "textarea"],
    Bt = function (t) {
      if (!Tt[t.input])
        return U(
          'Unexpected type of input! Expected "text", "email", "password", "number", "tel", "select", "radio", "checkbox", "textarea", "file" or "url", got "'.concat(
            t.input,
            '"'
          )
        );
      var e = Ot(t.input),
        n = Tt[t.input](e, t);
      et(n),
        setTimeout(function () {
          X(n);
        });
    },
    St = function (t, e) {
      var n = J(k(), t);
      if (n)
        for (var o in (!(function (t) {
          for (var e = 0; e < t.attributes.length; e++) {
            var n = t.attributes[e].name;
            -1 === ["type", "value", "style"].indexOf(n) &&
              t.removeAttribute(n);
          }
        })(n),
        e))
          ("range" === t && "placeholder" === o) || n.setAttribute(o, e[o]);
    },
    Et = function (t) {
      var e = Ot(t.input);
      t.customClass && pt(e, t.customClass.input);
    },
    Ot = function (t) {
      var e = W[t] ? W[t] : W.input;
      return mt(k(), e);
    },
    Tt = {};
  (Tt.text =
    Tt.email =
    Tt.password =
    Tt.number =
    Tt.tel =
    Tt.url =
      function (t, e) {
        return (
          "string" == typeof e.inputValue || "number" == typeof e.inputValue
            ? (t.value = e.inputValue)
            : v(e.inputValue) ||
              N(
                'Unexpected type of inputValue! Expected "string", "number" or "Promise", got "'.concat(
                  r(e.inputValue),
                  '"'
                )
              ),
          xt(t, e),
          (t.type = e.input),
          t
        );
      }),
    (Tt.file = function (t, e) {
      return xt(t, e), t;
    }),
    (Tt.range = function (t, e) {
      var n = t.querySelector("input"),
        o = t.querySelector("output");
      return (
        (n.value = e.inputValue),
        (n.type = e.input),
        (o.value = e.inputValue),
        t
      );
    }),
    (Tt.select = function (t, e) {
      var n;
      return (
        (t.textContent = ""),
        e.inputPlaceholder &&
          ((n = document.createElement("option")),
          V(n, e.inputPlaceholder),
          (n.value = ""),
          (n.disabled = !0),
          (n.selected = !0),
          t.appendChild(n)),
        t
      );
    }),
    (Tt.radio = function (t) {
      return (t.textContent = ""), t;
    }),
    (Tt.checkbox = function (t, e) {
      var n = J(k(), "checkbox");
      (n.value = 1), (n.id = W.checkbox), (n.checked = Boolean(e.inputValue));
      var o = t.querySelector("span");
      return V(o, e.inputPlaceholder), t;
    }),
    (Tt.textarea = function (e, t) {
      var n, o;
      return (
        (e.value = t.inputValue),
        xt(e, t),
        "MutationObserver" in window &&
          ((n = parseInt(window.getComputedStyle(Z()).width)),
          (o =
            parseInt(window.getComputedStyle(Z()).paddingLeft) +
            parseInt(window.getComputedStyle(Z()).paddingRight)),
          new MutationObserver(function () {
            var t = e.offsetWidth + o;
            Z().style.width = n < t ? "".concat(t, "px") : null;
          }).observe(e, { attributes: !0, attributeFilter: ["style"] })),
        e
      );
    });
  function Lt(t, e) {
    var n,
      o,
      i,
      r,
      a,
      c = k().querySelector("#".concat(W.content));
    e.html
      ? (ut(e.html, c), et(c, "block"))
      : e.text
      ? ((c.textContent = e.text), et(c, "block"))
      : nt(c),
      (n = t),
      (o = e),
      (i = k()),
      (r = Pt.innerParams.get(n)),
      (a = !r || o.input !== r.input),
      At.forEach(function (t) {
        var e = W[t],
          n = mt(i, e);
        St(t, o.inputAttributes), (n.className = e), a && nt(n);
      }),
      o.input && (a && Bt(o), Et(o)),
      H(k(), e, "content");
  }
  function qt() {
    return Y() && Y().getAttribute("data-queue-step");
  }
  function It(t, s) {
    var u = P();
    if (!s.progressSteps || 0 === s.progressSteps.length) return nt(u), 0;
    et(u), (u.textContent = "");
    var l = parseInt(
      void 0 === s.currentProgressStep ? qt() : s.currentProgressStep
    );
    l >= s.progressSteps.length &&
      N(
        "Invalid currentProgressStep parameter, it should be less than progressSteps.length (currentProgressStep like JS arrays starts from 0)"
      ),
      s.progressSteps.forEach(function (t, e) {
        var n,
          o,
          i,
          r,
          a,
          c =
            ((n = t),
            (o = document.createElement("li")),
            pt(o, W["progress-step"]),
            V(o, n),
            o);
        u.appendChild(c),
          e === l && pt(c, W["active-progress-step"]),
          e !== s.progressSteps.length - 1 &&
            ((r = t),
            (a = document.createElement("li")),
            pt(a, W["progress-step-line"]),
            r.progressStepsDistance &&
              (a.style.width = r.progressStepsDistance),
            (i = a),
            u.appendChild(i));
      });
  }
  function jt(t, e) {
    var n,
      o,
      i,
      r,
      a,
      c,
      s,
      u,
      l = O();
    H(l, e, "header"),
      It(0, e),
      (n = t),
      (o = e),
      (r = Pt.innerParams.get(n)) && o.icon === r.icon && w()
        ? H(w(), o, "icon")
        : (Rt(),
          o.icon &&
            (-1 !== Object.keys(K).indexOf(o.icon)
              ? ((i = y(".".concat(W.icon, ".").concat(K[o.icon]))),
                et(i),
                Dt(i, o),
                Ht(),
                H(i, o, "icon"),
                pt(i, o.showClass.icon))
              : U(
                  'Unknown icon! Expected "success", "error", "warning", "info" or "question", got "'.concat(
                    o.icon,
                    '"'
                  )
                ))),
      (function (t) {
        var e = x();
        if (!t.imageUrl) return nt(e);
        et(e, ""),
          e.setAttribute("src", t.imageUrl),
          e.setAttribute("alt", t.imageAlt),
          tt(e, "width", t.imageWidth),
          tt(e, "height", t.imageHeight),
          (e.className = W.image),
          H(e, t, "image");
      })(e),
      (a = e),
      (c = C()),
      ot(c, a.title || a.titleText),
      a.title && ut(a.title, c),
      a.titleText && (c.innerText = a.titleText),
      H(c, a, "title"),
      (s = e),
      (u = q()),
      V(u, s.closeButtonHtml),
      H(u, s, "closeButton"),
      ot(u, s.showCloseButton),
      u.setAttribute("aria-label", s.closeButtonAriaLabel);
  }
  function Mt(t, e) {
    var n, o, i, r;
    (n = e),
      (o = Z()),
      tt(o, "width", n.width),
      tt(o, "padding", n.padding),
      n.background && (o.style.background = n.background),
      _t(o, n),
      kt(0, e),
      jt(t, e),
      Lt(t, e),
      lt(0, e),
      (i = e),
      (r = T()),
      ot(r, i.footer),
      i.footer && ut(i.footer, r),
      H(r, i, "footer"),
      "function" == typeof e.onRender && e.onRender(Z());
  }
  function Vt() {
    return B() && B().click();
  }
  var Rt = function () {
      for (var t = n(), e = 0; e < t.length; e++) nt(t[e]);
    },
    Ht = function () {
      for (
        var t = Z(),
          e = window.getComputedStyle(t).getPropertyValue("background-color"),
          n = t.querySelectorAll(
            "[class^=swal2-success-circular-line], .swal2-success-fix"
          ),
          o = 0;
        o < n.length;
        o++
      )
        n[o].style.backgroundColor = e;
    },
    Dt = function (t, e) {
      (t.textContent = ""),
        e.iconHtml
          ? V(t, Nt(e.iconHtml))
          : "success" === e.icon
          ? V(
              t,
              '\n      <div class="swal2-success-circular-line-left"></div>\n      <span class="swal2-success-line-tip"></span> <span class="swal2-success-line-long"></span>\n      <div class="swal2-success-ring"></div> <div class="swal2-success-fix"></div>\n      <div class="swal2-success-circular-line-right"></div>\n    '
            )
          : "error" === e.icon
          ? V(
              t,
              '\n      <span class="swal2-x-mark">\n        <span class="swal2-x-mark-line-left"></span>\n        <span class="swal2-x-mark-line-right"></span>\n      </span>\n    '
            )
          : V(t, Nt({ question: "?", warning: "!", info: "i" }[e.icon]));
    },
    Nt = function (t) {
      return '<div class="'.concat(W["icon-content"], '">').concat(t, "</div>");
    },
    Ut = [],
    _t = function (t, e) {
      (t.className = ""
        .concat(W.popup, " ")
        .concat(ht(t) ? e.showClass.popup : "")),
        e.toast
          ? (pt([document.documentElement, document.body], W["toast-shown"]),
            pt(t, W.toast))
          : pt(t, W.modal),
        H(t, e, "popup"),
        "string" == typeof e.customClass && pt(t, e.customClass),
        e.icon && pt(t, W["icon-".concat(e.icon)]);
    };
  function Ft() {
    var t = Z();
    t || rn.fire(), (t = Z());
    var e = E(),
      n = B();
    et(e),
      et(n, "inline-block"),
      pt([t, e], W.loading),
      (n.disabled = !0),
      t.setAttribute("data-loading", !0),
      t.setAttribute("aria-busy", !0),
      t.focus();
  }
  function zt() {
    return new Promise(function (t) {
      var e = window.scrollX,
        n = window.scrollY;
      ($t.restoreFocusTimeout = setTimeout(function () {
        $t.previousActiveElement && $t.previousActiveElement.focus
          ? ($t.previousActiveElement.focus(),
            ($t.previousActiveElement = null))
          : document.body && document.body.focus(),
          t();
      }, 100)),
        void 0 !== e && void 0 !== n && window.scrollTo(e, n);
    });
  }
  function Wt() {
    if ($t.timeout)
      return (
        (function () {
          var t = L(),
            e = parseInt(window.getComputedStyle(t).width);
          t.style.removeProperty("transition"), (t.style.width = "100%");
          var n = parseInt(window.getComputedStyle(t).width),
            o = parseInt((e / n) * 100);
          t.style.removeProperty("transition"),
            (t.style.width = "".concat(o, "%"));
        })(),
        $t.timeout.stop()
      );
  }
  function Kt() {
    if ($t.timeout) {
      var t = $t.timeout.start();
      return at(t), t;
    }
  }
  function Yt(t) {
    return Object.prototype.hasOwnProperty.call(Jt, t);
  }
  function Zt(t) {
    return Gt[t];
  }
  function Qt(t) {
    for (var e in t)
      Yt((i = e)) || N('Unknown parameter "'.concat(i, '"')),
        t.toast &&
          ((o = e),
          -1 !== te.indexOf(o) &&
            N('The parameter "'.concat(o, '" is incompatible with toasts'))),
        Zt((n = e)) && g(n, Zt(n));
    var n, o, i;
  }
  var $t = {},
    Jt = {
      title: "",
      titleText: "",
      text: "",
      html: "",
      footer: "",
      icon: void 0,
      iconHtml: void 0,
      toast: !1,
      animation: !0,
      showClass: {
        popup: "swal2-show",
        backdrop: "swal2-backdrop-show",
        icon: "swal2-icon-show",
      },
      hideClass: {
        popup: "swal2-hide",
        backdrop: "swal2-backdrop-hide",
        icon: "swal2-icon-hide",
      },
      customClass: void 0,
      target: "body",
      backdrop: !0,
      heightAuto: !0,
      allowOutsideClick: !0,
      allowEscapeKey: !0,
      allowEnterKey: !0,
      stopKeydownPropagation: !0,
      keydownListenerCapture: !1,
      showConfirmButton: !0,
      showCancelButton: !1,
      preConfirm: void 0,
      confirmButtonText: "OK",
      confirmButtonAriaLabel: "",
      confirmButtonColor: void 0,
      cancelButtonText: "Cancel",
      cancelButtonAriaLabel: "",
      cancelButtonColor: void 0,
      buttonsStyling: !0,
      reverseButtons: !1,
      focusConfirm: !0,
      focusCancel: !1,
      showCloseButton: !1,
      closeButtonHtml: "&times;",
      closeButtonAriaLabel: "Close this dialog",
      showLoaderOnConfirm: !1,
      imageUrl: void 0,
      imageWidth: void 0,
      imageHeight: void 0,
      imageAlt: "",
      timer: void 0,
      timerProgressBar: !1,
      width: void 0,
      padding: void 0,
      background: void 0,
      input: void 0,
      inputPlaceholder: "",
      inputValue: "",
      inputOptions: {},
      inputAutoTrim: !0,
      inputAttributes: {},
      inputValidator: void 0,
      validationMessage: void 0,
      grow: !1,
      position: "center",
      progressSteps: [],
      currentProgressStep: void 0,
      progressStepsDistance: void 0,
      onBeforeOpen: void 0,
      onOpen: void 0,
      onRender: void 0,
      onClose: void 0,
      onAfterClose: void 0,
      onDestroy: void 0,
      scrollbarPadding: !0,
    },
    Xt = [
      "title",
      "titleText",
      "text",
      "html",
      "footer",
      "icon",
      "hideClass",
      "customClass",
      "allowOutsideClick",
      "allowEscapeKey",
      "showConfirmButton",
      "showCancelButton",
      "confirmButtonText",
      "confirmButtonAriaLabel",
      "confirmButtonColor",
      "cancelButtonText",
      "cancelButtonAriaLabel",
      "cancelButtonColor",
      "buttonsStyling",
      "reverseButtons",
      "imageUrl",
      "imageWidth",
      "imageHeight",
      "imageAlt",
      "progressSteps",
      "currentProgressStep",
      "onClose",
      "onAfterClose",
      "onDestroy",
    ],
    Gt = { animation: 'showClass" and "hideClass' },
    te = [
      "allowOutsideClick",
      "allowEnterKey",
      "backdrop",
      "focusConfirm",
      "focusCancel",
      "heightAuto",
      "keydownListenerCapture",
    ],
    ee = Object.freeze({
      isValidParameter: Yt,
      isUpdatableParameter: function (t) {
        return -1 !== Xt.indexOf(t);
      },
      isDeprecatedParameter: Zt,
      argsToParams: function (o) {
        var i = {};
        return (
          "object" !== r(o[0]) || b(o[0])
            ? ["title", "html", "icon"].forEach(function (t, e) {
                var n = o[e];
                "string" == typeof n || b(n)
                  ? (i[t] = n)
                  : void 0 !== n &&
                    U(
                      "Unexpected type of "
                        .concat(t, '! Expected "string" or "Element", got ')
                        .concat(r(n))
                    );
              })
            : s(i, o[0]),
          i
        );
      },
      isVisible: function () {
        return ht(Z());
      },
      clickConfirm: Vt,
      clickCancel: function () {
        return S() && S().click();
      },
      getContainer: Y,
      getPopup: Z,
      getTitle: C,
      getContent: k,
      getHtmlContainer: function () {
        return e(W["html-container"]);
      },
      getImage: x,
      getIcon: w,
      getIcons: n,
      getCloseButton: q,
      getActions: E,
      getConfirmButton: B,
      getCancelButton: S,
      getHeader: O,
      getFooter: T,
      getTimerProgressBar: L,
      getFocusableElements: I,
      getValidationMessage: A,
      isLoading: M,
      fire: function () {
        for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++)
          e[n] = arguments[n];
        return i(this, e);
      },
      mixin: function (r) {
        return (function (t) {
          !(function (t, e) {
            if ("function" != typeof e && null !== e)
              throw new TypeError(
                "Super expression must either be null or a function"
              );
            (t.prototype = Object.create(e && e.prototype, {
              constructor: { value: t, writable: !0, configurable: !0 },
            })),
              e && l(t, e);
          })(i, t);
          var n,
            o,
            e =
              ((n = i),
              (o = d()),
              function () {
                var t,
                  e = u(n);
                return p(
                  this,
                  o
                    ? ((t = u(this).constructor),
                      Reflect.construct(e, arguments, t))
                    : e.apply(this, arguments)
                );
              });
          function i() {
            return a(this, i), e.apply(this, arguments);
          }
          return (
            c(i, [
              {
                key: "_main",
                value: function (t) {
                  return f(u(i.prototype), "_main", this).call(
                    this,
                    s({}, r, t)
                  );
                },
              },
            ]),
            i
          );
        })(this);
      },
      queue: function (t) {
        var r = this;
        Ut = t;
        function a(t, e) {
          (Ut = []), t(e);
        }
        var c = [];
        return new Promise(function (i) {
          !(function e(n, o) {
            n < Ut.length
              ? (document.body.setAttribute("data-swal2-queue-step", n),
                r.fire(Ut[n]).then(function (t) {
                  void 0 !== t.value
                    ? (c.push(t.value), e(n + 1, o))
                    : a(i, { dismiss: t.dismiss });
                }))
              : a(i, { value: c });
          })(0);
        });
      },
      getQueueStep: qt,
      insertQueueStep: function (t, e) {
        return e && e < Ut.length ? Ut.splice(e, 0, t) : Ut.push(t);
      },
      deleteQueueStep: function (t) {
        void 0 !== Ut[t] && Ut.splice(t, 1);
      },
      showLoading: Ft,
      enableLoading: Ft,
      getTimerLeft: function () {
        return $t.timeout && $t.timeout.getTimerLeft();
      },
      stopTimer: Wt,
      resumeTimer: Kt,
      toggleTimer: function () {
        var t = $t.timeout;
        return t && (t.running ? Wt : Kt)();
      },
      increaseTimer: function (t) {
        if ($t.timeout) {
          var e = $t.timeout.increase(t);
          return at(e, !0), e;
        }
      },
      isTimerRunning: function () {
        return $t.timeout && $t.timeout.isRunning();
      },
    });
  function ne() {
    var t,
      e = Pt.innerParams.get(this);
    e &&
      ((t = Pt.domCache.get(this)),
      e.showConfirmButton ||
        (nt(t.confirmButton), e.showCancelButton || nt(t.actions)),
      ft([t.popup, t.actions], W.loading),
      t.popup.removeAttribute("aria-busy"),
      t.popup.removeAttribute("data-loading"),
      (t.confirmButton.disabled = !1),
      (t.cancelButton.disabled = !1));
  }
  function oe() {
    null === $.previousBodyPadding &&
      document.body.scrollHeight > window.innerHeight &&
      (($.previousBodyPadding = parseInt(
        window.getComputedStyle(document.body).getPropertyValue("padding-right")
      )),
      (document.body.style.paddingRight = "".concat(
        $.previousBodyPadding +
          (function () {
            var t = document.createElement("div");
            (t.className = W["scrollbar-measure"]),
              document.body.appendChild(t);
            var e = t.getBoundingClientRect().width - t.clientWidth;
            return document.body.removeChild(t), e;
          })(),
        "px"
      )));
  }
  function ie() {
    return !!window.MSInputMethodContext && !!document.documentMode;
  }
  function re() {
    var t = Y(),
      e = Z();
    t.style.removeProperty("align-items"),
      e.offsetTop < 0 && (t.style.alignItems = "flex-start");
  }
  var ae = function () {
      var e,
        t = Y();
      (t.ontouchstart = function (t) {
        e = ce(t.target);
      }),
        (t.ontouchmove = function (t) {
          e && (t.preventDefault(), t.stopPropagation());
        });
    },
    ce = function (t) {
      var e = Y();
      return (
        t === e ||
        !(it(e) || "INPUT" === t.tagName || (it(k()) && k().contains(t)))
      );
    },
    se = { swalPromiseResolve: new WeakMap() };
  function ue(t, e, n, o) {
    var i;
    n
      ? pe(t, o)
      : (zt().then(function () {
          return pe(t, o);
        }),
        $t.keydownTarget.removeEventListener("keydown", $t.keydownHandler, {
          capture: $t.keydownListenerCapture,
        }),
        ($t.keydownHandlerAdded = !1)),
      e.parentNode &&
        !document.body.getAttribute("data-swal2-queue-step") &&
        e.parentNode.removeChild(e),
      j() &&
        (null !== $.previousBodyPadding &&
          ((document.body.style.paddingRight = "".concat(
            $.previousBodyPadding,
            "px"
          )),
          ($.previousBodyPadding = null)),
        R(document.body, W.iosfix) &&
          ((i = parseInt(document.body.style.top, 10)),
          ft(document.body, W.iosfix),
          (document.body.style.top = ""),
          (document.body.scrollTop = -1 * i)),
        "undefined" != typeof window &&
          ie() &&
          window.removeEventListener("resize", re),
        h(document.body.children).forEach(function (t) {
          t.hasAttribute("data-previous-aria-hidden")
            ? (t.setAttribute(
                "aria-hidden",
                t.getAttribute("data-previous-aria-hidden")
              ),
              t.removeAttribute("data-previous-aria-hidden"))
            : t.removeAttribute("aria-hidden");
        })),
      ft(
        [document.documentElement, document.body],
        [
          W.shown,
          W["height-auto"],
          W["no-backdrop"],
          W["toast-shown"],
          W["toast-column"],
        ]
      );
  }
  function le(t) {
    var e,
      n,
      o,
      i = Z();
    i &&
      (e = Pt.innerParams.get(this)) &&
      !R(i, e.hideClass.popup) &&
      ((n = se.swalPromiseResolve.get(this)),
      ft(i, e.showClass.popup),
      pt(i, e.hideClass.popup),
      (o = Y()),
      ft(o, e.showClass.backdrop),
      pt(o, e.hideClass.backdrop),
      (function (t, e, n) {
        var o = Y(),
          i = wt && rt(e),
          r = n.onClose,
          a = n.onAfterClose;
        if (r !== null && typeof r === "function") {
          r(e);
        }
        if (i) {
          de(t, e, o, a);
        } else {
          ue(t, o, Q(), a);
        }
      })(this, i, e),
      void 0 !== t
        ? ((t.isDismissed = void 0 !== t.dismiss),
          (t.isConfirmed = void 0 === t.dismiss))
        : (t = { isDismissed: !0, isConfirmed: !1 }),
      n(t || {}));
  }
  var de = function (t, e, n, o) {
      ($t.swalCloseEventFinishedCallback = ue.bind(null, t, n, Q(), o)),
        e.addEventListener(wt, function (t) {
          t.target === e &&
            ($t.swalCloseEventFinishedCallback(),
            delete $t.swalCloseEventFinishedCallback);
        });
    },
    pe = function (t, e) {
      setTimeout(function () {
        "function" == typeof e && e(), t._destroy();
      });
    };
  function fe(t, e, n) {
    var o = Pt.domCache.get(t);
    e.forEach(function (t) {
      o[t].disabled = n;
    });
  }
  function me(t, e) {
    if (!t) return !1;
    if ("radio" === t.type)
      for (
        var n = t.parentNode.parentNode.querySelectorAll("input"), o = 0;
        o < n.length;
        o++
      )
        n[o].disabled = e;
    else t.disabled = e;
  }
  var he = (function () {
      function n(t, e) {
        a(this, n),
          (this.callback = t),
          (this.remaining = e),
          (this.running = !1),
          this.start();
      }
      return (
        c(n, [
          {
            key: "start",
            value: function () {
              return (
                this.running ||
                  ((this.running = !0),
                  (this.started = new Date()),
                  (this.id = setTimeout(this.callback, this.remaining))),
                this.remaining
              );
            },
          },
          {
            key: "stop",
            value: function () {
              return (
                this.running &&
                  ((this.running = !1),
                  clearTimeout(this.id),
                  (this.remaining -= new Date() - this.started)),
                this.remaining
              );
            },
          },
          {
            key: "increase",
            value: function (t) {
              var e = this.running;
              return (
                e && this.stop(),
                (this.remaining += t),
                e && this.start(),
                this.remaining
              );
            },
          },
          {
            key: "getTimerLeft",
            value: function () {
              return (
                this.running && (this.stop(), this.start()), this.remaining
              );
            },
          },
          {
            key: "isRunning",
            value: function () {
              return this.running;
            },
          },
        ]),
        n
      );
    })(),
    ge = {
      email: function (t, e) {
        return /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9-]{2,24}$/.test(t)
          ? Promise.resolve()
          : Promise.resolve(e || "Invalid email address");
      },
      url: function (t, e) {
        return /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,63}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)$/.test(
          t
        )
          ? Promise.resolve()
          : Promise.resolve(e || "Invalid URL");
      },
    };
  function ve(t) {
    var e, n;
    (e = t).inputValidator ||
      Object.keys(ge).forEach(function (t) {
        e.input === t && (e.inputValidator = ge[t]);
      }),
      t.showLoaderOnConfirm &&
        !t.preConfirm &&
        N(
          "showLoaderOnConfirm is set to true, but preConfirm is not defined.\nshowLoaderOnConfirm should be used together with preConfirm, see usage example:\nhttps://sweetalert2.github.io/#ajax-request"
        ),
      (t.animation = F(t.animation)),
      ((n = t).target &&
        ("string" != typeof n.target || document.querySelector(n.target)) &&
        ("string" == typeof n.target || n.target.appendChild)) ||
        (N('Target parameter is not valid, defaulting to "body"'),
        (n.target = "body")),
      "string" == typeof t.title &&
        (t.title = t.title.split("\n").join("<br />")),
      vt(t);
  }
  function be(t) {
    var e = Y(),
      n = Z();
    "function" == typeof t.onBeforeOpen && t.onBeforeOpen(n),
      Oe(e, n, t),
      Se(e, n),
      j() && Ee(e, t.scrollbarPadding),
      Q() ||
        $t.previousActiveElement ||
        ($t.previousActiveElement = document.activeElement),
      "function" == typeof t.onOpen &&
        setTimeout(function () {
          return t.onOpen(n);
        }),
      ft(e, W["no-transition"]);
  }
  function ye(t) {
    var e,
      n = Z();
    t.target === n &&
      ((e = Y()), n.removeEventListener(wt, ye), (e.style.overflowY = "auto"));
  }
  function we(t, e) {
    "select" === e.input || "radio" === e.input
      ? Ie(t, e)
      : -1 !==
          ["text", "email", "number", "tel", "textarea"].indexOf(e.input) &&
        v(e.inputValue) &&
        je(t, e);
  }
  function Ce(t, e) {
    t.disableButtons(), e.input ? Re(t, e) : He(t, e, !0);
  }
  function ke(t, e) {
    t.disableButtons(), e(z.cancel);
  }
  function xe(t, e) {
    t.closePopup({ value: e });
  }
  function Pe(e, t, n, o) {
    t.keydownTarget &&
      t.keydownHandlerAdded &&
      (t.keydownTarget.removeEventListener("keydown", t.keydownHandler, {
        capture: t.keydownListenerCapture,
      }),
      (t.keydownHandlerAdded = !1)),
      n.toast ||
        ((t.keydownHandler = function (t) {
          return Ue(e, t, o);
        }),
        (t.keydownTarget = n.keydownListenerCapture ? window : Z()),
        (t.keydownListenerCapture = n.keydownListenerCapture),
        t.keydownTarget.addEventListener("keydown", t.keydownHandler, {
          capture: t.keydownListenerCapture,
        }),
        (t.keydownHandlerAdded = !0));
  }
  function Ae(t, e, n) {
    var o = I(),
      i = 0;
    if (i < o.length)
      return (
        (e += n) === o.length ? (e = 0) : -1 === e && (e = o.length - 1),
        o[e].focus()
      );
    Z().focus();
  }
  function Be(t, e, n) {
    Pt.innerParams.get(t).toast ? Ke(t, e, n) : (Ze(e), Qe(e), $e(t, e, n));
  }
  var Se = function (t, e) {
      wt && rt(e)
        ? ((t.style.overflowY = "hidden"), e.addEventListener(wt, ye))
        : (t.style.overflowY = "auto");
    },
    Ee = function (t, e) {
      var n;
      ((/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) ||
        ("MacIntel" === navigator.platform && 1 < navigator.maxTouchPoints)) &&
        !R(document.body, W.iosfix) &&
        ((n = document.body.scrollTop),
        (document.body.style.top = "".concat(-1 * n, "px")),
        pt(document.body, W.iosfix),
        ae()),
        "undefined" != typeof window &&
          ie() &&
          (re(), window.addEventListener("resize", re)),
        h(document.body.children).forEach(function (t) {
          t === Y() ||
            (function (t, e) {
              if ("function" == typeof t.contains) return t.contains(e);
            })(t, Y()) ||
            (t.hasAttribute("aria-hidden") &&
              t.setAttribute(
                "data-previous-aria-hidden",
                t.getAttribute("aria-hidden")
              ),
            t.setAttribute("aria-hidden", "true"));
        }),
        e && oe(),
        setTimeout(function () {
          t.scrollTop = 0;
        });
    },
    Oe = function (t, e, n) {
      pt(t, n.showClass.backdrop),
        et(e),
        pt(e, n.showClass.popup),
        pt([document.documentElement, document.body], W.shown),
        n.heightAuto &&
          n.backdrop &&
          !n.toast &&
          pt([document.documentElement, document.body], W["height-auto"]);
    },
    Te = function (t) {
      return t.checked ? 1 : 0;
    },
    Le = function (t) {
      return t.checked ? t.value : null;
    },
    qe = function (t) {
      return t.files.length
        ? null !== t.getAttribute("multiple")
          ? t.files
          : t.files[0]
        : null;
    },
    Ie = function (e, n) {
      function o(t) {
        return Me[n.input](i, Ve(t), n);
      }
      var i = k();
      v(n.inputOptions)
        ? (Ft(),
          n.inputOptions.then(function (t) {
            e.hideLoading(), o(t);
          }))
        : "object" === r(n.inputOptions)
        ? o(n.inputOptions)
        : U(
            "Unexpected type of inputOptions! Expected object, Map or Promise, got ".concat(
              r(n.inputOptions)
            )
          );
    },
    je = function (e, n) {
      var o = e.getInput();
      nt(o),
        n.inputValue
          .then(function (t) {
            (o.value =
              "number" === n.input ? parseFloat(t) || 0 : "".concat(t)),
              et(o),
              o.focus(),
              e.hideLoading();
          })
          .catch(function (t) {
            U("Error in inputValue promise: ".concat(t)),
              (o.value = ""),
              et(o),
              o.focus(),
              e.hideLoading();
          });
    },
    Me = {
      select: function (t, e, i) {
        var r = mt(t, W.select);
        e.forEach(function (t) {
          var e = t[0],
            n = t[1],
            o = document.createElement("option");
          (o.value = e),
            V(o, n),
            i.inputValue.toString() === e.toString() && (o.selected = !0),
            r.appendChild(o);
        }),
          r.focus();
      },
      radio: function (t, e, a) {
        var c = mt(t, W.radio);
        e.forEach(function (t) {
          var e = t[0],
            n = t[1],
            o = document.createElement("input"),
            i = document.createElement("label");
          (o.type = "radio"),
            (o.name = W.radio),
            (o.value = e),
            a.inputValue.toString() === e.toString() && (o.checked = !0);
          var r = document.createElement("span");
          V(r, n),
            (r.className = W.label),
            i.appendChild(o),
            i.appendChild(r),
            c.appendChild(i);
        });
        var n = c.querySelectorAll("input");
        n.length && n[0].focus();
      },
    },
    Ve = function (e) {
      var n = [];
      return (
        "undefined" != typeof Map && e instanceof Map
          ? e.forEach(function (t, e) {
              n.push([e, t]);
            })
          : Object.keys(e).forEach(function (t) {
              n.push([t, e[t]]);
            }),
        n
      );
    },
    Re = function (e, n) {
      var o = (function (t, e) {
        var n = t.getInput();
        if (!n) return null;
        switch (e.input) {
          case "checkbox":
            return Te(n);
          case "radio":
            return Le(n);
          case "file":
            return qe(n);
          default:
            return e.inputAutoTrim ? n.value.trim() : n.value;
        }
      })(e, n);
      n.inputValidator
        ? (e.disableInput(),
          Promise.resolve()
            .then(function () {
              return n.inputValidator(o, n.validationMessage);
            })
            .then(function (t) {
              e.enableButtons(),
                e.enableInput(),
                t ? e.showValidationMessage(t) : He(e, n, o);
            }))
        : e.getInput().checkValidity()
        ? He(e, n, o)
        : (e.enableButtons(), e.showValidationMessage(n.validationMessage));
    },
    He = function (e, t, n) {
      t.showLoaderOnConfirm && Ft(),
        t.preConfirm
          ? (e.resetValidationMessage(),
            Promise.resolve()
              .then(function () {
                return t.preConfirm(n, t.validationMessage);
              })
              .then(function (t) {
                ht(A()) || !1 === t
                  ? e.hideLoading()
                  : xe(e, void 0 === t ? n : t);
              }))
          : xe(e, n);
    },
    De = [
      "ArrowLeft",
      "ArrowRight",
      "ArrowUp",
      "ArrowDown",
      "Left",
      "Right",
      "Up",
      "Down",
    ],
    Ne = ["Escape", "Esc"],
    Ue = function (t, e, n) {
      var o = Pt.innerParams.get(t);
      o.stopKeydownPropagation && e.stopPropagation(),
        "Enter" === e.key
          ? _e(t, e, o)
          : "Tab" === e.key
          ? Fe(e, o)
          : -1 !== De.indexOf(e.key)
          ? ze()
          : -1 !== Ne.indexOf(e.key) && We(e, o, n);
    },
    _e = function (t, e, n) {
      if (
        !e.isComposing &&
        e.target &&
        t.getInput() &&
        e.target.outerHTML === t.getInput().outerHTML
      ) {
        if (-1 !== ["textarea", "file"].indexOf(n.input)) return;
        Vt(), e.preventDefault();
      }
    },
    Fe = function (t) {
      for (var e = t.target, n = I(), o = -1, i = 0; i < n.length; i++)
        if (e === n[i]) {
          o = i;
          break;
        }
      t.shiftKey ? Ae(0, o, -1) : Ae(0, o, 1),
        t.stopPropagation(),
        t.preventDefault();
    },
    ze = function () {
      var t = B(),
        e = S();
      document.activeElement === t && ht(e)
        ? e.focus()
        : document.activeElement === e && ht(t) && t.focus();
    },
    We = function (t, e, n) {
      F(e.allowEscapeKey) && (t.preventDefault(), n(z.esc));
    },
    Ke = function (e, t, n) {
      t.popup.onclick = function () {
        var t = Pt.innerParams.get(e);
        t.showConfirmButton ||
          t.showCancelButton ||
          t.showCloseButton ||
          t.input ||
          n(z.close);
      };
    },
    Ye = !1,
    Ze = function (e) {
      e.popup.onmousedown = function () {
        e.container.onmouseup = function (t) {
          (e.container.onmouseup = void 0),
            t.target === e.container && (Ye = !0);
        };
      };
    },
    Qe = function (e) {
      e.container.onmousedown = function () {
        e.popup.onmouseup = function (t) {
          (e.popup.onmouseup = void 0),
            (t.target !== e.popup && !e.popup.contains(t.target)) || (Ye = !0);
        };
      };
    },
    $e = function (n, o, i) {
      o.container.onclick = function (t) {
        var e = Pt.innerParams.get(n);
        Ye
          ? (Ye = !1)
          : t.target === o.container && F(e.allowOutsideClick) && i(z.backdrop);
      };
    };
  var Je = function (t, e, n) {
      var o = L();
      nt(o),
        e.timer &&
          ((t.timeout = new he(function () {
            n("timer"), delete t.timeout;
          }, e.timer)),
          e.timerProgressBar &&
            (et(o),
            setTimeout(function () {
              t.timeout.running && at(e.timer);
            })));
    },
    Xe = function (t, e) {
      if (!e.toast)
        return F(e.allowEnterKey)
          ? e.focusCancel && ht(t.cancelButton)
            ? t.cancelButton.focus()
            : e.focusConfirm && ht(t.confirmButton)
            ? t.confirmButton.focus()
            : void Ae(0, -1, 1)
          : Ge();
    },
    Ge = function () {
      document.activeElement &&
        "function" == typeof document.activeElement.blur &&
        document.activeElement.blur();
    };
  var tn,
    en = function (t) {
      for (var e in t) t[e] = new WeakMap();
    },
    nn = Object.freeze({
      hideLoading: ne,
      disableLoading: ne,
      getInput: function (t) {
        var e = Pt.innerParams.get(t || this),
          n = Pt.domCache.get(t || this);
        return n ? J(n.content, e.input) : null;
      },
      close: le,
      closePopup: le,
      closeModal: le,
      closeToast: le,
      enableButtons: function () {
        fe(this, ["confirmButton", "cancelButton"], !1);
      },
      disableButtons: function () {
        fe(this, ["confirmButton", "cancelButton"], !0);
      },
      enableInput: function () {
        return me(this.getInput(), !1);
      },
      disableInput: function () {
        return me(this.getInput(), !0);
      },
      showValidationMessage: function (t) {
        var e = Pt.domCache.get(this);
        V(e.validationMessage, t);
        var n = window.getComputedStyle(e.popup);
        (e.validationMessage.style.marginLeft = "-".concat(
          n.getPropertyValue("padding-left")
        )),
          (e.validationMessage.style.marginRight = "-".concat(
            n.getPropertyValue("padding-right")
          )),
          et(e.validationMessage);
        var o = this.getInput();
        o &&
          (o.setAttribute("aria-invalid", !0),
          o.setAttribute("aria-describedBy", W["validation-message"]),
          X(o),
          pt(o, W.inputerror));
      },
      resetValidationMessage: function () {
        var t = Pt.domCache.get(this);
        t.validationMessage && nt(t.validationMessage);
        var e = this.getInput();
        e &&
          (e.removeAttribute("aria-invalid"),
          e.removeAttribute("aria-describedBy"),
          ft(e, W.inputerror));
      },
      getProgressSteps: function () {
        return Pt.domCache.get(this).progressSteps;
      },
      _main: function (t) {
        Qt(t),
          $t.currentInstance && $t.currentInstance._destroy(),
          ($t.currentInstance = this);
        var e = (function (t) {
          var e = s({}, Jt.showClass, t.showClass),
            n = s({}, Jt.hideClass, t.hideClass),
            o = s({}, Jt, t);
          if (((o.showClass = e), (o.hideClass = n), t.animation === false)) {
            o.showClass = {
              popup: "swal2-noanimation",
              backdrop: "swal2-noanimation",
            };
            o.hideClass = {};
          }
          return o;
        })(t);
        ve(e),
          Object.freeze(e),
          $t.timeout && ($t.timeout.stop(), delete $t.timeout),
          clearTimeout($t.restoreFocusTimeout);
        var n = (function (t) {
          var e = {
            popup: Z(),
            container: Y(),
            content: k(),
            actions: E(),
            confirmButton: B(),
            cancelButton: S(),
            closeButton: q(),
            validationMessage: A(),
            progressSteps: P(),
          };
          return Pt.domCache.set(t, e), e;
        })(this);
        return (
          Mt(this, e),
          Pt.innerParams.set(this, e),
          (function (n, o, i) {
            return new Promise(function (t) {
              var e = function t(e) {
                n.closePopup({ dismiss: e });
              };
              se.swalPromiseResolve.set(n, t);
              o.confirmButton.onclick = function () {
                return Ce(n, i);
              };
              o.cancelButton.onclick = function () {
                return ke(n, e);
              };
              o.closeButton.onclick = function () {
                return e(z.close);
              };
              Be(n, o, e);
              Pe(n, $t, i, e);
              if (i.toast && (i.input || i.footer || i.showCloseButton)) {
                pt(document.body, W["toast-column"]);
              } else {
                ft(document.body, W["toast-column"]);
              }
              we(n, i);
              be(i);
              Je($t, i, e);
              Xe(o, i);
              setTimeout(function () {
                o.container.scrollTop = 0;
              });
            });
          })(this, n, e)
        );
      },
      update: function (e) {
        var t = Z(),
          n = Pt.innerParams.get(this);
        if (!t || R(t, n.hideClass.popup))
          return N(
            "You're trying to update the closed or closing popup, that won't work. Use the update() method in preConfirm parameter or show a new popup."
          );
        var o = {};
        Object.keys(e).forEach(function (t) {
          rn.isUpdatableParameter(t)
            ? (o[t] = e[t])
            : N(
                'Invalid parameter to update: "'.concat(
                  t,
                  '". Updatable params are listed here: https://github.com/sweetalert2/sweetalert2/blob/master/src/utils/params.js'
                )
              );
        });
        var i = s({}, n, o);
        Mt(this, i),
          Pt.innerParams.set(this, i),
          Object.defineProperties(this, {
            params: {
              value: s({}, this.params, e),
              writable: !1,
              enumerable: !0,
            },
          });
      },
      _destroy: function () {
        var t = Pt.domCache.get(this),
          e = Pt.innerParams.get(this);
        e &&
          (t.popup &&
            $t.swalCloseEventFinishedCallback &&
            ($t.swalCloseEventFinishedCallback(),
            delete $t.swalCloseEventFinishedCallback),
          $t.deferDisposalTimer &&
            (clearTimeout($t.deferDisposalTimer), delete $t.deferDisposalTimer),
          "function" == typeof e.onDestroy && e.onDestroy(),
          delete this.params,
          delete $t.keydownHandler,
          delete $t.keydownTarget,
          en(Pt),
          en(se));
      },
    }),
    on = (function () {
      function r() {
        if ((a(this, r), "undefined" != typeof window)) {
          "undefined" == typeof Promise &&
            U(
              "This package requires a Promise library, please include a shim to enable it in this browser (See: https://github.com/sweetalert2/sweetalert2/wiki/Migration-from-SweetAlert-to-SweetAlert2#1-ie-support)"
            ),
            (tn = this);
          for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++)
            e[n] = arguments[n];
          var o = Object.freeze(this.constructor.argsToParams(e));
          Object.defineProperties(this, {
            params: {
              value: o,
              writable: !1,
              enumerable: !0,
              configurable: !0,
            },
          });
          var i = this._main(this.params);
          Pt.promise.set(this, i);
        }
      }
      return (
        c(r, [
          {
            key: "then",
            value: function (t) {
              return Pt.promise.get(this).then(t);
            },
          },
          {
            key: "finally",
            value: function (t) {
              return Pt.promise.get(this).finally(t);
            },
          },
        ]),
        r
      );
    })();
  s(on.prototype, nn),
    s(on, ee),
    Object.keys(nn).forEach(function (t) {
      on[t] = function () {
        if (tn) return tn[t].apply(tn, arguments);
      };
    }),
    (on.DismissReason = z),
    (on.version = "9.13.1");
  var rn = on;
  return (rn.default = rn);
}),
  void 0 !== this &&
    this.Sweetalert2 &&
    (this.swal =
      this.sweetAlert =
      this.Swal =
      this.SweetAlert =
        this.Sweetalert2);

/*!
 * Bootstrap-select v1.13.9 (https://developer.snapappointments.com/bootstrap-select)
 *
 * Copyright 2012-2019 SnapAppointments, LLC
 * Licensed under MIT (https://github.com/snapappointments/bootstrap-select/blob/master/LICENSE)
 */
!(function (e, t) {
  void 0 === e && void 0 !== window && (e = window),
    "function" == typeof define && define.amd
      ? define(["jquery"], function (e) {
          return t(e);
        })
      : "object" == typeof module && module.exports
      ? (module.exports = t(require("jquery")))
      : t(e.jQuery);
})(this, function (e) {
  !(function (z) {
    "use strict";
    var d = ["sanitize", "whiteList", "sanitizeFn"],
      l = [
        "background",
        "cite",
        "href",
        "itemtype",
        "longdesc",
        "poster",
        "src",
        "xlink:href",
      ],
      e = {
        "*": [
          "class",
          "dir",
          "id",
          "lang",
          "role",
          "tabindex",
          "style",
          /^aria-[\w-]*$/i,
        ],
        a: ["target", "href", "title", "rel"],
        area: [],
        b: [],
        br: [],
        col: [],
        code: [],
        div: [],
        em: [],
        hr: [],
        h1: [],
        h2: [],
        h3: [],
        h4: [],
        h5: [],
        h6: [],
        i: [],
        img: ["src", "alt", "title", "width", "height"],
        li: [],
        ol: [],
        p: [],
        pre: [],
        s: [],
        small: [],
        span: [],
        sub: [],
        sup: [],
        strong: [],
        u: [],
        ul: [],
      },
      r = /^(?:(?:https?|mailto|ftp|tel|file):|[^&:/?#]*(?:[/?#]|$))/gi,
      a =
        /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+/]+=*$/i;
    function v(e, t) {
      var i = e.nodeName.toLowerCase();
      if (-1 !== z.inArray(i, t))
        return (
          -1 === z.inArray(i, l) ||
          Boolean(e.nodeValue.match(r) || e.nodeValue.match(a))
        );
      for (
        var s = z(t).filter(function (e, t) {
            return t instanceof RegExp;
          }),
          n = 0,
          o = s.length;
        n < o;
        n++
      )
        if (i.match(s[n])) return !0;
      return !1;
    }
    function B(e, t, i) {
      if (i && "function" == typeof i) return i(e);
      for (var s = Object.keys(t), n = 0, o = e.length; n < o; n++)
        for (
          var l = e[n].querySelectorAll("*"), r = 0, a = l.length;
          r < a;
          r++
        ) {
          var c = l[r],
            d = c.nodeName.toLowerCase();
          if (-1 !== s.indexOf(d))
            for (
              var h = [].slice.call(c.attributes),
                p = [].concat(t["*"] || [], t[d] || []),
                u = 0,
                f = h.length;
              u < f;
              u++
            ) {
              var m = h[u];
              v(m, p) || c.removeAttribute(m.nodeName);
            }
          else c.parentNode.removeChild(c);
        }
    }
    "classList" in document.createElement("_") ||
      (function (e) {
        if ("Element" in e) {
          var t = "classList",
            i = "prototype",
            s = e.Element[i],
            n = Object,
            o = function () {
              var i = z(this);
              return {
                add: function (e) {
                  return (
                    (e = Array.prototype.slice.call(arguments).join(" ")),
                    i.addClass(e)
                  );
                },
                remove: function (e) {
                  return (
                    (e = Array.prototype.slice.call(arguments).join(" ")),
                    i.removeClass(e)
                  );
                },
                toggle: function (e, t) {
                  return i.toggleClass(e, t);
                },
                contains: function (e) {
                  return i.hasClass(e);
                },
              };
            };
          if (n.defineProperty) {
            var l = { get: o, enumerable: !0, configurable: !0 };
            try {
              n.defineProperty(s, t, l);
            } catch (e) {
              (void 0 !== e.number && -2146823252 !== e.number) ||
                ((l.enumerable = !1), n.defineProperty(s, t, l));
            }
          } else n[i].__defineGetter__ && s.__defineGetter__(t, o);
        }
      })(window);
    var t,
      c,
      i,
      s = document.createElement("_");
    if ((s.classList.add("c1", "c2"), !s.classList.contains("c2"))) {
      var n = DOMTokenList.prototype.add,
        o = DOMTokenList.prototype.remove;
      (DOMTokenList.prototype.add = function () {
        Array.prototype.forEach.call(arguments, n.bind(this));
      }),
        (DOMTokenList.prototype.remove = function () {
          Array.prototype.forEach.call(arguments, o.bind(this));
        });
    }
    if ((s.classList.toggle("c3", !1), s.classList.contains("c3"))) {
      var h = DOMTokenList.prototype.toggle;
      DOMTokenList.prototype.toggle = function (e, t) {
        return 1 in arguments && !this.contains(e) == !t ? t : h.call(this, e);
      };
    }
    function E(e) {
      var t,
        i = [],
        s = e.selectedOptions;
      if (e.multiple)
        for (var n = 0, o = s.length; n < o; n++)
          (t = s[n]), i.push(t.value || t.text);
      else i = e.value;
      return i;
    }
    (s = null),
      String.prototype.startsWith ||
        ((t = (function () {
          try {
            var e = {},
              t = Object.defineProperty,
              i = t(e, e, e) && t;
          } catch (e) {}
          return i;
        })()),
        (c = {}.toString),
        (i = function (e) {
          if (null == this) throw new TypeError();
          var t = String(this);
          if (e && "[object RegExp]" == c.call(e)) throw new TypeError();
          var i = t.length,
            s = String(e),
            n = s.length,
            o = 1 < arguments.length ? arguments[1] : void 0,
            l = o ? Number(o) : 0;
          l != l && (l = 0);
          var r = Math.min(Math.max(l, 0), i);
          if (i < n + r) return !1;
          for (var a = -1; ++a < n; )
            if (t.charCodeAt(r + a) != s.charCodeAt(a)) return !1;
          return !0;
        }),
        t
          ? t(String.prototype, "startsWith", {
              value: i,
              configurable: !0,
              writable: !0,
            })
          : (String.prototype.startsWith = i)),
      Object.keys ||
        (Object.keys = function (e, t, i) {
          for (t in ((i = []), e)) i.hasOwnProperty.call(e, t) && i.push(t);
          return i;
        }),
      HTMLSelectElement &&
        !HTMLSelectElement.prototype.hasOwnProperty("selectedOptions") &&
        Object.defineProperty(HTMLSelectElement.prototype, "selectedOptions", {
          get: function () {
            return this.querySelectorAll(":checked");
          },
        });
    var p = { useDefault: !1, _set: z.valHooks.select.set };
    z.valHooks.select.set = function (e, t) {
      return (
        t && !p.useDefault && z(e).data("selected", !0),
        p._set.apply(this, arguments)
      );
    };
    var C = null,
      u = (function () {
        try {
          return new Event("change"), !0;
        } catch (e) {
          return !1;
        }
      })();
    function $(e, t, i, s) {
      for (
        var n = ["display", "subtext", "tokens"], o = !1, l = 0;
        l < n.length;
        l++
      ) {
        var r = n[l],
          a = e[r];
        if (
          a &&
          ((a = a.toString()),
          "display" === r && (a = a.replace(/<[^>]+>/g, "")),
          s && (a = w(a)),
          (a = a.toUpperCase()),
          (o = "contains" === i ? 0 <= a.indexOf(t) : a.startsWith(t)))
        )
          break;
      }
      return o;
    }
    function L(e) {
      return parseInt(e, 10) || 0;
    }
    z.fn.triggerNative = function (e) {
      var t,
        i = this[0];
      i.dispatchEvent
        ? (u
            ? (t = new Event(e, { bubbles: !0 }))
            : (t = document.createEvent("Event")).initEvent(e, !0, !1),
          i.dispatchEvent(t))
        : i.fireEvent
        ? (((t = document.createEventObject()).eventType = e),
          i.fireEvent("on" + e, t))
        : this.trigger(e);
    };
    var f = {
        "\xc0": "A",
        "\xc1": "A",
        "\xc2": "A",
        "\xc3": "A",
        "\xc4": "A",
        "\xc5": "A",
        "\xe0": "a",
        "\xe1": "a",
        "\xe2": "a",
        "\xe3": "a",
        "\xe4": "a",
        "\xe5": "a",
        "\xc7": "C",
        "\xe7": "c",
        "\xd0": "D",
        "\xf0": "d",
        "\xc8": "E",
        "\xc9": "E",
        "\xca": "E",
        "\xcb": "E",
        "\xe8": "e",
        "\xe9": "e",
        "\xea": "e",
        "\xeb": "e",
        "\xcc": "I",
        "\xcd": "I",
        "\xce": "I",
        "\xcf": "I",
        "\xec": "i",
        "\xed": "i",
        "\xee": "i",
        "\xef": "i",
        "\xd1": "N",
        "\xf1": "n",
        "\xd2": "O",
        "\xd3": "O",
        "\xd4": "O",
        "\xd5": "O",
        "\xd6": "O",
        "\xd8": "O",
        "\xf2": "o",
        "\xf3": "o",
        "\xf4": "o",
        "\xf5": "o",
        "\xf6": "o",
        "\xf8": "o",
        "\xd9": "U",
        "\xda": "U",
        "\xdb": "U",
        "\xdc": "U",
        "\xf9": "u",
        "\xfa": "u",
        "\xfb": "u",
        "\xfc": "u",
        "\xdd": "Y",
        "\xfd": "y",
        "\xff": "y",
        "\xc6": "Ae",
        "\xe6": "ae",
        "\xde": "Th",
        "\xfe": "th",
        "\xdf": "ss",
        "\u0100": "A",
        "\u0102": "A",
        "\u0104": "A",
        "\u0101": "a",
        "\u0103": "a",
        "\u0105": "a",
        "\u0106": "C",
        "\u0108": "C",
        "\u010a": "C",
        "\u010c": "C",
        "\u0107": "c",
        "\u0109": "c",
        "\u010b": "c",
        "\u010d": "c",
        "\u010e": "D",
        "\u0110": "D",
        "\u010f": "d",
        "\u0111": "d",
        "\u0112": "E",
        "\u0114": "E",
        "\u0116": "E",
        "\u0118": "E",
        "\u011a": "E",
        "\u0113": "e",
        "\u0115": "e",
        "\u0117": "e",
        "\u0119": "e",
        "\u011b": "e",
        "\u011c": "G",
        "\u011e": "G",
        "\u0120": "G",
        "\u0122": "G",
        "\u011d": "g",
        "\u011f": "g",
        "\u0121": "g",
        "\u0123": "g",
        "\u0124": "H",
        "\u0126": "H",
        "\u0125": "h",
        "\u0127": "h",
        "\u0128": "I",
        "\u012a": "I",
        "\u012c": "I",
        "\u012e": "I",
        "\u0130": "I",
        "\u0129": "i",
        "\u012b": "i",
        "\u012d": "i",
        "\u012f": "i",
        "\u0131": "i",
        "\u0134": "J",
        "\u0135": "j",
        "\u0136": "K",
        "\u0137": "k",
        "\u0138": "k",
        "\u0139": "L",
        "\u013b": "L",
        "\u013d": "L",
        "\u013f": "L",
        "\u0141": "L",
        "\u013a": "l",
        "\u013c": "l",
        "\u013e": "l",
        "\u0140": "l",
        "\u0142": "l",
        "\u0143": "N",
        "\u0145": "N",
        "\u0147": "N",
        "\u014a": "N",
        "\u0144": "n",
        "\u0146": "n",
        "\u0148": "n",
        "\u014b": "n",
        "\u014c": "O",
        "\u014e": "O",
        "\u0150": "O",
        "\u014d": "o",
        "\u014f": "o",
        "\u0151": "o",
        "\u0154": "R",
        "\u0156": "R",
        "\u0158": "R",
        "\u0155": "r",
        "\u0157": "r",
        "\u0159": "r",
        "\u015a": "S",
        "\u015c": "S",
        "\u015e": "S",
        "\u0160": "S",
        "\u015b": "s",
        "\u015d": "s",
        "\u015f": "s",
        "\u0161": "s",
        "\u0162": "T",
        "\u0164": "T",
        "\u0166": "T",
        "\u0163": "t",
        "\u0165": "t",
        "\u0167": "t",
        "\u0168": "U",
        "\u016a": "U",
        "\u016c": "U",
        "\u016e": "U",
        "\u0170": "U",
        "\u0172": "U",
        "\u0169": "u",
        "\u016b": "u",
        "\u016d": "u",
        "\u016f": "u",
        "\u0171": "u",
        "\u0173": "u",
        "\u0174": "W",
        "\u0175": "w",
        "\u0176": "Y",
        "\u0177": "y",
        "\u0178": "Y",
        "\u0179": "Z",
        "\u017b": "Z",
        "\u017d": "Z",
        "\u017a": "z",
        "\u017c": "z",
        "\u017e": "z",
        "\u0132": "IJ",
        "\u0133": "ij",
        "\u0152": "Oe",
        "\u0153": "oe",
        "\u0149": "'n",
        "\u017f": "s",
      },
      m = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g,
      g = RegExp(
        "[\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff\\u1ab0-\\u1aff\\u1dc0-\\u1dff]",
        "g"
      );
    function b(e) {
      return f[e];
    }
    function w(e) {
      return (e = e.toString()) && e.replace(m, b).replace(g, "");
    }
    var x,
      I,
      k,
      y,
      S,
      O =
        ((x = {
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#x27;",
          "`": "&#x60;",
        }),
        (I = function (e) {
          return x[e];
        }),
        (k = "(?:" + Object.keys(x).join("|") + ")"),
        (y = RegExp(k)),
        (S = RegExp(k, "g")),
        function (e) {
          return (e = null == e ? "" : "" + e), y.test(e) ? e.replace(S, I) : e;
        }),
      T = {
        32: " ",
        48: "0",
        49: "1",
        50: "2",
        51: "3",
        52: "4",
        53: "5",
        54: "6",
        55: "7",
        56: "8",
        57: "9",
        59: ";",
        65: "A",
        66: "B",
        67: "C",
        68: "D",
        69: "E",
        70: "F",
        71: "G",
        72: "H",
        73: "I",
        74: "J",
        75: "K",
        76: "L",
        77: "M",
        78: "N",
        79: "O",
        80: "P",
        81: "Q",
        82: "R",
        83: "S",
        84: "T",
        85: "U",
        86: "V",
        87: "W",
        88: "X",
        89: "Y",
        90: "Z",
        96: "0",
        97: "1",
        98: "2",
        99: "3",
        100: "4",
        101: "5",
        102: "6",
        103: "7",
        104: "8",
        105: "9",
      },
      A = 27,
      N = 13,
      D = 32,
      H = 9,
      P = 38,
      W = 40,
      M = { success: !1, major: "3" };
    try {
      (M.full = (z.fn.dropdown.Constructor.VERSION || "")
        .split(" ")[0]
        .split(".")),
        (M.major = M.full[0]),
        (M.success = !0);
    } catch (e) {}
    var R = 0,
      U = ".bs.select",
      j = {
        DISABLED: "disabled",
        DIVIDER: "divider",
        SHOW: "open",
        DROPUP: "dropup",
        MENU: "dropdown-menu",
        MENURIGHT: "dropdown-menu-right",
        MENULEFT: "dropdown-menu-left",
        BUTTONCLASS: "btn-default",
        POPOVERHEADER: "popover-title",
        ICONBASE: "glyphicon",
        TICKICON: "glyphicon-ok",
      },
      V = { MENU: "." + j.MENU },
      F = {
        span: document.createElement("span"),
        i: document.createElement("i"),
        subtext: document.createElement("small"),
        a: document.createElement("a"),
        li: document.createElement("li"),
        whitespace: document.createTextNode("\xa0"),
        fragment: document.createDocumentFragment(),
      };
    F.a.setAttribute("role", "option"),
      (F.subtext.className = "text-muted"),
      (F.text = F.span.cloneNode(!1)),
      (F.text.className = "text"),
      (F.checkMark = F.span.cloneNode(!1));
    var _ = new RegExp(P + "|" + W),
      q = new RegExp("^" + H + "$|" + A),
      G = function (e, t, i) {
        var s = F.li.cloneNode(!1);
        return (
          e &&
            (1 === e.nodeType || 11 === e.nodeType
              ? s.appendChild(e)
              : (s.innerHTML = e)),
          void 0 !== t && "" !== t && (s.className = t),
          null != i && s.classList.add("optgroup-" + i),
          s
        );
      },
      K = function (e, t, i) {
        var s = F.a.cloneNode(!0);
        return (
          e &&
            (11 === e.nodeType
              ? s.appendChild(e)
              : s.insertAdjacentHTML("beforeend", e)),
          void 0 !== t && "" !== t && (s.className = t),
          "4" === M.major && s.classList.add("dropdown-item"),
          i && s.setAttribute("style", i),
          s
        );
      },
      Y = function (e, t) {
        var i,
          s,
          n = F.text.cloneNode(!1);
        if (e.content) n.innerHTML = e.content;
        else {
          if (((n.textContent = e.text), e.icon)) {
            var o = F.whitespace.cloneNode(!1);
            ((s = (!0 === t ? F.i : F.span).cloneNode(!1)).className =
              e.iconBase + " " + e.icon),
              F.fragment.appendChild(s),
              F.fragment.appendChild(o);
          }
          e.subtext &&
            (((i = F.subtext.cloneNode(!1)).textContent = e.subtext),
            n.appendChild(i));
        }
        if (!0 === t)
          for (; 0 < n.childNodes.length; )
            F.fragment.appendChild(n.childNodes[0]);
        else F.fragment.appendChild(n);
        return F.fragment;
      },
      Z = function (e) {
        var t,
          i,
          s = F.text.cloneNode(!1);
        if (((s.innerHTML = e.label), e.icon)) {
          var n = F.whitespace.cloneNode(!1);
          ((i = F.span.cloneNode(!1)).className = e.iconBase + " " + e.icon),
            F.fragment.appendChild(i),
            F.fragment.appendChild(n);
        }
        return (
          e.subtext &&
            (((t = F.subtext.cloneNode(!1)).textContent = e.subtext),
            s.appendChild(t)),
          F.fragment.appendChild(s),
          F.fragment
        );
      },
      J = function (e, t) {
        var i = this;
        p.useDefault || ((z.valHooks.select.set = p._set), (p.useDefault = !0)),
          (this.$element = z(e)),
          (this.$newElement = null),
          (this.$button = null),
          (this.$menu = null),
          (this.options = t),
          (this.selectpicker = {
            main: {},
            current: {},
            search: {},
            view: {},
            keydown: {
              keyHistory: "",
              resetKeyHistory: {
                start: function () {
                  return setTimeout(function () {
                    i.selectpicker.keydown.keyHistory = "";
                  }, 800);
                },
              },
            },
          }),
          null === this.options.title &&
            (this.options.title = this.$element.attr("title"));
        var s = this.options.windowPadding;
        "number" == typeof s && (this.options.windowPadding = [s, s, s, s]),
          (this.val = J.prototype.val),
          (this.render = J.prototype.render),
          (this.refresh = J.prototype.refresh),
          (this.setStyle = J.prototype.setStyle),
          (this.selectAll = J.prototype.selectAll),
          (this.deselectAll = J.prototype.deselectAll),
          (this.destroy = J.prototype.destroy),
          (this.remove = J.prototype.remove),
          (this.show = J.prototype.show),
          (this.hide = J.prototype.hide),
          this.init();
      };
    function Q(e) {
      var r,
        a = arguments,
        c = e;
      if (([].shift.apply(a), !M.success)) {
        try {
          M.full = (z.fn.dropdown.Constructor.VERSION || "")
            .split(" ")[0]
            .split(".");
        } catch (e) {
          J.BootstrapVersion
            ? (M.full = J.BootstrapVersion.split(" ")[0].split("."))
            : ((M.full = [M.major, "0", "0"]),
              console.warn(
                "There was an issue retrieving Bootstrap's version. Ensure Bootstrap is being loaded before bootstrap-select and there is no namespace collision. If loading Bootstrap asynchronously, the version may need to be manually specified via $.fn.selectpicker.Constructor.BootstrapVersion.",
                e
              ));
        }
        (M.major = M.full[0]), (M.success = !0);
      }
      if ("4" === M.major) {
        var t = [];
        J.DEFAULTS.style === j.BUTTONCLASS &&
          t.push({ name: "style", className: "BUTTONCLASS" }),
          J.DEFAULTS.iconBase === j.ICONBASE &&
            t.push({ name: "iconBase", className: "ICONBASE" }),
          J.DEFAULTS.tickIcon === j.TICKICON &&
            t.push({ name: "tickIcon", className: "TICKICON" }),
          (j.DIVIDER = "dropdown-divider"),
          (j.SHOW = "show"),
          (j.BUTTONCLASS = "btn-light"),
          (j.POPOVERHEADER = "popover-header"),
          (j.ICONBASE = ""),
          (j.TICKICON = "bs-ok-default");
        for (var i = 0; i < t.length; i++) {
          e = t[i];
          J.DEFAULTS[e.name] = j[e.className];
        }
      }
      var s = this.each(function () {
        var e = z(this);
        if (e.is("select")) {
          var t = e.data("selectpicker"),
            i = "object" == typeof c && c;
          if (t) {
            if (i)
              for (var s in i) i.hasOwnProperty(s) && (t.options[s] = i[s]);
          } else {
            var n = e.data();
            for (var o in n)
              n.hasOwnProperty(o) && -1 !== z.inArray(o, d) && delete n[o];
            var l = z.extend(
              {},
              J.DEFAULTS,
              z.fn.selectpicker.defaults || {},
              n,
              i
            );
            (l.template = z.extend(
              {},
              J.DEFAULTS.template,
              z.fn.selectpicker.defaults
                ? z.fn.selectpicker.defaults.template
                : {},
              n.template,
              i.template
            )),
              e.data("selectpicker", (t = new J(this, l)));
          }
          "string" == typeof c &&
            (r = t[c] instanceof Function ? t[c].apply(t, a) : t.options[c]);
        }
      });
      return void 0 !== r ? r : s;
    }
    (J.VERSION = "1.13.9"),
      (J.DEFAULTS = {
        noneSelectedText: "Nothing selected",
        noneResultsText: "No results matched {0}",
        countSelectedText: function (e, t) {
          return 1 == e ? "{0} item selected" : "{0} items selected";
        },
        maxOptionsText: function (e, t) {
          return [
            1 == e
              ? "Limit reached ({n} item max)"
              : "Limit reached ({n} items max)",
            1 == t
              ? "Group limit reached ({n} item max)"
              : "Group limit reached ({n} items max)",
          ];
        },
        selectAllText: "Select All",
        deselectAllText: "Deselect All",
        doneButton: !1,
        doneButtonText: "Close",
        multipleSeparator: ", ",
        styleBase: "btn",
        style: j.BUTTONCLASS,
        size: "auto",
        title: null,
        selectedTextFormat: "values",
        width: !1,
        container: !1,
        hideDisabled: !1,
        showSubtext: !1,
        showIcon: !0,
        showContent: !0,
        dropupAuto: !0,
        header: !1,
        liveSearch: !1,
        liveSearchPlaceholder: null,
        liveSearchNormalize: !1,
        liveSearchStyle: "contains",
        actionsBox: !1,
        iconBase: j.ICONBASE,
        tickIcon: j.TICKICON,
        showTick: !1,
        template: { caret: '<span class="caret"></span>' },
        maxOptions: !1,
        mobile: !1,
        selectOnTab: !1,
        dropdownAlignRight: !1,
        windowPadding: 0,
        virtualScroll: 600,
        display: !1,
        sanitize: !0,
        sanitizeFn: null,
        whiteList: e,
      }),
      (J.prototype = {
        constructor: J,
        init: function () {
          var i = this,
            e = this.$element.attr("id");
          (this.selectId = R++),
            this.$element[0].classList.add("bs-select-hidden"),
            (this.multiple = this.$element.prop("multiple")),
            (this.autofocus = this.$element.prop("autofocus")),
            (this.options.showTick =
              this.$element[0].classList.contains("show-tick")),
            (this.$newElement = this.createDropdown()),
            this.$element.after(this.$newElement).prependTo(this.$newElement),
            (this.$button = this.$newElement.children("button")),
            (this.$menu = this.$newElement.children(V.MENU)),
            (this.$menuInner = this.$menu.children(".inner")),
            (this.$searchbox = this.$menu.find("input")),
            this.$element[0].classList.remove("bs-select-hidden"),
            !0 === this.options.dropdownAlignRight &&
              this.$menu[0].classList.add(j.MENURIGHT),
            void 0 !== e && this.$button.attr("data-id", e),
            this.checkDisabled(),
            this.clickListener(),
            this.options.liveSearch && this.liveSearchListener(),
            this.setStyle(),
            this.render(),
            this.setWidth(),
            this.options.container
              ? this.selectPosition()
              : this.$element.on("hide" + U, function () {
                  if (i.isVirtual()) {
                    var e = i.$menuInner[0],
                      t = e.firstChild.cloneNode(!1);
                    e.replaceChild(t, e.firstChild), (e.scrollTop = 0);
                  }
                }),
            this.$menu.data("this", this),
            this.$newElement.data("this", this),
            this.options.mobile && this.mobile(),
            this.$newElement.on({
              "hide.bs.dropdown": function (e) {
                i.$menuInner.attr("aria-expanded", !1),
                  i.$element.trigger("hide" + U, e);
              },
              "hidden.bs.dropdown": function (e) {
                i.$element.trigger("hidden" + U, e);
              },
              "show.bs.dropdown": function (e) {
                i.$menuInner.attr("aria-expanded", !0),
                  i.$element.trigger("show" + U, e);
              },
              "shown.bs.dropdown": function (e) {
                i.$element.trigger("shown" + U, e);
              },
            }),
            i.$element[0].hasAttribute("required") &&
              this.$element.on("invalid" + U, function () {
                i.$button[0].classList.add("bs-invalid"),
                  i.$element
                    .on("shown" + U + ".invalid", function () {
                      i.$element
                        .val(i.$element.val())
                        .off("shown" + U + ".invalid");
                    })
                    .on("rendered" + U, function () {
                      this.validity.valid &&
                        i.$button[0].classList.remove("bs-invalid"),
                        i.$element.off("rendered" + U);
                    }),
                  i.$button.on("blur" + U, function () {
                    i.$element.trigger("focus").trigger("blur"),
                      i.$button.off("blur" + U);
                  });
              }),
            setTimeout(function () {
              i.createLi(), i.$element.trigger("loaded" + U);
            });
        },
        createDropdown: function () {
          var e = this.multiple || this.options.showTick ? " show-tick" : "",
            t = "",
            i = this.autofocus ? " autofocus" : "";
          M.major < 4 &&
            this.$element.parent().hasClass("input-group") &&
            (t = " input-group-btn");
          var s,
            n = "",
            o = "",
            l = "",
            r = "";
          return (
            this.options.header &&
              (n =
                '<div class="' +
                j.POPOVERHEADER +
                '"><button type="button" class="close" aria-hidden="true">&times;</button>' +
                this.options.header +
                "</div>"),
            this.options.liveSearch &&
              (o =
                '<div class="bs-searchbox"><input type="text" class="form-control" autocomplete="off"' +
                (null === this.options.liveSearchPlaceholder
                  ? ""
                  : ' placeholder="' +
                    O(this.options.liveSearchPlaceholder) +
                    '"') +
                ' role="textbox" aria-label="Search"></div>'),
            this.multiple &&
              this.options.actionsBox &&
              (l =
                '<div class="bs-actionsbox"><div class="btn-group btn-group-sm btn-block"><button type="button" class="actions-btn bs-select-all btn ' +
                j.BUTTONCLASS +
                '">' +
                this.options.selectAllText +
                '</button><button type="button" class="actions-btn bs-deselect-all btn ' +
                j.BUTTONCLASS +
                '">' +
                this.options.deselectAllText +
                "</button></div></div>"),
            this.multiple &&
              this.options.doneButton &&
              (r =
                '<div class="bs-donebutton"><div class="btn-group btn-block"><button type="button" class="btn btn-sm ' +
                j.BUTTONCLASS +
                '">' +
                this.options.doneButtonText +
                "</button></div></div>"),
            (s =
              '<div class="dropdown bootstrap-select' +
              e +
              t +
              '"><button type="button" class="' +
              this.options.styleBase +
              ' dropdown-toggle" ' +
              ("static" === this.options.display
                ? 'data-display="static"'
                : "") +
              'data-toggle="dropdown"' +
              i +
              ' role="button"><div class="filter-option"><div class="filter-option-inner"><div class="filter-option-inner-inner"></div></div> </div>' +
              ("4" === M.major
                ? ""
                : '<span class="bs-caret">' +
                  this.options.template.caret +
                  "</span>") +
              '</button><div class="' +
              j.MENU +
              " " +
              ("4" === M.major ? "" : j.SHOW) +
              '" role="combobox">' +
              n +
              o +
              l +
              '<div class="inner ' +
              j.SHOW +
              '" role="listbox" aria-expanded="false" tabindex="-1"><ul class="' +
              j.MENU +
              " inner " +
              ("4" === M.major ? j.SHOW : "") +
              '"></ul></div>' +
              r +
              "</div></div>"),
            z(s)
          );
        },
        setPositionData: function () {
          this.selectpicker.view.canHighlight = [];
          for (var e = 0; e < this.selectpicker.current.data.length; e++) {
            var t = this.selectpicker.current.data[e],
              i = !0;
            "divider" === t.type
              ? ((i = !1), (t.height = this.sizeInfo.dividerHeight))
              : "optgroup-label" === t.type
              ? ((i = !1), (t.height = this.sizeInfo.dropdownHeaderHeight))
              : (t.height = this.sizeInfo.liHeight),
              t.disabled && (i = !1),
              this.selectpicker.view.canHighlight.push(i),
              (t.position =
                (0 === e ? 0 : this.selectpicker.current.data[e - 1].position) +
                t.height);
          }
        },
        isVirtual: function () {
          return (
            (!1 !== this.options.virtualScroll &&
              this.selectpicker.main.elements.length >=
                this.options.virtualScroll) ||
            !0 === this.options.virtualScroll
          );
        },
        createView: function (T, e) {
          e = e || 0;
          var A = this;
          this.selectpicker.current = T
            ? this.selectpicker.search
            : this.selectpicker.main;
          var N,
            D,
            H = [];
          function i(e, t) {
            var i,
              s,
              n,
              o,
              l,
              r,
              a,
              c,
              d,
              h,
              p = A.selectpicker.current.elements.length,
              u = [],
              f = !0,
              m = A.isVirtual();
            (A.selectpicker.view.scrollTop = e),
              !0 === m &&
                A.sizeInfo.hasScrollBar &&
                A.$menu[0].offsetWidth > A.sizeInfo.totalMenuWidth &&
                ((A.sizeInfo.menuWidth = A.$menu[0].offsetWidth),
                (A.sizeInfo.totalMenuWidth =
                  A.sizeInfo.menuWidth + A.sizeInfo.scrollBarWidth),
                A.$menu.css("min-width", A.sizeInfo.menuWidth)),
              (i = Math.ceil(
                (A.sizeInfo.menuInnerHeight / A.sizeInfo.liHeight) * 1.5
              )),
              (s = Math.round(p / i) || 1);
            for (var v = 0; v < s; v++) {
              var g = (v + 1) * i;
              if (
                (v === s - 1 && (g = p), (u[v] = [v * i + (v ? 1 : 0), g]), !p)
              )
                break;
              void 0 === l &&
                e <=
                  A.selectpicker.current.data[g - 1].position -
                    A.sizeInfo.menuInnerHeight &&
                (l = v);
            }
            if (
              (void 0 === l && (l = 0),
              (r = [
                A.selectpicker.view.position0,
                A.selectpicker.view.position1,
              ]),
              (n = Math.max(0, l - 1)),
              (o = Math.min(s - 1, l + 1)),
              (A.selectpicker.view.position0 =
                !1 === m ? 0 : Math.max(0, u[n][0]) || 0),
              (A.selectpicker.view.position1 =
                !1 === m ? p : Math.min(p, u[o][1]) || 0),
              (a =
                r[0] !== A.selectpicker.view.position0 ||
                r[1] !== A.selectpicker.view.position1),
              void 0 !== A.activeIndex &&
                ((D = A.selectpicker.main.elements[A.prevActiveIndex]),
                (H = A.selectpicker.main.elements[A.activeIndex]),
                (N = A.selectpicker.main.elements[A.selectedIndex]),
                t &&
                  (A.activeIndex !== A.selectedIndex &&
                    H &&
                    H.length &&
                    (H.classList.remove("active"),
                    H.firstChild && H.firstChild.classList.remove("active")),
                  (A.activeIndex = void 0)),
                A.activeIndex &&
                  A.activeIndex !== A.selectedIndex &&
                  N &&
                  N.length &&
                  (N.classList.remove("active"),
                  N.firstChild && N.firstChild.classList.remove("active"))),
              void 0 !== A.prevActiveIndex &&
                A.prevActiveIndex !== A.activeIndex &&
                A.prevActiveIndex !== A.selectedIndex &&
                D &&
                D.length &&
                (D.classList.remove("active"),
                D.firstChild && D.firstChild.classList.remove("active")),
              (t || a) &&
                ((c = A.selectpicker.view.visibleElements
                  ? A.selectpicker.view.visibleElements.slice()
                  : []),
                (A.selectpicker.view.visibleElements =
                  !1 === m
                    ? A.selectpicker.current.elements
                    : A.selectpicker.current.elements.slice(
                        A.selectpicker.view.position0,
                        A.selectpicker.view.position1
                      )),
                A.setOptionStatus(),
                (T || (!1 === m && t)) &&
                  ((d = c),
                  (h = A.selectpicker.view.visibleElements),
                  (f = !(
                    d.length === h.length &&
                    d.every(function (e, t) {
                      return e === h[t];
                    })
                  ))),
                (t || !0 === m) && f))
            ) {
              var b,
                w,
                x = A.$menuInner[0],
                I = document.createDocumentFragment(),
                k = x.firstChild.cloneNode(!1),
                $ = A.selectpicker.view.visibleElements,
                y = [];
              x.replaceChild(k, x.firstChild);
              v = 0;
              for (var S = $.length; v < S; v++) {
                var E,
                  C,
                  O = $[v];
                A.options.sanitize &&
                  (E = O.lastChild) &&
                  (C =
                    A.selectpicker.current.data[
                      v + A.selectpicker.view.position0
                    ]) &&
                  C.content &&
                  !C.sanitized &&
                  (y.push(E), (C.sanitized = !0)),
                  I.appendChild(O);
              }
              A.options.sanitize &&
                y.length &&
                B(y, A.options.whiteList, A.options.sanitizeFn),
                !0 === m &&
                  ((b =
                    0 === A.selectpicker.view.position0
                      ? 0
                      : A.selectpicker.current.data[
                          A.selectpicker.view.position0 - 1
                        ].position),
                  (w =
                    A.selectpicker.view.position1 > p - 1
                      ? 0
                      : A.selectpicker.current.data[p - 1].position -
                        A.selectpicker.current.data[
                          A.selectpicker.view.position1 - 1
                        ].position),
                  (x.firstChild.style.marginTop = b + "px"),
                  (x.firstChild.style.marginBottom = w + "px")),
                x.firstChild.appendChild(I);
            }
            if (((A.prevActiveIndex = A.activeIndex), A.options.liveSearch)) {
              if (T && t) {
                var z,
                  L = 0;
                A.selectpicker.view.canHighlight[L] ||
                  (L =
                    1 + A.selectpicker.view.canHighlight.slice(1).indexOf(!0)),
                  (z = A.selectpicker.view.visibleElements[L]),
                  A.selectpicker.view.currentActive &&
                    (A.selectpicker.view.currentActive.classList.remove(
                      "active"
                    ),
                    A.selectpicker.view.currentActive.firstChild &&
                      A.selectpicker.view.currentActive.firstChild.classList.remove(
                        "active"
                      )),
                  z &&
                    (z.classList.add("active"),
                    z.firstChild && z.firstChild.classList.add("active")),
                  (A.activeIndex = (
                    A.selectpicker.current.data[L] || {}
                  ).index);
              }
            } else A.$menuInner.trigger("focus");
          }
          this.setPositionData(),
            i(e, !0),
            this.$menuInner
              .off("scroll.createView")
              .on("scroll.createView", function (e, t) {
                A.noScroll || i(this.scrollTop, t), (A.noScroll = !1);
              }),
            z(window)
              .off("resize" + U + "." + this.selectId + ".createView")
              .on(
                "resize" + U + "." + this.selectId + ".createView",
                function () {
                  A.$newElement.hasClass(j.SHOW) &&
                    i(A.$menuInner[0].scrollTop);
                }
              );
        },
        setPlaceholder: function () {
          var e = !1;
          if (this.options.title && !this.multiple) {
            this.selectpicker.view.titleOption ||
              (this.selectpicker.view.titleOption =
                document.createElement("option")),
              (e = !0);
            var t = this.$element[0],
              i = !1,
              s = !this.selectpicker.view.titleOption.parentNode;
            if (s)
              (this.selectpicker.view.titleOption.className =
                "bs-title-option"),
                (this.selectpicker.view.titleOption.value = ""),
                (i =
                  void 0 === z(t.options[t.selectedIndex]).attr("selected") &&
                  void 0 === this.$element.data("selected"));
            (s || 0 !== this.selectpicker.view.titleOption.index) &&
              t.insertBefore(this.selectpicker.view.titleOption, t.firstChild),
              i && (t.selectedIndex = 0);
          }
          return e;
        },
        createLi: function () {
          var a = this,
            f = this.options.iconBase,
            m = ':not([hidden]):not([data-hidden="true"])',
            v = [],
            g = [],
            c = 0,
            b = 0,
            e = this.setPlaceholder() ? 1 : 0;
          this.options.hideDisabled && (m += ":not(:disabled)"),
            (!a.options.showTick && !a.multiple) ||
              F.checkMark.parentNode ||
              ((F.checkMark.className =
                f + " " + a.options.tickIcon + " check-mark"),
              F.a.appendChild(F.checkMark));
          var t = this.$element[0].querySelectorAll("select > *" + m);
          function w(e) {
            var t = g[g.length - 1];
            (t && "divider" === t.type && (t.optID || e.optID)) ||
              (((e = e || {}).type = "divider"),
              v.push(G(!1, j.DIVIDER, e.optID ? e.optID + "div" : void 0)),
              g.push(e));
          }
          function x(e, t) {
            if (
              (((t = t || {}).divider =
                "true" === e.getAttribute("data-divider")),
              t.divider)
            )
              w({ optID: t.optID });
            else {
              var i = g.length,
                s = e.style.cssText,
                n = s ? O(s) : "",
                o = (e.className || "") + (t.optgroupClass || "");
              t.optID && (o = "opt " + o),
                (t.text = e.textContent),
                (t.content = e.getAttribute("data-content")),
                (t.tokens = e.getAttribute("data-tokens")),
                (t.subtext = e.getAttribute("data-subtext")),
                (t.icon = e.getAttribute("data-icon")),
                (t.iconBase = f);
              var l = Y(t);
              v.push(G(K(l, o, n), "", t.optID)),
                (e.liIndex = i),
                (t.display = t.content || t.text),
                (t.type = "option"),
                (t.index = i),
                (t.option = e),
                (t.disabled = t.disabled || e.disabled),
                g.push(t);
              var r = 0;
              t.display && (r += t.display.length),
                t.subtext && (r += t.subtext.length),
                t.icon && (r += 1),
                c < r &&
                  ((c = r),
                  (a.selectpicker.view.widestOption = v[v.length - 1]));
            }
          }
          function i(e, t) {
            var i = t[e],
              s = t[e - 1],
              n = t[e + 1],
              o = i.querySelectorAll("option" + m);
            if (o.length) {
              var l,
                r,
                a = {
                  label: O(i.label),
                  subtext: i.getAttribute("data-subtext"),
                  icon: i.getAttribute("data-icon"),
                  iconBase: f,
                },
                c = " " + (i.className || "");
              b++, s && w({ optID: b });
              var d = Z(a);
              v.push(G(d, "dropdown-header" + c, b)),
                g.push({
                  display: a.label,
                  subtext: a.subtext,
                  type: "optgroup-label",
                  optID: b,
                });
              for (var h = 0, p = o.length; h < p; h++) {
                var u = o[h];
                0 === h && (r = (l = g.length - 1) + p),
                  x(u, {
                    headerIndex: l,
                    lastIndex: r,
                    optID: b,
                    optgroupClass: c,
                    disabled: i.disabled,
                  });
              }
              n && w({ optID: b });
            }
          }
          for (var s = t.length; e < s; e++) {
            var n = t[e];
            "OPTGROUP" !== n.tagName ? x(n, {}) : i(e, t);
          }
          (this.selectpicker.main.elements = v),
            (this.selectpicker.main.data = g),
            (this.selectpicker.current = this.selectpicker.main);
        },
        findLis: function () {
          return this.$menuInner.find(".inner > li");
        },
        render: function () {
          this.setPlaceholder();
          var e,
            t,
            i = this,
            s = this.$element[0].selectedOptions,
            n = s.length,
            o = this.$button[0],
            l = o.querySelector(".filter-option-inner-inner"),
            r = document.createTextNode(this.options.multipleSeparator),
            a = F.fragment.cloneNode(!1),
            c = !1;
          if (
            (this.togglePlaceholder(),
            this.tabIndex(),
            "static" === this.options.selectedTextFormat)
          )
            a = Y({ text: this.options.title }, !0);
          else if (
            ((e =
              this.multiple &&
              -1 !== this.options.selectedTextFormat.indexOf("count") &&
              1 < n) &&
              (e =
                (1 < (t = this.options.selectedTextFormat.split(">")).length &&
                  n > t[1]) ||
                (1 === t.length && 2 <= n)),
            !1 === e)
          ) {
            for (var d = 0; d < n && d < 50; d++) {
              var h = s[d],
                p = {},
                u = {
                  content: h.getAttribute("data-content"),
                  subtext: h.getAttribute("data-subtext"),
                  icon: h.getAttribute("data-icon"),
                };
              this.multiple && 0 < d && a.appendChild(r.cloneNode(!1)),
                h.title
                  ? (p.text = h.title)
                  : u.content && i.options.showContent
                  ? ((p.content = u.content.toString()), (c = !0))
                  : (i.options.showIcon &&
                      ((p.icon = u.icon), (p.iconBase = this.options.iconBase)),
                    i.options.showSubtext &&
                      !i.multiple &&
                      u.subtext &&
                      (p.subtext = " " + u.subtext),
                    (p.text = h.textContent.trim())),
                a.appendChild(Y(p, !0));
            }
            49 < n && a.appendChild(document.createTextNode("..."));
          } else {
            var f =
              ':not([hidden]):not([data-hidden="true"]):not([data-divider="true"])';
            this.options.hideDisabled && (f += ":not(:disabled)");
            var m = this.$element[0].querySelectorAll(
                "select > option" + f + ", optgroup" + f + " option" + f
              ).length,
              v =
                "function" == typeof this.options.countSelectedText
                  ? this.options.countSelectedText(n, m)
                  : this.options.countSelectedText;
            a = Y(
              {
                text: v
                  .replace("{0}", n.toString())
                  .replace("{1}", m.toString()),
              },
              !0
            );
          }
          if (
            (null == this.options.title &&
              (this.options.title = this.$element.attr("title")),
            a.childNodes.length ||
              (a = Y(
                {
                  text:
                    void 0 !== this.options.title
                      ? this.options.title
                      : this.options.noneSelectedText,
                },
                !0
              )),
            (o.title = a.textContent.replace(/<[^>]*>?/g, "").trim()),
            this.options.sanitize &&
              c &&
              B([a], i.options.whiteList, i.options.sanitizeFn),
            (l.innerHTML = ""),
            l.appendChild(a),
            M.major < 4 &&
              this.$newElement[0].classList.contains("bs3-has-addon"))
          ) {
            var g = o.querySelector(".filter-expand"),
              b = l.cloneNode(!0);
            (b.className = "filter-expand"),
              g ? o.replaceChild(b, g) : o.appendChild(b);
          }
          this.$element.trigger("rendered" + U);
        },
        setStyle: function (e, t) {
          var i,
            s = this.$button[0],
            n = this.$newElement[0],
            o = this.options.style.trim();
          this.$element.attr("class") &&
            this.$newElement.addClass(
              this.$element
                .attr("class")
                .replace(
                  /selectpicker|mobile-device|bs-select-hidden|validate\[.*\]/gi,
                  ""
                )
            ),
            M.major < 4 &&
              (n.classList.add("bs3"),
              n.parentNode.classList.contains("input-group") &&
                (n.previousElementSibling || n.nextElementSibling) &&
                (
                  n.previousElementSibling || n.nextElementSibling
                ).classList.contains("input-group-addon") &&
                n.classList.add("bs3-has-addon")),
            (i = e ? e.trim() : o),
            "add" == t
              ? i && s.classList.add.apply(s.classList, i.split(" "))
              : "remove" == t
              ? i && s.classList.remove.apply(s.classList, i.split(" "))
              : (o && s.classList.remove.apply(s.classList, o.split(" ")),
                i && s.classList.add.apply(s.classList, i.split(" ")));
        },
        liHeight: function (e) {
          if (e || (!1 !== this.options.size && !this.sizeInfo)) {
            this.sizeInfo || (this.sizeInfo = {});
            var t = document.createElement("div"),
              i = document.createElement("div"),
              s = document.createElement("div"),
              n = document.createElement("ul"),
              o = document.createElement("li"),
              l = document.createElement("li"),
              r = document.createElement("li"),
              a = document.createElement("a"),
              c = document.createElement("span"),
              d =
                this.options.header &&
                0 < this.$menu.find("." + j.POPOVERHEADER).length
                  ? this.$menu.find("." + j.POPOVERHEADER)[0].cloneNode(!0)
                  : null,
              h = this.options.liveSearch
                ? document.createElement("div")
                : null,
              p =
                this.options.actionsBox &&
                this.multiple &&
                0 < this.$menu.find(".bs-actionsbox").length
                  ? this.$menu.find(".bs-actionsbox")[0].cloneNode(!0)
                  : null,
              u =
                this.options.doneButton &&
                this.multiple &&
                0 < this.$menu.find(".bs-donebutton").length
                  ? this.$menu.find(".bs-donebutton")[0].cloneNode(!0)
                  : null,
              f = this.$element.find("option")[0];
            if (
              ((this.sizeInfo.selectWidth = this.$newElement[0].offsetWidth),
              (c.className = "text"),
              (a.className = "dropdown-item " + (f ? f.className : "")),
              (t.className = this.$menu[0].parentNode.className + " " + j.SHOW),
              (t.style.width = this.sizeInfo.selectWidth + "px"),
              "auto" === this.options.width && (i.style.minWidth = 0),
              (i.className = j.MENU + " " + j.SHOW),
              (s.className = "inner " + j.SHOW),
              (n.className =
                j.MENU + " inner " + ("4" === M.major ? j.SHOW : "")),
              (o.className = j.DIVIDER),
              (l.className = "dropdown-header"),
              c.appendChild(document.createTextNode("\u200b")),
              a.appendChild(c),
              r.appendChild(a),
              l.appendChild(c.cloneNode(!0)),
              this.selectpicker.view.widestOption &&
                n.appendChild(
                  this.selectpicker.view.widestOption.cloneNode(!0)
                ),
              n.appendChild(r),
              n.appendChild(o),
              n.appendChild(l),
              d && i.appendChild(d),
              h)
            ) {
              var m = document.createElement("input");
              (h.className = "bs-searchbox"),
                (m.className = "form-control"),
                h.appendChild(m),
                i.appendChild(h);
            }
            p && i.appendChild(p),
              s.appendChild(n),
              i.appendChild(s),
              u && i.appendChild(u),
              t.appendChild(i),
              document.body.appendChild(t);
            var v,
              g = r.offsetHeight,
              b = l ? l.offsetHeight : 0,
              w = d ? d.offsetHeight : 0,
              x = h ? h.offsetHeight : 0,
              I = p ? p.offsetHeight : 0,
              k = u ? u.offsetHeight : 0,
              $ = z(o).outerHeight(!0),
              y = !!window.getComputedStyle && window.getComputedStyle(i),
              S = i.offsetWidth,
              E = y ? null : z(i),
              C = {
                vert:
                  L(y ? y.paddingTop : E.css("paddingTop")) +
                  L(y ? y.paddingBottom : E.css("paddingBottom")) +
                  L(y ? y.borderTopWidth : E.css("borderTopWidth")) +
                  L(y ? y.borderBottomWidth : E.css("borderBottomWidth")),
                horiz:
                  L(y ? y.paddingLeft : E.css("paddingLeft")) +
                  L(y ? y.paddingRight : E.css("paddingRight")) +
                  L(y ? y.borderLeftWidth : E.css("borderLeftWidth")) +
                  L(y ? y.borderRightWidth : E.css("borderRightWidth")),
              },
              O = {
                vert:
                  C.vert +
                  L(y ? y.marginTop : E.css("marginTop")) +
                  L(y ? y.marginBottom : E.css("marginBottom")) +
                  2,
                horiz:
                  C.horiz +
                  L(y ? y.marginLeft : E.css("marginLeft")) +
                  L(y ? y.marginRight : E.css("marginRight")) +
                  2,
              };
            (s.style.overflowY = "scroll"),
              (v = i.offsetWidth - S),
              document.body.removeChild(t),
              (this.sizeInfo.liHeight = g),
              (this.sizeInfo.dropdownHeaderHeight = b),
              (this.sizeInfo.headerHeight = w),
              (this.sizeInfo.searchHeight = x),
              (this.sizeInfo.actionsHeight = I),
              (this.sizeInfo.doneButtonHeight = k),
              (this.sizeInfo.dividerHeight = $),
              (this.sizeInfo.menuPadding = C),
              (this.sizeInfo.menuExtras = O),
              (this.sizeInfo.menuWidth = S),
              (this.sizeInfo.totalMenuWidth = this.sizeInfo.menuWidth),
              (this.sizeInfo.scrollBarWidth = v),
              (this.sizeInfo.selectHeight = this.$newElement[0].offsetHeight),
              this.setPositionData();
          }
        },
        getSelectPosition: function () {
          var e,
            t = z(window),
            i = this.$newElement.offset(),
            s = z(this.options.container);
          this.options.container && s.length && !s.is("body")
            ? (((e = s.offset()).top += parseInt(s.css("borderTopWidth"))),
              (e.left += parseInt(s.css("borderLeftWidth"))))
            : (e = { top: 0, left: 0 });
          var n = this.options.windowPadding;
          (this.sizeInfo.selectOffsetTop = i.top - e.top - t.scrollTop()),
            (this.sizeInfo.selectOffsetBot =
              t.height() -
              this.sizeInfo.selectOffsetTop -
              this.sizeInfo.selectHeight -
              e.top -
              n[2]),
            (this.sizeInfo.selectOffsetLeft = i.left - e.left - t.scrollLeft()),
            (this.sizeInfo.selectOffsetRight =
              t.width() -
              this.sizeInfo.selectOffsetLeft -
              this.sizeInfo.selectWidth -
              e.left -
              n[1]),
            (this.sizeInfo.selectOffsetTop -= n[0]),
            (this.sizeInfo.selectOffsetLeft -= n[3]);
        },
        setMenuSize: function (e) {
          this.getSelectPosition();
          var t,
            i,
            s,
            n,
            o,
            l,
            r,
            a = this.sizeInfo.selectWidth,
            c = this.sizeInfo.liHeight,
            d = this.sizeInfo.headerHeight,
            h = this.sizeInfo.searchHeight,
            p = this.sizeInfo.actionsHeight,
            u = this.sizeInfo.doneButtonHeight,
            f = this.sizeInfo.dividerHeight,
            m = this.sizeInfo.menuPadding,
            v = 0;
          if (
            (this.options.dropupAuto &&
              ((r = c * this.selectpicker.current.elements.length + m.vert),
              this.$newElement.toggleClass(
                j.DROPUP,
                this.sizeInfo.selectOffsetTop - this.sizeInfo.selectOffsetBot >
                  this.sizeInfo.menuExtras.vert &&
                  r + this.sizeInfo.menuExtras.vert + 50 >
                    this.sizeInfo.selectOffsetBot
              )),
            "auto" === this.options.size)
          )
            (n =
              3 < this.selectpicker.current.elements.length
                ? 3 * this.sizeInfo.liHeight + this.sizeInfo.menuExtras.vert - 2
                : 0),
              (i =
                this.sizeInfo.selectOffsetBot - this.sizeInfo.menuExtras.vert),
              (s = n + d + h + p + u),
              (l = Math.max(n - m.vert, 0)),
              this.$newElement.hasClass(j.DROPUP) &&
                (i =
                  this.sizeInfo.selectOffsetTop -
                  this.sizeInfo.menuExtras.vert),
              (t = (o = i) - d - h - p - u - m.vert);
          else if (
            this.options.size &&
            "auto" != this.options.size &&
            this.selectpicker.current.elements.length > this.options.size
          ) {
            for (var g = 0; g < this.options.size; g++)
              "divider" === this.selectpicker.current.data[g].type && v++;
            (t = (i = c * this.options.size + v * f + m.vert) - m.vert),
              (o = i + d + h + p + u),
              (s = l = "");
          }
          "auto" === this.options.dropdownAlignRight &&
            this.$menu.toggleClass(
              j.MENURIGHT,
              this.sizeInfo.selectOffsetLeft >
                this.sizeInfo.selectOffsetRight &&
                this.sizeInfo.selectOffsetRight <
                  this.sizeInfo.totalMenuWidth - a
            ),
            this.$menu.css({
              "max-height": o + "px",
              overflow: "hidden",
              "min-height": s + "px",
            }),
            this.$menuInner.css({
              "max-height": t + "px",
              "overflow-y": "auto",
              "min-height": l + "px",
            }),
            (this.sizeInfo.menuInnerHeight = Math.max(t, 1)),
            this.selectpicker.current.data.length &&
              this.selectpicker.current.data[
                this.selectpicker.current.data.length - 1
              ].position > this.sizeInfo.menuInnerHeight &&
              ((this.sizeInfo.hasScrollBar = !0),
              (this.sizeInfo.totalMenuWidth =
                this.sizeInfo.menuWidth + this.sizeInfo.scrollBarWidth),
              this.$menu.css("min-width", this.sizeInfo.totalMenuWidth)),
            this.dropdown &&
              this.dropdown._popper &&
              this.dropdown._popper.update();
        },
        setSize: function (e) {
          if (
            (this.liHeight(e),
            this.options.header && this.$menu.css("padding-top", 0),
            !1 !== this.options.size)
          ) {
            var t,
              i = this,
              s = z(window),
              n = 0;
            if (
              (this.setMenuSize(),
              this.options.liveSearch &&
                this.$searchbox
                  .off("input.setMenuSize propertychange.setMenuSize")
                  .on(
                    "input.setMenuSize propertychange.setMenuSize",
                    function () {
                      return i.setMenuSize();
                    }
                  ),
              "auto" === this.options.size
                ? s
                    .off(
                      "resize" +
                        U +
                        "." +
                        this.selectId +
                        ".setMenuSize scroll" +
                        U +
                        "." +
                        this.selectId +
                        ".setMenuSize"
                    )
                    .on(
                      "resize" +
                        U +
                        "." +
                        this.selectId +
                        ".setMenuSize scroll" +
                        U +
                        "." +
                        this.selectId +
                        ".setMenuSize",
                      function () {
                        return i.setMenuSize();
                      }
                    )
                : this.options.size &&
                  "auto" != this.options.size &&
                  this.selectpicker.current.elements.length >
                    this.options.size &&
                  s.off(
                    "resize" +
                      U +
                      "." +
                      this.selectId +
                      ".setMenuSize scroll" +
                      U +
                      "." +
                      this.selectId +
                      ".setMenuSize"
                  ),
              e)
            )
              n = this.$menuInner[0].scrollTop;
            else if (!i.multiple) {
              var o = i.$element[0];
              "number" ==
                typeof (t = (o.options[o.selectedIndex] || {}).liIndex) &&
                !1 !== i.options.size &&
                (n =
                  (n = i.sizeInfo.liHeight * t) -
                  i.sizeInfo.menuInnerHeight / 2 +
                  i.sizeInfo.liHeight / 2);
            }
            i.createView(!1, n);
          }
        },
        setWidth: function () {
          var i = this;
          "auto" === this.options.width
            ? requestAnimationFrame(function () {
                i.$menu.css("min-width", "0"),
                  i.$element.on("loaded" + U, function () {
                    i.liHeight(), i.setMenuSize();
                    var e = i.$newElement.clone().appendTo("body"),
                      t = e
                        .css("width", "auto")
                        .children("button")
                        .outerWidth();
                    e.remove(),
                      (i.sizeInfo.selectWidth = Math.max(
                        i.sizeInfo.totalMenuWidth,
                        t
                      )),
                      i.$newElement.css("width", i.sizeInfo.selectWidth + "px");
                  });
              })
            : "fit" === this.options.width
            ? (this.$menu.css("min-width", ""),
              this.$newElement.css("width", "").addClass("fit-width"))
            : this.options.width
            ? (this.$menu.css("min-width", ""),
              this.$newElement.css("width", this.options.width))
            : (this.$menu.css("min-width", ""),
              this.$newElement.css("width", "")),
            this.$newElement.hasClass("fit-width") &&
              "fit" !== this.options.width &&
              this.$newElement[0].classList.remove("fit-width");
        },
        selectPosition: function () {
          this.$bsContainer = z('<div class="bs-container" />');
          var s,
            n,
            o,
            l = this,
            r = z(this.options.container),
            e = function (e) {
              var t = {},
                i =
                  l.options.display ||
                  (!!z.fn.dropdown.Constructor.Default &&
                    z.fn.dropdown.Constructor.Default.display);
              l.$bsContainer
                .addClass(
                  e.attr("class").replace(/form-control|fit-width/gi, "")
                )
                .toggleClass(j.DROPUP, e.hasClass(j.DROPUP)),
                (s = e.offset()),
                r.is("body")
                  ? (n = { top: 0, left: 0 })
                  : (((n = r.offset()).top +=
                      parseInt(r.css("borderTopWidth")) - r.scrollTop()),
                    (n.left +=
                      parseInt(r.css("borderLeftWidth")) - r.scrollLeft())),
                (o = e.hasClass(j.DROPUP) ? 0 : e[0].offsetHeight),
                (M.major < 4 || "static" === i) &&
                  ((t.top = s.top - n.top + o), (t.left = s.left - n.left)),
                (t.width = e[0].offsetWidth),
                l.$bsContainer.css(t);
            };
          this.$button.on("click.bs.dropdown.data-api", function () {
            l.isDisabled() ||
              (e(l.$newElement),
              l.$bsContainer
                .appendTo(l.options.container)
                .toggleClass(j.SHOW, !l.$button.hasClass(j.SHOW))
                .append(l.$menu));
          }),
            z(window)
              .off(
                "resize" +
                  U +
                  "." +
                  this.selectId +
                  " scroll" +
                  U +
                  "." +
                  this.selectId
              )
              .on(
                "resize" +
                  U +
                  "." +
                  this.selectId +
                  " scroll" +
                  U +
                  "." +
                  this.selectId,
                function () {
                  l.$newElement.hasClass(j.SHOW) && e(l.$newElement);
                }
              ),
            this.$element.on("hide" + U, function () {
              l.$menu.data("height", l.$menu.height()), l.$bsContainer.detach();
            });
        },
        setOptionStatus: function () {
          var e = this;
          if (
            ((e.noScroll = !1),
            e.selectpicker.view.visibleElements &&
              e.selectpicker.view.visibleElements.length)
          )
            for (
              var t = 0;
              t < e.selectpicker.view.visibleElements.length;
              t++
            ) {
              var i =
                  e.selectpicker.current.data[
                    t + e.selectpicker.view.position0
                  ],
                s = i.option;
              s &&
                (e.setDisabled(i.index, i.disabled),
                e.setSelected(i.index, s.selected));
            }
        },
        setSelected: function (e, t) {
          var i,
            s,
            n = this.selectpicker.main.elements[e],
            o = this.selectpicker.main.data[e],
            l = void 0 !== this.activeIndex,
            r = this.activeIndex === e || (t && !this.multiple && !l);
          (o.selected = t),
            (s = n.firstChild),
            t && (this.selectedIndex = e),
            n.classList.toggle("selected", t),
            n.classList.toggle("active", r),
            r &&
              ((this.selectpicker.view.currentActive = n),
              (this.activeIndex = e)),
            s &&
              (s.classList.toggle("selected", t),
              s.classList.toggle("active", r),
              s.setAttribute("aria-selected", t)),
            r ||
              (!l &&
                t &&
                void 0 !== this.prevActiveIndex &&
                ((i =
                  this.selectpicker.main.elements[
                    this.prevActiveIndex
                  ]).classList.remove("active"),
                i.firstChild && i.firstChild.classList.remove("active")));
        },
        setDisabled: function (e, t) {
          var i,
            s = this.selectpicker.main.elements[e];
          (this.selectpicker.main.data[e].disabled = t),
            (i = s.firstChild),
            s.classList.toggle(j.DISABLED, t),
            i &&
              ("4" === M.major && i.classList.toggle(j.DISABLED, t),
              i.setAttribute("aria-disabled", t),
              t
                ? i.setAttribute("tabindex", -1)
                : i.setAttribute("tabindex", 0));
        },
        isDisabled: function () {
          return this.$element[0].disabled;
        },
        checkDisabled: function () {
          var e = this;
          this.isDisabled()
            ? (this.$newElement[0].classList.add(j.DISABLED),
              this.$button
                .addClass(j.DISABLED)
                .attr("tabindex", -1)
                .attr("aria-disabled", !0))
            : (this.$button[0].classList.contains(j.DISABLED) &&
                (this.$newElement[0].classList.remove(j.DISABLED),
                this.$button.removeClass(j.DISABLED).attr("aria-disabled", !1)),
              -1 != this.$button.attr("tabindex") ||
                this.$element.data("tabindex") ||
                this.$button.removeAttr("tabindex")),
            this.$button.on("click", function () {
              return !e.isDisabled();
            });
        },
        togglePlaceholder: function () {
          var e = this.$element[0],
            t = e.selectedIndex,
            i = -1 === t;
          i || e.options[t].value || (i = !0),
            this.$button.toggleClass("bs-placeholder", i);
        },
        tabIndex: function () {
          this.$element.data("tabindex") !== this.$element.attr("tabindex") &&
            -98 !== this.$element.attr("tabindex") &&
            "-98" !== this.$element.attr("tabindex") &&
            (this.$element.data("tabindex", this.$element.attr("tabindex")),
            this.$button.attr("tabindex", this.$element.data("tabindex"))),
            this.$element.attr("tabindex", -98);
        },
        clickListener: function () {
          var S = this,
            t = z(document);
          function e() {
            S.options.liveSearch
              ? S.$searchbox.trigger("focus")
              : S.$menuInner.trigger("focus");
          }
          function i() {
            S.dropdown &&
            S.dropdown._popper &&
            S.dropdown._popper.state.isCreated
              ? e()
              : requestAnimationFrame(i);
          }
          t.data("spaceSelect", !1),
            this.$button.on("keyup", function (e) {
              /(32)/.test(e.keyCode.toString(10)) &&
                t.data("spaceSelect") &&
                (e.preventDefault(), t.data("spaceSelect", !1));
            }),
            this.$newElement.on("show.bs.dropdown", function () {
              3 < M.major &&
                !S.dropdown &&
                ((S.dropdown = S.$button.data("bs.dropdown")),
                (S.dropdown._menu = S.$menu[0]));
            }),
            this.$button.on("click.bs.dropdown.data-api", function () {
              S.$newElement.hasClass(j.SHOW) || S.setSize();
            }),
            this.$element.on("shown" + U, function () {
              S.$menuInner[0].scrollTop !== S.selectpicker.view.scrollTop &&
                (S.$menuInner[0].scrollTop = S.selectpicker.view.scrollTop),
                3 < M.major ? requestAnimationFrame(i) : e();
            }),
            this.$menuInner.on("click", "li a", function (e, t) {
              var i = z(this),
                s = S.isVirtual() ? S.selectpicker.view.position0 : 0,
                n = S.selectpicker.current.data[i.parent().index() + s],
                o = n.index,
                l = E(S.$element[0]),
                r = S.$element.prop("selectedIndex"),
                a = !0;
              if (
                (S.multiple &&
                  1 !== S.options.maxOptions &&
                  e.stopPropagation(),
                e.preventDefault(),
                !S.isDisabled() && !i.parent().hasClass(j.DISABLED))
              ) {
                var c = S.$element.find("option"),
                  d = n.option,
                  h = z(d),
                  p = d.selected,
                  u = h.parent("optgroup"),
                  f = u.find("option"),
                  m = S.options.maxOptions,
                  v = u.data("maxOptions") || !1;
                if (
                  (o === S.activeIndex && (t = !0),
                  t ||
                    ((S.prevActiveIndex = S.activeIndex),
                    (S.activeIndex = void 0)),
                  S.multiple)
                ) {
                  if (
                    ((d.selected = !p),
                    S.setSelected(o, !p),
                    i.trigger("blur"),
                    !1 !== m || !1 !== v)
                  ) {
                    var g = m < c.filter(":selected").length,
                      b = v < u.find("option:selected").length;
                    if ((m && g) || (v && b))
                      if (m && 1 == m) {
                        c.prop("selected", !1), h.prop("selected", !0);
                        for (var w = 0; w < c.length; w++) S.setSelected(w, !1);
                        S.setSelected(o, !0);
                      } else if (v && 1 == v) {
                        u.find("option:selected").prop("selected", !1),
                          h.prop("selected", !0);
                        for (w = 0; w < f.length; w++) {
                          d = f[w];
                          S.setSelected(c.index(d), !1);
                        }
                        S.setSelected(o, !0);
                      } else {
                        var x =
                            "string" == typeof S.options.maxOptionsText
                              ? [
                                  S.options.maxOptionsText,
                                  S.options.maxOptionsText,
                                ]
                              : S.options.maxOptionsText,
                          I = "function" == typeof x ? x(m, v) : x,
                          k = I[0].replace("{n}", m),
                          $ = I[1].replace("{n}", v),
                          y = z('<div class="notify"></div>');
                        I[2] &&
                          ((k = k.replace("{var}", I[2][1 < m ? 0 : 1])),
                          ($ = $.replace("{var}", I[2][1 < v ? 0 : 1]))),
                          h.prop("selected", !1),
                          S.$menu.append(y),
                          m &&
                            g &&
                            (y.append(z("<div>" + k + "</div>")),
                            (a = !1),
                            S.$element.trigger("maxReached" + U)),
                          v &&
                            b &&
                            (y.append(z("<div>" + $ + "</div>")),
                            (a = !1),
                            S.$element.trigger("maxReachedGrp" + U)),
                          setTimeout(function () {
                            S.setSelected(o, !1);
                          }, 10),
                          y.delay(750).fadeOut(300, function () {
                            z(this).remove();
                          });
                      }
                  }
                } else
                  c.prop("selected", !1),
                    (d.selected = !0),
                    S.setSelected(o, !0);
                !S.multiple || (S.multiple && 1 === S.options.maxOptions)
                  ? S.$button.trigger("focus")
                  : S.options.liveSearch && S.$searchbox.trigger("focus"),
                  a &&
                    ((l != E(S.$element[0]) && S.multiple) ||
                      (r != S.$element.prop("selectedIndex") && !S.multiple)) &&
                    ((C = [d.index, h.prop("selected"), l]),
                    S.$element.triggerNative("change"));
              }
            }),
            this.$menu.on(
              "click",
              "li." +
                j.DISABLED +
                " a, ." +
                j.POPOVERHEADER +
                ", ." +
                j.POPOVERHEADER +
                " :not(.close)",
              function (e) {
                e.currentTarget == this &&
                  (e.preventDefault(),
                  e.stopPropagation(),
                  S.options.liveSearch && !z(e.target).hasClass("close")
                    ? S.$searchbox.trigger("focus")
                    : S.$button.trigger("focus"));
              }
            ),
            this.$menuInner.on(
              "click",
              ".divider, .dropdown-header",
              function (e) {
                e.preventDefault(),
                  e.stopPropagation(),
                  S.options.liveSearch
                    ? S.$searchbox.trigger("focus")
                    : S.$button.trigger("focus");
              }
            ),
            this.$menu.on(
              "click",
              "." + j.POPOVERHEADER + " .close",
              function () {
                S.$button.trigger("click");
              }
            ),
            this.$searchbox.on("click", function (e) {
              e.stopPropagation();
            }),
            this.$menu.on("click", ".actions-btn", function (e) {
              S.options.liveSearch
                ? S.$searchbox.trigger("focus")
                : S.$button.trigger("focus"),
                e.preventDefault(),
                e.stopPropagation(),
                z(this).hasClass("bs-select-all")
                  ? S.selectAll()
                  : S.deselectAll();
            }),
            this.$element
              .on("change" + U, function () {
                S.render(), S.$element.trigger("changed" + U, C), (C = null);
              })
              .on("focus" + U, function () {
                S.options.mobile || S.$button.trigger("focus");
              });
        },
        liveSearchListener: function () {
          var u = this,
            f = document.createElement("li");
          this.$button.on("click.bs.dropdown.data-api", function () {
            u.$searchbox.val() && u.$searchbox.val("");
          }),
            this.$searchbox.on(
              "click.bs.dropdown.data-api focus.bs.dropdown.data-api touchend.bs.dropdown.data-api",
              function (e) {
                e.stopPropagation();
              }
            ),
            this.$searchbox.on("input propertychange", function () {
              var e = u.$searchbox.val();
              if (
                ((u.selectpicker.search.elements = []),
                (u.selectpicker.search.data = []),
                e)
              ) {
                var t = [],
                  i = e.toUpperCase(),
                  s = {},
                  n = [],
                  o = u._searchStyle(),
                  l = u.options.liveSearchNormalize;
                l && (i = w(i)),
                  (u._$lisSelected = u.$menuInner.find(".selected"));
                for (var r = 0; r < u.selectpicker.main.data.length; r++) {
                  var a = u.selectpicker.main.data[r];
                  s[r] || (s[r] = $(a, i, o, l)),
                    s[r] &&
                      void 0 !== a.headerIndex &&
                      -1 === n.indexOf(a.headerIndex) &&
                      (0 < a.headerIndex &&
                        ((s[a.headerIndex - 1] = !0),
                        n.push(a.headerIndex - 1)),
                      (s[a.headerIndex] = !0),
                      n.push(a.headerIndex),
                      (s[a.lastIndex + 1] = !0)),
                    s[r] && "optgroup-label" !== a.type && n.push(r);
                }
                r = 0;
                for (var c = n.length; r < c; r++) {
                  var d = n[r],
                    h = n[r - 1],
                    p =
                      ((a = u.selectpicker.main.data[d]),
                      u.selectpicker.main.data[h]);
                  ("divider" !== a.type ||
                    ("divider" === a.type &&
                      p &&
                      "divider" !== p.type &&
                      c - 1 !== r)) &&
                    (u.selectpicker.search.data.push(a),
                    t.push(u.selectpicker.main.elements[d]));
                }
                (u.activeIndex = void 0),
                  (u.noScroll = !0),
                  u.$menuInner.scrollTop(0),
                  (u.selectpicker.search.elements = t),
                  u.createView(!0),
                  t.length ||
                    ((f.className = "no-results"),
                    (f.innerHTML = u.options.noneResultsText.replace(
                      "{0}",
                      '"' + O(e) + '"'
                    )),
                    u.$menuInner[0].firstChild.appendChild(f));
              } else u.$menuInner.scrollTop(0), u.createView(!1);
            });
        },
        _searchStyle: function () {
          return this.options.liveSearchStyle || "contains";
        },
        val: function (e) {
          if (void 0 === e) return this.$element.val();
          var t = E(this.$element[0]);
          return (
            (C = [null, null, t]),
            this.$element.val(e).trigger("changed" + U, C),
            this.render(),
            (C = null),
            this.$element
          );
        },
        changeAll: function (e) {
          if (this.multiple) {
            void 0 === e && (e = !0);
            var t = this.$element[0],
              i = 0,
              s = 0,
              n = E(t);
            t.classList.add("bs-select-hidden");
            for (
              var o = 0, l = this.selectpicker.current.elements.length;
              o < l;
              o++
            ) {
              var r = this.selectpicker.current.data[o],
                a = r.option;
              a &&
                !r.disabled &&
                "divider" !== r.type &&
                (r.selected && i++, (a.selected = e) && s++);
            }
            t.classList.remove("bs-select-hidden"),
              i !== s &&
                (this.setOptionStatus(),
                this.togglePlaceholder(),
                (C = [null, null, n]),
                this.$element.triggerNative("change"));
          }
        },
        selectAll: function () {
          return this.changeAll(!0);
        },
        deselectAll: function () {
          return this.changeAll(!1);
        },
        toggle: function (e) {
          (e = e || window.event) && e.stopPropagation(),
            this.$button.trigger("click.bs.dropdown.data-api");
        },
        keydown: function (e) {
          var t,
            i,
            s,
            n,
            o,
            l = z(this),
            r = l.hasClass("dropdown-toggle"),
            a = (r ? l.closest(".dropdown") : l.closest(V.MENU)).data("this"),
            c = a.findLis(),
            d = !1,
            h = e.which === H && !r && !a.options.selectOnTab,
            p = _.test(e.which) || h,
            u = a.$menuInner[0].scrollTop,
            f = a.isVirtual(),
            m = !0 === f ? a.selectpicker.view.position0 : 0;
          if (
            !(i = a.$newElement.hasClass(j.SHOW)) &&
            (p ||
              (48 <= e.which && e.which <= 57) ||
              (96 <= e.which && e.which <= 105) ||
              (65 <= e.which && e.which <= 90)) &&
            (a.$button.trigger("click.bs.dropdown.data-api"),
            a.options.liveSearch)
          )
            a.$searchbox.trigger("focus");
          else {
            if (
              (e.which === A &&
                i &&
                (e.preventDefault(),
                a.$button
                  .trigger("click.bs.dropdown.data-api")
                  .trigger("focus")),
              p)
            ) {
              if (!c.length) return;
              void 0 ===
                (t = !0 === f ? c.index(c.filter(".active")) : a.activeIndex) &&
                (t = -1),
                -1 !== t &&
                  ((s =
                    a.selectpicker.current.elements[t + m]).classList.remove(
                    "active"
                  ),
                  s.firstChild && s.firstChild.classList.remove("active")),
                e.which === P
                  ? (-1 !== t && t--,
                    t + m < 0 && (t += c.length),
                    a.selectpicker.view.canHighlight[t + m] ||
                      (-1 ===
                        (t =
                          a.selectpicker.view.canHighlight
                            .slice(0, t + m)
                            .lastIndexOf(!0) - m) &&
                        (t = c.length - 1)))
                  : (e.which === W || h) &&
                    (++t + m >= a.selectpicker.view.canHighlight.length &&
                      (t = 0),
                    a.selectpicker.view.canHighlight[t + m] ||
                      (t =
                        t +
                        1 +
                        a.selectpicker.view.canHighlight
                          .slice(t + m + 1)
                          .indexOf(!0))),
                e.preventDefault();
              var v = m + t;
              e.which === P
                ? 0 === m && t === c.length - 1
                  ? ((a.$menuInner[0].scrollTop = a.$menuInner[0].scrollHeight),
                    (v = a.selectpicker.current.elements.length - 1))
                  : (d =
                      (o =
                        (n = a.selectpicker.current.data[v]).position -
                        n.height) < u)
                : (e.which === W || h) &&
                  (0 === t
                    ? (v = a.$menuInner[0].scrollTop = 0)
                    : (d =
                        u <
                        (o =
                          (n = a.selectpicker.current.data[v]).position -
                          a.sizeInfo.menuInnerHeight))),
                (s = a.selectpicker.current.elements[v]) &&
                  (s.classList.add("active"),
                  s.firstChild && s.firstChild.classList.add("active")),
                (a.activeIndex = a.selectpicker.current.data[v].index),
                (a.selectpicker.view.currentActive = s),
                d && (a.$menuInner[0].scrollTop = o),
                a.options.liveSearch
                  ? a.$searchbox.trigger("focus")
                  : l.trigger("focus");
            } else if (
              (!l.is("input") && !q.test(e.which)) ||
              (e.which === D && a.selectpicker.keydown.keyHistory)
            ) {
              var g,
                b,
                w = [];
              e.preventDefault(),
                (a.selectpicker.keydown.keyHistory += T[e.which]),
                a.selectpicker.keydown.resetKeyHistory.cancel &&
                  clearTimeout(a.selectpicker.keydown.resetKeyHistory.cancel),
                (a.selectpicker.keydown.resetKeyHistory.cancel =
                  a.selectpicker.keydown.resetKeyHistory.start()),
                (b = a.selectpicker.keydown.keyHistory),
                /^(.)\1+$/.test(b) && (b = b.charAt(0));
              for (var x = 0; x < a.selectpicker.current.data.length; x++) {
                var I = a.selectpicker.current.data[x];
                $(I, b, "startsWith", !0) &&
                  a.selectpicker.view.canHighlight[x] &&
                  w.push(I.index);
              }
              if (w.length) {
                var k = 0;
                c.removeClass("active").find("a").removeClass("active"),
                  1 === b.length &&
                    (-1 === (k = w.indexOf(a.activeIndex)) || k === w.length - 1
                      ? (k = 0)
                      : k++),
                  (g = w[k]),
                  (d =
                    0 < u - (n = a.selectpicker.main.data[g]).position
                      ? ((o = n.position - n.height), !0)
                      : ((o = n.position - a.sizeInfo.menuInnerHeight),
                        n.position > u + a.sizeInfo.menuInnerHeight)),
                  (s = a.selectpicker.main.elements[g]).classList.add("active"),
                  s.firstChild && s.firstChild.classList.add("active"),
                  (a.activeIndex = w[k]),
                  s.firstChild.focus(),
                  d && (a.$menuInner[0].scrollTop = o),
                  l.trigger("focus");
              }
            }
            i &&
              ((e.which === D && !a.selectpicker.keydown.keyHistory) ||
                e.which === N ||
                (e.which === H && a.options.selectOnTab)) &&
              (e.which !== D && e.preventDefault(),
              (a.options.liveSearch && e.which === D) ||
                (a.$menuInner.find(".active a").trigger("click", !0),
                l.trigger("focus"),
                a.options.liveSearch ||
                  (e.preventDefault(), z(document).data("spaceSelect", !0))));
          }
        },
        mobile: function () {
          this.$element[0].classList.add("mobile-device");
        },
        refresh: function () {
          var e = z.extend({}, this.options, this.$element.data());
          (this.options = e),
            this.checkDisabled(),
            this.setStyle(),
            this.render(),
            this.createLi(),
            this.setWidth(),
            this.setSize(!0),
            this.$element.trigger("refreshed" + U);
        },
        hide: function () {
          this.$newElement.hide();
        },
        show: function () {
          this.$newElement.show();
        },
        remove: function () {
          this.$newElement.remove(), this.$element.remove();
        },
        destroy: function () {
          this.$newElement.before(this.$element).remove(),
            this.$bsContainer
              ? this.$bsContainer.remove()
              : this.$menu.remove(),
            this.$element
              .off(U)
              .removeData("selectpicker")
              .removeClass("bs-select-hidden selectpicker"),
            z(window).off(U + "." + this.selectId);
        },
      });
    var X = z.fn.selectpicker;
    (z.fn.selectpicker = Q),
      (z.fn.selectpicker.Constructor = J),
      (z.fn.selectpicker.noConflict = function () {
        return (z.fn.selectpicker = X), this;
      }),
      z(document)
        .off("keydown.bs.dropdown.data-api")
        .on(
          "keydown" + U,
          '.bootstrap-select [data-toggle="dropdown"], .bootstrap-select [role="listbox"], .bootstrap-select .bs-searchbox input',
          J.prototype.keydown
        )
        .on(
          "focusin.modal",
          '.bootstrap-select [data-toggle="dropdown"], .bootstrap-select [role="listbox"], .bootstrap-select .bs-searchbox input',
          function (e) {
            e.stopPropagation();
          }
        ),
      z(window).on("load" + U + ".data-api", function () {
        z(".selectpicker").each(function () {
          var e = z(this);
          Q.call(e, e.data());
        });
      });
  })(e);
});
