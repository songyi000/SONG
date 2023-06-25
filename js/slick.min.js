/*
     _ _      _       _
 ___| (_) ___| | __  (_)___
/ __| | |/ __| |/ /  | / __|
\__ \ | | (__|   < _ | \__ \
|___/_|_|\___|_|\_(_)/ |___/
                   |__/

 Version: 1.8.0
  Author: Ken Wheeler
 Website: http://kenwheeler.github.io
    Docs: http://kenwheeler.github.io/slick
    Repo: http://github.com/kenwheeler/slick
  Issues: http://github.com/kenwheeler/slick/issues

 */
  !function(i) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], i) : "undefined" != typeof exports ? module.exports = i(require("jquery")) : i(jQuery)
}(function(i) {
    "use strict";
    var e = window.Slick || {};
    (e = function() {
        var e = 0;
        return function(t, o) {
            var s, n = this;
            n.defaults = {
                accessibility: !0,
                adaptiveHeight: !1,
                appendArrows: i(t),
                appendDots: i(t),
                arrows: !0,
                asNavFor: null,
                prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
                nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next</button>',
                autoplay: !1,
                autoplaySpeed: 3e3,
                centerMode: !1,
                centerPadding: "50px",
                cssEase: "ease",
                customPaging: function(e, t) {
                    return i('<button type="button" />').text(t + 1)
                },
                dots: !1,
                dotsClass: "slick-dots",
                draggable: !0,
                easing: "linear",
                edgeFriction: .35,
                fade: !1,
                focusOnSelect: !1,
                focusOnChange: !1,
                infinite: !0,
                initialSlide: 0,
                lazyLoad: "ondemand",
                mobileFirst: !1,
                pauseOnHover: !0,
                pauseOnFocus: !0,
                pauseOnDotsHover: !1,
                respondTo: "window",
                responsive: null,
                rows: 1,
                rtl: !1,
                slide: "",
                slidesPerRow: 1,
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 500,
                swipe: !0,
                swipeToSlide: !1,
                touchMove: !0,
                touchThreshold: 5,
                useCSS: !0,
                useTransform: !0,
                variableWidth: !1,
                vertical: !1,
                verticalSwiping: !1,
                waitForAnimate: !0,
                zIndex: 1e3
            },
            n.initials = {
                animating: !1,
                dragging: !1,
                autoPlayTimer: null,
                currentDirection: 0,
                currentLeft: null,
                currentSlide: 0,
                direction: 1,
                $dots: null,
                listWidth: null,
                listHeight: null,
                loadIndex: 0,
                $nextArrow: null,
                $prevArrow: null,
                scrolling: !1,
                slideCount: null,
                slideWidth: null,
                $slideTrack: null,
                $slides: null,
                sliding: !1,
                slideOffset: 0,
                swipeLeft: null,
                swiping: !1,
                $list: null,
                touchObject: {},
                transformsEnabled: !1,
                unslicked: !1
            },
            i.extend(n, n.initials),
            n.activeBreakpoint = null,
            n.animType = null,
            n.animProp = null,
            n.breakpoints = [],
            n.breakpointSettings = [],
            n.cssTransitions = !1,
            n.focussed = !1,
            n.interrupted = !1,
            n.hidden = "hidden",
            n.paused = !0,
            n.positionProp = null,
            n.respondTo = null,
            n.rowCount = 1,
            n.shouldClick = !0,
            n.$slider = i(t),
            n.$slidesCache = null,
            n.transformType = null,
            n.transitionType = null,
            n.visibilityChange = "visibilitychange",
            n.windowWidth = 0,
            n.windowTimer = null,
            s = i(t).data("slick") || {},
            n.options = i.extend({}, n.defaults, o, s),
            n.currentSlide = n.options.initialSlide,
            n.originalSettings = n.options,
            void 0 !== document.mozHidden ? (n.hidden = "mozHidden",
            n.visibilityChange = "mozvisibilitychange") : void 0 !== document.webkitHidden && (n.hidden = "webkitHidden",
            n.visibilityChange = "webkitvisibilitychange"),
            n.autoPlay = i.proxy(n.autoPlay, n),
            n.autoPlayClear = i.proxy(n.autoPlayClear, n),
            n.autoPlayIterator = i.proxy(n.autoPlayIterator, n),
            n.changeSlide = i.proxy(n.changeSlide, n),
            n.clickHandler = i.proxy(n.clickHandler, n),
            n.selectHandler = i.proxy(n.selectHandler, n),
            n.setPosition = i.proxy(n.setPosition, n),
            n.swipeHandler = i.proxy(n.swipeHandler, n),
            n.dragHandler = i.proxy(n.dragHandler, n),
            n.keyHandler = i.proxy(n.keyHandler, n),
            n.instanceUid = e++,
            n.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/,
            n.registerBreakpoints(),
            n.init(!0)
        }
    }()).prototype.activateADA = function() {
        this.$slideTrack.find(".slick-active").attr({
            "aria-hidden": "false"
        }).find("a, input, button, select").attr({
            tabindex: "0"
        })
    }
    ,
    e.prototype.addSlide = e.prototype.slickAdd = function(e, t, o) {
        var s = this;
        if ("boolean" == typeof t)
            o = t,
            t = null;
        else if (t < 0 || t >= s.slideCount)
            return !1;
        s.unload(),
        "number" == typeof t ? 0 === t && 0 === s.$slides.length ? i(e).appendTo(s.$slideTrack) : o ? i(e).insertBefore(s.$slides.eq(t)) : i(e).insertAfter(s.$slides.eq(t)) : !0 === o ? i(e).prependTo(s.$slideTrack) : i(e).appendTo(s.$slideTrack),
        s.$slides = s.$slideTrack.children(this.options.slide),
        s.$slideTrack.children(this.options.slide).detach(),
        s.$slideTrack.append(s.$slides),
        s.$slides.each(function(e, t) {
            i(t).attr("data-slick-index", e)
        }),
        s.$slidesCache = s.$slides,
        s.reinit()
    }
    ,
    e.prototype.animateHeight = function() {
        var i = this;
        if (1 === i.options.slidesToShow && !0 === i.options.adaptiveHeight && !1 === i.options.vertical) {
            var e = i.$slides.eq(i.currentSlide).outerHeight(!0);
            i.$list.animate({
                height: e
            }, i.options.speed)
        }
    }
    ,
    e.prototype.animateSlide = function(e, t) {
        var o = {}
          , s = this;
        s.animateHeight(),
        !0 === s.options.rtl && !1 === s.options.vertical && (e = -e),
        !1 === s.transformsEnabled ? !1 === s.options.vertical ? s.$slideTrack.animate({
            left: e
        }, s.options.speed, s.options.easing, t) : s.$slideTrack.animate({
            top: e
        }, s.options.speed, s.options.easing, t) : !1 === s.cssTransitions ? (!0 === s.options.rtl && (s.currentLeft = -s.currentLeft),
        i({
            animStart: s.currentLeft
        }).animate({
            animStart: e
        }, {
            duration: s.options.speed,
            easing: s.options.easing,
            step: function(i) {
                i = Math.ceil(i),
                !1 === s.options.vertical ? (o[s.animType] = "translate(" + i + "px, 0px)",
                s.$slideTrack.css(o)) : (o[s.animType] = "translate(0px," + i + "px)",
                s.$slideTrack.css(o))
            },
            complete: function() {
                t && t.call()
            }
        })) : (s.applyTransition(),
        e = Math.ceil(e),
        !1 === s.options.vertical ? o[s.animType] = "translate3d(" + e + "px, 0px, 0px)" : o[s.animType] = "translate3d(0px," + e + "px, 0px)",
        s.$slideTrack.css(o),
        t && setTimeout(function() {
            s.disableTransition(),
            t.call()
        }, s.options.speed))
    }
    ,
    e.prototype.getNavTarget = function() {
        var e = this
          , t = e.options.asNavFor;
        return t && null !== t && (t = i(t).not(e.$slider)),
        t
    }
    ,
    e.prototype.asNavFor = function(e) {
        var t = this.getNavTarget();
        null !== t && "object" == typeof t && t.each(function() {
            var t = i(this).slick("getSlick");
            t.unslicked || t.slideHandler(e, !0)
        })
    }
    ,
    e.prototype.applyTransition = function(i) {
        var e = this
          , t = {};
        !1 === e.options.fade ? t[e.transitionType] = e.transformType + " " + e.options.speed + "ms " + e.options.cssEase : t[e.transitionType] = "opacity " + e.options.speed + "ms " + e.options.cssEase,
        !1 === e.options.fade ? e.$slideTrack.css(t) : e.$slides.eq(i).css(t)
    }
    ,
    e.prototype.autoPlay = function() {
        var i = this;
        i.autoPlayClear(),
        i.slideCount > i.options.slidesToShow && (i.autoPlayTimer = setInterval(i.autoPlayIterator, i.options.autoplaySpeed))
    }
    ,
    e.prototype.autoPlayClear = function() {
        var i = this;
        i.autoPlayTimer && clearInterval(i.autoPlayTimer)
    }
    ,
    e.prototype.autoPlayIterator = function() {
        var i = this
          , e = i.currentSlide + i.options.slidesToScroll;
        i.paused || i.interrupted || i.focussed || (!1 === i.options.infinite && (1 === i.direction && i.currentSlide + 1 === i.slideCount - 1 ? i.direction = 0 : 0 === i.direction && (e = i.currentSlide - i.options.slidesToScroll,
        i.currentSlide - 1 == 0 && (i.direction = 1))),
        i.slideHandler(e))
    }
    ,
    e.prototype.buildArrows = function() {
        var e = this;
        !0 === e.options.arrows && (e.$prevArrow = i(e.options.prevArrow).addClass("slick-arrow"),
        e.$nextArrow = i(e.options.nextArrow).addClass("slick-arrow"),
        e.slideCount > e.options.slidesToShow ? (e.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),
        e.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),
        e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.prependTo(e.options.appendArrows),
        e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.appendTo(e.options.appendArrows),
        !0 !== e.options.infinite && e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : e.$prevArrow.add(e.$nextArrow).addClass("slick-hidden").attr({
            "aria-disabled": "true",
            tabindex: "-1"
        }))
    }
    ,
    e.prototype.buildDots = function() {
        var e, t, o = this;
        if (!0 === o.options.dots) {
            for (o.$slider.addClass("slick-dotted"),
            t = i("<ul />").addClass(o.options.dotsClass),
            e = 0; e <= o.getDotCount(); e += 1)
                t.append(i("<li />").append(o.options.customPaging.call(this, o, e)));
            o.$dots = t.appendTo(o.options.appendDots),
            o.$dots.find("li").first().addClass("slick-active")
        }
    }
    ,
    e.prototype.buildOut = function() {
        var e = this;
        e.$slides = e.$slider.children(e.options.slide + ":not(.slick-cloned)").addClass("slick-slide"),
        e.slideCount = e.$slides.length,
        e.$slides.each(function(e, t) {
            i(t).attr("data-slick-index", e).data("originalStyling", i(t).attr("style") || "")
        }),
        e.$slider.addClass("slick-slider"),
        e.$slideTrack = 0 === e.slideCount ? i('<div class="slick-track"/>').appendTo(e.$slider) : e.$slides.wrapAll('<div class="slick-track"/>').parent(),
        e.$list = e.$slideTrack.wrap('<div class="slick-list"/>').parent(),
        e.$slideTrack.css("opacity", 0),
        !0 !== e.options.centerMode && !0 !== e.options.swipeToSlide || (e.options.slidesToScroll = 1),
        i("img[data-lazy]", e.$slider).not("[src]").addClass("slick-loading"),
        e.setupInfinite(),
        e.buildArrows(),
        e.buildDots(),
        e.updateDots(),
        e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0),
        !0 === e.options.draggable && e.$list.addClass("draggable")
    }
    ,
    e.prototype.buildRows = function() {
        var i, e, t, o, s, n, r, l = this;
        if (o = document.createDocumentFragment(),
        n = l.$slider.children(),
        l.options.rows > 1) {
            for (r = l.options.slidesPerRow * l.options.rows,
            s = Math.ceil(n.length / r),
            i = 0; i < s; i++) {
                var d = document.createElement("div");
                for (e = 0; e < l.options.rows; e++) {
                    var a = document.createElement("div");
                    for (t = 0; t < l.options.slidesPerRow; t++) {
                        var c = i * r + (e * l.options.slidesPerRow + t);
                        n.get(c) && a.appendChild(n.get(c))
                    }
                    d.appendChild(a)
                }
                o.appendChild(d)
            }
            l.$slider.empty().append(o),
            l.$slider.children().children().children().css({
                width: 100 / l.options.slidesPerRow + "%",
                display: "inline-block"
            })
        }
    }
    ,
    e.prototype.checkResponsive = function(e, t) {
        var o, s, n, r = this, l = !1, d = r.$slider.width(), a = window.innerWidth || i(window).width();
        if ("window" === r.respondTo ? n = a : "slider" === r.respondTo ? n = d : "min" === r.respondTo && (n = Math.min(a, d)),
        r.options.responsive && r.options.responsive.length && null !== r.options.responsive) {
            s = null;
            for (o in r.breakpoints)
                r.breakpoints.hasOwnProperty(o) && (!1 === r.originalSettings.mobileFirst ? n < r.breakpoints[o] && (s = r.breakpoints[o]) : n > r.breakpoints[o] && (s = r.breakpoints[o]));
            null !== s ? null !== r.activeBreakpoint ? (s !== r.activeBreakpoint || t) && (r.activeBreakpoint = s,
            "unslick" === r.breakpointSettings[s] ? r.unslick(s) : (r.options = i.extend({}, r.originalSettings, r.breakpointSettings[s]),
            !0 === e && (r.currentSlide = r.options.initialSlide),
            r.refresh(e)),
            l = s) : (r.activeBreakpoint = s,
            "unslick" === r.breakpointSettings[s] ? r.unslick(s) : (r.options = i.extend({}, r.originalSettings, r.breakpointSettings[s]),
            !0 === e && (r.currentSlide = r.options.initialSlide),
            r.refresh(e)),
            l = s) : null !== r.activeBreakpoint && (r.activeBreakpoint = null,
            r.options = r.originalSettings,
            !0 === e && (r.currentSlide = r.options.initialSlide),
            r.refresh(e),
            l = s),
            e || !1 === l || r.$slider.trigger("breakpoint", [r, l])
        }
    }
    ,
    e.prototype.changeSlide = function(e, t) {
        var o, s, n, r = this, l = i(e.currentTarget);
        switch (l.is("a") && e.preventDefault(),
        l.is("li") || (l = l.closest("li")),
        n = r.slideCount % r.options.slidesToScroll != 0,
        o = n ? 0 : (r.slideCount - r.currentSlide) % r.options.slidesToScroll,
        e.data.message) {
        case "previous":
            s = 0 === o ? r.options.slidesToScroll : r.options.slidesToShow - o,
            r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide - s, !1, t);
            break;
        case "next":
            s = 0 === o ? r.options.slidesToScroll : o,
            r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide + s, !1, t);
            break;
        case "index":
            var d = 0 === e.data.index ? 0 : e.data.index || l.index() * r.options.slidesToScroll;
            r.slideHandler(r.checkNavigable(d), !1, t),
            l.children().trigger("focus");
            break;
        default:
            return
        }
    }
    ,
    e.prototype.checkNavigable = function(i) {
        var e, t;
        if (e = this.getNavigableIndexes(),
        t = 0,
        i > e[e.length - 1])
            i = e[e.length - 1];
        else
            for (var o in e) {
                if (i < e[o]) {
                    i = t;
                    break
                }
                t = e[o]
            }
        return i
    }
    ,
    e.prototype.cleanUpEvents = function() {
        var e = this;
        e.options.dots && null !== e.$dots && (i("li", e.$dots).off("click.slick", e.changeSlide).off("mouseenter.slick", i.proxy(e.interrupt, e, !0)).off("mouseleave.slick", i.proxy(e.interrupt, e, !1)),
        !0 === e.options.accessibility && e.$dots.off("keydown.slick", e.keyHandler)),
        e.$slider.off("focus.slick blur.slick"),
        !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow && e.$prevArrow.off("click.slick", e.changeSlide),
        e.$nextArrow && e.$nextArrow.off("click.slick", e.changeSlide),
        !0 === e.options.accessibility && (e.$prevArrow && e.$prevArrow.off("keydown.slick", e.keyHandler),
        e.$nextArrow && e.$nextArrow.off("keydown.slick", e.keyHandler))),
        e.$list.off("touchstart.slick mousedown.slick", e.swipeHandler),
        e.$list.off("touchmove.slick mousemove.slick", e.swipeHandler),
        e.$list.off("touchend.slick mouseup.slick", e.swipeHandler),
        e.$list.off("touchcancel.slick mouseleave.slick", e.swipeHandler),
        e.$list.off("click.slick", e.clickHandler),
        i(document).off(e.visibilityChange, e.visibility),
        e.cleanUpSlideEvents(),
        !0 === e.options.accessibility && e.$list.off("keydown.slick", e.keyHandler),
        !0 === e.options.focusOnSelect && i(e.$slideTrack).children().off("click.slick", e.selectHandler),
        i(window).off("orientationchange.slick.slick-" + e.instanceUid, e.orientationChange),
        i(window).off("resize.slick.slick-" + e.instanceUid, e.resize),
        i("[draggable!=true]", e.$slideTrack).off("dragstart", e.preventDefault),
        i(window).off("load.slick.slick-" + e.instanceUid, e.setPosition)
    }
    ,
    e.prototype.cleanUpSlideEvents = function() {
        var e = this;
        e.$list.off("mouseenter.slick", i.proxy(e.interrupt, e, !0)),
        e.$list.off("mouseleave.slick", i.proxy(e.interrupt, e, !1))
    }
    ,
    e.prototype.cleanUpRows = function() {
        var i, e = this;
        e.options.rows > 1 && ((i = e.$slides.children().children()).removeAttr("style"),
        e.$slider.empty().append(i))
    }
    ,
    e.prototype.clickHandler = function(i) {
        !1 === this.shouldClick && (i.stopImmediatePropagation(),
        i.stopPropagation(),
        i.preventDefault())
    }
    ,
    e.prototype.destroy = function(e) {
        var t = this;
        t.autoPlayClear(),
        t.touchObject = {},
        t.cleanUpEvents(),
        i(".slick-cloned", t.$slider).detach(),
        t.$dots && t.$dots.remove(),
        t.$prevArrow && t.$prevArrow.length && (t.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""),
        t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.remove()),
        t.$nextArrow && t.$nextArrow.length && (t.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""),
        t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.remove()),
        t.$slides && (t.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function() {
            i(this).attr("style", i(this).data("originalStyling"))
        }),
        t.$slideTrack.children(this.options.slide).detach(),
        t.$slideTrack.detach(),
        t.$list.detach(),
        t.$slider.append(t.$slides)),
        t.cleanUpRows(),
        t.$slider.removeClass("slick-slider"),
        t.$slider.removeClass("slick-initialized"),
        t.$slider.removeClass("slick-dotted"),
        t.unslicked = !0,
        e || t.$slider.trigger("destroy", [t])
    }
    ,
    e.prototype.disableTransition = function(i) {
        var e = this
          , t = {};
        t[e.transitionType] = "",
        !1 === e.options.fade ? e.$slideTrack.css(t) : e.$slides.eq(i).css(t)
    }
    ,
    e.prototype.fadeSlide = function(i, e) {
        var t = this;
        !1 === t.cssTransitions ? (t.$slides.eq(i).css({
            zIndex: t.options.zIndex
        }),
        t.$slides.eq(i).animate({
            opacity: 1
        }, t.options.speed, t.options.easing, e)) : (t.applyTransition(i),
        t.$slides.eq(i).css({
            opacity: 1,
            zIndex: t.options.zIndex
        }),
        e && setTimeout(function() {
            t.disableTransition(i),
            e.call()
        }, t.options.speed))
    }
    ,
    e.prototype.fadeSlideOut = function(i) {
        var e = this;
        !1 === e.cssTransitions ? e.$slides.eq(i).animate({
            opacity: 0,
            zIndex: e.options.zIndex - 2
        }, e.options.speed, e.options.easing) : (e.applyTransition(i),
        e.$slides.eq(i).css({
            opacity: 0,
            zIndex: e.options.zIndex - 2
        }))
    }
    ,
    e.prototype.filterSlides = e.prototype.slickFilter = function(i) {
        var e = this;
        null !== i && (e.$slidesCache = e.$slides,
        e.unload(),
        e.$slideTrack.children(this.options.slide).detach(),
        e.$slidesCache.filter(i).appendTo(e.$slideTrack),
        e.reinit())
    }
    ,
    e.prototype.focusHandler = function() {
        var e = this;
        e.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*", function(t) {
            t.stopImmediatePropagation();
            var o = i(this);
            setTimeout(function() {
                e.options.pauseOnFocus && (e.focussed = o.is(":focus"),
                e.autoPlay())
            }, 0)
        })
    }
    ,
    e.prototype.getCurrent = e.prototype.slickCurrentSlide = function() {
        return this.currentSlide
    }
    ,
    e.prototype.getDotCount = function() {
        var i = this
          , e = 0
          , t = 0
          , o = 0;
        if (!0 === i.options.infinite)
            if (i.slideCount <= i.options.slidesToShow)
                ++o;
            else
                for (; e < i.slideCount; )
                    ++o,
                    e = t + i.options.slidesToScroll,
                    t += i.options.slidesToScroll <= i.options.slidesToShow ? i.options.slidesToScroll : i.options.slidesToShow;
        else if (!0 === i.options.centerMode)
            o = i.slideCount;
        else if (i.options.asNavFor)
            for (; e < i.slideCount; )
                ++o,
                e = t + i.options.slidesToScroll,
                t += i.options.slidesToScroll <= i.options.slidesToShow ? i.options.slidesToScroll : i.options.slidesToShow;
        else
            o = 1 + Math.ceil((i.slideCount - i.options.slidesToShow) / i.options.slidesToScroll);
        return o - 1
    }
    ,
    e.prototype.getLeft = function(i) {
        var e, t, o, s, n = this, r = 0;
        return n.slideOffset = 0,
        t = n.$slides.first().outerHeight(!0),
        !0 === n.options.infinite ? (n.slideCount > n.options.slidesToShow && (n.slideOffset = n.slideWidth * n.options.slidesToShow * -1,
        s = -1,
        !0 === n.options.vertical && !0 === n.options.centerMode && (2 === n.options.slidesToShow ? s = -1.5 : 1 === n.options.slidesToShow && (s = -2)),
        r = t * n.options.slidesToShow * s),
        n.slideCount % n.options.slidesToScroll != 0 && i + n.options.slidesToScroll > n.slideCount && n.slideCount > n.options.slidesToShow && (i > n.slideCount ? (n.slideOffset = (n.options.slidesToShow - (i - n.slideCount)) * n.slideWidth * -1,
        r = (n.options.slidesToShow - (i - n.slideCount)) * t * -1) : (n.slideOffset = n.slideCount % n.options.slidesToScroll * n.slideWidth * -1,
        r = n.slideCount % n.options.slidesToScroll * t * -1))) : i + n.options.slidesToShow > n.slideCount && (n.slideOffset = (i + n.options.slidesToShow - n.slideCount) * n.slideWidth,
        r = (i + n.options.slidesToShow - n.slideCount) * t),
        n.slideCount <= n.options.slidesToShow && (n.slideOffset = 0,
        r = 0),
        !0 === n.options.centerMode && n.slideCount <= n.options.slidesToShow ? n.slideOffset = n.slideWidth * Math.floor(n.options.slidesToShow) / 2 - n.slideWidth * n.slideCount / 2 : !0 === n.options.centerMode && !0 === n.options.infinite ? n.slideOffset += n.slideWidth * Math.floor(n.options.slidesToShow / 2) - n.slideWidth : !0 === n.options.centerMode && (n.slideOffset = 0,
        n.slideOffset += n.slideWidth * Math.floor(n.options.slidesToShow / 2)),
        e = !1 === n.options.vertical ? i * n.slideWidth * -1 + n.slideOffset : i * t * -1 + r,
        !0 === n.options.variableWidth && (o = n.slideCount <= n.options.slidesToShow || !1 === n.options.infinite ? n.$slideTrack.children(".slick-slide").eq(i) : n.$slideTrack.children(".slick-slide").eq(i + n.options.slidesToShow),
        e = !0 === n.options.rtl ? o[0] ? -1 * (n.$slideTrack.width() - o[0].offsetLeft - o.width()) : 0 : o[0] ? -1 * o[0].offsetLeft : 0,
        !0 === n.options.centerMode && (o = n.slideCount <= n.options.slidesToShow || !1 === n.options.infinite ? n.$slideTrack.children(".slick-slide").eq(i) : n.$slideTrack.children(".slick-slide").eq(i + n.options.slidesToShow + 1),
        e = !0 === n.options.rtl ? o[0] ? -1 * (n.$slideTrack.width() - o[0].offsetLeft - o.width()) : 0 : o[0] ? -1 * o[0].offsetLeft : 0,
        e += (n.$list.width() - o.outerWidth()) / 2)),
        e
    }
    ,
    e.prototype.getOption = e.prototype.slickGetOption = function(i) {
        return this.options[i]
    }
    ,
    e.prototype.getNavigableIndexes = function() {
        var i, e = this, t = 0, o = 0, s = [];
        for (!1 === e.options.infinite ? i = e.slideCount : (t = -1 * e.options.slidesToScroll,
        o = -1 * e.options.slidesToScroll,
        i = 2 * e.slideCount); t < i; )
            s.push(t),
            t = o + e.options.slidesToScroll,
            o += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
        return s
    }
    ,
    e.prototype.getSlick = function() {
        return this
    }
    ,
    e.prototype.getSlideCount = function() {
        var e, t, o = this;
        return t = !0 === o.options.centerMode ? o.slideWidth * Math.floor(o.options.slidesToShow / 2) : 0,
        !0 === o.options.swipeToSlide ? (o.$slideTrack.find(".slick-slide").each(function(s, n) {
            if (n.offsetLeft - t + i(n).outerWidth() / 2 > -1 * o.swipeLeft)
                return e = n,
                !1
        }),
        Math.abs(i(e).attr("data-slick-index") - o.currentSlide) || 1) : o.options.slidesToScroll
    }
    ,
    e.prototype.goTo = e.prototype.slickGoTo = function(i, e) {
        this.changeSlide({
            data: {
                message: "index",
                index: parseInt(i)
            }
        }, e)
    }
    ,
    e.prototype.init = function(e) {
        var t = this;
        i(t.$slider).hasClass("slick-initialized") || (i(t.$slider).addClass("slick-initialized"),
        t.buildRows(),
        t.buildOut(),
        t.setProps(),
        t.startLoad(),
        t.loadSlider(),
        t.initializeEvents(),
        t.updateArrows(),
        t.updateDots(),
        t.checkResponsive(!0),
        t.focusHandler()),
        e && t.$slider.trigger("init", [t]),
        !0 === t.options.accessibility && t.initADA(),
        t.options.autoplay && (t.paused = !1,
        t.autoPlay())
    }
    ,
    e.prototype.initADA = function() {
        var e = this
          , t = Math.ceil(e.slideCount / e.options.slidesToShow)
          , o = e.getNavigableIndexes().filter(function(i) {
            return i >= 0 && i < e.slideCount
        });
        e.$slides.add(e.$slideTrack.find(".slick-cloned")).attr({
            "aria-hidden": "true",
            tabindex: "-1"
        }).find("a, input, button, select").attr({
            tabindex: "-1"
        }),
        null !== e.$dots && (e.$slides.not(e.$slideTrack.find(".slick-cloned")).each(function(t) {
            var s = o.indexOf(t);
            i(this).attr({
                role: "tabpanel",
                id: "slick-slide" + e.instanceUid + t,
                tabindex: -1
            }),
            -1 !== s && i(this).attr({
                "aria-describedby": "slick-slide-control" + e.instanceUid + s
            })
        }),
        e.$dots.attr("role", "tablist").find("li").each(function(s) {
            var n = o[s];
            i(this).attr({
                role: "presentation"
            }),
            i(this).find("button").first().attr({
                role: "tab",
                id: "slick-slide-control" + e.instanceUid + s,
                "aria-controls": "slick-slide" + e.instanceUid + n,
                "aria-label": s + 1 + " of " + t,
                "aria-selected": null,
                tabindex: "0"
            })
        }).eq(e.currentSlide).find("button").attr({
            "aria-selected": "true",
            tabindex: "0"
        }).end());
        for (var s = e.currentSlide, n = s + e.options.slidesToShow; s < n; s++)
            e.activateADA()
    }
    ,
    e.prototype.initArrowEvents = function() {
        var i = this;
        !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && (i.$prevArrow.off("click.slick").on("click.slick", {
            message: "previous"
        }, i.changeSlide),
        i.$nextArrow.off("click.slick").on("click.slick", {
            message: "next"
        }, i.changeSlide),
        !0 === i.options.accessibility && (i.$prevArrow.on("keydown.slick", i.keyHandler),
        i.$nextArrow.on("keydown.slick", i.keyHandler)))
    }
    ,
    e.prototype.initDotEvents = function() {
        var e = this;
        !0 === e.options.dots && (i("li", e.$dots).on("click.slick", {
            message: "index"
        }, e.changeSlide),
        !0 === e.options.accessibility && e.$dots.on("keydown.slick", e.keyHandler)),
        !0 === e.options.dots && !0 === e.options.pauseOnDotsHover && i("li", e.$dots).on("mouseenter.slick", i.proxy(e.interrupt, e, !0)).on("mouseleave.slick", i.proxy(e.interrupt, e, !1))
    }
    ,
    e.prototype.initSlideEvents = function() {
        var e = this;
        e.options.pauseOnHover && (e.$list.on("mouseenter.slick", i.proxy(e.interrupt, e, !0)),
        e.$list.on("mouseleave.slick", i.proxy(e.interrupt, e, !1)))
    }
    ,
    e.prototype.initializeEvents = function() {
        var e = this;
        e.initArrowEvents(),
        e.initDotEvents(),
        e.initSlideEvents(),
        e.$list.on("touchstart.slick mousedown.slick", {
            action: "start"
        }, e.swipeHandler),
        e.$list.on("touchmove.slick mousemove.slick", {
            action: "move"
        }, e.swipeHandler),
        e.$list.on("touchend.slick mouseup.slick", {
            action: "end"
        }, e.swipeHandler),
        e.$list.on("touchcancel.slick mouseleave.slick", {
            action: "end"
        }, e.swipeHandler),
        e.$list.on("click.slick", e.clickHandler),
        i(document).on(e.visibilityChange, i.proxy(e.visibility, e)),
        !0 === e.options.accessibility && e.$list.on("keydown.slick", e.keyHandler),
        !0 === e.options.focusOnSelect && i(e.$slideTrack).children().on("click.slick", e.selectHandler),
        i(window).on("orientationchange.slick.slick-" + e.instanceUid, i.proxy(e.orientationChange, e)),
        i(window).on("resize.slick.slick-" + e.instanceUid, i.proxy(e.resize, e)),
        i("[draggable!=true]", e.$slideTrack).on("dragstart", e.preventDefault),
        i(window).on("load.slick.slick-" + e.instanceUid, e.setPosition),
        i(e.setPosition)
    }
    ,
    e.prototype.initUI = function() {
        var i = this;
        !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && (i.$prevArrow.show(),
        i.$nextArrow.show()),
        !0 === i.options.dots && i.slideCount > i.options.slidesToShow && i.$dots.show()
    }
    ,
    e.prototype.keyHandler = function(i) {
        var e = this;
        i.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === i.keyCode && !0 === e.options.accessibility ? e.changeSlide({
            data: {
                message: !0 === e.options.rtl ? "next" : "previous"
            }
        }) : 39 === i.keyCode && !0 === e.options.accessibility && e.changeSlide({
            data: {
                message: !0 === e.options.rtl ? "previous" : "next"
            }
        }))
    }
    ,
    e.prototype.lazyLoad = function() {
        function e(e) {
            i("img[data-lazy]", e).each(function() {
                var e = i(this)
                  , t = i(this).attr("data-lazy")
                  , o = i(this).attr("data-srcset")
                  , s = i(this).attr("data-sizes") || n.$slider.attr("data-sizes")
                  , r = document.createElement("img");
                r.onload = function() {
                    e.animate({
                        opacity: 0
                    }, 100, function() {
                        o && (e.attr("srcset", o),
                        s && e.attr("sizes", s)),
                        e.attr("src", t).animate({
                            opacity: 1
                        }, 200, function() {
                            e.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading")
                        }),
                        n.$slider.trigger("lazyLoaded", [n, e, t])
                    })
                }
                ,
                r.onerror = function() {
                    e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),
                    n.$slider.trigger("lazyLoadError", [n, e, t])
                }
                ,
                r.src = t
            })
        }
        var t, o, s, n = this;
        if (!0 === n.options.centerMode ? !0 === n.options.infinite ? s = (o = n.currentSlide + (n.options.slidesToShow / 2 + 1)) + n.options.slidesToShow + 2 : (o = Math.max(0, n.currentSlide - (n.options.slidesToShow / 2 + 1)),
        s = n.options.slidesToShow / 2 + 1 + 2 + n.currentSlide) : (o = n.options.infinite ? n.options.slidesToShow + n.currentSlide : n.currentSlide,
        s = Math.ceil(o + n.options.slidesToShow),
        !0 === n.options.fade && (o > 0 && o--,
        s <= n.slideCount && s++)),
        t = n.$slider.find(".slick-slide").slice(o, s),
        "anticipated" === n.options.lazyLoad)
            for (var r = o - 1, l = s, d = n.$slider.find(".slick-slide"), a = 0; a < n.options.slidesToScroll; a++)
                r < 0 && (r = n.slideCount - 1),
                t = (t = t.add(d.eq(r))).add(d.eq(l)),
                r--,
                l++;
        e(t),
        n.slideCount <= n.options.slidesToShow ? e(n.$slider.find(".slick-slide")) : n.currentSlide >= n.slideCount - n.options.slidesToShow ? e(n.$slider.find(".slick-cloned").slice(0, n.options.slidesToShow)) : 0 === n.currentSlide && e(n.$slider.find(".slick-cloned").slice(-1 * n.options.slidesToShow))
    }
    ,
    e.prototype.loadSlider = function() {
        var i = this;
        i.setPosition(),
        i.$slideTrack.css({
            opacity: 1
        }),
        i.$slider.removeClass("slick-loading"),
        i.initUI(),
        "progressive" === i.options.lazyLoad && i.progressiveLazyLoad()
    }
    ,
    e.prototype.next = e.prototype.slickNext = function() {
        this.changeSlide({
            data: {
                message: "next"
            }
        })
    }
    ,
    e.prototype.orientationChange = function() {
        var i = this;
        i.checkResponsive(),
        i.setPosition()
    }
    ,
    e.prototype.pause = e.prototype.slickPause = function() {
        var i = this;
        i.autoPlayClear(),
        i.paused = !0
    }
    ,
    e.prototype.play = e.prototype.slickPlay = function() {
        var i = this;
        i.autoPlay(),
        i.options.autoplay = !0,
        i.paused = !1,
        i.focussed = !1,
        i.interrupted = !1
    }
    ,
    e.prototype.postSlide = function(e) {
        var t = this;
        t.unslicked || (t.$slider.trigger("afterChange", [t, e]),
        t.animating = !1,
        t.slideCount > t.options.slidesToShow && t.setPosition(),
        t.swipeLeft = null,
        t.options.autoplay && t.autoPlay(),
        !0 === t.options.accessibility && (t.initADA(),
        t.options.focusOnChange && i(t.$slides.get(t.currentSlide)).attr("tabindex", 0).focus()))
    }
    ,
    e.prototype.prev = e.prototype.slickPrev = function() {
        this.changeSlide({
            data: {
                message: "previous"
            }
        })
    }
    ,
    e.prototype.preventDefault = function(i) {
        i.preventDefault()
    }
    ,
    e.prototype.progressiveLazyLoad = function(e) {
        e = e || 1;
        var t, o, s, n, r, l = this, d = i("img[data-lazy]", l.$slider);
        d.length ? (t = d.first(),
        o = t.attr("data-lazy"),
        s = t.attr("data-srcset"),
        n = t.attr("data-sizes") || l.$slider.attr("data-sizes"),
        (r = document.createElement("img")).onload = function() {
            s && (t.attr("srcset", s),
            n && t.attr("sizes", n)),
            t.attr("src", o).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading"),
            !0 === l.options.adaptiveHeight && l.setPosition(),
            l.$slider.trigger("lazyLoaded", [l, t, o]),
            l.progressiveLazyLoad()
        }
        ,
        r.onerror = function() {
            e < 3 ? setTimeout(function() {
                l.progressiveLazyLoad(e + 1)
            }, 500) : (t.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),
            l.$slider.trigger("lazyLoadError", [l, t, o]),
            l.progressiveLazyLoad())
        }
        ,
        r.src = o) : l.$slider.trigger("allImagesLoaded", [l])
    }
    ,
    e.prototype.refresh = function(e) {
        var t, o, s = this;
        o = s.slideCount - s.options.slidesToShow,
        !s.options.infinite && s.currentSlide > o && (s.currentSlide = o),
        s.slideCount <= s.options.slidesToShow && (s.currentSlide = 0),
        t = s.currentSlide,
        s.destroy(!0),
        i.extend(s, s.initials, {
            currentSlide: t
        }),
        s.init(),
        e || s.changeSlide({
            data: {
                message: "index",
                index: t
            }
        }, !1)
    }
    ,
    e.prototype.registerBreakpoints = function() {
        var e, t, o, s = this, n = s.options.responsive || null;
        if ("array" === i.type(n) && n.length) {
            s.respondTo = s.options.respondTo || "window";
            for (e in n)
                if (o = s.breakpoints.length - 1,
                n.hasOwnProperty(e)) {
                    for (t = n[e].breakpoint; o >= 0; )
                        s.breakpoints[o] && s.breakpoints[o] === t && s.breakpoints.splice(o, 1),
                        o--;
                    s.breakpoints.push(t),
                    s.breakpointSettings[t] = n[e].settings
                }
            s.breakpoints.sort(function(i, e) {
                return s.options.mobileFirst ? i - e : e - i
            })
        }
    }
    ,
    e.prototype.reinit = function() {
        var e = this;
        e.$slides = e.$slideTrack.children(e.options.slide).addClass("slick-slide"),
        e.slideCount = e.$slides.length,
        e.currentSlide >= e.slideCount && 0 !== e.currentSlide && (e.currentSlide = e.currentSlide - e.options.slidesToScroll),
        e.slideCount <= e.options.slidesToShow && (e.currentSlide = 0),
        e.registerBreakpoints(),
        e.setProps(),
        e.setupInfinite(),
        e.buildArrows(),
        e.updateArrows(),
        e.initArrowEvents(),
        e.buildDots(),
        e.updateDots(),
        e.initDotEvents(),
        e.cleanUpSlideEvents(),
        e.initSlideEvents(),
        e.checkResponsive(!1, !0),
        !0 === e.options.focusOnSelect && i(e.$slideTrack).children().on("click.slick", e.selectHandler),
        e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0),
        e.setPosition(),
        e.focusHandler(),
        e.paused = !e.options.autoplay,
        e.autoPlay(),
        e.$slider.trigger("reInit", [e])
    }
    ,
    e.prototype.resize = function() {
        var e = this;
        i(window).width() !== e.windowWidth && (clearTimeout(e.windowDelay),
        e.windowDelay = window.setTimeout(function() {
            e.windowWidth = i(window).width(),
            e.checkResponsive(),
            e.unslicked || e.setPosition()
        }, 50))
    }
    ,
    e.prototype.removeSlide = e.prototype.slickRemove = function(i, e, t) {
        var o = this;
        if (i = "boolean" == typeof i ? !0 === (e = i) ? 0 : o.slideCount - 1 : !0 === e ? --i : i,
        o.slideCount < 1 || i < 0 || i > o.slideCount - 1)
            return !1;
        o.unload(),
        !0 === t ? o.$slideTrack.children().remove() : o.$slideTrack.children(this.options.slide).eq(i).remove(),
        o.$slides = o.$slideTrack.children(this.options.slide),
        o.$slideTrack.children(this.options.slide).detach(),
        o.$slideTrack.append(o.$slides),
        o.$slidesCache = o.$slides,
        o.reinit()
    }
    ,
    e.prototype.setCSS = function(i) {
        var e, t, o = this, s = {};
        !0 === o.options.rtl && (i = -i),
        e = "left" == o.positionProp ? Math.ceil(i) + "px" : "0px",
        t = "top" == o.positionProp ? Math.ceil(i) + "px" : "0px",
        s[o.positionProp] = i,
        !1 === o.transformsEnabled ? o.$slideTrack.css(s) : (s = {},
        !1 === o.cssTransitions ? (s[o.animType] = "translate(" + e + ", " + t + ")",
        o.$slideTrack.css(s)) : (s[o.animType] = "translate3d(" + e + ", " + t + ", 0px)",
        o.$slideTrack.css(s)))
    }
    ,
    e.prototype.setDimensions = function() {
        var i = this;
        !1 === i.options.vertical ? !0 === i.options.centerMode && i.$list.css({
            padding: "0px " + i.options.centerPadding
        }) : (i.$list.height(i.$slides.first().outerHeight(!0) * i.options.slidesToShow),
        !0 === i.options.centerMode && i.$list.css({
            padding: i.options.centerPadding + " 0px"
        })),
        i.listWidth = i.$list.width(),
        i.listHeight = i.$list.height(),
        !1 === i.options.vertical && !1 === i.options.variableWidth ? (i.slideWidth = Math.ceil(i.listWidth / i.options.slidesToShow),
        i.$slideTrack.width(Math.ceil(i.slideWidth * i.$slideTrack.children(".slick-slide").length))) : !0 === i.options.variableWidth ? i.$slideTrack.width(5e3 * i.slideCount) : (i.slideWidth = Math.ceil(i.listWidth),
        i.$slideTrack.height(Math.ceil(i.$slides.first().outerHeight(!0) * i.$slideTrack.children(".slick-slide").length)));
        var e = i.$slides.first().outerWidth(!0) - i.$slides.first().width();
        !1 === i.options.variableWidth && i.$slideTrack.children(".slick-slide").width(i.slideWidth - e)
    }
    ,
    e.prototype.setFade = function() {
        var e, t = this;
        t.$slides.each(function(o, s) {
            e = t.slideWidth * o * -1,
            !0 === t.options.rtl ? i(s).css({
                position: "relative",
                right: e,
                top: 0,
                zIndex: t.options.zIndex - 2,
                opacity: 0
            }) : i(s).css({
                position: "relative",
                left: e,
                top: 0,
                zIndex: t.options.zIndex - 2,
                opacity: 0
            })
        }),
        t.$slides.eq(t.currentSlide).css({
            zIndex: t.options.zIndex - 1,
            opacity: 1
        })
    }
    ,
    e.prototype.setHeight = function() {
        var i = this;
        if (1 === i.options.slidesToShow && !0 === i.options.adaptiveHeight && !1 === i.options.vertical) {
            var e = i.$slides.eq(i.currentSlide).outerHeight(!0);
            i.$list.css("height", e)
        }
    }
    ,
    e.prototype.setOption = e.prototype.slickSetOption = function() {
        var e, t, o, s, n, r = this, l = !1;
        if ("object" === i.type(arguments[0]) ? (o = arguments[0],
        l = arguments[1],
        n = "multiple") : "string" === i.type(arguments[0]) && (o = arguments[0],
        s = arguments[1],
        l = arguments[2],
        "responsive" === arguments[0] && "array" === i.type(arguments[1]) ? n = "responsive" : void 0 !== arguments[1] && (n = "single")),
        "single" === n)
            r.options[o] = s;
        else if ("multiple" === n)
            i.each(o, function(i, e) {
                r.options[i] = e
            });
        else if ("responsive" === n)
            for (t in s)
                if ("array" !== i.type(r.options.responsive))
                    r.options.responsive = [s[t]];
                else {
                    for (e = r.options.responsive.length - 1; e >= 0; )
                        r.options.responsive[e].breakpoint === s[t].breakpoint && r.options.responsive.splice(e, 1),
                        e--;
                    r.options.responsive.push(s[t])
                }
        l && (r.unload(),
        r.reinit())
    }
    ,
    e.prototype.setPosition = function() {
        var i = this;
        i.setDimensions(),
        i.setHeight(),
        !1 === i.options.fade ? i.setCSS(i.getLeft(i.currentSlide)) : i.setFade(),
        i.$slider.trigger("setPosition", [i])
    }
    ,
    e.prototype.setProps = function() {
        var i = this
          , e = document.body.style;
        i.positionProp = !0 === i.options.vertical ? "top" : "left",
        "top" === i.positionProp ? i.$slider.addClass("slick-vertical") : i.$slider.removeClass("slick-vertical"),
        void 0 === e.WebkitTransition && void 0 === e.MozTransition && void 0 === e.msTransition || !0 === i.options.useCSS && (i.cssTransitions = !0),
        i.options.fade && ("number" == typeof i.options.zIndex ? i.options.zIndex < 3 && (i.options.zIndex = 3) : i.options.zIndex = i.defaults.zIndex),
        void 0 !== e.OTransform && (i.animType = "OTransform",
        i.transformType = "-o-transform",
        i.transitionType = "OTransition",
        void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (i.animType = !1)),
        void 0 !== e.MozTransform && (i.animType = "MozTransform",
        i.transformType = "-moz-transform",
        i.transitionType = "MozTransition",
        void 0 === e.perspectiveProperty && void 0 === e.MozPerspective && (i.animType = !1)),
        void 0 !== e.webkitTransform && (i.animType = "webkitTransform",
        i.transformType = "-webkit-transform",
        i.transitionType = "webkitTransition",
        void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (i.animType = !1)),
        void 0 !== e.msTransform && (i.animType = "msTransform",
        i.transformType = "-ms-transform",
        i.transitionType = "msTransition",
        void 0 === e.msTransform && (i.animType = !1)),
        void 0 !== e.transform && !1 !== i.animType && (i.animType = "transform",
        i.transformType = "transform",
        i.transitionType = "transition"),
        i.transformsEnabled = i.options.useTransform && null !== i.animType && !1 !== i.animType
    }
    ,
    e.prototype.setSlideClasses = function(i) {
        var e, t, o, s, n = this;
        if (t = n.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"),
        n.$slides.eq(i).addClass("slick-current"),
        !0 === n.options.centerMode) {
            var r = n.options.slidesToShow % 2 == 0 ? 1 : 0;
            e = Math.floor(n.options.slidesToShow / 2),
            !0 === n.options.infinite && (i >= e && i <= n.slideCount - 1 - e ? n.$slides.slice(i - e + r, i + e + 1).addClass("slick-active").attr("aria-hidden", "false") : (o = n.options.slidesToShow + i,
            t.slice(o - e + 1 + r, o + e + 2).addClass("slick-active").attr("aria-hidden", "false")),
            0 === i ? t.eq(t.length - 1 - n.options.slidesToShow).addClass("slick-center") : i === n.slideCount - 1 && t.eq(n.options.slidesToShow).addClass("slick-center")),
            n.$slides.eq(i).addClass("slick-center")
        } else
            i >= 0 && i <= n.slideCount - n.options.slidesToShow ? n.$slides.slice(i, i + n.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : t.length <= n.options.slidesToShow ? t.addClass("slick-active").attr("aria-hidden", "false") : (s = n.slideCount % n.options.slidesToShow,
            o = !0 === n.options.infinite ? n.options.slidesToShow + i : i,
            n.options.slidesToShow == n.options.slidesToScroll && n.slideCount - i < n.options.slidesToShow ? t.slice(o - (n.options.slidesToShow - s), o + s).addClass("slick-active").attr("aria-hidden", "false") : t.slice(o, o + n.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false"));
        "ondemand" !== n.options.lazyLoad && "anticipated" !== n.options.lazyLoad || n.lazyLoad()
    }
    ,
    e.prototype.setupInfinite = function() {
        var e, t, o, s = this;
        if (!0 === s.options.fade && (s.options.centerMode = !1),
        !0 === s.options.infinite && !1 === s.options.fade && (t = null,
        s.slideCount > s.options.slidesToShow)) {
            for (o = !0 === s.options.centerMode ? s.options.slidesToShow + 1 : s.options.slidesToShow,
            e = s.slideCount; e > s.slideCount - o; e -= 1)
                t = e - 1,
                i(s.$slides[t]).clone(!0).attr("id", "").attr("data-slick-index", t - s.slideCount).prependTo(s.$slideTrack).addClass("slick-cloned");
            for (e = 0; e < o + s.slideCount; e += 1)
                t = e,
                i(s.$slides[t]).clone(!0).attr("id", "").attr("data-slick-index", t + s.slideCount).appendTo(s.$slideTrack).addClass("slick-cloned");
            s.$slideTrack.find(".slick-cloned").find("[id]").each(function() {
                i(this).attr("id", "")
            })
        }
    }
    ,
    e.prototype.interrupt = function(i) {
        var e = this;
        i || e.autoPlay(),
        e.interrupted = i
    }
    ,
    e.prototype.selectHandler = function(e) {
        var t = this
          , o = i(e.target).is(".slick-slide") ? i(e.target) : i(e.target).parents(".slick-slide")
          , s = parseInt(o.attr("data-slick-index"));
        s || (s = 0),
        t.slideCount <= t.options.slidesToShow ? t.slideHandler(s, !1, !0) : t.slideHandler(s)
    }
    ,
    e.prototype.slideHandler = function(i, e, t) {
        var o, s, n, r, l, d = null, a = this;
        if (e = e || !1,
        !(!0 === a.animating && !0 === a.options.waitForAnimate || !0 === a.options.fade && a.currentSlide === i))
            if (!1 === e && a.asNavFor(i),
            o = i,
            d = a.getLeft(o),
            r = a.getLeft(a.currentSlide),
            a.currentLeft = null === a.swipeLeft ? r : a.swipeLeft,
            !1 === a.options.infinite && !1 === a.options.centerMode && (i < 0 || i > a.getDotCount() * a.options.slidesToScroll))
                !1 === a.options.fade && (o = a.currentSlide,
                !0 !== t ? a.animateSlide(r, function() {
                    a.postSlide(o)
                }) : a.postSlide(o));
            else if (!1 === a.options.infinite && !0 === a.options.centerMode && (i < 0 || i > a.slideCount - a.options.slidesToScroll))
                !1 === a.options.fade && (o = a.currentSlide,
                !0 !== t ? a.animateSlide(r, function() {
                    a.postSlide(o)
                }) : a.postSlide(o));
            else {
                if (a.options.autoplay && clearInterval(a.autoPlayTimer),
                s = o < 0 ? a.slideCount % a.options.slidesToScroll != 0 ? a.slideCount - a.slideCount % a.options.slidesToScroll : a.slideCount + o : o >= a.slideCount ? a.slideCount % a.options.slidesToScroll != 0 ? 0 : o - a.slideCount : o,
                a.animating = !0,
                a.$slider.trigger("beforeChange", [a, a.currentSlide, s]),
                n = a.currentSlide,
                a.currentSlide = s,
                a.setSlideClasses(a.currentSlide),
                a.options.asNavFor && (l = (l = a.getNavTarget()).slick("getSlick")).slideCount <= l.options.slidesToShow && l.setSlideClasses(a.currentSlide),
                a.updateDots(),
                a.updateArrows(),
                !0 === a.options.fade)
                    return !0 !== t ? (a.fadeSlideOut(n),
                    a.fadeSlide(s, function() {
                        a.postSlide(s)
                    })) : a.postSlide(s),
                    void a.animateHeight();
                !0 !== t ? a.animateSlide(d, function() {
                    a.postSlide(s)
                }) : a.postSlide(s)
            }
    }
    ,
    e.prototype.startLoad = function() {
        var i = this;
        !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && (i.$prevArrow.hide(),
        i.$nextArrow.hide()),
        !0 === i.options.dots && i.slideCount > i.options.slidesToShow && i.$dots.hide(),
        i.$slider.addClass("slick-loading")
    }
    ,
    e.prototype.swipeDirection = function() {
        var i, e, t, o, s = this;
        return i = s.touchObject.startX - s.touchObject.curX,
        e = s.touchObject.startY - s.touchObject.curY,
        t = Math.atan2(e, i),
        (o = Math.round(180 * t / Math.PI)) < 0 && (o = 360 - Math.abs(o)),
        o <= 45 && o >= 0 ? !1 === s.options.rtl ? "left" : "right" : o <= 360 && o >= 315 ? !1 === s.options.rtl ? "left" : "right" : o >= 135 && o <= 225 ? !1 === s.options.rtl ? "right" : "left" : !0 === s.options.verticalSwiping ? o >= 35 && o <= 135 ? "down" : "up" : "vertical"
    }
    ,
    e.prototype.swipeEnd = function(i) {
        var e, t, o = this;
        if (o.dragging = !1,
        o.swiping = !1,
        o.scrolling)
            return o.scrolling = !1,
            !1;
        if (o.interrupted = !1,
        o.shouldClick = !(o.touchObject.swipeLength > 10),
        void 0 === o.touchObject.curX)
            return !1;
        if (!0 === o.touchObject.edgeHit && o.$slider.trigger("edge", [o, o.swipeDirection()]),
        o.touchObject.swipeLength >= o.touchObject.minSwipe) {
            switch (t = o.swipeDirection()) {
            case "left":
            case "down":
                e = o.options.swipeToSlide ? o.checkNavigable(o.currentSlide + o.getSlideCount()) : o.currentSlide + o.getSlideCount(),
                o.currentDirection = 0;
                break;
            case "right":
            case "up":
                e = o.options.swipeToSlide ? o.checkNavigable(o.currentSlide - o.getSlideCount()) : o.currentSlide - o.getSlideCount(),
                o.currentDirection = 1
            }
            "vertical" != t && (o.slideHandler(e),
            o.touchObject = {},
            o.$slider.trigger("swipe", [o, t]))
        } else
            o.touchObject.startX !== o.touchObject.curX && (o.slideHandler(o.currentSlide),
            o.touchObject = {})
    }
    ,
    e.prototype.swipeHandler = function(i) {
        var e = this;
        if (!(!1 === e.options.swipe || "ontouchend"in document && !1 === e.options.swipe || !1 === e.options.draggable && -1 !== i.type.indexOf("mouse")))
            switch (e.touchObject.fingerCount = i.originalEvent && void 0 !== i.originalEvent.touches ? i.originalEvent.touches.length : 1,
            e.touchObject.minSwipe = e.listWidth / e.options.touchThreshold,
            !0 === e.options.verticalSwiping && (e.touchObject.minSwipe = e.listHeight / e.options.touchThreshold),
            i.data.action) {
            case "start":
                e.swipeStart(i);
                break;
            case "move":
                e.swipeMove(i);
                break;
            case "end":
                e.swipeEnd(i)
            }
    }
    ,
    e.prototype.swipeMove = function(i) {
        var e, t, o, s, n, r, l = this;
        return n = void 0 !== i.originalEvent ? i.originalEvent.touches : null,
        !(!l.dragging || l.scrolling || n && 1 !== n.length) && (e = l.getLeft(l.currentSlide),
        l.touchObject.curX = void 0 !== n ? n[0].pageX : i.clientX,
        l.touchObject.curY = void 0 !== n ? n[0].pageY : i.clientY,
        l.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(l.touchObject.curX - l.touchObject.startX, 2))),
        r = Math.round(Math.sqrt(Math.pow(l.touchObject.curY - l.touchObject.startY, 2))),
        !l.options.verticalSwiping && !l.swiping && r > 4 ? (l.scrolling = !0,
        !1) : (!0 === l.options.verticalSwiping && (l.touchObject.swipeLength = r),
        t = l.swipeDirection(),
        void 0 !== i.originalEvent && l.touchObject.swipeLength > 4 && (l.swiping = !0,
        i.preventDefault()),
        s = (!1 === l.options.rtl ? 1 : -1) * (l.touchObject.curX > l.touchObject.startX ? 1 : -1),
        !0 === l.options.verticalSwiping && (s = l.touchObject.curY > l.touchObject.startY ? 1 : -1),
        o = l.touchObject.swipeLength,
        l.touchObject.edgeHit = !1,
        !1 === l.options.infinite && (0 === l.currentSlide && "right" === t || l.currentSlide >= l.getDotCount() && "left" === t) && (o = l.touchObject.swipeLength * l.options.edgeFriction,
        l.touchObject.edgeHit = !0),
        !1 === l.options.vertical ? l.swipeLeft = e + o * s : l.swipeLeft = e + o * (l.$list.height() / l.listWidth) * s,
        !0 === l.options.verticalSwiping && (l.swipeLeft = e + o * s),
        !0 !== l.options.fade && !1 !== l.options.touchMove && (!0 === l.animating ? (l.swipeLeft = null,
        !1) : void l.setCSS(l.swipeLeft))))
    }
    ,
    e.prototype.swipeStart = function(i) {
        var e, t = this;
        if (t.interrupted = !0,
        1 !== t.touchObject.fingerCount || t.slideCount <= t.options.slidesToShow)
            return t.touchObject = {},
            !1;
        void 0 !== i.originalEvent && void 0 !== i.originalEvent.touches && (e = i.originalEvent.touches[0]),
        t.touchObject.startX = t.touchObject.curX = void 0 !== e ? e.pageX : i.clientX,
        t.touchObject.startY = t.touchObject.curY = void 0 !== e ? e.pageY : i.clientY,
        t.dragging = !0
    }
    ,
    e.prototype.unfilterSlides = e.prototype.slickUnfilter = function() {
        var i = this;
        null !== i.$slidesCache && (i.unload(),
        i.$slideTrack.children(this.options.slide).detach(),
        i.$slidesCache.appendTo(i.$slideTrack),
        i.reinit())
    }
    ,
    e.prototype.unload = function() {
        var e = this;
        i(".slick-cloned", e.$slider).remove(),
        e.$dots && e.$dots.remove(),
        e.$prevArrow && e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.remove(),
        e.$nextArrow && e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.remove(),
        e.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
    }
    ,
    e.prototype.unslick = function(i) {
        var e = this;
        e.$slider.trigger("unslick", [e, i]),
        e.destroy()
    }
    ,
    e.prototype.updateArrows = function() {
        var i = this;
        Math.floor(i.options.slidesToShow / 2),
        !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && !i.options.infinite && (i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"),
        i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"),
        0 === i.currentSlide ? (i.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"),
        i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : i.currentSlide >= i.slideCount - i.options.slidesToShow && !1 === i.options.centerMode ? (i.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"),
        i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : i.currentSlide >= i.slideCount - 1 && !0 === i.options.centerMode && (i.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"),
        i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")))
    }
    ,
    e.prototype.updateDots = function() {
        var i = this;
        null !== i.$dots && (i.$dots.find("li").removeClass("slick-active").end(),
        i.$dots.find("li").eq(Math.floor(i.currentSlide / i.options.slidesToScroll)).addClass("slick-active"))
    }
    ,
    e.prototype.visibility = function() {
        var i = this;
        i.options.autoplay && (document[i.hidden] ? i.interrupted = !0 : i.interrupted = !1)
    }
    ,
    i.fn.slick = function() {
        var i, t, o = this, s = arguments[0], n = Array.prototype.slice.call(arguments, 1), r = o.length;
        for (i = 0; i < r; i++)
            if ("object" == typeof s || void 0 === s ? o[i].slick = new e(o[i],s) : t = o[i].slick[s].apply(o[i].slick, n),
            void 0 !== t)
                return t;
        return o
    }
});

/*
 * Minified by jsDelivr using UglifyJS v3.4.4.
 * Original file: /npm/particles.js@2.0.0/particles.js
 * 
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
var pJS = function(e, t) {
    var a = document.querySelector("#" + e + " > .particles-js-canvas-el");
    this.pJS = {
        canvas: {
            el: a,
            w: a.offsetWidth,
            h: a.offsetHeight
        },
        particles: {
            number: {
                value: 400,
                density: {
                    enable: !0,
                    value_area: 800
                }
            },
            color: {
                value: "#fff"
            },
            shape: {
                type: "circle",
                stroke: {
                    width: 0,
                    color: "#ff0000"
                },
                polygon: {
                    nb_sides: 5
                },
                image: {
                    src: "",
                    width: 100,
                    height: 100
                }
            },
            opacity: {
                value: 1,
                random: !1,
                anim: {
                    enable: !1,
                    speed: 2,
                    opacity_min: 0,
                    sync: !1
                }
            },
            size: {
                value: 20,
                random: !1,
                anim: {
                    enable: !1,
                    speed: 20,
                    size_min: 0,
                    sync: !1
                }
            },
            line_linked: {
                enable: !0,
                distance: 100,
                color: "#fff",
                opacity: 1,
                width: 1
            },
            move: {
                enable: !0,
                speed: 2,
                direction: "none",
                random: !1,
                straight: !1,
                out_mode: "out",
                bounce: !1,
                attract: {
                    enable: !1,
                    rotateX: 3e3,
                    rotateY: 3e3
                }
            },
            array: []
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: {
                    enable: !0,
                    mode: "grab"
                },
                onclick: {
                    enable: !0,
                    mode: "push"
                },
                resize: !0
            },
            modes: {
                grab: {
                    distance: 100,
                    line_linked: {
                        opacity: 1
                    }
                },
                bubble: {
                    distance: 200,
                    size: 80,
                    duration: .4
                },
                repulse: {
                    distance: 200,
                    duration: .4
                },
                push: {
                    particles_nb: 4
                },
                remove: {
                    particles_nb: 2
                }
            },
            mouse: {}
        },
        retina_detect: !1,
        fn: {
            interact: {},
            modes: {},
            vendors: {}
        },
        tmp: {}
    };
    var m = this.pJS;
    t && Object.deepExtend(m, t),
    m.tmp.obj = {
        size_value: m.particles.size.value,
        size_anim_speed: m.particles.size.anim.speed,
        move_speed: m.particles.move.speed,
        line_linked_distance: m.particles.line_linked.distance,
        line_linked_width: m.particles.line_linked.width,
        mode_grab_distance: m.interactivity.modes.grab.distance,
        mode_bubble_distance: m.interactivity.modes.bubble.distance,
        mode_bubble_size: m.interactivity.modes.bubble.size,
        mode_repulse_distance: m.interactivity.modes.repulse.distance
    },
    m.fn.retinaInit = function() {
        m.retina_detect && 1 < window.devicePixelRatio ? (m.canvas.pxratio = window.devicePixelRatio,
        m.tmp.retina = !0) : (m.canvas.pxratio = 1,
        m.tmp.retina = !1),
        m.canvas.w = m.canvas.el.offsetWidth * m.canvas.pxratio,
        m.canvas.h = m.canvas.el.offsetHeight * m.canvas.pxratio,
        m.particles.size.value = m.tmp.obj.size_value * m.canvas.pxratio,
        m.particles.size.anim.speed = m.tmp.obj.size_anim_speed * m.canvas.pxratio,
        m.particles.move.speed = m.tmp.obj.move_speed * m.canvas.pxratio,
        m.particles.line_linked.distance = m.tmp.obj.line_linked_distance * m.canvas.pxratio,
        m.interactivity.modes.grab.distance = m.tmp.obj.mode_grab_distance * m.canvas.pxratio,
        m.interactivity.modes.bubble.distance = m.tmp.obj.mode_bubble_distance * m.canvas.pxratio,
        m.particles.line_linked.width = m.tmp.obj.line_linked_width * m.canvas.pxratio,
        m.interactivity.modes.bubble.size = m.tmp.obj.mode_bubble_size * m.canvas.pxratio,
        m.interactivity.modes.repulse.distance = m.tmp.obj.mode_repulse_distance * m.canvas.pxratio
    }
    ,
    m.fn.canvasInit = function() {
        m.canvas.ctx = m.canvas.el.getContext("2d")
    }
    ,
    m.fn.canvasSize = function() {
        m.canvas.el.width = m.canvas.w,
        m.canvas.el.height = m.canvas.h,
        m && m.interactivity.events.resize && window.addEventListener("resize", function() {
            m.canvas.w = m.canvas.el.offsetWidth,
            m.canvas.h = m.canvas.el.offsetHeight,
            m.tmp.retina && (m.canvas.w *= m.canvas.pxratio,
            m.canvas.h *= m.canvas.pxratio),
            m.canvas.el.width = m.canvas.w,
            m.canvas.el.height = m.canvas.h,
            m.particles.move.enable || (m.fn.particlesEmpty(),
            m.fn.particlesCreate(),
            m.fn.particlesDraw(),
            m.fn.vendors.densityAutoParticles()),
            m.fn.vendors.densityAutoParticles()
        })
    }
    ,
    m.fn.canvasPaint = function() {
        m.canvas.ctx.fillRect(0, 0, m.canvas.w, m.canvas.h)
    }
    ,
    m.fn.canvasClear = function() {
        m.canvas.ctx.clearRect(0, 0, m.canvas.w, m.canvas.h)
    }
    ,
    m.fn.particle = function(e, t, a) {
        if (this.radius = (m.particles.size.random ? Math.random() : 1) * m.particles.size.value,
        m.particles.size.anim.enable && (this.size_status = !1,
        this.vs = m.particles.size.anim.speed / 100,
        m.particles.size.anim.sync || (this.vs = this.vs * Math.random())),
        this.x = a ? a.x : Math.random() * m.canvas.w,
        this.y = a ? a.y : Math.random() * m.canvas.h,
        this.x > m.canvas.w - 2 * this.radius ? this.x = this.x - this.radius : this.x < 2 * this.radius && (this.x = this.x + this.radius),
        this.y > m.canvas.h - 2 * this.radius ? this.y = this.y - this.radius : this.y < 2 * this.radius && (this.y = this.y + this.radius),
        m.particles.move.bounce && m.fn.vendors.checkOverlap(this, a),
        this.color = {},
        "object" == typeof e.value)
            if (e.value instanceof Array) {
                var i = e.value[Math.floor(Math.random() * m.particles.color.value.length)];
                this.color.rgb = hexToRgb(i)
            } else
                null != e.value.r && null != e.value.g && null != e.value.b && (this.color.rgb = {
                    r: e.value.r,
                    g: e.value.g,
                    b: e.value.b
                }),
                null != e.value.h && null != e.value.s && null != e.value.l && (this.color.hsl = {
                    h: e.value.h,
                    s: e.value.s,
                    l: e.value.l
                });
        else
            "random" == e.value ? this.color.rgb = {
                r: Math.floor(256 * Math.random()) + 0,
                g: Math.floor(256 * Math.random()) + 0,
                b: Math.floor(256 * Math.random()) + 0
            } : "string" == typeof e.value && (this.color = e,
            this.color.rgb = hexToRgb(this.color.value));
        this.opacity = (m.particles.opacity.random ? Math.random() : 1) * m.particles.opacity.value,
        m.particles.opacity.anim.enable && (this.opacity_status = !1,
        this.vo = m.particles.opacity.anim.speed / 100,
        m.particles.opacity.anim.sync || (this.vo = this.vo * Math.random()));
        var s = {};
        switch (m.particles.move.direction) {
        case "top":
            s = {
                x: 0,
                y: -1
            };
            break;
        case "top-right":
            s = {
                x: .5,
                y: -.5
            };
            break;
        case "right":
            s = {
                x: 1,
                y: -0
            };
            break;
        case "bottom-right":
            s = {
                x: .5,
                y: .5
            };
            break;
        case "bottom":
            s = {
                x: 0,
                y: 1
            };
            break;
        case "bottom-left":
            s = {
                x: -.5,
                y: 1
            };
            break;
        case "left":
            s = {
                x: -1,
                y: 0
            };
            break;
        case "top-left":
            s = {
                x: -.5,
                y: -.5
            };
            break;
        default:
            s = {
                x: 0,
                y: 0
            }
        }
        m.particles.move.straight ? (this.vx = s.x,
        this.vy = s.y,
        m.particles.move.random && (this.vx = this.vx * Math.random(),
        this.vy = this.vy * Math.random())) : (this.vx = s.x + Math.random() - .5,
        this.vy = s.y + Math.random() - .5),
        this.vx_i = this.vx,
        this.vy_i = this.vy;
        var n = m.particles.shape.type;
        if ("object" == typeof n) {
            if (n instanceof Array) {
                var r = n[Math.floor(Math.random() * n.length)];
                this.shape = r
            }
        } else
            this.shape = n;
        if ("image" == this.shape) {
            var c = m.particles.shape;
            this.img = {
                src: c.image.src,
                ratio: c.image.width / c.image.height
            },
            this.img.ratio || (this.img.ratio = 1),
            "svg" == m.tmp.img_type && null != m.tmp.source_svg && (m.fn.vendors.createSvgImg(this),
            m.tmp.pushing && (this.img.loaded = !1))
        }
    }
    ,
    m.fn.particle.prototype.draw = function() {
        var e = this;
        if (null != e.radius_bubble)
            var t = e.radius_bubble;
        else
            t = e.radius;
        if (null != e.opacity_bubble)
            var a = e.opacity_bubble;
        else
            a = e.opacity;
        if (e.color.rgb)
            var i = "rgba(" + e.color.rgb.r + "," + e.color.rgb.g + "," + e.color.rgb.b + "," + a + ")";
        else
            i = "hsla(" + e.color.hsl.h + "," + e.color.hsl.s + "%," + e.color.hsl.l + "%," + a + ")";
        switch (m.canvas.ctx.fillStyle = i,
        m.canvas.ctx.beginPath(),
        e.shape) {
        case "circle":
            m.canvas.ctx.arc(e.x, e.y, t, 0, 2 * Math.PI, !1);
            break;
        case "edge":
            m.canvas.ctx.rect(e.x - t, e.y - t, 2 * t, 2 * t);
            break;
        case "triangle":
            m.fn.vendors.drawShape(m.canvas.ctx, e.x - t, e.y + t / 1.66, 2 * t, 3, 2);
            break;
        case "polygon":
            m.fn.vendors.drawShape(m.canvas.ctx, e.x - t / (m.particles.shape.polygon.nb_sides / 3.5), e.y - t / .76, 2.66 * t / (m.particles.shape.polygon.nb_sides / 3), m.particles.shape.polygon.nb_sides, 1);
            break;
        case "star":
            m.fn.vendors.drawShape(m.canvas.ctx, e.x - 2 * t / (m.particles.shape.polygon.nb_sides / 4), e.y - t / 1.52, 2 * t * 2.66 / (m.particles.shape.polygon.nb_sides / 3), m.particles.shape.polygon.nb_sides, 2);
            break;
        case "image":
            ;if ("svg" == m.tmp.img_type)
                var s = e.img.obj;
            else
                s = m.tmp.img_obj;
            s && m.canvas.ctx.drawImage(s, e.x - t, e.y - t, 2 * t, 2 * t / e.img.ratio)
        }
        m.canvas.ctx.closePath(),
        0 < m.particles.shape.stroke.width && (m.canvas.ctx.strokeStyle = m.particles.shape.stroke.color,
        m.canvas.ctx.lineWidth = m.particles.shape.stroke.width,
        m.canvas.ctx.stroke()),
        m.canvas.ctx.fill()
    }
    ,
    m.fn.particlesCreate = function() {
        for (var e = 0; e < m.particles.number.value; e++)
            m.particles.array.push(new m.fn.particle(m.particles.color,m.particles.opacity.value))
    }
    ,
    m.fn.particlesUpdate = function() {
        for (var e = 0; e < m.particles.array.length; e++) {
            var t = m.particles.array[e];
            if (m.particles.move.enable) {
                var a = m.particles.move.speed / 2;
                t.x += t.vx * a,
                t.y += t.vy * a
            }
            if (m.particles.opacity.anim.enable && (1 == t.opacity_status ? (t.opacity >= m.particles.opacity.value && (t.opacity_status = !1),
            t.opacity += t.vo) : (t.opacity <= m.particles.opacity.anim.opacity_min && (t.opacity_status = !0),
            t.opacity -= t.vo),
            t.opacity < 0 && (t.opacity = 0)),
            m.particles.size.anim.enable && (1 == t.size_status ? (t.radius >= m.particles.size.value && (t.size_status = !1),
            t.radius += t.vs) : (t.radius <= m.particles.size.anim.size_min && (t.size_status = !0),
            t.radius -= t.vs),
            t.radius < 0 && (t.radius = 0)),
            "bounce" == m.particles.move.out_mode)
                var i = {
                    x_left: t.radius,
                    x_right: m.canvas.w,
                    y_top: t.radius,
                    y_bottom: m.canvas.h
                };
            else
                i = {
                    x_left: -t.radius,
                    x_right: m.canvas.w + t.radius,
                    y_top: -t.radius,
                    y_bottom: m.canvas.h + t.radius
                };
            switch (t.x - t.radius > m.canvas.w ? (t.x = i.x_left,
            t.y = Math.random() * m.canvas.h) : t.x + t.radius < 0 && (t.x = i.x_right,
            t.y = Math.random() * m.canvas.h),
            t.y - t.radius > m.canvas.h ? (t.y = i.y_top,
            t.x = Math.random() * m.canvas.w) : t.y + t.radius < 0 && (t.y = i.y_bottom,
            t.x = Math.random() * m.canvas.w),
            m.particles.move.out_mode) {
            case "bounce":
                t.x + t.radius > m.canvas.w ? t.vx = -t.vx : t.x - t.radius < 0 && (t.vx = -t.vx),
                t.y + t.radius > m.canvas.h ? t.vy = -t.vy : t.y - t.radius < 0 && (t.vy = -t.vy)
            }
            if (isInArray("grab", m.interactivity.events.onhover.mode) && m.fn.modes.grabParticle(t),
            (isInArray("bubble", m.interactivity.events.onhover.mode) || isInArray("bubble", m.interactivity.events.onclick.mode)) && m.fn.modes.bubbleParticle(t),
            (isInArray("repulse", m.interactivity.events.onhover.mode) || isInArray("repulse", m.interactivity.events.onclick.mode)) && m.fn.modes.repulseParticle(t),
            m.particles.line_linked.enable || m.particles.move.attract.enable)
                for (var s = e + 1; s < m.particles.array.length; s++) {
                    var n = m.particles.array[s];
                    m.particles.line_linked.enable && m.fn.interact.linkParticles(t, n),
                    m.particles.move.attract.enable && m.fn.interact.attractParticles(t, n),
                    m.particles.move.bounce && m.fn.interact.bounceParticles(t, n)
                }
        }
    }
    ,
    m.fn.particlesDraw = function() {
        m.canvas.ctx.clearRect(0, 0, m.canvas.w, m.canvas.h),
        m.fn.particlesUpdate();
        for (var e = 0; e < m.particles.array.length; e++) {
            m.particles.array[e].draw()
        }
    }
    ,
    m.fn.particlesEmpty = function() {
        m.particles.array = []
    }
    ,
    m.fn.particlesRefresh = function() {
        cancelRequestAnimFrame(m.fn.checkAnimFrame),
        cancelRequestAnimFrame(m.fn.drawAnimFrame),
        m.tmp.source_svg = void 0,
        m.tmp.img_obj = void 0,
        m.tmp.count_svg = 0,
        m.fn.particlesEmpty(),
        m.fn.canvasClear(),
        m.fn.vendors.start()
    }
    ,
    m.fn.interact.linkParticles = function(e, t) {
        var a = e.x - t.x
          , i = e.y - t.y
          , s = Math.sqrt(a * a + i * i);
        if (s <= m.particles.line_linked.distance) {
            var n = m.particles.line_linked.opacity - s / (1 / m.particles.line_linked.opacity) / m.particles.line_linked.distance;
            if (0 < n) {
                var r = m.particles.line_linked.color_rgb_line;
                m.canvas.ctx.strokeStyle = "rgba(" + r.r + "," + r.g + "," + r.b + "," + n + ")",
                m.canvas.ctx.lineWidth = m.particles.line_linked.width,
                m.canvas.ctx.beginPath(),
                m.canvas.ctx.moveTo(e.x, e.y),
                m.canvas.ctx.lineTo(t.x, t.y),
                m.canvas.ctx.stroke(),
                m.canvas.ctx.closePath()
            }
        }
    }
    ,
    m.fn.interact.attractParticles = function(e, t) {
        var a = e.x - t.x
          , i = e.y - t.y;
        if (Math.sqrt(a * a + i * i) <= m.particles.line_linked.distance) {
            var s = a / (1e3 * m.particles.move.attract.rotateX)
              , n = i / (1e3 * m.particles.move.attract.rotateY);
            e.vx -= s,
            e.vy -= n,
            t.vx += s,
            t.vy += n
        }
    }
    ,
    m.fn.interact.bounceParticles = function(e, t) {
        var a = e.x - t.x
          , i = e.y - t.y;
        Math.sqrt(a * a + i * i) <= e.radius + t.radius && (e.vx = -e.vx,
        e.vy = -e.vy,
        t.vx = -t.vx,
        t.vy = -t.vy)
    }
    ,
    m.fn.modes.pushParticles = function(e, t) {
        m.tmp.pushing = !0;
        for (var a = 0; a < e; a++)
            m.particles.array.push(new m.fn.particle(m.particles.color,m.particles.opacity.value,{
                x: t ? t.pos_x : Math.random() * m.canvas.w,
                y: t ? t.pos_y : Math.random() * m.canvas.h
            })),
            a == e - 1 && (m.particles.move.enable || m.fn.particlesDraw(),
            m.tmp.pushing = !1)
    }
    ,
    m.fn.modes.removeParticles = function(e) {
        m.particles.array.splice(0, e),
        m.particles.move.enable || m.fn.particlesDraw()
    }
    ,
    m.fn.modes.bubbleParticle = function(c) {
        if (m.interactivity.events.onhover.enable && isInArray("bubble", m.interactivity.events.onhover.mode)) {
            var e = c.x - m.interactivity.mouse.pos_x
              , t = c.y - m.interactivity.mouse.pos_y
              , a = 1 - (o = Math.sqrt(e * e + t * t)) / m.interactivity.modes.bubble.distance;
            function i() {
                c.opacity_bubble = c.opacity,
                c.radius_bubble = c.radius
            }
            if (o <= m.interactivity.modes.bubble.distance) {
                if (0 <= a && "mousemove" == m.interactivity.status) {
                    if (m.interactivity.modes.bubble.size != m.particles.size.value)
                        if (m.interactivity.modes.bubble.size > m.particles.size.value) {
                            0 <= (n = c.radius + m.interactivity.modes.bubble.size * a) && (c.radius_bubble = n)
                        } else {
                            var s = c.radius - m.interactivity.modes.bubble.size
                              , n = c.radius - s * a;
                            c.radius_bubble = 0 < n ? n : 0
                        }
                    var r;
                    if (m.interactivity.modes.bubble.opacity != m.particles.opacity.value)
                        if (m.interactivity.modes.bubble.opacity > m.particles.opacity.value)
                            (r = m.interactivity.modes.bubble.opacity * a) > c.opacity && r <= m.interactivity.modes.bubble.opacity && (c.opacity_bubble = r);
                        else
                            (r = c.opacity - (m.particles.opacity.value - m.interactivity.modes.bubble.opacity) * a) < c.opacity && r >= m.interactivity.modes.bubble.opacity && (c.opacity_bubble = r)
                }
            } else
                i();
            "mouseleave" == m.interactivity.status && i()
        } else if (m.interactivity.events.onclick.enable && isInArray("bubble", m.interactivity.events.onclick.mode)) {
            if (m.tmp.bubble_clicking) {
                e = c.x - m.interactivity.mouse.click_pos_x,
                t = c.y - m.interactivity.mouse.click_pos_y;
                var o = Math.sqrt(e * e + t * t)
                  , l = ((new Date).getTime() - m.interactivity.mouse.click_time) / 1e3;
                l > m.interactivity.modes.bubble.duration && (m.tmp.bubble_duration_end = !0),
                l > 2 * m.interactivity.modes.bubble.duration && (m.tmp.bubble_clicking = !1,
                m.tmp.bubble_duration_end = !1)
            }
            function v(e, t, a, i, s) {
                if (e != t)
                    if (m.tmp.bubble_duration_end)
                        null != a && (r = e + (e - (i - l * (i - e) / m.interactivity.modes.bubble.duration)),
                        "size" == s && (c.radius_bubble = r),
                        "opacity" == s && (c.opacity_bubble = r));
                    else if (o <= m.interactivity.modes.bubble.distance) {
                        if (null != a)
                            var n = a;
                        else
                            n = i;
                        if (n != e) {
                            var r = i - l * (i - e) / m.interactivity.modes.bubble.duration;
                            "size" == s && (c.radius_bubble = r),
                            "opacity" == s && (c.opacity_bubble = r)
                        }
                    } else
                        "size" == s && (c.radius_bubble = void 0),
                        "opacity" == s && (c.opacity_bubble = void 0)
            }
            m.tmp.bubble_clicking && (v(m.interactivity.modes.bubble.size, m.particles.size.value, c.radius_bubble, c.radius, "size"),
            v(m.interactivity.modes.bubble.opacity, m.particles.opacity.value, c.opacity_bubble, c.opacity, "opacity"))
        }
    }
    ,
    m.fn.modes.repulseParticle = function(i) {
        if (m.interactivity.events.onhover.enable && isInArray("repulse", m.interactivity.events.onhover.mode) && "mousemove" == m.interactivity.status) {
            var e = i.x - m.interactivity.mouse.pos_x
              , t = i.y - m.interactivity.mouse.pos_y
              , a = Math.sqrt(e * e + t * t)
              , s = e / a
              , n = t / a
              , r = clamp(1 / (o = m.interactivity.modes.repulse.distance) * (-1 * Math.pow(a / o, 2) + 1) * o * 100, 0, 50)
              , c = {
                x: i.x + s * r,
                y: i.y + n * r
            };
            "bounce" == m.particles.move.out_mode ? (0 < c.x - i.radius && c.x + i.radius < m.canvas.w && (i.x = c.x),
            0 < c.y - i.radius && c.y + i.radius < m.canvas.h && (i.y = c.y)) : (i.x = c.x,
            i.y = c.y)
        } else if (m.interactivity.events.onclick.enable && isInArray("repulse", m.interactivity.events.onclick.mode))
            if (m.tmp.repulse_finish || (m.tmp.repulse_count++,
            m.tmp.repulse_count == m.particles.array.length && (m.tmp.repulse_finish = !0)),
            m.tmp.repulse_clicking) {
                var o = Math.pow(m.interactivity.modes.repulse.distance / 6, 3)
                  , l = m.interactivity.mouse.click_pos_x - i.x
                  , v = m.interactivity.mouse.click_pos_y - i.y
                  , p = l * l + v * v
                  , d = -o / p * 1;
                p <= o && function() {
                    var e = Math.atan2(v, l);
                    if (i.vx = d * Math.cos(e),
                    i.vy = d * Math.sin(e),
                    "bounce" == m.particles.move.out_mode) {
                        var t = i.x + i.vx
                          , a = i.y + i.vy;
                        t + i.radius > m.canvas.w ? i.vx = -i.vx : t - i.radius < 0 && (i.vx = -i.vx),
                        a + i.radius > m.canvas.h ? i.vy = -i.vy : a - i.radius < 0 && (i.vy = -i.vy)
                    }
                }()
            } else
                0 == m.tmp.repulse_clicking && (i.vx = i.vx_i,
                i.vy = i.vy_i)
    }
    ,
    m.fn.modes.grabParticle = function(e) {
        if (m.interactivity.events.onhover.enable && "mousemove" == m.interactivity.status) {
            var t = e.x - m.interactivity.mouse.pos_x
              , a = e.y - m.interactivity.mouse.pos_y
              , i = Math.sqrt(t * t + a * a);
            if (i <= m.interactivity.modes.grab.distance) {
                var s = m.interactivity.modes.grab.line_linked.opacity - i / (1 / m.interactivity.modes.grab.line_linked.opacity) / m.interactivity.modes.grab.distance;
                if (0 < s) {
                    var n = m.particles.line_linked.color_rgb_line;
                    m.canvas.ctx.strokeStyle = "rgba(" + n.r + "," + n.g + "," + n.b + "," + s + ")",
                    m.canvas.ctx.lineWidth = m.particles.line_linked.width,
                    m.canvas.ctx.beginPath(),
                    m.canvas.ctx.moveTo(e.x, e.y),
                    m.canvas.ctx.lineTo(m.interactivity.mouse.pos_x, m.interactivity.mouse.pos_y),
                    m.canvas.ctx.stroke(),
                    m.canvas.ctx.closePath()
                }
            }
        }
    }
    ,
    m.fn.vendors.eventsListeners = function() {
        "window" == m.interactivity.detect_on ? m.interactivity.el = window : m.interactivity.el = m.canvas.el,
        (m.interactivity.events.onhover.enable || m.interactivity.events.onclick.enable) && (m.interactivity.el.addEventListener("mousemove", function(e) {
            if (m.interactivity.el == window)
                var t = e.clientX
                  , a = e.clientY;
            else
                t = e.offsetX || e.clientX,
                a = e.offsetY || e.clientY;
            m.interactivity.mouse.pos_x = t,
            m.interactivity.mouse.pos_y = a,
            m.tmp.retina && (m.interactivity.mouse.pos_x *= m.canvas.pxratio,
            m.interactivity.mouse.pos_y *= m.canvas.pxratio),
            m.interactivity.status = "mousemove"
        }),
        m.interactivity.el.addEventListener("mouseleave", function(e) {
            m.interactivity.mouse.pos_x = null,
            m.interactivity.mouse.pos_y = null,
            m.interactivity.status = "mouseleave"
        })),
        m.interactivity.events.onclick.enable && m.interactivity.el.addEventListener("click", function() {
            if (m.interactivity.mouse.click_pos_x = m.interactivity.mouse.pos_x,
            m.interactivity.mouse.click_pos_y = m.interactivity.mouse.pos_y,
            m.interactivity.mouse.click_time = (new Date).getTime(),
            m.interactivity.events.onclick.enable)
                switch (m.interactivity.events.onclick.mode) {
                case "push":
                    m.particles.move.enable ? m.fn.modes.pushParticles(m.interactivity.modes.push.particles_nb, m.interactivity.mouse) : 1 == m.interactivity.modes.push.particles_nb ? m.fn.modes.pushParticles(m.interactivity.modes.push.particles_nb, m.interactivity.mouse) : 1 < m.interactivity.modes.push.particles_nb && m.fn.modes.pushParticles(m.interactivity.modes.push.particles_nb);
                    break;
                case "remove":
                    m.fn.modes.removeParticles(m.interactivity.modes.remove.particles_nb);
                    break;
                case "bubble":
                    m.tmp.bubble_clicking = !0;
                    break;
                case "repulse":
                    m.tmp.repulse_clicking = !0,
                    m.tmp.repulse_count = 0,
                    m.tmp.repulse_finish = !1,
                    setTimeout(function() {
                        m.tmp.repulse_clicking = !1
                    }, 1e3 * m.interactivity.modes.repulse.duration)
                }
        })
    }
    ,
    m.fn.vendors.densityAutoParticles = function() {
        if (m.particles.number.density.enable) {
            var e = m.canvas.el.width * m.canvas.el.height / 1e3;
            m.tmp.retina && (e /= 2 * m.canvas.pxratio);
            var t = e * m.particles.number.value / m.particles.number.density.value_area
              , a = m.particles.array.length - t;
            a < 0 ? m.fn.modes.pushParticles(Math.abs(a)) : m.fn.modes.removeParticles(a)
        }
    }
    ,
    m.fn.vendors.checkOverlap = function(e, t) {
        for (var a = 0; a < m.particles.array.length; a++) {
            var i = m.particles.array[a]
              , s = e.x - i.x
              , n = e.y - i.y;
            Math.sqrt(s * s + n * n) <= e.radius + i.radius && (e.x = t ? t.x : Math.random() * m.canvas.w,
            e.y = t ? t.y : Math.random() * m.canvas.h,
            m.fn.vendors.checkOverlap(e))
        }
    }
    ,
    m.fn.vendors.createSvgImg = function(n) {
        var e = m.tmp.source_svg.replace(/#([0-9A-F]{3,6})/gi, function(e, t, a, i) {
            if (n.color.rgb)
                var s = "rgba(" + n.color.rgb.r + "," + n.color.rgb.g + "," + n.color.rgb.b + "," + n.opacity + ")";
            else
                s = "hsla(" + n.color.hsl.h + "," + n.color.hsl.s + "%," + n.color.hsl.l + "%," + n.opacity + ")";
            return s
        })
          , t = new Blob([e],{
            type: "image/svg+xml;charset=utf-8"
        })
          , a = window.URL || window.webkitURL || window
          , i = a.createObjectURL(t)
          , s = new Image;
        s.addEventListener("load", function() {
            n.img.obj = s,
            n.img.loaded = !0,
            a.revokeObjectURL(i),
            m.tmp.count_svg++
        }),
        s.src = i
    }
    ,
    m.fn.vendors.destroypJS = function() {
        cancelAnimationFrame(m.fn.drawAnimFrame),
        a.remove(),
        pJSDom = null
    }
    ,
    m.fn.vendors.drawShape = function(e, t, a, i, s, n) {
        var r = s * n
          , c = s / n
          , o = 180 * (c - 2) / c
          , l = Math.PI - Math.PI * o / 180;
        e.save(),
        e.beginPath(),
        e.translate(t, a),
        e.moveTo(0, 0);
        for (var v = 0; v < r; v++)
            e.lineTo(i, 0),
            e.translate(i, 0),
            e.rotate(l);
        e.fill(),
        e.restore()
    }
    ,
    m.fn.vendors.exportImg = function() {
        window.open(m.canvas.el.toDataURL("image/png"), "_blank")
    }
    ,
    m.fn.vendors.loadImg = function(e) {
        if (m.tmp.img_error = void 0,
        "" != m.particles.shape.image.src)
            if ("svg" == e) {
                var t = new XMLHttpRequest;
                t.open("GET", m.particles.shape.image.src),
                t.onreadystatechange = function(e) {
                    4 == t.readyState && (200 == t.status ? (m.tmp.source_svg = e.currentTarget.response,
                    m.fn.vendors.checkBeforeDraw()) : (console.log("Error pJS - Image not found"),
                    m.tmp.img_error = !0))
                }
                ,
                t.send()
            } else {
                var a = new Image;
                a.addEventListener("load", function() {
                    m.tmp.img_obj = a,
                    m.fn.vendors.checkBeforeDraw()
                }),
                a.src = m.particles.shape.image.src
            }
        else
            console.log("Error pJS - No image.src"),
            m.tmp.img_error = !0
    }
    ,
    m.fn.vendors.draw = function() {
        "image" == m.particles.shape.type ? "svg" == m.tmp.img_type ? m.tmp.count_svg >= m.particles.number.value ? (m.fn.particlesDraw(),
        m.particles.move.enable ? m.fn.drawAnimFrame = requestAnimFrame(m.fn.vendors.draw) : cancelRequestAnimFrame(m.fn.drawAnimFrame)) : m.tmp.img_error || (m.fn.drawAnimFrame = requestAnimFrame(m.fn.vendors.draw)) : null != m.tmp.img_obj ? (m.fn.particlesDraw(),
        m.particles.move.enable ? m.fn.drawAnimFrame = requestAnimFrame(m.fn.vendors.draw) : cancelRequestAnimFrame(m.fn.drawAnimFrame)) : m.tmp.img_error || (m.fn.drawAnimFrame = requestAnimFrame(m.fn.vendors.draw)) : (m.fn.particlesDraw(),
        m.particles.move.enable ? m.fn.drawAnimFrame = requestAnimFrame(m.fn.vendors.draw) : cancelRequestAnimFrame(m.fn.drawAnimFrame))
    }
    ,
    m.fn.vendors.checkBeforeDraw = function() {
        "image" == m.particles.shape.type ? "svg" == m.tmp.img_type && null == m.tmp.source_svg ? m.tmp.checkAnimFrame = requestAnimFrame(check) : (cancelRequestAnimFrame(m.tmp.checkAnimFrame),
        m.tmp.img_error || (m.fn.vendors.init(),
        m.fn.vendors.draw())) : (m.fn.vendors.init(),
        m.fn.vendors.draw())
    }
    ,
    m.fn.vendors.init = function() {
        m.fn.retinaInit(),
        m.fn.canvasInit(),
        m.fn.canvasSize(),
        m.fn.canvasPaint(),
        m.fn.particlesCreate(),
        m.fn.vendors.densityAutoParticles(),
        m.particles.line_linked.color_rgb_line = hexToRgb(m.particles.line_linked.color)
    }
    ,
    m.fn.vendors.start = function() {
        isInArray("image", m.particles.shape.type) ? (m.tmp.img_type = m.particles.shape.image.src.substr(m.particles.shape.image.src.length - 3),
        m.fn.vendors.loadImg(m.tmp.img_type)) : m.fn.vendors.checkBeforeDraw()
    }
    ,
    m.fn.vendors.eventsListeners(),
    m.fn.vendors.start()
};
function hexToRgb(e) {
    e = e.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, function(e, t, a, i) {
        return t + t + a + a + i + i
    });
    var t = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);
    return t ? {
        r: parseInt(t[1], 16),
        g: parseInt(t[2], 16),
        b: parseInt(t[3], 16)
    } : null
}
function clamp(e, t, a) {
    return Math.min(Math.max(e, t), a)
}
function isInArray(e, t) {
    return -1 < t.indexOf(e)
}
Object.deepExtend = function(e, t) {
    for (var a in t)
        t[a] && t[a].constructor && t[a].constructor === Object ? (e[a] = e[a] || {},
        arguments.callee(e[a], t[a])) : e[a] = t[a];
    return e
}
,
window.requestAnimFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(e) {
    window.setTimeout(e, 1e3 / 60)
}
,
window.cancelRequestAnimFrame = window.cancelAnimationFrame || window.webkitCancelRequestAnimationFrame || window.mozCancelRequestAnimationFrame || window.oCancelRequestAnimationFrame || window.msCancelRequestAnimationFrame || clearTimeout,
window.pJSDom = [],
window.particlesJS = function(e, t) {
    "string" != typeof e && (t = e,
    e = "particles-js"),
    e || (e = "particles-js");
    var a = document.getElementById(e)
      , i = "particles-js-canvas-el"
      , s = a.getElementsByClassName(i);
    if (s.length)
        for (; 0 < s.length; )
            a.removeChild(s[0]);
    var n = document.createElement("canvas");
    n.className = i,
    n.style.width = "100%",
    n.style.height = "100%",
    null != document.getElementById(e).appendChild(n) && pJSDom.push(new pJS(e,t))
}
,
window.particlesJS.load = function(a, e, i) {
    var s = new XMLHttpRequest;
    s.open("GET", e),
    s.onreadystatechange = function(e) {
        if (4 == s.readyState)
            if (200 == s.status) {
                var t = JSON.parse(e.currentTarget.response);
                window.particlesJS(a, t),
                i && i()
            } else
                console.log("Error pJS - XMLHttpRequest status: " + s.status),
                console.log("Error pJS - File config not found")
    }
    ,
    s.send()
}
;

/* jquery.mousewheel.min
 *! Copyright (c) 2013 Brandon Aaron (http://brandon.aaron.sh)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Version: 3.1.11
 *
 * Requires: jQuery 1.2.2+
 */
!function(a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof exports ? module.exports = a : a(jQuery)
}(function(a) {
    function b(b) {
        var g = b || window.event
          , h = i.call(arguments, 1)
          , j = 0
          , l = 0
          , m = 0
          , n = 0
          , o = 0
          , p = 0;
        if (b = a.event.fix(g),
        b.type = "mousewheel",
        "detail"in g && (m = -1 * g.detail),
        "wheelDelta"in g && (m = g.wheelDelta),
        "wheelDeltaY"in g && (m = g.wheelDeltaY),
        "wheelDeltaX"in g && (l = -1 * g.wheelDeltaX),
        "axis"in g && g.axis === g.HORIZONTAL_AXIS && (l = -1 * m,
        m = 0),
        j = 0 === m ? l : m,
        "deltaY"in g && (m = -1 * g.deltaY,
        j = m),
        "deltaX"in g && (l = g.deltaX,
        0 === m && (j = -1 * l)),
        0 !== m || 0 !== l) {
            if (1 === g.deltaMode) {
                var q = a.data(this, "mousewheel-line-height");
                j *= q,
                m *= q,
                l *= q
            } else if (2 === g.deltaMode) {
                var r = a.data(this, "mousewheel-page-height");
                j *= r,
                m *= r,
                l *= r
            }
            if (n = Math.max(Math.abs(m), Math.abs(l)),
            (!f || f > n) && (f = n,
            d(g, n) && (f /= 40)),
            d(g, n) && (j /= 40,
            l /= 40,
            m /= 40),
            j = Math[j >= 1 ? "floor" : "ceil"](j / f),
            l = Math[l >= 1 ? "floor" : "ceil"](l / f),
            m = Math[m >= 1 ? "floor" : "ceil"](m / f),
            k.settings.normalizeOffset && this.getBoundingClientRect) {
                var s = this.getBoundingClientRect();
                o = b.clientX - s.left,
                p = b.clientY - s.top
            }
            return b.deltaX = l,
            b.deltaY = m,
            b.deltaFactor = f,
            b.offsetX = o,
            b.offsetY = p,
            b.deltaMode = 0,
            h.unshift(b, j, l, m),
            e && clearTimeout(e),
            e = setTimeout(c, 200),
            (a.event.dispatch || a.event.handle).apply(this, h)
        }
    }
    function c() {
        f = null
    }
    function d(a, b) {
        return k.settings.adjustOldDeltas && "mousewheel" === a.type && b % 120 === 0
    }
    var e, f, g = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"], h = "onwheel"in document || document.documentMode >= 9 ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"], i = Array.prototype.slice;
    if (a.event.fixHooks)
        for (var j = g.length; j; )
            a.event.fixHooks[g[--j]] = a.event.mouseHooks;
    var k = a.event.special.mousewheel = {
        version: "3.1.11",
        setup: function() {
            if (this.addEventListener)
                for (var c = h.length; c; )
                    this.addEventListener(h[--c], b, !1);
            else
                this.onmousewheel = b;
            a.data(this, "mousewheel-line-height", k.getLineHeight(this)),
            a.data(this, "mousewheel-page-height", k.getPageHeight(this))
        },
        teardown: function() {
            if (this.removeEventListener)
                for (var c = h.length; c; )
                    this.removeEventListener(h[--c], b, !1);
            else
                this.onmousewheel = null;
            a.removeData(this, "mousewheel-line-height"),
            a.removeData(this, "mousewheel-page-height")
        },
        getLineHeight: function(b) {
            var c = a(b)["offsetParent"in a.fn ? "offsetParent" : "parent"]();
            return c.length || (c = a("body")),
            parseInt(c.css("fontSize"), 10)
        },
        getPageHeight: function(b) {
            return a(b).height()
        },
        settings: {
            adjustOldDeltas: !0,
            normalizeOffset: !0
        }
    };
    a.fn.extend({
        mousewheel: function(a) {
            return a ? this.bind("mousewheel", a) : this.trigger("mousewheel")
        },
        unmousewheel: function(a) {
            return this.unbind("mousewheel", a)
        }
    })
});

//jquery.easing.min
!function(n) {
    "function" == typeof define && define.amd ? define(["jquery"], function(e) {
        return n(e)
    }) : "object" == typeof module && "object" == typeof module.exports ? exports = n(require("jquery")) : n(jQuery)
}(function(n) {
    function e(n) {
        var e = 7.5625
          , t = 2.75;
        return n < 1 / t ? e * n * n : n < 2 / t ? e * (n -= 1.5 / t) * n + .75 : n < 2.5 / t ? e * (n -= 2.25 / t) * n + .9375 : e * (n -= 2.625 / t) * n + .984375
    }
    void 0 !== n.easing && (n.easing.jswing = n.easing.swing);
    var t = Math.pow
      , u = Math.sqrt
      , r = Math.sin
      , i = Math.cos
      , a = Math.PI
      , c = 1.70158
      , o = 1.525 * c
      , s = 2 * a / 3
      , f = 2 * a / 4.5;
    n.extend(n.easing, {
        def: "easeOutQuad",
        swing: function(e) {
            return n.easing[n.easing.def](e)
        },
        easeInQuad: function(n) {
            return n * n
        },
        easeOutQuad: function(n) {
            return 1 - (1 - n) * (1 - n)
        },
        easeInOutQuad: function(n) {
            return n < .5 ? 2 * n * n : 1 - t(-2 * n + 2, 2) / 2
        },
        easeInCubic: function(n) {
            return n * n * n
        },
        easeOutCubic: function(n) {
            return 1 - t(1 - n, 3)
        },
        easeInOutCubic: function(n) {
            return n < .5 ? 4 * n * n * n : 1 - t(-2 * n + 2, 3) / 2
        },
        easeInQuart: function(n) {
            return n * n * n * n
        },
        easeOutQuart: function(n) {
            return 1 - t(1 - n, 4)
        },
        easeInOutQuart: function(n) {
            return n < .5 ? 8 * n * n * n * n : 1 - t(-2 * n + 2, 4) / 2
        },
        easeInQuint: function(n) {
            return n * n * n * n * n
        },
        easeOutQuint: function(n) {
            return 1 - t(1 - n, 5)
        },
        easeInOutQuint: function(n) {
            return n < .5 ? 16 * n * n * n * n * n : 1 - t(-2 * n + 2, 5) / 2
        },
        easeInSine: function(n) {
            return 1 - i(n * a / 2)
        },
        easeOutSine: function(n) {
            return r(n * a / 2)
        },
        easeInOutSine: function(n) {
            return -(i(a * n) - 1) / 2
        },
        easeInExpo: function(n) {
            return 0 === n ? 0 : t(2, 10 * n - 10)
        },
        easeOutExpo: function(n) {
            return 1 === n ? 1 : 1 - t(2, -10 * n)
        },
        easeInOutExpo: function(n) {
            return 0 === n ? 0 : 1 === n ? 1 : n < .5 ? t(2, 20 * n - 10) / 2 : (2 - t(2, -20 * n + 10)) / 2
        },
        easeInCirc: function(n) {
            return 1 - u(1 - t(n, 2))
        },
        easeOutCirc: function(n) {
            return u(1 - t(n - 1, 2))
        },
        easeInOutCirc: function(n) {
            return n < .5 ? (1 - u(1 - t(2 * n, 2))) / 2 : (u(1 - t(-2 * n + 2, 2)) + 1) / 2
        },
        easeInElastic: function(n) {
            return 0 === n ? 0 : 1 === n ? 1 : -t(2, 10 * n - 10) * r((10 * n - 10.75) * s)
        },
        easeOutElastic: function(n) {
            return 0 === n ? 0 : 1 === n ? 1 : t(2, -10 * n) * r((10 * n - .75) * s) + 1
        },
        easeInOutElastic: function(n) {
            return 0 === n ? 0 : 1 === n ? 1 : n < .5 ? -(t(2, 20 * n - 10) * r((20 * n - 11.125) * f)) / 2 : t(2, -20 * n + 10) * r((20 * n - 11.125) * f) / 2 + 1
        },
        easeInBack: function(n) {
            return (c + 1) * n * n * n - c * n * n
        },
        easeOutBack: function(n) {
            return 1 + (c + 1) * t(n - 1, 3) + c * t(n - 1, 2)
        },
        easeInOutBack: function(n) {
            return n < .5 ? t(2 * n, 2) * (7.189819 * n - o) / 2 : (t(2 * n - 2, 2) * ((o + 1) * (2 * n - 2) + o) + 2) / 2
        },
        easeInBounce: function(n) {
            return 1 - e(1 - n)
        },
        easeOutBounce: e,
        easeInOutBounce: function(n) {
            return n < .5 ? (1 - e(1 - 2 * n)) / 2 : (1 + e(2 * n - 1)) / 2
        }
    })
});
//Cookie
!function(e) {
    var n = !1;
    if ("function" == typeof define && define.amd && (define(e),
    n = !0),
    "object" == typeof exports && (module.exports = e(),
    n = !0),
    !n) {
        var o = window.Cookies
          , t = window.Cookies = e();
        t.noConflict = function() {
            return window.Cookies = o,
            t
        }
    }
}(function() {
    function e() {
        for (var e = 0, n = {}; e < arguments.length; e++) {
            var o = arguments[e];
            for (var t in o)
                n[t] = o[t]
        }
        return n
    }
    function n(o) {
        function t(n, r, i) {
            var c;
            if ("undefined" != typeof document) {
                if (arguments.length > 1) {
                    if ("number" == typeof (i = e({
                        path: "/"
                    }, t.defaults, i)).expires) {
                        var a = new Date;
                        a.setMilliseconds(a.getMilliseconds() + 864e5 * i.expires),
                        i.expires = a
                    }
                    i.expires = i.expires ? i.expires.toUTCString() : "";
                    try {
                        /^[\{\[]/.test(c = JSON.stringify(r)) && (r = c)
                    } catch (e) {}
                    r = o.write ? o.write(r, n) : encodeURIComponent(String(r)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent),
                    n = (n = (n = encodeURIComponent(String(n))).replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent)).replace(/[\(\)]/g, escape);
                    var s = "";
                    for (var f in i)
                        i[f] && (s += "; " + f,
                        !0 !== i[f] && (s += "=" + i[f]));
                    return document.cookie = n + "=" + r + s
                }
                n || (c = {});
                for (var p = document.cookie ? document.cookie.split("; ") : [], d = /(%[0-9A-Z]{2})+/g, u = 0; u < p.length; u++) {
                    var l = p[u].split("=")
                      , C = l.slice(1).join("=");
                    this.json || '"' !== C.charAt(0) || (C = C.slice(1, -1));
                    try {
                        var g = l[0].replace(d, decodeURIComponent);
                        if (C = o.read ? o.read(C, g) : o(C, g) || C.replace(d, decodeURIComponent),
                        this.json)
                            try {
                                C = JSON.parse(C)
                            } catch (e) {}
                        if (n === g) {
                            c = C;
                            break
                        }
                        n || (c[g] = C)
                    } catch (e) {}
                }
                return c
            }
        }
        return t.set = t,
        t.get = function(e) {
            return t.call(t, e)
        }
        ,
        t.getJSON = function() {
            return t.apply({
                json: !0
            }, [].slice.call(arguments))
        }
        ,
        t.defaults = {},
        t.remove = function(n, o) {
            t(n, "", e(o, {
                expires: -1
            }))
        }
        ,
        t.withConverter = n,
        t
    }
    return n(function() {})
});

/* == jquery mousewheel plugin == Version: 3.1.13, License: MIT License (MIT) */
!function(a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof exports ? module.exports = a : a(jQuery)
}(function(a) {
    function b(b) {
        var g = b || window.event
          , h = i.call(arguments, 1)
          , j = 0
          , l = 0
          , m = 0
          , n = 0
          , o = 0
          , p = 0;
        if (b = a.event.fix(g),
        b.type = "mousewheel",
        "detail"in g && (m = -1 * g.detail),
        "wheelDelta"in g && (m = g.wheelDelta),
        "wheelDeltaY"in g && (m = g.wheelDeltaY),
        "wheelDeltaX"in g && (l = -1 * g.wheelDeltaX),
        "axis"in g && g.axis === g.HORIZONTAL_AXIS && (l = -1 * m,
        m = 0),
        j = 0 === m ? l : m,
        "deltaY"in g && (m = -1 * g.deltaY,
        j = m),
        "deltaX"in g && (l = g.deltaX,
        0 === m && (j = -1 * l)),
        0 !== m || 0 !== l) {
            if (1 === g.deltaMode) {
                var q = a.data(this, "mousewheel-line-height");
                j *= q,
                m *= q,
                l *= q
            } else if (2 === g.deltaMode) {
                var r = a.data(this, "mousewheel-page-height");
                j *= r,
                m *= r,
                l *= r
            }
            if (n = Math.max(Math.abs(m), Math.abs(l)),
            (!f || f > n) && (f = n,
            d(g, n) && (f /= 40)),
            d(g, n) && (j /= 40,
            l /= 40,
            m /= 40),
            j = Math[j >= 1 ? "floor" : "ceil"](j / f),
            l = Math[l >= 1 ? "floor" : "ceil"](l / f),
            m = Math[m >= 1 ? "floor" : "ceil"](m / f),
            k.settings.normalizeOffset && this.getBoundingClientRect) {
                var s = this.getBoundingClientRect();
                o = b.clientX - s.left,
                p = b.clientY - s.top
            }
            return b.deltaX = l,
            b.deltaY = m,
            b.deltaFactor = f,
            b.offsetX = o,
            b.offsetY = p,
            b.deltaMode = 0,
            h.unshift(b, j, l, m),
            e && clearTimeout(e),
            e = setTimeout(c, 200),
            (a.event.dispatch || a.event.handle).apply(this, h)
        }
    }
    function c() {
        f = null
    }
    function d(a, b) {
        return k.settings.adjustOldDeltas && "mousewheel" === a.type && b % 120 === 0
    }
    var e, f, g = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"], h = "onwheel"in document || document.documentMode >= 9 ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"], i = Array.prototype.slice;
    if (a.event.fixHooks)
        for (var j = g.length; j; )
            a.event.fixHooks[g[--j]] = a.event.mouseHooks;
    var k = a.event.special.mousewheel = {
        version: "3.1.12",
        setup: function() {
            if (this.addEventListener)
                for (var c = h.length; c; )
                    this.addEventListener(h[--c], b, !1);
            else
                this.onmousewheel = b;
            a.data(this, "mousewheel-line-height", k.getLineHeight(this)),
            a.data(this, "mousewheel-page-height", k.getPageHeight(this))
        },
        teardown: function() {
            if (this.removeEventListener)
                for (var c = h.length; c; )
                    this.removeEventListener(h[--c], b, !1);
            else
                this.onmousewheel = null;
            a.removeData(this, "mousewheel-line-height"),
            a.removeData(this, "mousewheel-page-height")
        },
        getLineHeight: function(b) {
            var c = a(b)
              , d = c["offsetParent"in a.fn ? "offsetParent" : "parent"]();
            return d.length || (d = a("body")),
            parseInt(d.css("fontSize"), 10) || parseInt(c.css("fontSize"), 10) || 16
        },
        getPageHeight: function(b) {
            return a(b).height()
        },
        settings: {
            adjustOldDeltas: !0,
            normalizeOffset: !0
        }
    };
    a.fn.extend({
        mousewheel: function(a) {
            return a ? this.bind("mousewheel", a) : this.trigger("mousewheel")
        },
        unmousewheel: function(a) {
            return this.unbind("mousewheel", a)
        }
    })
});
!function(a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof exports ? module.exports = a : a(jQuery)
}(function(a) {
    function b(b) {
        var g = b || window.event
          , h = i.call(arguments, 1)
          , j = 0
          , l = 0
          , m = 0
          , n = 0
          , o = 0
          , p = 0;
        if (b = a.event.fix(g),
        b.type = "mousewheel",
        "detail"in g && (m = -1 * g.detail),
        "wheelDelta"in g && (m = g.wheelDelta),
        "wheelDeltaY"in g && (m = g.wheelDeltaY),
        "wheelDeltaX"in g && (l = -1 * g.wheelDeltaX),
        "axis"in g && g.axis === g.HORIZONTAL_AXIS && (l = -1 * m,
        m = 0),
        j = 0 === m ? l : m,
        "deltaY"in g && (m = -1 * g.deltaY,
        j = m),
        "deltaX"in g && (l = g.deltaX,
        0 === m && (j = -1 * l)),
        0 !== m || 0 !== l) {
            if (1 === g.deltaMode) {
                var q = a.data(this, "mousewheel-line-height");
                j *= q,
                m *= q,
                l *= q
            } else if (2 === g.deltaMode) {
                var r = a.data(this, "mousewheel-page-height");
                j *= r,
                m *= r,
                l *= r
            }
            if (n = Math.max(Math.abs(m), Math.abs(l)),
            (!f || f > n) && (f = n,
            d(g, n) && (f /= 40)),
            d(g, n) && (j /= 40,
            l /= 40,
            m /= 40),
            j = Math[j >= 1 ? "floor" : "ceil"](j / f),
            l = Math[l >= 1 ? "floor" : "ceil"](l / f),
            m = Math[m >= 1 ? "floor" : "ceil"](m / f),
            k.settings.normalizeOffset && this.getBoundingClientRect) {
                var s = this.getBoundingClientRect();
                o = b.clientX - s.left,
                p = b.clientY - s.top
            }
            return b.deltaX = l,
            b.deltaY = m,
            b.deltaFactor = f,
            b.offsetX = o,
            b.offsetY = p,
            b.deltaMode = 0,
            h.unshift(b, j, l, m),
            e && clearTimeout(e),
            e = setTimeout(c, 200),
            (a.event.dispatch || a.event.handle).apply(this, h)
        }
    }
    function c() {
        f = null
    }
    function d(a, b) {
        return k.settings.adjustOldDeltas && "mousewheel" === a.type && b % 120 === 0
    }
    var e, f, g = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"], h = "onwheel"in document || document.documentMode >= 9 ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"], i = Array.prototype.slice;
    if (a.event.fixHooks)
        for (var j = g.length; j; )
            a.event.fixHooks[g[--j]] = a.event.mouseHooks;
    var k = a.event.special.mousewheel = {
        version: "3.1.12",
        setup: function() {
            if (this.addEventListener)
                for (var c = h.length; c; )
                    this.addEventListener(h[--c], b, !1);
            else
                this.onmousewheel = b;
            a.data(this, "mousewheel-line-height", k.getLineHeight(this)),
            a.data(this, "mousewheel-page-height", k.getPageHeight(this))
        },
        teardown: function() {
            if (this.removeEventListener)
                for (var c = h.length; c; )
                    this.removeEventListener(h[--c], b, !1);
            else
                this.onmousewheel = null;
            a.removeData(this, "mousewheel-line-height"),
            a.removeData(this, "mousewheel-page-height")
        },
        getLineHeight: function(b) {
            var c = a(b)
              , d = c["offsetParent"in a.fn ? "offsetParent" : "parent"]();
            return d.length || (d = a("body")),
            parseInt(d.css("fontSize"), 10) || parseInt(c.css("fontSize"), 10) || 16
        },
        getPageHeight: function(b) {
            return a(b).height()
        },
        settings: {
            adjustOldDeltas: !0,
            normalizeOffset: !0
        }
    };
    a.fn.extend({
        mousewheel: function(a) {
            return a ? this.bind("mousewheel", a) : this.trigger("mousewheel")
        },
        unmousewheel: function(a) {
            return this.unbind("mousewheel", a)
        }
    })
});
/* == malihu jquery custom scrollbar plugin == Version: 3.1.5, License: MIT License (MIT) */
!function(e) {
    "function" == typeof define && define.amd ? define(["jquery"], e) : "undefined" != typeof module && module.exports ? module.exports = e : e(jQuery, window, document)
}(function(e) {
    !function(t) {
        var o = "function" == typeof define && define.amd
          , a = "undefined" != typeof module && module.exports
          , n = "https:" == document.location.protocol ? "https:" : "http:"
          , i = "cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/3.1.13/jquery.mousewheel.min.js";
        o || (a ? require("jquery-mousewheel")(e) : e.event.special.mousewheel || e("head").append(decodeURI("%3Cscript src=" + n + "//" + i + "%3E%3C/script%3E"))),
        t()
    }(function() {
        var t, o = "mCustomScrollbar", a = "mCS", n = ".mCustomScrollbar", i = {
            setTop: 0,
            setLeft: 0,
            axis: "y",
            scrollbarPosition: "inside",
            scrollInertia: 950,
            autoDraggerLength: !0,
            alwaysShowScrollbar: 0,
            snapOffset: 0,
            mouseWheel: {
                enable: !0,
                scrollAmount: "auto",
                axis: "y",
                deltaFactor: "auto",
                disableOver: ["select", "option", "keygen", "datalist", "textarea"]
            },
            scrollButtons: {
                scrollType: "stepless",
                scrollAmount: "auto"
            },
            keyboard: {
                enable: !0,
                scrollType: "stepless",
                scrollAmount: "auto"
            },
            contentTouchScroll: 25,
            documentTouchScroll: !0,
            advanced: {
                autoScrollOnFocus: "input,textarea,select,button,datalist,keygen,a[tabindex],area,object,[contenteditable='true']",
                updateOnContentResize: !0,
                updateOnImageLoad: "auto",
                autoUpdateTimeout: 60
            },
            theme: "light",
            callbacks: {
                onTotalScrollOffset: 0,
                onTotalScrollBackOffset: 0,
                alwaysTriggerOffsets: !0
            }
        }, r = 0, l = {}, s = window.attachEvent && !window.addEventListener ? 1 : 0, c = !1, d = ["mCSB_dragger_onDrag", "mCSB_scrollTools_onDrag", "mCS_img_loaded", "mCS_disabled", "mCS_destroyed", "mCS_no_scrollbar", "mCS-autoHide", "mCS-dir-rtl", "mCS_no_scrollbar_y", "mCS_no_scrollbar_x", "mCS_y_hidden", "mCS_x_hidden", "mCSB_draggerContainer", "mCSB_buttonUp", "mCSB_buttonDown", "mCSB_buttonLeft", "mCSB_buttonRight"], u = {
            init: function(t) {
                var t = e.extend(!0, {}, i, t)
                  , o = f.call(this);
                if (t.live) {
                    var s = t.liveSelector || this.selector || n
                      , c = e(s);
                    if ("off" === t.live)
                        return void m(s);
                    l[s] = setTimeout(function() {
                        c.mCustomScrollbar(t),
                        "once" === t.live && c.length && m(s)
                    }, 500)
                } else
                    m(s);
                return t.setWidth = t.set_width ? t.set_width : t.setWidth,
                t.setHeight = t.set_height ? t.set_height : t.setHeight,
                t.axis = t.horizontalScroll ? "x" : p(t.axis),
                t.scrollInertia = t.scrollInertia > 0 && t.scrollInertia < 17 ? 17 : t.scrollInertia,
                "object" != typeof t.mouseWheel && 1 == t.mouseWheel && (t.mouseWheel = {
                    enable: !0,
                    scrollAmount: "auto",
                    axis: "y",
                    preventDefault: !1,
                    deltaFactor: "auto",
                    normalizeDelta: !1,
                    invert: !1
                }),
                t.mouseWheel.scrollAmount = t.mouseWheelPixels ? t.mouseWheelPixels : t.mouseWheel.scrollAmount,
                t.mouseWheel.normalizeDelta = t.advanced.normalizeMouseWheelDelta ? t.advanced.normalizeMouseWheelDelta : t.mouseWheel.normalizeDelta,
                t.scrollButtons.scrollType = g(t.scrollButtons.scrollType),
                h(t),
                e(o).each(function() {
                    var o = e(this);
                    if (!o.data(a)) {
                        o.data(a, {
                            idx: ++r,
                            opt: t,
                            scrollRatio: {
                                y: null,
                                x: null
                            },
                            overflowed: null,
                            contentReset: {
                                y: null,
                                x: null
                            },
                            bindEvents: !1,
                            tweenRunning: !1,
                            sequential: {},
                            langDir: o.css("direction"),
                            cbOffsets: null,
                            trigger: null,
                            poll: {
                                size: {
                                    o: 0,
                                    n: 0
                                },
                                img: {
                                    o: 0,
                                    n: 0
                                },
                                change: {
                                    o: 0,
                                    n: 0
                                }
                            }
                        });
                        var n = o.data(a)
                          , i = n.opt
                          , l = o.data("mcs-axis")
                          , s = o.data("mcs-scrollbar-position")
                          , c = o.data("mcs-theme");
                        l && (i.axis = l),
                        s && (i.scrollbarPosition = s),
                        c && (i.theme = c,
                        h(i)),
                        v.call(this),
                        n && i.callbacks.onCreate && "function" == typeof i.callbacks.onCreate && i.callbacks.onCreate.call(this),
                        e("#mCSB_" + n.idx + "_container img:not(." + d[2] + ")").addClass(d[2]),
                        u.update.call(null, o)
                    }
                })
            },
            update: function(t, o) {
                var n = t || f.call(this);
                return e(n).each(function() {
                    var t = e(this);
                    if (t.data(a)) {
                        var n = t.data(a)
                          , i = n.opt
                          , r = e("#mCSB_" + n.idx + "_container")
                          , l = e("#mCSB_" + n.idx)
                          , s = [e("#mCSB_" + n.idx + "_dragger_vertical"), e("#mCSB_" + n.idx + "_dragger_horizontal")];
                        if (!r.length)
                            return;
                        n.tweenRunning && Q(t),
                        o && n && i.callbacks.onBeforeUpdate && "function" == typeof i.callbacks.onBeforeUpdate && i.callbacks.onBeforeUpdate.call(this),
                        t.hasClass(d[3]) && t.removeClass(d[3]),
                        t.hasClass(d[4]) && t.removeClass(d[4]),
                        l.css("max-height", "none"),
                        l.height() !== t.height() && l.css("max-height", t.height()),
                        _.call(this),
                        "y" === i.axis || i.advanced.autoExpandHorizontalScroll || r.css("width", x(r)),
                        n.overflowed = y.call(this),
                        M.call(this),
                        i.autoDraggerLength && S.call(this),
                        b.call(this),
                        T.call(this);
                        var c = [Math.abs(r[0].offsetTop), Math.abs(r[0].offsetLeft)];
                        "x" !== i.axis && (n.overflowed[0] ? s[0].height() > s[0].parent().height() ? B.call(this) : (G(t, c[0].toString(), {
                            dir: "y",
                            dur: 0,
                            overwrite: "none"
                        }),
                        n.contentReset.y = null) : (B.call(this),
                        "y" === i.axis ? k.call(this) : "yx" === i.axis && n.overflowed[1] && G(t, c[1].toString(), {
                            dir: "x",
                            dur: 0,
                            overwrite: "none"
                        }))),
                        "y" !== i.axis && (n.overflowed[1] ? s[1].width() > s[1].parent().width() ? B.call(this) : (G(t, c[1].toString(), {
                            dir: "x",
                            dur: 0,
                            overwrite: "none"
                        }),
                        n.contentReset.x = null) : (B.call(this),
                        "x" === i.axis ? k.call(this) : "yx" === i.axis && n.overflowed[0] && G(t, c[0].toString(), {
                            dir: "y",
                            dur: 0,
                            overwrite: "none"
                        }))),
                        o && n && (2 === o && i.callbacks.onImageLoad && "function" == typeof i.callbacks.onImageLoad ? i.callbacks.onImageLoad.call(this) : 3 === o && i.callbacks.onSelectorChange && "function" == typeof i.callbacks.onSelectorChange ? i.callbacks.onSelectorChange.call(this) : i.callbacks.onUpdate && "function" == typeof i.callbacks.onUpdate && i.callbacks.onUpdate.call(this)),
                        N.call(this)
                    }
                })
            },
            scrollTo: function(t, o) {
                if ("undefined" != typeof t && null != t) {
                    var n = f.call(this);
                    return e(n).each(function() {
                        var n = e(this);
                        if (n.data(a)) {
                            var i = n.data(a)
                              , r = i.opt
                              , l = {
                                trigger: "external",
                                scrollInertia: r.scrollInertia,
                                scrollEasing: "mcsEaseInOut",
                                moveDragger: !1,
                                timeout: 60,
                                callbacks: !0,
                                onStart: !0,
                                onUpdate: !0,
                                onComplete: !0
                            }
                              , s = e.extend(!0, {}, l, o)
                              , c = Y.call(this, t)
                              , d = s.scrollInertia > 0 && s.scrollInertia < 17 ? 17 : s.scrollInertia;
                            c[0] = X.call(this, c[0], "y"),
                            c[1] = X.call(this, c[1], "x"),
                            s.moveDragger && (c[0] *= i.scrollRatio.y,
                            c[1] *= i.scrollRatio.x),
                            s.dur = ne() ? 0 : d,
                            setTimeout(function() {
                                null !== c[0] && "undefined" != typeof c[0] && "x" !== r.axis && i.overflowed[0] && (s.dir = "y",
                                s.overwrite = "all",
                                G(n, c[0].toString(), s)),
                                null !== c[1] && "undefined" != typeof c[1] && "y" !== r.axis && i.overflowed[1] && (s.dir = "x",
                                s.overwrite = "none",
                                G(n, c[1].toString(), s))
                            }, s.timeout)
                        }
                    })
                }
            },
            stop: function() {
                var t = f.call(this);
                return e(t).each(function() {
                    var t = e(this);
                    t.data(a) && Q(t)
                })
            },
            disable: function(t) {
                var o = f.call(this);
                return e(o).each(function() {
                    var o = e(this);
                    if (o.data(a)) {
                        o.data(a);
                        N.call(this, "remove"),
                        k.call(this),
                        t && B.call(this),
                        M.call(this, !0),
                        o.addClass(d[3])
                    }
                })
            },
            destroy: function() {
                var t = f.call(this);
                return e(t).each(function() {
                    var n = e(this);
                    if (n.data(a)) {
                        var i = n.data(a)
                          , r = i.opt
                          , l = e("#mCSB_" + i.idx)
                          , s = e("#mCSB_" + i.idx + "_container")
                          , c = e(".mCSB_" + i.idx + "_scrollbar");
                        r.live && m(r.liveSelector || e(t).selector),
                        N.call(this, "remove"),
                        k.call(this),
                        B.call(this),
                        n.removeData(a),
                        $(this, "mcs"),
                        c.remove(),
                        s.find("img." + d[2]).removeClass(d[2]),
                        l.replaceWith(s.contents()),
                        n.removeClass(o + " _" + a + "_" + i.idx + " " + d[6] + " " + d[7] + " " + d[5] + " " + d[3]).addClass(d[4])
                    }
                })
            }
        }, f = function() {
            return "object" != typeof e(this) || e(this).length < 1 ? n : this
        }, h = function(t) {
            var o = ["rounded", "rounded-dark", "rounded-dots", "rounded-dots-dark"]
              , a = ["rounded-dots", "rounded-dots-dark", "3d", "3d-dark", "3d-thick", "3d-thick-dark", "inset", "inset-dark", "inset-2", "inset-2-dark", "inset-3", "inset-3-dark"]
              , n = ["minimal", "minimal-dark"]
              , i = ["minimal", "minimal-dark"]
              , r = ["minimal", "minimal-dark"];
            t.autoDraggerLength = e.inArray(t.theme, o) > -1 ? !1 : t.autoDraggerLength,
            t.autoExpandScrollbar = e.inArray(t.theme, a) > -1 ? !1 : t.autoExpandScrollbar,
            t.scrollButtons.enable = e.inArray(t.theme, n) > -1 ? !1 : t.scrollButtons.enable,
            t.autoHideScrollbar = e.inArray(t.theme, i) > -1 ? !0 : t.autoHideScrollbar,
            t.scrollbarPosition = e.inArray(t.theme, r) > -1 ? "outside" : t.scrollbarPosition
        }, m = function(e) {
            l[e] && (clearTimeout(l[e]),
            $(l, e))
        }, p = function(e) {
            return "yx" === e || "xy" === e || "auto" === e ? "yx" : "x" === e || "horizontal" === e ? "x" : "y"
        }, g = function(e) {
            return "stepped" === e || "pixels" === e || "step" === e || "click" === e ? "stepped" : "stepless"
        }, v = function() {
            var t = e(this)
              , n = t.data(a)
              , i = n.opt
              , r = i.autoExpandScrollbar ? " " + d[1] + "_expand" : ""
              , l = ["<div id='mCSB_" + n.idx + "_scrollbar_vertical' class='mCSB_scrollTools mCSB_" + n.idx + "_scrollbar mCS-" + i.theme + " mCSB_scrollTools_vertical" + r + "'><div class='" + d[12] + "'><div id='mCSB_" + n.idx + "_dragger_vertical' class='mCSB_dragger' style='position:absolute;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>", "<div id='mCSB_" + n.idx + "_scrollbar_horizontal' class='mCSB_scrollTools mCSB_" + n.idx + "_scrollbar mCS-" + i.theme + " mCSB_scrollTools_horizontal" + r + "'><div class='" + d[12] + "'><div id='mCSB_" + n.idx + "_dragger_horizontal' class='mCSB_dragger' style='position:absolute;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>"]
              , s = "yx" === i.axis ? "mCSB_vertical_horizontal" : "x" === i.axis ? "mCSB_horizontal" : "mCSB_vertical"
              , c = "yx" === i.axis ? l[0] + l[1] : "x" === i.axis ? l[1] : l[0]
              , u = "yx" === i.axis ? "<div id='mCSB_" + n.idx + "_container_wrapper' class='mCSB_container_wrapper' />" : ""
              , f = i.autoHideScrollbar ? " " + d[6] : ""
              , h = "x" !== i.axis && "rtl" === n.langDir ? " " + d[7] : "";
            i.setWidth && t.css("width", i.setWidth),
            i.setHeight && t.css("height", i.setHeight),
            i.setLeft = "y" !== i.axis && "rtl" === n.langDir ? "989999px" : i.setLeft,
            t.addClass(o + " _" + a + "_" + n.idx + f + h).wrapInner("<div id='mCSB_" + n.idx + "' class='mCustomScrollBox mCS-" + i.theme + " " + s + "'><div id='mCSB_" + n.idx + "_container' class='mCSB_container' style='position:relative; top:" + i.setTop + "; left:" + i.setLeft + ";' dir='" + n.langDir + "' /></div>");
            var m = e("#mCSB_" + n.idx)
              , p = e("#mCSB_" + n.idx + "_container");
            "y" === i.axis || i.advanced.autoExpandHorizontalScroll || p.css("width", x(p)),
            "outside" === i.scrollbarPosition ? ("static" === t.css("position") && t.css("position", "relative"),
            t.css("overflow", "visible"),
            m.addClass("mCSB_outside").after(c)) : (m.addClass("mCSB_inside").append(c),
            p.wrap(u)),
            w.call(this);
            var g = [e("#mCSB_" + n.idx + "_dragger_vertical"), e("#mCSB_" + n.idx + "_dragger_horizontal")];
            g[0].css("min-height", g[0].height()),
            g[1].css("min-width", g[1].width())
        }, x = function(t) {
            var o = [t[0].scrollWidth, Math.max.apply(Math, t.children().map(function() {
                return e(this).outerWidth(!0)
            }).get())]
              , a = t.parent().width();
            return o[0] > a ? o[0] : o[1] > a ? o[1] : "100%"
        }, _ = function() {
            var t = e(this)
              , o = t.data(a)
              , n = o.opt
              , i = e("#mCSB_" + o.idx + "_container");
            if (n.advanced.autoExpandHorizontalScroll && "y" !== n.axis) {
                i.css({
                    width: "auto",
                    "min-width": 0,
                    "overflow-x": "scroll"
                });
                var r = Math.ceil(i[0].scrollWidth);
                3 === n.advanced.autoExpandHorizontalScroll || 2 !== n.advanced.autoExpandHorizontalScroll && r > i.parent().width() ? i.css({
                    width: r,
                    "min-width": "100%",
                    "overflow-x": "inherit"
                }) : i.css({
                    "overflow-x": "inherit",
                    position: "absolute"
                }).wrap("<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />").css({
                    width: Math.ceil(i[0].getBoundingClientRect().right + .4) - Math.floor(i[0].getBoundingClientRect().left),
                    "min-width": "100%",
                    position: "relative"
                }).unwrap()
            }
        }, w = function() {
            var t = e(this)
              , o = t.data(a)
              , n = o.opt
              , i = e(".mCSB_" + o.idx + "_scrollbar:first")
              , r = oe(n.scrollButtons.tabindex) ? "tabindex='" + n.scrollButtons.tabindex + "'" : ""
              , l = ["<a href='#' class='" + d[13] + "' " + r + " />", "<a href='#' class='" + d[14] + "' " + r + " />", "<a href='#' class='" + d[15] + "' " + r + " />", "<a href='#' class='" + d[16] + "' " + r + " />"]
              , s = ["x" === n.axis ? l[2] : l[0], "x" === n.axis ? l[3] : l[1], l[2], l[3]];
            n.scrollButtons.enable && i.prepend(s[0]).append(s[1]).next(".mCSB_scrollTools").prepend(s[2]).append(s[3])
        }, S = function() {
            var t = e(this)
              , o = t.data(a)
              , n = e("#mCSB_" + o.idx)
              , i = e("#mCSB_" + o.idx + "_container")
              , r = [e("#mCSB_" + o.idx + "_dragger_vertical"), e("#mCSB_" + o.idx + "_dragger_horizontal")]
              , l = [n.height() / i.outerHeight(!1), n.width() / i.outerWidth(!1)]
              , c = [parseInt(r[0].css("min-height")), Math.round(l[0] * r[0].parent().height()), parseInt(r[1].css("min-width")), Math.round(l[1] * r[1].parent().width())]
              , d = s && c[1] < c[0] ? c[0] : c[1]
              , u = s && c[3] < c[2] ? c[2] : c[3];
            r[0].css({
                height: d,
                "max-height": r[0].parent().height() - 10
            }).find(".mCSB_dragger_bar").css({
                "line-height": c[0] + "px"
            }),
            r[1].css({
                width: u,
                "max-width": r[1].parent().width() - 10
            })
        }, b = function() {
            var t = e(this)
              , o = t.data(a)
              , n = e("#mCSB_" + o.idx)
              , i = e("#mCSB_" + o.idx + "_container")
              , r = [e("#mCSB_" + o.idx + "_dragger_vertical"), e("#mCSB_" + o.idx + "_dragger_horizontal")]
              , l = [i.outerHeight(!1) - n.height(), i.outerWidth(!1) - n.width()]
              , s = [l[0] / (r[0].parent().height() - r[0].height()), l[1] / (r[1].parent().width() - r[1].width())];
            o.scrollRatio = {
                y: s[0],
                x: s[1]
            }
        }, C = function(e, t, o) {
            var a = o ? d[0] + "_expanded" : ""
              , n = e.closest(".mCSB_scrollTools");
            "active" === t ? (e.toggleClass(d[0] + " " + a),
            n.toggleClass(d[1]),
            e[0]._draggable = e[0]._draggable ? 0 : 1) : e[0]._draggable || ("hide" === t ? (e.removeClass(d[0]),
            n.removeClass(d[1])) : (e.addClass(d[0]),
            n.addClass(d[1])))
        }, y = function() {
            var t = e(this)
              , o = t.data(a)
              , n = e("#mCSB_" + o.idx)
              , i = e("#mCSB_" + o.idx + "_container")
              , r = null == o.overflowed ? i.height() : i.outerHeight(!1)
              , l = null == o.overflowed ? i.width() : i.outerWidth(!1)
              , s = i[0].scrollHeight
              , c = i[0].scrollWidth;
            return s > r && (r = s),
            c > l && (l = c),
            [r > n.height(), l > n.width()]
        }, B = function() {
            var t = e(this)
              , o = t.data(a)
              , n = o.opt
              , i = e("#mCSB_" + o.idx)
              , r = e("#mCSB_" + o.idx + "_container")
              , l = [e("#mCSB_" + o.idx + "_dragger_vertical"), e("#mCSB_" + o.idx + "_dragger_horizontal")];
            if (Q(t),
            ("x" !== n.axis && !o.overflowed[0] || "y" === n.axis && o.overflowed[0]) && (l[0].add(r).css("top", 0),
            G(t, "_resetY")),
            "y" !== n.axis && !o.overflowed[1] || "x" === n.axis && o.overflowed[1]) {
                var s = dx = 0;
                "rtl" === o.langDir && (s = i.width() - r.outerWidth(!1),
                dx = Math.abs(s / o.scrollRatio.x)),
                r.css("left", s),
                l[1].css("left", dx),
                G(t, "_resetX")
            }
        }, T = function() {
            function t() {
                r = setTimeout(function() {
                    e.event.special.mousewheel ? (clearTimeout(r),
                    W.call(o[0])) : t()
                }, 100)
            }
            var o = e(this)
              , n = o.data(a)
              , i = n.opt;
            if (!n.bindEvents) {
                if (I.call(this),
                i.contentTouchScroll && D.call(this),
                E.call(this),
                i.mouseWheel.enable) {
                    var r;
                    t()
                }
                P.call(this),
                U.call(this),
                i.advanced.autoScrollOnFocus && H.call(this),
                i.scrollButtons.enable && F.call(this),
                i.keyboard.enable && q.call(this),
                n.bindEvents = !0
            }
        }, k = function() {
            var t = e(this)
              , o = t.data(a)
              , n = o.opt
              , i = a + "_" + o.idx
              , r = ".mCSB_" + o.idx + "_scrollbar"
              , l = e("#mCSB_" + o.idx + ",#mCSB_" + o.idx + "_container,#mCSB_" + o.idx + "_container_wrapper," + r + " ." + d[12] + ",#mCSB_" + o.idx + "_dragger_vertical,#mCSB_" + o.idx + "_dragger_horizontal," + r + ">a")
              , s = e("#mCSB_" + o.idx + "_container");
            n.advanced.releaseDraggableSelectors && l.add(e(n.advanced.releaseDraggableSelectors)),
            n.advanced.extraDraggableSelectors && l.add(e(n.advanced.extraDraggableSelectors)),
            o.bindEvents && (e(document).add(e(!A() || top.document)).unbind("." + i),
            l.each(function() {
                e(this).unbind("." + i)
            }),
            clearTimeout(t[0]._focusTimeout),
            $(t[0], "_focusTimeout"),
            clearTimeout(o.sequential.step),
            $(o.sequential, "step"),
            clearTimeout(s[0].onCompleteTimeout),
            $(s[0], "onCompleteTimeout"),
            o.bindEvents = !1)
        }, M = function(t) {
            var o = e(this)
              , n = o.data(a)
              , i = n.opt
              , r = e("#mCSB_" + n.idx + "_container_wrapper")
              , l = r.length ? r : e("#mCSB_" + n.idx + "_container")
              , s = [e("#mCSB_" + n.idx + "_scrollbar_vertical"), e("#mCSB_" + n.idx + "_scrollbar_horizontal")]
              , c = [s[0].find(".mCSB_dragger"), s[1].find(".mCSB_dragger")];
            "x" !== i.axis && (n.overflowed[0] && !t ? (s[0].add(c[0]).add(s[0].children("a")).css("display", "block"),
            l.removeClass(d[8] + " " + d[10])) : (i.alwaysShowScrollbar ? (2 !== i.alwaysShowScrollbar && c[0].css("display", "none"),
            l.removeClass(d[10])) : (s[0].css("display", "none"),
            l.addClass(d[10])),
            l.addClass(d[8]))),
            "y" !== i.axis && (n.overflowed[1] && !t ? (s[1].add(c[1]).add(s[1].children("a")).css("display", "block"),
            l.removeClass(d[9] + " " + d[11])) : (i.alwaysShowScrollbar ? (2 !== i.alwaysShowScrollbar && c[1].css("display", "none"),
            l.removeClass(d[11])) : (s[1].css("display", "none"),
            l.addClass(d[11])),
            l.addClass(d[9]))),
            n.overflowed[0] || n.overflowed[1] ? o.removeClass(d[5]) : o.addClass(d[5])
        }, O = function(t) {
            var o = t.type
              , a = t.target.ownerDocument !== document && null !== frameElement ? [e(frameElement).offset().top, e(frameElement).offset().left] : null
              , n = A() && t.target.ownerDocument !== top.document && null !== frameElement ? [e(t.view.frameElement).offset().top, e(t.view.frameElement).offset().left] : [0, 0];
            switch (o) {
            case "pointerdown":
            case "MSPointerDown":
            case "pointermove":
            case "MSPointerMove":
            case "pointerup":
            case "MSPointerUp":
                return a ? [t.originalEvent.pageY - a[0] + n[0], t.originalEvent.pageX - a[1] + n[1], !1] : [t.originalEvent.pageY, t.originalEvent.pageX, !1];
            case "touchstart":
            case "touchmove":
            case "touchend":
                var i = t.originalEvent.touches[0] || t.originalEvent.changedTouches[0]
                  , r = t.originalEvent.touches.length || t.originalEvent.changedTouches.length;
                return t.target.ownerDocument !== document ? [i.screenY, i.screenX, r > 1] : [i.pageY, i.pageX, r > 1];
            default:
                return a ? [t.pageY - a[0] + n[0], t.pageX - a[1] + n[1], !1] : [t.pageY, t.pageX, !1]
            }
        }, I = function() {
            function t(e, t, a, n) {
                if (h[0].idleTimer = d.scrollInertia < 233 ? 250 : 0,
                o.attr("id") === f[1])
                    var i = "x"
                      , s = (o[0].offsetLeft - t + n) * l.scrollRatio.x;
                else
                    var i = "y"
                      , s = (o[0].offsetTop - e + a) * l.scrollRatio.y;
                G(r, s.toString(), {
                    dir: i,
                    drag: !0
                })
            }
            var o, n, i, r = e(this), l = r.data(a), d = l.opt, u = a + "_" + l.idx, f = ["mCSB_" + l.idx + "_dragger_vertical", "mCSB_" + l.idx + "_dragger_horizontal"], h = e("#mCSB_" + l.idx + "_container"), m = e("#" + f[0] + ",#" + f[1]), p = d.advanced.releaseDraggableSelectors ? m.add(e(d.advanced.releaseDraggableSelectors)) : m, g = d.advanced.extraDraggableSelectors ? e(!A() || top.document).add(e(d.advanced.extraDraggableSelectors)) : e(!A() || top.document);
            m.bind("contextmenu." + u, function(e) {
                e.preventDefault()
            }).bind("mousedown." + u + " touchstart." + u + " pointerdown." + u + " MSPointerDown." + u, function(t) {
                if (t.stopImmediatePropagation(),
                t.preventDefault(),
                ee(t)) {
                    c = !0,
                    s && (document.onselectstart = function() {
                        return !1
                    }
                    ),
                    L.call(h, !1),
                    Q(r),
                    o = e(this);
                    var a = o.offset()
                      , l = O(t)[0] - a.top
                      , u = O(t)[1] - a.left
                      , f = o.height() + a.top
                      , m = o.width() + a.left;
                    f > l && l > 0 && m > u && u > 0 && (n = l,
                    i = u),
                    C(o, "active", d.autoExpandScrollbar)
                }
            }).bind("touchmove." + u, function(e) {
                e.stopImmediatePropagation(),
                e.preventDefault();
                var a = o.offset()
                  , r = O(e)[0] - a.top
                  , l = O(e)[1] - a.left;
                t(n, i, r, l)
            }),
            e(document).add(g).bind("mousemove." + u + " pointermove." + u + " MSPointerMove." + u, function(e) {
                if (o) {
                    var a = o.offset()
                      , r = O(e)[0] - a.top
                      , l = O(e)[1] - a.left;
                    if (n === r && i === l)
                        return;
                    t(n, i, r, l)
                }
            }).add(p).bind("mouseup." + u + " touchend." + u + " pointerup." + u + " MSPointerUp." + u, function() {
                o && (C(o, "active", d.autoExpandScrollbar),
                o = null),
                c = !1,
                s && (document.onselectstart = null),
                L.call(h, !0)
            })
        }, D = function() {
            function o(e) {
                if (!te(e) || c || O(e)[2])
                    return void (t = 0);
                t = 1,
                b = 0,
                C = 0,
                d = 1,
                y.removeClass("mCS_touch_action");
                var o = I.offset();
                u = O(e)[0] - o.top,
                f = O(e)[1] - o.left,
                z = [O(e)[0], O(e)[1]]
            }
            function n(e) {
                if (te(e) && !c && !O(e)[2] && (T.documentTouchScroll || e.preventDefault(),
                e.stopImmediatePropagation(),
                (!C || b) && d)) {
                    g = K();
                    var t = M.offset()
                      , o = O(e)[0] - t.top
                      , a = O(e)[1] - t.left
                      , n = "mcsLinearOut";
                    if (E.push(o),
                    W.push(a),
                    z[2] = Math.abs(O(e)[0] - z[0]),
                    z[3] = Math.abs(O(e)[1] - z[1]),
                    B.overflowed[0])
                        var i = D[0].parent().height() - D[0].height()
                          , r = u - o > 0 && o - u > -(i * B.scrollRatio.y) && (2 * z[3] < z[2] || "yx" === T.axis);
                    if (B.overflowed[1])
                        var l = D[1].parent().width() - D[1].width()
                          , h = f - a > 0 && a - f > -(l * B.scrollRatio.x) && (2 * z[2] < z[3] || "yx" === T.axis);
                    r || h ? (U || e.preventDefault(),
                    b = 1) : (C = 1,
                    y.addClass("mCS_touch_action")),
                    U && e.preventDefault(),
                    w = "yx" === T.axis ? [u - o, f - a] : "x" === T.axis ? [null, f - a] : [u - o, null],
                    I[0].idleTimer = 250,
                    B.overflowed[0] && s(w[0], R, n, "y", "all", !0),
                    B.overflowed[1] && s(w[1], R, n, "x", L, !0)
                }
            }
            function i(e) {
                if (!te(e) || c || O(e)[2])
                    return void (t = 0);
                t = 1,
                e.stopImmediatePropagation(),
                Q(y),
                p = K();
                var o = M.offset();
                h = O(e)[0] - o.top,
                m = O(e)[1] - o.left,
                E = [],
                W = []
            }
            function r(e) {
                if (te(e) && !c && !O(e)[2]) {
                    d = 0,
                    e.stopImmediatePropagation(),
                    b = 0,
                    C = 0,
                    v = K();
                    var t = M.offset()
                      , o = O(e)[0] - t.top
                      , a = O(e)[1] - t.left;
                    if (!(v - g > 30)) {
                        _ = 1e3 / (v - p);
                        var n = "mcsEaseOut"
                          , i = 2.5 > _
                          , r = i ? [E[E.length - 2], W[W.length - 2]] : [0, 0];
                        x = i ? [o - r[0], a - r[1]] : [o - h, a - m];
                        var u = [Math.abs(x[0]), Math.abs(x[1])];
                        _ = i ? [Math.abs(x[0] / 4), Math.abs(x[1] / 4)] : [_, _];
                        var f = [Math.abs(I[0].offsetTop) - x[0] * l(u[0] / _[0], _[0]), Math.abs(I[0].offsetLeft) - x[1] * l(u[1] / _[1], _[1])];
                        w = "yx" === T.axis ? [f[0], f[1]] : "x" === T.axis ? [null, f[1]] : [f[0], null],
                        S = [4 * u[0] + T.scrollInertia, 4 * u[1] + T.scrollInertia];
                        var y = parseInt(T.contentTouchScroll) || 0;
                        w[0] = u[0] > y ? w[0] : 0,
                        w[1] = u[1] > y ? w[1] : 0,
                        B.overflowed[0] && s(w[0], S[0], n, "y", L, !1),
                        B.overflowed[1] && s(w[1], S[1], n, "x", L, !1)
                    }
                }
            }
            function l(e, t) {
                var o = [1.5 * t, 2 * t, t / 1.5, t / 2];
                return e > 90 ? t > 4 ? o[0] : o[3] : e > 60 ? t > 3 ? o[3] : o[2] : e > 30 ? t > 8 ? o[1] : t > 6 ? o[0] : t > 4 ? t : o[2] : t > 8 ? t : o[3]
            }
            function s(e, t, o, a, n, i) {
                e && G(y, e.toString(), {
                    dur: t,
                    scrollEasing: o,
                    dir: a,
                    overwrite: n,
                    drag: i
                })
            }
            var d, u, f, h, m, p, g, v, x, _, w, S, b, C, y = e(this), B = y.data(a), T = B.opt, k = a + "_" + B.idx, M = e("#mCSB_" + B.idx), I = e("#mCSB_" + B.idx + "_container"), D = [e("#mCSB_" + B.idx + "_dragger_vertical"), e("#mCSB_" + B.idx + "_dragger_horizontal")], E = [], W = [], R = 0, L = "yx" === T.axis ? "none" : "all", z = [], P = I.find("iframe"), H = ["touchstart." + k + " pointerdown." + k + " MSPointerDown." + k, "touchmove." + k + " pointermove." + k + " MSPointerMove." + k, "touchend." + k + " pointerup." + k + " MSPointerUp." + k], U = void 0 !== document.body.style.touchAction && "" !== document.body.style.touchAction;
            I.bind(H[0], function(e) {
                o(e)
            }).bind(H[1], function(e) {
                n(e)
            }),
            M.bind(H[0], function(e) {
                i(e)
            }).bind(H[2], function(e) {
                r(e)
            }),
            P.length && P.each(function() {
                e(this).bind("load", function() {
                    A(this) && e(this.contentDocument || this.contentWindow.document).bind(H[0], function(e) {
                        o(e),
                        i(e)
                    }).bind(H[1], function(e) {
                        n(e)
                    }).bind(H[2], function(e) {
                        r(e)
                    })
                })
            })
        }, E = function() {
            function o() {
                return window.getSelection ? window.getSelection().toString() : document.selection && "Control" != document.selection.type ? document.selection.createRange().text : 0
            }
            function n(e, t, o) {
                d.type = o && i ? "stepped" : "stepless",
                d.scrollAmount = 10,
                j(r, e, t, "mcsLinearOut", o ? 60 : null)
            }
            var i, r = e(this), l = r.data(a), s = l.opt, d = l.sequential, u = a + "_" + l.idx, f = e("#mCSB_" + l.idx + "_container"), h = f.parent();
            f.bind("mousedown." + u, function() {
                t || i || (i = 1,
                c = !0)
            }).add(document).bind("mousemove." + u, function(e) {
                if (!t && i && o()) {
                    var a = f.offset()
                      , r = O(e)[0] - a.top + f[0].offsetTop
                      , c = O(e)[1] - a.left + f[0].offsetLeft;
                    r > 0 && r < h.height() && c > 0 && c < h.width() ? d.step && n("off", null, "stepped") : ("x" !== s.axis && l.overflowed[0] && (0 > r ? n("on", 38) : r > h.height() && n("on", 40)),
                    "y" !== s.axis && l.overflowed[1] && (0 > c ? n("on", 37) : c > h.width() && n("on", 39)))
                }
            }).bind("mouseup." + u + " dragend." + u, function() {
                t || (i && (i = 0,
                n("off", null)),
                c = !1)
            })
        }, W = function() {
            function t(t, a) {
                if (Q(o),
                !z(o, t.target)) {
                    var r = "auto" !== i.mouseWheel.deltaFactor ? parseInt(i.mouseWheel.deltaFactor) : s && t.deltaFactor < 100 ? 100 : t.deltaFactor || 100
                      , d = i.scrollInertia;
                    if ("x" === i.axis || "x" === i.mouseWheel.axis)
                        var u = "x"
                          , f = [Math.round(r * n.scrollRatio.x), parseInt(i.mouseWheel.scrollAmount)]
                          , h = "auto" !== i.mouseWheel.scrollAmount ? f[1] : f[0] >= l.width() ? .9 * l.width() : f[0]
                          , m = Math.abs(e("#mCSB_" + n.idx + "_container")[0].offsetLeft)
                          , p = c[1][0].offsetLeft
                          , g = c[1].parent().width() - c[1].width()
                          , v = "y" === i.mouseWheel.axis ? t.deltaY || a : t.deltaX;
                    else
                        var u = "y"
                          , f = [Math.round(r * n.scrollRatio.y), parseInt(i.mouseWheel.scrollAmount)]
                          , h = "auto" !== i.mouseWheel.scrollAmount ? f[1] : f[0] >= l.height() ? .9 * l.height() : f[0]
                          , m = Math.abs(e("#mCSB_" + n.idx + "_container")[0].offsetTop)
                          , p = c[0][0].offsetTop
                          , g = c[0].parent().height() - c[0].height()
                          , v = t.deltaY || a;
                    "y" === u && !n.overflowed[0] || "x" === u && !n.overflowed[1] || ((i.mouseWheel.invert || t.webkitDirectionInvertedFromDevice) && (v = -v),
                    i.mouseWheel.normalizeDelta && (v = 0 > v ? -1 : 1),
                    (v > 0 && 0 !== p || 0 > v && p !== g || i.mouseWheel.preventDefault) && (t.stopImmediatePropagation(),
                    t.preventDefault()),
                    t.deltaFactor < 5 && !i.mouseWheel.normalizeDelta && (h = t.deltaFactor,
                    d = 17),
                    G(o, (m - v * h).toString(), {
                        dir: u,
                        dur: d
                    }))
                }
            }
            if (e(this).data(a)) {
                var o = e(this)
                  , n = o.data(a)
                  , i = n.opt
                  , r = a + "_" + n.idx
                  , l = e("#mCSB_" + n.idx)
                  , c = [e("#mCSB_" + n.idx + "_dragger_vertical"), e("#mCSB_" + n.idx + "_dragger_horizontal")]
                  , d = e("#mCSB_" + n.idx + "_container").find("iframe");
                d.length && d.each(function() {
                    e(this).bind("load", function() {
                        A(this) && e(this.contentDocument || this.contentWindow.document).bind("mousewheel." + r, function(e, o) {
                            t(e, o)
                        })
                    })
                }),
                l.bind("mousewheel." + r, function(e, o) {
                    t(e, o)
                })
            }
        }, R = new Object, A = function(t) {
            var o = !1
              , a = !1
              , n = null;
            if (void 0 === t ? a = "#empty" : void 0 !== e(t).attr("id") && (a = e(t).attr("id")),
            a !== !1 && void 0 !== R[a])
                return R[a];
            if (t) {
                try {
                    var i = t.contentDocument || t.contentWindow.document;
                    n = i.body.innerHTML
                } catch (r) {}
                o = null !== n
            } else {
                try {
                    var i = top.document;
                    n = i.body.innerHTML
                } catch (r) {}
                o = null !== n
            }
            return a !== !1 && (R[a] = o),
            o
        }, L = function(e) {
            var t = this.find("iframe");
            if (t.length) {
                var o = e ? "auto" : "none";
                t.css("pointer-events", o)
            }
        }, z = function(t, o) {
            var n = o.nodeName.toLowerCase()
              , i = t.data(a).opt.mouseWheel.disableOver
              , r = ["select", "textarea"];
            return e.inArray(n, i) > -1 && !(e.inArray(n, r) > -1 && !e(o).is(":focus"))
        }, P = function() {
            var t, o = e(this), n = o.data(a), i = a + "_" + n.idx, r = e("#mCSB_" + n.idx + "_container"), l = r.parent(), s = e(".mCSB_" + n.idx + "_scrollbar ." + d[12]);
            s.bind("mousedown." + i + " touchstart." + i + " pointerdown." + i + " MSPointerDown." + i, function(o) {
                c = !0,
                e(o.target).hasClass("mCSB_dragger") || (t = 1)
            }).bind("touchend." + i + " pointerup." + i + " MSPointerUp." + i, function() {
                c = !1
            }).bind("click." + i, function(a) {
                if (t && (t = 0,
                e(a.target).hasClass(d[12]) || e(a.target).hasClass("mCSB_draggerRail"))) {
                    Q(o);
                    var i = e(this)
                      , s = i.find(".mCSB_dragger");
                    if (i.parent(".mCSB_scrollTools_horizontal").length > 0) {
                        if (!n.overflowed[1])
                            return;
                        var c = "x"
                          , u = a.pageX > s.offset().left ? -1 : 1
                          , f = Math.abs(r[0].offsetLeft) - u * (.9 * l.width())
                    } else {
                        if (!n.overflowed[0])
                            return;
                        var c = "y"
                          , u = a.pageY > s.offset().top ? -1 : 1
                          , f = Math.abs(r[0].offsetTop) - u * (.9 * l.height())
                    }
                    G(o, f.toString(), {
                        dir: c,
                        scrollEasing: "mcsEaseInOut"
                    })
                }
            })
        }, H = function() {
            var t = e(this)
              , o = t.data(a)
              , n = o.opt
              , i = a + "_" + o.idx
              , r = e("#mCSB_" + o.idx + "_container")
              , l = r.parent();
            r.bind("focusin." + i, function() {
                var o = e(document.activeElement)
                  , a = r.find(".mCustomScrollBox").length
                  , i = 0;
                o.is(n.advanced.autoScrollOnFocus) && (Q(t),
                clearTimeout(t[0]._focusTimeout),
                t[0]._focusTimer = a ? (i + 17) * a : 0,
                t[0]._focusTimeout = setTimeout(function() {
                    var e = [ae(o)[0], ae(o)[1]]
                      , a = [r[0].offsetTop, r[0].offsetLeft]
                      , s = [a[0] + e[0] >= 0 && a[0] + e[0] < l.height() - o.outerHeight(!1), a[1] + e[1] >= 0 && a[0] + e[1] < l.width() - o.outerWidth(!1)]
                      , c = "yx" !== n.axis || s[0] || s[1] ? "all" : "none";
                    "x" === n.axis || s[0] || G(t, e[0].toString(), {
                        dir: "y",
                        scrollEasing: "mcsEaseInOut",
                        overwrite: c,
                        dur: i
                    }),
                    "y" === n.axis || s[1] || G(t, e[1].toString(), {
                        dir: "x",
                        scrollEasing: "mcsEaseInOut",
                        overwrite: c,
                        dur: i
                    })
                }, t[0]._focusTimer))
            })
        }, U = function() {
            var t = e(this)
              , o = t.data(a)
              , n = a + "_" + o.idx
              , i = e("#mCSB_" + o.idx + "_container").parent();
            i.bind("scroll." + n, function() {
                0 === i.scrollTop() && 0 === i.scrollLeft() || e(".mCSB_" + o.idx + "_scrollbar").css("visibility", "hidden")
            })
        }, F = function() {
            var t = e(this)
              , o = t.data(a)
              , n = o.opt
              , i = o.sequential
              , r = a + "_" + o.idx
              , l = ".mCSB_" + o.idx + "_scrollbar"
              , s = e(l + ">a");
            s.bind("contextmenu." + r, function(e) {
                e.preventDefault()
            }).bind("mousedown." + r + " touchstart." + r + " pointerdown." + r + " MSPointerDown." + r + " mouseup." + r + " touchend." + r + " pointerup." + r + " MSPointerUp." + r + " mouseout." + r + " pointerout." + r + " MSPointerOut." + r + " click." + r, function(a) {
                function r(e, o) {
                    i.scrollAmount = n.scrollButtons.scrollAmount,
                    j(t, e, o)
                }
                if (a.preventDefault(),
                ee(a)) {
                    var l = e(this).attr("class");
                    switch (i.type = n.scrollButtons.scrollType,
                    a.type) {
                    case "mousedown":
                    case "touchstart":
                    case "pointerdown":
                    case "MSPointerDown":
                        if ("stepped" === i.type)
                            return;
                        c = !0,
                        o.tweenRunning = !1,
                        r("on", l);
                        break;
                    case "mouseup":
                    case "touchend":
                    case "pointerup":
                    case "MSPointerUp":
                    case "mouseout":
                    case "pointerout":
                    case "MSPointerOut":
                        if ("stepped" === i.type)
                            return;
                        c = !1,
                        i.dir && r("off", l);
                        break;
                    case "click":
                        if ("stepped" !== i.type || o.tweenRunning)
                            return;
                        r("on", l)
                    }
                }
            })
        }, q = function() {
            function t(t) {
                function a(e, t) {
                    r.type = i.keyboard.scrollType,
                    r.scrollAmount = i.keyboard.scrollAmount,
                    "stepped" === r.type && n.tweenRunning || j(o, e, t)
                }
                switch (t.type) {
                case "blur":
                    n.tweenRunning && r.dir && a("off", null);
                    break;
                case "keydown":
                case "keyup":
                    var l = t.keyCode ? t.keyCode : t.which
                      , s = "on";
                    if ("x" !== i.axis && (38 === l || 40 === l) || "y" !== i.axis && (37 === l || 39 === l)) {
                        if ((38 === l || 40 === l) && !n.overflowed[0] || (37 === l || 39 === l) && !n.overflowed[1])
                            return;
                        "keyup" === t.type && (s = "off"),
                        e(document.activeElement).is(u) || (t.preventDefault(),
                        t.stopImmediatePropagation(),
                        a(s, l))
                    } else if (33 === l || 34 === l) {
                        if ((n.overflowed[0] || n.overflowed[1]) && (t.preventDefault(),
                        t.stopImmediatePropagation()),
                        "keyup" === t.type) {
                            Q(o);
                            var f = 34 === l ? -1 : 1;
                            if ("x" === i.axis || "yx" === i.axis && n.overflowed[1] && !n.overflowed[0])
                                var h = "x"
                                  , m = Math.abs(c[0].offsetLeft) - f * (.9 * d.width());
                            else
                                var h = "y"
                                  , m = Math.abs(c[0].offsetTop) - f * (.9 * d.height());
                            G(o, m.toString(), {
                                dir: h,
                                scrollEasing: "mcsEaseInOut"
                            })
                        }
                    } else if ((35 === l || 36 === l) && !e(document.activeElement).is(u) && ((n.overflowed[0] || n.overflowed[1]) && (t.preventDefault(),
                    t.stopImmediatePropagation()),
                    "keyup" === t.type)) {
                        if ("x" === i.axis || "yx" === i.axis && n.overflowed[1] && !n.overflowed[0])
                            var h = "x"
                              , m = 35 === l ? Math.abs(d.width() - c.outerWidth(!1)) : 0;
                        else
                            var h = "y"
                              , m = 35 === l ? Math.abs(d.height() - c.outerHeight(!1)) : 0;
                        G(o, m.toString(), {
                            dir: h,
                            scrollEasing: "mcsEaseInOut"
                        })
                    }
                }
            }
            var o = e(this)
              , n = o.data(a)
              , i = n.opt
              , r = n.sequential
              , l = a + "_" + n.idx
              , s = e("#mCSB_" + n.idx)
              , c = e("#mCSB_" + n.idx + "_container")
              , d = c.parent()
              , u = "input,textarea,select,datalist,keygen,[contenteditable='true']"
              , f = c.find("iframe")
              , h = ["blur." + l + " keydown." + l + " keyup." + l];
            f.length && f.each(function() {
                e(this).bind("load", function() {
                    A(this) && e(this.contentDocument || this.contentWindow.document).bind(h[0], function(e) {
                        t(e)
                    })
                })
            }),
            s.attr("tabindex", "0").bind(h[0], function(e) {
                t(e)
            })
        }, j = function(t, o, n, i, r) {
            function l(e) {
                u.snapAmount && (f.scrollAmount = u.snapAmount instanceof Array ? "x" === f.dir[0] ? u.snapAmount[1] : u.snapAmount[0] : u.snapAmount);
                var o = "stepped" !== f.type
                  , a = r ? r : e ? o ? p / 1.5 : g : 1e3 / 60
                  , n = e ? o ? 7.5 : 40 : 2.5
                  , s = [Math.abs(h[0].offsetTop), Math.abs(h[0].offsetLeft)]
                  , d = [c.scrollRatio.y > 10 ? 10 : c.scrollRatio.y, c.scrollRatio.x > 10 ? 10 : c.scrollRatio.x]
                  , m = "x" === f.dir[0] ? s[1] + f.dir[1] * (d[1] * n) : s[0] + f.dir[1] * (d[0] * n)
                  , v = "x" === f.dir[0] ? s[1] + f.dir[1] * parseInt(f.scrollAmount) : s[0] + f.dir[1] * parseInt(f.scrollAmount)
                  , x = "auto" !== f.scrollAmount ? v : m
                  , _ = i ? i : e ? o ? "mcsLinearOut" : "mcsEaseInOut" : "mcsLinear"
                  , w = !!e;
                return e && 17 > a && (x = "x" === f.dir[0] ? s[1] : s[0]),
                G(t, x.toString(), {
                    dir: f.dir[0],
                    scrollEasing: _,
                    dur: a,
                    onComplete: w
                }),
                e ? void (f.dir = !1) : (clearTimeout(f.step),
                void (f.step = setTimeout(function() {
                    l()
                }, a)))
            }
            function s() {
                clearTimeout(f.step),
                $(f, "step"),
                Q(t)
            }
            var c = t.data(a)
              , u = c.opt
              , f = c.sequential
              , h = e("#mCSB_" + c.idx + "_container")
              , m = "stepped" === f.type
              , p = u.scrollInertia < 26 ? 26 : u.scrollInertia
              , g = u.scrollInertia < 1 ? 17 : u.scrollInertia;
            switch (o) {
            case "on":
                if (f.dir = [n === d[16] || n === d[15] || 39 === n || 37 === n ? "x" : "y", n === d[13] || n === d[15] || 38 === n || 37 === n ? -1 : 1],
                Q(t),
                oe(n) && "stepped" === f.type)
                    return;
                l(m);
                break;
            case "off":
                s(),
                (m || c.tweenRunning && f.dir) && l(!0)
            }
        }, Y = function(t) {
            var o = e(this).data(a).opt
              , n = [];
            return "function" == typeof t && (t = t()),
            t instanceof Array ? n = t.length > 1 ? [t[0], t[1]] : "x" === o.axis ? [null, t[0]] : [t[0], null] : (n[0] = t.y ? t.y : t.x || "x" === o.axis ? null : t,
            n[1] = t.x ? t.x : t.y || "y" === o.axis ? null : t),
            "function" == typeof n[0] && (n[0] = n[0]()),
            "function" == typeof n[1] && (n[1] = n[1]()),
            n
        }, X = function(t, o) {
            if (null != t && "undefined" != typeof t) {
                var n = e(this)
                  , i = n.data(a)
                  , r = i.opt
                  , l = e("#mCSB_" + i.idx + "_container")
                  , s = l.parent()
                  , c = typeof t;
                o || (o = "x" === r.axis ? "x" : "y");
                var d = "x" === o ? l.outerWidth(!1) - s.width() : l.outerHeight(!1) - s.height()
                  , f = "x" === o ? l[0].offsetLeft : l[0].offsetTop
                  , h = "x" === o ? "left" : "top";
                switch (c) {
                case "function":
                    return t();
                case "object":
                    var m = t.jquery ? t : e(t);
                    if (!m.length)
                        return;
                    return "x" === o ? ae(m)[1] : ae(m)[0];
                case "string":
                case "number":
                    if (oe(t))
                        return Math.abs(t);
                    if (-1 !== t.indexOf("%"))
                        return Math.abs(d * parseInt(t) / 100);
                    if (-1 !== t.indexOf("-="))
                        return Math.abs(f - parseInt(t.split("-=")[1]));
                    if (-1 !== t.indexOf("+=")) {
                        var p = f + parseInt(t.split("+=")[1]);
                        return p >= 0 ? 0 : Math.abs(p)
                    }
                    if (-1 !== t.indexOf("px") && oe(t.split("px")[0]))
                        return Math.abs(t.split("px")[0]);
                    if ("top" === t || "left" === t)
                        return 0;
                    if ("bottom" === t)
                        return Math.abs(s.height() - l.outerHeight(!1));
                    if ("right" === t)
                        return Math.abs(s.width() - l.outerWidth(!1));
                    if ("first" === t || "last" === t) {
                        var m = l.find(":" + t);
                        return "x" === o ? ae(m)[1] : ae(m)[0]
                    }
                    return e(t).length ? "x" === o ? ae(e(t))[1] : ae(e(t))[0] : (l.css(h, t),
                    void u.update.call(null, n[0]))
                }
            }
        }, N = function(t) {
            function o() {
                return clearTimeout(f[0].autoUpdate),
                0 === l.parents("html").length ? void (l = null) : void (f[0].autoUpdate = setTimeout(function() {
                    return c.advanced.updateOnSelectorChange && (s.poll.change.n = i(),
                    s.poll.change.n !== s.poll.change.o) ? (s.poll.change.o = s.poll.change.n,
                    void r(3)) : c.advanced.updateOnContentResize && (s.poll.size.n = l[0].scrollHeight + l[0].scrollWidth + f[0].offsetHeight + l[0].offsetHeight + l[0].offsetWidth,
                    s.poll.size.n !== s.poll.size.o) ? (s.poll.size.o = s.poll.size.n,
                    void r(1)) : !c.advanced.updateOnImageLoad || "auto" === c.advanced.updateOnImageLoad && "y" === c.axis || (s.poll.img.n = f.find("img").length,
                    s.poll.img.n === s.poll.img.o) ? void ((c.advanced.updateOnSelectorChange || c.advanced.updateOnContentResize || c.advanced.updateOnImageLoad) && o()) : (s.poll.img.o = s.poll.img.n,
                    void f.find("img").each(function() {
                        n(this)
                    }))
                }, c.advanced.autoUpdateTimeout))
            }
            function n(t) {
                function o(e, t) {
                    return function() {
                        return t.apply(e, arguments)
                    }
                }
                function a() {
                    this.onload = null,
                    e(t).addClass(d[2]),
                    r(2)
                }
                if (e(t).hasClass(d[2]))
                    return void r();
                var n = new Image;
                n.onload = o(n, a),
                n.src = t.src
            }
            function i() {
                c.advanced.updateOnSelectorChange === !0 && (c.advanced.updateOnSelectorChange = "*");
                var e = 0
                  , t = f.find(c.advanced.updateOnSelectorChange);
                return c.advanced.updateOnSelectorChange && t.length > 0 && t.each(function() {
                    e += this.offsetHeight + this.offsetWidth
                }),
                e
            }
            function r(e) {
                clearTimeout(f[0].autoUpdate),
                u.update.call(null, l[0], e)
            }
            var l = e(this)
              , s = l.data(a)
              , c = s.opt
              , f = e("#mCSB_" + s.idx + "_container");
            return t ? (clearTimeout(f[0].autoUpdate),
            void $(f[0], "autoUpdate")) : void o()
        }, V = function(e, t, o) {
            return Math.round(e / t) * t - o
        }, Q = function(t) {
            var o = t.data(a)
              , n = e("#mCSB_" + o.idx + "_container,#mCSB_" + o.idx + "_container_wrapper,#mCSB_" + o.idx + "_dragger_vertical,#mCSB_" + o.idx + "_dragger_horizontal");
            n.each(function() {
                Z.call(this)
            })
        }, G = function(t, o, n) {
            function i(e) {
                return s && c.callbacks[e] && "function" == typeof c.callbacks[e]
            }
            function r() {
                return [c.callbacks.alwaysTriggerOffsets || w >= S[0] + y, c.callbacks.alwaysTriggerOffsets || -B >= w]
            }
            function l() {
                var e = [h[0].offsetTop, h[0].offsetLeft]
                  , o = [x[0].offsetTop, x[0].offsetLeft]
                  , a = [h.outerHeight(!1), h.outerWidth(!1)]
                  , i = [f.height(), f.width()];
                t[0].mcs = {
                    content: h,
                    top: e[0],
                    left: e[1],
                    draggerTop: o[0],
                    draggerLeft: o[1],
                    topPct: Math.round(100 * Math.abs(e[0]) / (Math.abs(a[0]) - i[0])),
                    leftPct: Math.round(100 * Math.abs(e[1]) / (Math.abs(a[1]) - i[1])),
                    direction: n.dir
                }
            }
            var s = t.data(a)
              , c = s.opt
              , d = {
                trigger: "internal",
                dir: "y",
                scrollEasing: "mcsEaseOut",
                drag: !1,
                dur: c.scrollInertia,
                overwrite: "all",
                callbacks: !0,
                onStart: !0,
                onUpdate: !0,
                onComplete: !0
            }
              , n = e.extend(d, n)
              , u = [n.dur, n.drag ? 0 : n.dur]
              , f = e("#mCSB_" + s.idx)
              , h = e("#mCSB_" + s.idx + "_container")
              , m = h.parent()
              , p = c.callbacks.onTotalScrollOffset ? Y.call(t, c.callbacks.onTotalScrollOffset) : [0, 0]
              , g = c.callbacks.onTotalScrollBackOffset ? Y.call(t, c.callbacks.onTotalScrollBackOffset) : [0, 0];
            if (s.trigger = n.trigger,
            0 === m.scrollTop() && 0 === m.scrollLeft() || (e(".mCSB_" + s.idx + "_scrollbar").css("visibility", "visible"),
            m.scrollTop(0).scrollLeft(0)),
            "_resetY" !== o || s.contentReset.y || (i("onOverflowYNone") && c.callbacks.onOverflowYNone.call(t[0]),
            s.contentReset.y = 1),
            "_resetX" !== o || s.contentReset.x || (i("onOverflowXNone") && c.callbacks.onOverflowXNone.call(t[0]),
            s.contentReset.x = 1),
            "_resetY" !== o && "_resetX" !== o) {
                if (!s.contentReset.y && t[0].mcs || !s.overflowed[0] || (i("onOverflowY") && c.callbacks.onOverflowY.call(t[0]),
                s.contentReset.x = null),
                !s.contentReset.x && t[0].mcs || !s.overflowed[1] || (i("onOverflowX") && c.callbacks.onOverflowX.call(t[0]),
                s.contentReset.x = null),
                c.snapAmount) {
                    var v = c.snapAmount instanceof Array ? "x" === n.dir ? c.snapAmount[1] : c.snapAmount[0] : c.snapAmount;
                    o = V(o, v, c.snapOffset)
                }
                switch (n.dir) {
                case "x":
                    var x = e("#mCSB_" + s.idx + "_dragger_horizontal")
                      , _ = "left"
                      , w = h[0].offsetLeft
                      , S = [f.width() - h.outerWidth(!1), x.parent().width() - x.width()]
                      , b = [o, 0 === o ? 0 : o / s.scrollRatio.x]
                      , y = p[1]
                      , B = g[1]
                      , T = y > 0 ? y / s.scrollRatio.x : 0
                      , k = B > 0 ? B / s.scrollRatio.x : 0;
                    break;
                case "y":
                    var x = e("#mCSB_" + s.idx + "_dragger_vertical")
                      , _ = "top"
                      , w = h[0].offsetTop
                      , S = [f.height() - h.outerHeight(!1), x.parent().height() - x.height()]
                      , b = [o, 0 === o ? 0 : o / s.scrollRatio.y]
                      , y = p[0]
                      , B = g[0]
                      , T = y > 0 ? y / s.scrollRatio.y : 0
                      , k = B > 0 ? B / s.scrollRatio.y : 0
                }
                b[1] < 0 || 0 === b[0] && 0 === b[1] ? b = [0, 0] : b[1] >= S[1] ? b = [S[0], S[1]] : b[0] = -b[0],
                t[0].mcs || (l(),
                i("onInit") && c.callbacks.onInit.call(t[0])),
                clearTimeout(h[0].onCompleteTimeout),
                J(x[0], _, Math.round(b[1]), u[1], n.scrollEasing),
                !s.tweenRunning && (0 === w && b[0] >= 0 || w === S[0] && b[0] <= S[0]) || J(h[0], _, Math.round(b[0]), u[0], n.scrollEasing, n.overwrite, {
                    onStart: function() {
                        n.callbacks && n.onStart && !s.tweenRunning && (i("onScrollStart") && (l(),
                        c.callbacks.onScrollStart.call(t[0])),
                        s.tweenRunning = !0,
                        C(x),
                        s.cbOffsets = r())
                    },
                    onUpdate: function() {
                        n.callbacks && n.onUpdate && i("whileScrolling") && (l(),
                        c.callbacks.whileScrolling.call(t[0]))
                    },
                    onComplete: function() {
                        if (n.callbacks && n.onComplete) {
                            "yx" === c.axis && clearTimeout(h[0].onCompleteTimeout);
                            var e = h[0].idleTimer || 0;
                            h[0].onCompleteTimeout = setTimeout(function() {
                                i("onScroll") && (l(),
                                c.callbacks.onScroll.call(t[0])),
                                i("onTotalScroll") && b[1] >= S[1] - T && s.cbOffsets[0] && (l(),
                                c.callbacks.onTotalScroll.call(t[0])),
                                i("onTotalScrollBack") && b[1] <= k && s.cbOffsets[1] && (l(),
                                c.callbacks.onTotalScrollBack.call(t[0])),
                                s.tweenRunning = !1,
                                h[0].idleTimer = 0,
                                C(x, "hide")
                            }, e)
                        }
                    }
                })
            }
        }, J = function(e, t, o, a, n, i, r) {
            function l() {
                S.stop || (x || m.call(),
                x = K() - v,
                s(),
                x >= S.time && (S.time = x > S.time ? x + f - (x - S.time) : x + f - 1,
                S.time < x + 1 && (S.time = x + 1)),
                S.time < a ? S.id = h(l) : g.call())
            }
            function s() {
                a > 0 ? (S.currVal = u(S.time, _, b, a, n),
                w[t] = Math.round(S.currVal) + "px") : w[t] = o + "px",
                p.call()
            }
            function c() {
                f = 1e3 / 60,
                S.time = x + f,
                h = window.requestAnimationFrame ? window.requestAnimationFrame : function(e) {
                    return s(),
                    setTimeout(e, .01)
                }
                ,
                S.id = h(l)
            }
            function d() {
                null != S.id && (window.requestAnimationFrame ? window.cancelAnimationFrame(S.id) : clearTimeout(S.id),
                S.id = null)
            }
            function u(e, t, o, a, n) {
                switch (n) {
                case "linear":
                case "mcsLinear":
                    return o * e / a + t;
                case "mcsLinearOut":
                    return e /= a,
                    e--,
                    o * Math.sqrt(1 - e * e) + t;
                case "easeInOutSmooth":
                    return e /= a / 2,
                    1 > e ? o / 2 * e * e + t : (e--,
                    -o / 2 * (e * (e - 2) - 1) + t);
                case "easeInOutStrong":
                    return e /= a / 2,
                    1 > e ? o / 2 * Math.pow(2, 10 * (e - 1)) + t : (e--,
                    o / 2 * (-Math.pow(2, -10 * e) + 2) + t);
                case "easeInOut":
                case "mcsEaseInOut":
                    return e /= a / 2,
                    1 > e ? o / 2 * e * e * e + t : (e -= 2,
                    o / 2 * (e * e * e + 2) + t);
                case "easeOutSmooth":
                    return e /= a,
                    e--,
                    -o * (e * e * e * e - 1) + t;
                case "easeOutStrong":
                    return o * (-Math.pow(2, -10 * e / a) + 1) + t;
                case "easeOut":
                case "mcsEaseOut":
                default:
                    var i = (e /= a) * e
                      , r = i * e;
                    return t + o * (.499999999999997 * r * i + -2.5 * i * i + 5.5 * r + -6.5 * i + 4 * e)
                }
            }
            e._mTween || (e._mTween = {
                top: {},
                left: {}
            });
            var f, h, r = r || {}, m = r.onStart || function() {}
            , p = r.onUpdate || function() {}
            , g = r.onComplete || function() {}
            , v = K(), x = 0, _ = e.offsetTop, w = e.style, S = e._mTween[t];
            "left" === t && (_ = e.offsetLeft);
            var b = o - _;
            S.stop = 0,
            "none" !== i && d(),
            c()
        }, K = function() {
            return window.performance && window.performance.now ? window.performance.now() : window.performance && window.performance.webkitNow ? window.performance.webkitNow() : Date.now ? Date.now() : (new Date).getTime()
        }, Z = function() {
            var e = this;
            e._mTween || (e._mTween = {
                top: {},
                left: {}
            });
            for (var t = ["top", "left"], o = 0; o < t.length; o++) {
                var a = t[o];
                e._mTween[a].id && (window.requestAnimationFrame ? window.cancelAnimationFrame(e._mTween[a].id) : clearTimeout(e._mTween[a].id),
                e._mTween[a].id = null,
                e._mTween[a].stop = 1)
            }
        }, $ = function(e, t) {
            try {
                delete e[t]
            } catch (o) {
                e[t] = null
            }
        }, ee = function(e) {
            return !(e.which && 1 !== e.which)
        }, te = function(e) {
            var t = e.originalEvent.pointerType;
            return !(t && "touch" !== t && 2 !== t)
        }, oe = function(e) {
            return !isNaN(parseFloat(e)) && isFinite(e)
        }, ae = function(e) {
            var t = e.parents(".mCSB_container");
            return [e.offset().top - t.offset().top, e.offset().left - t.offset().left]
        }, ne = function() {
            function e() {
                var e = ["webkit", "moz", "ms", "o"];
                if ("hidden"in document)
                    return "hidden";
                for (var t = 0; t < e.length; t++)
                    if (e[t] + "Hidden"in document)
                        return e[t] + "Hidden";
                return null
            }
            var t = e();
            return t ? document[t] : !1
        };
        e.fn[o] = function(t) {
            return u[t] ? u[t].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof t && t ? void e.error("Method " + t + " does not exist") : u.init.apply(this, arguments)
        }
        ,
        e[o] = function(t) {
            return u[t] ? u[t].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof t && t ? void e.error("Method " + t + " does not exist") : u.init.apply(this, arguments)
        }
        ,
        e[o].defaults = i,
        window[o] = !0,
        e(window).bind("load", function() {
            e(n)[o](),
            e.extend(e.expr[":"], {
                mcsInView: e.expr[":"].mcsInView || function(t) {
                    var o, a, n = e(t), i = n.parents(".mCSB_container");
                    if (i.length)
                        return o = i.parent(),
                        a = [i[0].offsetTop, i[0].offsetLeft],
                        a[0] + ae(n)[0] >= 0 && a[0] + ae(n)[0] < o.height() - n.outerHeight(!1) && a[1] + ae(n)[1] >= 0 && a[1] + ae(n)[1] < o.width() - n.outerWidth(!1)
                }
                ,
                mcsInSight: e.expr[":"].mcsInSight || function(t, o, a) {
                    var n, i, r, l, s = e(t), c = s.parents(".mCSB_container"), d = "exact" === a[3] ? [[1, 0], [1, 0]] : [[.9, .1], [.6, .4]];
                    if (c.length)
                        return n = [s.outerHeight(!1), s.outerWidth(!1)],
                        r = [c[0].offsetTop + ae(s)[0], c[0].offsetLeft + ae(s)[1]],
                        i = [c.parent()[0].offsetHeight, c.parent()[0].offsetWidth],
                        l = [n[0] < i[0] ? d[0] : d[1], n[1] < i[1] ? d[0] : d[1]],
                        r[0] - i[0] * l[0][0] < 0 && r[0] + n[0] - i[0] * l[0][1] >= 0 && r[1] - i[1] * l[1][0] < 0 && r[1] + n[1] - i[1] * l[1][1] >= 0
                }
                ,
                mcsOverflow: e.expr[":"].mcsOverflow || function(t) {
                    var o = e(t).data(a);
                    if (o)
                        return o.overflowed[0] || o.overflowed[1]
                }
            })
        })
    })
});

/**
 * Swiper 4.5.1
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 * http://www.idangero.us/swiper/
 *
 * Copyright 2014-2019 Vladimir Kharlampidi
 *
 * Released under the MIT License
 *
 * Released on: September 13, 2019
 */
!function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = e || self).Swiper = t()
}(this, function() {
    "use strict";
    var f = "undefined" == typeof document ? {
        body: {},
        addEventListener: function() {},
        removeEventListener: function() {},
        activeElement: {
            blur: function() {},
            nodeName: ""
        },
        querySelector: function() {
            return null
        },
        querySelectorAll: function() {
            return []
        },
        getElementById: function() {
            return null
        },
        createEvent: function() {
            return {
                initEvent: function() {}
            }
        },
        createElement: function() {
            return {
                children: [],
                childNodes: [],
                style: {},
                setAttribute: function() {},
                getElementsByTagName: function() {
                    return []
                }
            }
        },
        location: {
            hash: ""
        }
    } : document
      , ee = "undefined" == typeof window ? {
        document: f,
        navigator: {
            userAgent: ""
        },
        location: {},
        history: {},
        CustomEvent: function() {
            return this
        },
        addEventListener: function() {},
        removeEventListener: function() {},
        getComputedStyle: function() {
            return {
                getPropertyValue: function() {
                    return ""
                }
            }
        },
        Image: function() {},
        Date: function() {},
        screen: {},
        setTimeout: function() {},
        clearTimeout: function() {}
    } : window
      , l = function(e) {
        for (var t = 0; t < e.length; t += 1)
            this[t] = e[t];
        return this.length = e.length,
        this
    };
    function I(e, t) {
        var a = []
          , i = 0;
        if (e && !t && e instanceof l)
            return e;
        if (e)
            if ("string" == typeof e) {
                var s, r, n = e.trim();
                if (0 <= n.indexOf("<") && 0 <= n.indexOf(">")) {
                    var o = "div";
                    for (0 === n.indexOf("<li") && (o = "ul"),
                    0 === n.indexOf("<tr") && (o = "tbody"),
                    0 !== n.indexOf("<td") && 0 !== n.indexOf("<th") || (o = "tr"),
                    0 === n.indexOf("<tbody") && (o = "table"),
                    0 === n.indexOf("<option") && (o = "select"),
                    (r = f.createElement(o)).innerHTML = n,
                    i = 0; i < r.childNodes.length; i += 1)
                        a.push(r.childNodes[i])
                } else
                    for (s = t || "#" !== e[0] || e.match(/[ .<>:~]/) ? (t || f).querySelectorAll(e.trim()) : [f.getElementById(e.trim().split("#")[1])],
                    i = 0; i < s.length; i += 1)
                        s[i] && a.push(s[i])
            } else if (e.nodeType || e === ee || e === f)
                a.push(e);
            else if (0 < e.length && e[0].nodeType)
                for (i = 0; i < e.length; i += 1)
                    a.push(e[i]);
        return new l(a)
    }
    function r(e) {
        for (var t = [], a = 0; a < e.length; a += 1)
            -1 === t.indexOf(e[a]) && t.push(e[a]);
        return t
    }
    I.fn = l.prototype,
    I.Class = l,
    I.Dom7 = l;
    var t = {
        addClass: function(e) {
            if (void 0 === e)
                return this;
            for (var t = e.split(" "), a = 0; a < t.length; a += 1)
                for (var i = 0; i < this.length; i += 1)
                    void 0 !== this[i] && void 0 !== this[i].classList && this[i].classList.add(t[a]);
            return this
        },
        removeClass: function(e) {
            for (var t = e.split(" "), a = 0; a < t.length; a += 1)
                for (var i = 0; i < this.length; i += 1)
                    void 0 !== this[i] && void 0 !== this[i].classList && this[i].classList.remove(t[a]);
            return this
        },
        hasClass: function(e) {
            return !!this[0] && this[0].classList.contains(e)
        },
        toggleClass: function(e) {
            for (var t = e.split(" "), a = 0; a < t.length; a += 1)
                for (var i = 0; i < this.length; i += 1)
                    void 0 !== this[i] && void 0 !== this[i].classList && this[i].classList.toggle(t[a]);
            return this
        },
        attr: function(e, t) {
            var a = arguments;
            if (1 === arguments.length && "string" == typeof e)
                return this[0] ? this[0].getAttribute(e) : void 0;
            for (var i = 0; i < this.length; i += 1)
                if (2 === a.length)
                    this[i].setAttribute(e, t);
                else
                    for (var s in e)
                        this[i][s] = e[s],
                        this[i].setAttribute(s, e[s]);
            return this
        },
        removeAttr: function(e) {
            for (var t = 0; t < this.length; t += 1)
                this[t].removeAttribute(e);
            return this
        },
        data: function(e, t) {
            var a;
            if (void 0 !== t) {
                for (var i = 0; i < this.length; i += 1)
                    (a = this[i]).dom7ElementDataStorage || (a.dom7ElementDataStorage = {}),
                    a.dom7ElementDataStorage[e] = t;
                return this
            }
            if (a = this[0]) {
                if (a.dom7ElementDataStorage && e in a.dom7ElementDataStorage)
                    return a.dom7ElementDataStorage[e];
                var s = a.getAttribute("data-" + e);
                return s || void 0
            }
        },
        transform: function(e) {
            for (var t = 0; t < this.length; t += 1) {
                var a = this[t].style;
                a.webkitTransform = e,
                a.transform = e
            }
            return this
        },
        transition: function(e) {
            "string" != typeof e && (e += "ms");
            for (var t = 0; t < this.length; t += 1) {
                var a = this[t].style;
                a.webkitTransitionDuration = e,
                a.transitionDuration = e
            }
            return this
        },
        on: function() {
            for (var e, t = [], a = arguments.length; a--; )
                t[a] = arguments[a];
            var i = t[0]
              , r = t[1]
              , n = t[2]
              , s = t[3];
            function o(e) {
                var t = e.target;
                if (t) {
                    var a = e.target.dom7EventData || [];
                    if (a.indexOf(e) < 0 && a.unshift(e),
                    I(t).is(r))
                        n.apply(t, a);
                    else
                        for (var i = I(t).parents(), s = 0; s < i.length; s += 1)
                            I(i[s]).is(r) && n.apply(i[s], a)
                }
            }
            function l(e) {
                var t = e && e.target && e.target.dom7EventData || [];
                t.indexOf(e) < 0 && t.unshift(e),
                n.apply(this, t)
            }
            "function" == typeof t[1] && (i = (e = t)[0],
            n = e[1],
            s = e[2],
            r = void 0),
            s = s || !1;
            for (var d, p = i.split(" "), c = 0; c < this.length; c += 1) {
                var u = this[c];
                if (r)
                    for (d = 0; d < p.length; d += 1) {
                        var h = p[d];
                        u.dom7LiveListeners || (u.dom7LiveListeners = {}),
                        u.dom7LiveListeners[h] || (u.dom7LiveListeners[h] = []),
                        u.dom7LiveListeners[h].push({
                            listener: n,
                            proxyListener: o
                        }),
                        u.addEventListener(h, o, s)
                    }
                else
                    for (d = 0; d < p.length; d += 1) {
                        var v = p[d];
                        u.dom7Listeners || (u.dom7Listeners = {}),
                        u.dom7Listeners[v] || (u.dom7Listeners[v] = []),
                        u.dom7Listeners[v].push({
                            listener: n,
                            proxyListener: l
                        }),
                        u.addEventListener(v, l, s)
                    }
            }
            return this
        },
        off: function() {
            for (var e, t = [], a = arguments.length; a--; )
                t[a] = arguments[a];
            var i = t[0]
              , s = t[1]
              , r = t[2]
              , n = t[3];
            "function" == typeof t[1] && (i = (e = t)[0],
            r = e[1],
            n = e[2],
            s = void 0),
            n = n || !1;
            for (var o = i.split(" "), l = 0; l < o.length; l += 1)
                for (var d = o[l], p = 0; p < this.length; p += 1) {
                    var c = this[p]
                      , u = void 0;
                    if (!s && c.dom7Listeners ? u = c.dom7Listeners[d] : s && c.dom7LiveListeners && (u = c.dom7LiveListeners[d]),
                    u && u.length)
                        for (var h = u.length - 1; 0 <= h; h -= 1) {
                            var v = u[h];
                            r && v.listener === r ? (c.removeEventListener(d, v.proxyListener, n),
                            u.splice(h, 1)) : r && v.listener && v.listener.dom7proxy && v.listener.dom7proxy === r ? (c.removeEventListener(d, v.proxyListener, n),
                            u.splice(h, 1)) : r || (c.removeEventListener(d, v.proxyListener, n),
                            u.splice(h, 1))
                        }
                }
            return this
        },
        trigger: function() {
            for (var e = [], t = arguments.length; t--; )
                e[t] = arguments[t];
            for (var a = e[0].split(" "), i = e[1], s = 0; s < a.length; s += 1)
                for (var r = a[s], n = 0; n < this.length; n += 1) {
                    var o = this[n]
                      , l = void 0;
                    try {
                        l = new ee.CustomEvent(r,{
                            detail: i,
                            bubbles: !0,
                            cancelable: !0
                        })
                    } catch (e) {
                        (l = f.createEvent("Event")).initEvent(r, !0, !0),
                        l.detail = i
                    }
                    o.dom7EventData = e.filter(function(e, t) {
                        return 0 < t
                    }),
                    o.dispatchEvent(l),
                    o.dom7EventData = [],
                    delete o.dom7EventData
                }
            return this
        },
        transitionEnd: function(t) {
            var a, i = ["webkitTransitionEnd", "transitionend"], s = this;
            function r(e) {
                if (e.target === this)
                    for (t.call(this, e),
                    a = 0; a < i.length; a += 1)
                        s.off(i[a], r)
            }
            if (t)
                for (a = 0; a < i.length; a += 1)
                    s.on(i[a], r);
            return this
        },
        outerWidth: function(e) {
            if (0 < this.length) {
                if (e) {
                    var t = this.styles();
                    return this[0].offsetWidth + parseFloat(t.getPropertyValue("margin-right")) + parseFloat(t.getPropertyValue("margin-left"))
                }
                return this[0].offsetWidth
            }
            return null
        },
        outerHeight: function(e) {
            if (0 < this.length) {
                if (e) {
                    var t = this.styles();
                    return this[0].offsetHeight + parseFloat(t.getPropertyValue("margin-top")) + parseFloat(t.getPropertyValue("margin-bottom"))
                }
                return this[0].offsetHeight
            }
            return null
        },
        offset: function() {
            if (0 < this.length) {
                var e = this[0]
                  , t = e.getBoundingClientRect()
                  , a = f.body
                  , i = e.clientTop || a.clientTop || 0
                  , s = e.clientLeft || a.clientLeft || 0
                  , r = e === ee ? ee.scrollY : e.scrollTop
                  , n = e === ee ? ee.scrollX : e.scrollLeft;
                return {
                    top: t.top + r - i,
                    left: t.left + n - s
                }
            }
            return null
        },
        css: function(e, t) {
            var a;
            if (1 === arguments.length) {
                if ("string" != typeof e) {
                    for (a = 0; a < this.length; a += 1)
                        for (var i in e)
                            this[a].style[i] = e[i];
                    return this
                }
                if (this[0])
                    return ee.getComputedStyle(this[0], null).getPropertyValue(e)
            }
            if (2 !== arguments.length || "string" != typeof e)
                return this;
            for (a = 0; a < this.length; a += 1)
                this[a].style[e] = t;
            return this
        },
        each: function(e) {
            if (!e)
                return this;
            for (var t = 0; t < this.length; t += 1)
                if (!1 === e.call(this[t], t, this[t]))
                    return this;
            return this
        },
        html: function(e) {
            if (void 0 === e)
                return this[0] ? this[0].innerHTML : void 0;
            for (var t = 0; t < this.length; t += 1)
                this[t].innerHTML = e;
            return this
        },
        text: function(e) {
            if (void 0 === e)
                return this[0] ? this[0].textContent.trim() : null;
            for (var t = 0; t < this.length; t += 1)
                this[t].textContent = e;
            return this
        },
        is: function(e) {
            var t, a, i = this[0];
            if (!i || void 0 === e)
                return !1;
            if ("string" == typeof e) {
                if (i.matches)
                    return i.matches(e);
                if (i.webkitMatchesSelector)
                    return i.webkitMatchesSelector(e);
                if (i.msMatchesSelector)
                    return i.msMatchesSelector(e);
                for (t = I(e),
                a = 0; a < t.length; a += 1)
                    if (t[a] === i)
                        return !0;
                return !1
            }
            if (e === f)
                return i === f;
            if (e === ee)
                return i === ee;
            if (e.nodeType || e instanceof l) {
                for (t = e.nodeType ? [e] : e,
                a = 0; a < t.length; a += 1)
                    if (t[a] === i)
                        return !0;
                return !1
            }
            return !1
        },
        index: function() {
            var e, t = this[0];
            if (t) {
                for (e = 0; null !== (t = t.previousSibling); )
                    1 === t.nodeType && (e += 1);
                return e
            }
        },
        eq: function(e) {
            if (void 0 === e)
                return this;
            var t, a = this.length;
            return new l(a - 1 < e ? [] : e < 0 ? (t = a + e) < 0 ? [] : [this[t]] : [this[e]])
        },
        append: function() {
            for (var e, t = [], a = arguments.length; a--; )
                t[a] = arguments[a];
            for (var i = 0; i < t.length; i += 1) {
                e = t[i];
                for (var s = 0; s < this.length; s += 1)
                    if ("string" == typeof e) {
                        var r = f.createElement("div");
                        for (r.innerHTML = e; r.firstChild; )
                            this[s].appendChild(r.firstChild)
                    } else if (e instanceof l)
                        for (var n = 0; n < e.length; n += 1)
                            this[s].appendChild(e[n]);
                    else
                        this[s].appendChild(e)
            }
            return this
        },
        prepend: function(e) {
            var t, a;
            for (t = 0; t < this.length; t += 1)
                if ("string" == typeof e) {
                    var i = f.createElement("div");
                    for (i.innerHTML = e,
                    a = i.childNodes.length - 1; 0 <= a; a -= 1)
                        this[t].insertBefore(i.childNodes[a], this[t].childNodes[0])
                } else if (e instanceof l)
                    for (a = 0; a < e.length; a += 1)
                        this[t].insertBefore(e[a], this[t].childNodes[0]);
                else
                    this[t].insertBefore(e, this[t].childNodes[0]);
            return this
        },
        next: function(e) {
            return 0 < this.length ? e ? this[0].nextElementSibling && I(this[0].nextElementSibling).is(e) ? new l([this[0].nextElementSibling]) : new l([]) : this[0].nextElementSibling ? new l([this[0].nextElementSibling]) : new l([]) : new l([])
        },
        nextAll: function(e) {
            var t = []
              , a = this[0];
            if (!a)
                return new l([]);
            for (; a.nextElementSibling; ) {
                var i = a.nextElementSibling;
                e ? I(i).is(e) && t.push(i) : t.push(i),
                a = i
            }
            return new l(t)
        },
        prev: function(e) {
            if (0 < this.length) {
                var t = this[0];
                return e ? t.previousElementSibling && I(t.previousElementSibling).is(e) ? new l([t.previousElementSibling]) : new l([]) : t.previousElementSibling ? new l([t.previousElementSibling]) : new l([])
            }
            return new l([])
        },
        prevAll: function(e) {
            var t = []
              , a = this[0];
            if (!a)
                return new l([]);
            for (; a.previousElementSibling; ) {
                var i = a.previousElementSibling;
                e ? I(i).is(e) && t.push(i) : t.push(i),
                a = i
            }
            return new l(t)
        },
        parent: function(e) {
            for (var t = [], a = 0; a < this.length; a += 1)
                null !== this[a].parentNode && (e ? I(this[a].parentNode).is(e) && t.push(this[a].parentNode) : t.push(this[a].parentNode));
            return I(r(t))
        },
        parents: function(e) {
            for (var t = [], a = 0; a < this.length; a += 1)
                for (var i = this[a].parentNode; i; )
                    e ? I(i).is(e) && t.push(i) : t.push(i),
                    i = i.parentNode;
            return I(r(t))
        },
        closest: function(e) {
            var t = this;
            return void 0 === e ? new l([]) : (t.is(e) || (t = t.parents(e).eq(0)),
            t)
        },
        find: function(e) {
            for (var t = [], a = 0; a < this.length; a += 1)
                for (var i = this[a].querySelectorAll(e), s = 0; s < i.length; s += 1)
                    t.push(i[s]);
            return new l(t)
        },
        children: function(e) {
            for (var t = [], a = 0; a < this.length; a += 1)
                for (var i = this[a].childNodes, s = 0; s < i.length; s += 1)
                    e ? 1 === i[s].nodeType && I(i[s]).is(e) && t.push(i[s]) : 1 === i[s].nodeType && t.push(i[s]);
            return new l(r(t))
        },
        remove: function() {
            for (var e = 0; e < this.length; e += 1)
                this[e].parentNode && this[e].parentNode.removeChild(this[e]);
            return this
        },
        add: function() {
            for (var e = [], t = arguments.length; t--; )
                e[t] = arguments[t];
            var a, i;
            for (a = 0; a < e.length; a += 1) {
                var s = I(e[a]);
                for (i = 0; i < s.length; i += 1)
                    this[this.length] = s[i],
                    this.length += 1
            }
            return this
        },
        styles: function() {
            return this[0] ? ee.getComputedStyle(this[0], null) : {}
        }
    };
    Object.keys(t).forEach(function(e) {
        I.fn[e] = I.fn[e] || t[e]
    });
    function e(e) {
        void 0 === e && (e = {});
        var t = this;
        t.params = e,
        t.eventsListeners = {},
        t.params && t.params.on && Object.keys(t.params.on).forEach(function(e) {
            t.on(e, t.params.on[e])
        })
    }
    var a, i, s, n, te = {
        deleteProps: function(e) {
            var t = e;
            Object.keys(t).forEach(function(e) {
                try {
                    t[e] = null
                } catch (e) {}
                try {
                    delete t[e]
                } catch (e) {}
            })
        },
        nextTick: function(e, t) {
            return void 0 === t && (t = 0),
            setTimeout(e, t)
        },
        now: function() {
            return Date.now()
        },
        getTranslate: function(e, t) {
            var a, i, s;
            void 0 === t && (t = "x");
            var r = ee.getComputedStyle(e, null);
            return ee.WebKitCSSMatrix ? (6 < (i = r.transform || r.webkitTransform).split(",").length && (i = i.split(", ").map(function(e) {
                return e.replace(",", ".")
            }).join(", ")),
            s = new ee.WebKitCSSMatrix("none" === i ? "" : i)) : a = (s = r.MozTransform || r.OTransform || r.MsTransform || r.msTransform || r.transform || r.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,")).toString().split(","),
            "x" === t && (i = ee.WebKitCSSMatrix ? s.m41 : 16 === a.length ? parseFloat(a[12]) : parseFloat(a[4])),
            "y" === t && (i = ee.WebKitCSSMatrix ? s.m42 : 16 === a.length ? parseFloat(a[13]) : parseFloat(a[5])),
            i || 0
        },
        parseUrlQuery: function(e) {
            var t, a, i, s, r = {}, n = e || ee.location.href;
            if ("string" == typeof n && n.length)
                for (s = (a = (n = -1 < n.indexOf("?") ? n.replace(/\S*\?/, "") : "").split("&").filter(function(e) {
                    return "" !== e
                })).length,
                t = 0; t < s; t += 1)
                    i = a[t].replace(/#\S+/g, "").split("="),
                    r[decodeURIComponent(i[0])] = void 0 === i[1] ? void 0 : decodeURIComponent(i[1]) || "";
            return r
        },
        isObject: function(e) {
            return "object" == typeof e && null !== e && e.constructor && e.constructor === Object
        },
        extend: function() {
            for (var e = [], t = arguments.length; t--; )
                e[t] = arguments[t];
            for (var a = Object(e[0]), i = 1; i < e.length; i += 1) {
                var s = e[i];
                if (null != s)
                    for (var r = Object.keys(Object(s)), n = 0, o = r.length; n < o; n += 1) {
                        var l = r[n]
                          , d = Object.getOwnPropertyDescriptor(s, l);
                        void 0 !== d && d.enumerable && (te.isObject(a[l]) && te.isObject(s[l]) ? te.extend(a[l], s[l]) : !te.isObject(a[l]) && te.isObject(s[l]) ? (a[l] = {},
                        te.extend(a[l], s[l])) : a[l] = s[l])
                    }
            }
            return a
        }
    }, ae = (s = f.createElement("div"),
    {
        touch: ee.Modernizr && !0 === ee.Modernizr.touch || !!(0 < ee.navigator.maxTouchPoints || "ontouchstart"in ee || ee.DocumentTouch && f instanceof ee.DocumentTouch),
        pointerEvents: !!(ee.navigator.pointerEnabled || ee.PointerEvent || "maxTouchPoints"in ee.navigator && 0 < ee.navigator.maxTouchPoints),
        prefixedPointerEvents: !!ee.navigator.msPointerEnabled,
        transition: (i = s.style,
        "transition"in i || "webkitTransition"in i || "MozTransition"in i),
        transforms3d: ee.Modernizr && !0 === ee.Modernizr.csstransforms3d || (a = s.style,
        "webkitPerspective"in a || "MozPerspective"in a || "OPerspective"in a || "MsPerspective"in a || "perspective"in a),
        flexbox: function() {
            for (var e = s.style, t = "alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient".split(" "), a = 0; a < t.length; a += 1)
                if (t[a]in e)
                    return !0;
            return !1
        }(),
        observer: "MutationObserver"in ee || "WebkitMutationObserver"in ee,
        passiveListener: function() {
            var e = !1;
            try {
                var t = Object.defineProperty({}, "passive", {
                    get: function() {
                        e = !0
                    }
                });
                ee.addEventListener("testPassiveListener", null, t)
            } catch (e) {}
            return e
        }(),
        gestures: "ongesturestart"in ee
    }), ie = {
        isIE: !!ee.navigator.userAgent.match(/Trident/g) || !!ee.navigator.userAgent.match(/MSIE/g),
        isEdge: !!ee.navigator.userAgent.match(/Edge/g),
        isSafari: (n = ee.navigator.userAgent.toLowerCase(),
        0 <= n.indexOf("safari") && n.indexOf("chrome") < 0 && n.indexOf("android") < 0),
        isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(ee.navigator.userAgent)
    }, o = {
        components: {
            configurable: !0
        }
    };
    e.prototype.on = function(e, t, a) {
        var i = this;
        if ("function" != typeof t)
            return i;
        var s = a ? "unshift" : "push";
        return e.split(" ").forEach(function(e) {
            i.eventsListeners[e] || (i.eventsListeners[e] = []),
            i.eventsListeners[e][s](t)
        }),
        i
    }
    ,
    e.prototype.once = function(a, i, e) {
        var s = this;
        if ("function" != typeof i)
            return s;
        function r() {
            for (var e = [], t = arguments.length; t--; )
                e[t] = arguments[t];
            i.apply(s, e),
            s.off(a, r),
            r.f7proxy && delete r.f7proxy
        }
        return r.f7proxy = i,
        s.on(a, r, e)
    }
    ,
    e.prototype.off = function(e, i) {
        var s = this;
        return s.eventsListeners && e.split(" ").forEach(function(a) {
            void 0 === i ? s.eventsListeners[a] = [] : s.eventsListeners[a] && s.eventsListeners[a].length && s.eventsListeners[a].forEach(function(e, t) {
                (e === i || e.f7proxy && e.f7proxy === i) && s.eventsListeners[a].splice(t, 1)
            })
        }),
        s
    }
    ,
    e.prototype.emit = function() {
        for (var e = [], t = arguments.length; t--; )
            e[t] = arguments[t];
        var a, i, s, r = this;
        return r.eventsListeners && (s = "string" == typeof e[0] || Array.isArray(e[0]) ? (a = e[0],
        i = e.slice(1, e.length),
        r) : (a = e[0].events,
        i = e[0].data,
        e[0].context || r),
        (Array.isArray(a) ? a : a.split(" ")).forEach(function(e) {
            if (r.eventsListeners && r.eventsListeners[e]) {
                var t = [];
                r.eventsListeners[e].forEach(function(e) {
                    t.push(e)
                }),
                t.forEach(function(e) {
                    e.apply(s, i)
                })
            }
        })),
        r
    }
    ,
    e.prototype.useModulesParams = function(a) {
        var i = this;
        i.modules && Object.keys(i.modules).forEach(function(e) {
            var t = i.modules[e];
            t.params && te.extend(a, t.params)
        })
    }
    ,
    e.prototype.useModules = function(i) {
        void 0 === i && (i = {});
        var s = this;
        s.modules && Object.keys(s.modules).forEach(function(e) {
            var a = s.modules[e]
              , t = i[e] || {};
            a.instance && Object.keys(a.instance).forEach(function(e) {
                var t = a.instance[e];
                s[e] = "function" == typeof t ? t.bind(s) : t
            }),
            a.on && s.on && Object.keys(a.on).forEach(function(e) {
                s.on(e, a.on[e])
            }),
            a.create && a.create.bind(s)(t)
        })
    }
    ,
    o.components.set = function(e) {
        this.use && this.use(e)
    }
    ,
    e.installModule = function(t) {
        for (var e = [], a = arguments.length - 1; 0 < a--; )
            e[a] = arguments[a + 1];
        var i = this;
        i.prototype.modules || (i.prototype.modules = {});
        var s = t.name || Object.keys(i.prototype.modules).length + "_" + te.now();
        return (i.prototype.modules[s] = t).proto && Object.keys(t.proto).forEach(function(e) {
            i.prototype[e] = t.proto[e]
        }),
        t.static && Object.keys(t.static).forEach(function(e) {
            i[e] = t.static[e]
        }),
        t.install && t.install.apply(i, e),
        i
    }
    ,
    e.use = function(e) {
        for (var t = [], a = arguments.length - 1; 0 < a--; )
            t[a] = arguments[a + 1];
        var i = this;
        return Array.isArray(e) ? (e.forEach(function(e) {
            return i.installModule(e)
        }),
        i) : i.installModule.apply(i, [e].concat(t))
    }
    ,
    Object.defineProperties(e, o);
    var d = {
        updateSize: function() {
            var e, t, a = this, i = a.$el;
            e = void 0 !== a.params.width ? a.params.width : i[0].clientWidth,
            t = void 0 !== a.params.height ? a.params.height : i[0].clientHeight,
            0 === e && a.isHorizontal() || 0 === t && a.isVertical() || (e = e - parseInt(i.css("padding-left"), 10) - parseInt(i.css("padding-right"), 10),
            t = t - parseInt(i.css("padding-top"), 10) - parseInt(i.css("padding-bottom"), 10),
            te.extend(a, {
                width: e,
                height: t,
                size: a.isHorizontal() ? e : t
            }))
        },
        updateSlides: function() {
            var e = this
              , t = e.params
              , a = e.$wrapperEl
              , i = e.size
              , s = e.rtlTranslate
              , r = e.wrongRTL
              , n = e.virtual && t.virtual.enabled
              , o = n ? e.virtual.slides.length : e.slides.length
              , l = a.children("." + e.params.slideClass)
              , d = n ? e.virtual.slides.length : l.length
              , p = []
              , c = []
              , u = []
              , h = t.slidesOffsetBefore;
            "function" == typeof h && (h = t.slidesOffsetBefore.call(e));
            var v = t.slidesOffsetAfter;
            "function" == typeof v && (v = t.slidesOffsetAfter.call(e));
            var f = e.snapGrid.length
              , m = e.snapGrid.length
              , g = t.spaceBetween
              , b = -h
              , w = 0
              , y = 0;
            if (void 0 !== i) {
                var x, T;
                "string" == typeof g && 0 <= g.indexOf("%") && (g = parseFloat(g.replace("%", "")) / 100 * i),
                e.virtualSize = -g,
                s ? l.css({
                    marginLeft: "",
                    marginTop: ""
                }) : l.css({
                    marginRight: "",
                    marginBottom: ""
                }),
                1 < t.slidesPerColumn && (x = Math.floor(d / t.slidesPerColumn) === d / e.params.slidesPerColumn ? d : Math.ceil(d / t.slidesPerColumn) * t.slidesPerColumn,
                "auto" !== t.slidesPerView && "row" === t.slidesPerColumnFill && (x = Math.max(x, t.slidesPerView * t.slidesPerColumn)));
                for (var E, S = t.slidesPerColumn, C = x / S, M = Math.floor(d / t.slidesPerColumn), P = 0; P < d; P += 1) {
                    T = 0;
                    var k = l.eq(P);
                    if (1 < t.slidesPerColumn) {
                        var z = void 0
                          , $ = void 0
                          , I = void 0;
                        if ("column" === t.slidesPerColumnFill || "row" === t.slidesPerColumnFill && 1 < t.slidesPerGroup) {
                            if ("column" === t.slidesPerColumnFill)
                                I = P - ($ = Math.floor(P / S)) * S,
                                (M < $ || $ === M && I === S - 1) && S <= (I += 1) && (I = 0,
                                $ += 1);
                            else {
                                var L = Math.floor(P / t.slidesPerGroup);
                                $ = P - (I = Math.floor(P / t.slidesPerView) - L * t.slidesPerColumn) * t.slidesPerView - L * t.slidesPerView
                            }
                            z = $ + I * x / S,
                            k.css({
                                "-webkit-box-ordinal-group": z,
                                "-moz-box-ordinal-group": z,
                                "-ms-flex-order": z,
                                "-webkit-order": z,
                                order: z
                            })
                        } else
                            $ = P - (I = Math.floor(P / C)) * C;
                        k.css("margin-" + (e.isHorizontal() ? "top" : "left"), 0 !== I && t.spaceBetween && t.spaceBetween + "px").attr("data-swiper-column", $).attr("data-swiper-row", I)
                    }
                    if ("none" !== k.css("display")) {
                        if ("auto" === t.slidesPerView) {
                            var D = ee.getComputedStyle(k[0], null)
                              , O = k[0].style.transform
                              , A = k[0].style.webkitTransform;
                            if (O && (k[0].style.transform = "none"),
                            A && (k[0].style.webkitTransform = "none"),
                            t.roundLengths)
                                T = e.isHorizontal() ? k.outerWidth(!0) : k.outerHeight(!0);
                            else if (e.isHorizontal()) {
                                var H = parseFloat(D.getPropertyValue("width"))
                                  , G = parseFloat(D.getPropertyValue("padding-left"))
                                  , N = parseFloat(D.getPropertyValue("padding-right"))
                                  , B = parseFloat(D.getPropertyValue("margin-left"))
                                  , X = parseFloat(D.getPropertyValue("margin-right"))
                                  , V = D.getPropertyValue("box-sizing");
                                T = V && "border-box" === V && !ie.isIE ? H + B + X : H + G + N + B + X
                            } else {
                                var Y = parseFloat(D.getPropertyValue("height"))
                                  , F = parseFloat(D.getPropertyValue("padding-top"))
                                  , R = parseFloat(D.getPropertyValue("padding-bottom"))
                                  , q = parseFloat(D.getPropertyValue("margin-top"))
                                  , W = parseFloat(D.getPropertyValue("margin-bottom"))
                                  , j = D.getPropertyValue("box-sizing");
                                T = j && "border-box" === j && !ie.isIE ? Y + q + W : Y + F + R + q + W
                            }
                            O && (k[0].style.transform = O),
                            A && (k[0].style.webkitTransform = A),
                            t.roundLengths && (T = Math.floor(T))
                        } else
                            T = (i - (t.slidesPerView - 1) * g) / t.slidesPerView,
                            t.roundLengths && (T = Math.floor(T)),
                            l[P] && (e.isHorizontal() ? l[P].style.width = T + "px" : l[P].style.height = T + "px");
                        l[P] && (l[P].swiperSlideSize = T),
                        u.push(T),
                        t.centeredSlides ? (b = b + T / 2 + w / 2 + g,
                        0 === w && 0 !== P && (b = b - i / 2 - g),
                        0 === P && (b = b - i / 2 - g),
                        Math.abs(b) < .001 && (b = 0),
                        t.roundLengths && (b = Math.floor(b)),
                        y % t.slidesPerGroup == 0 && p.push(b),
                        c.push(b)) : (t.roundLengths && (b = Math.floor(b)),
                        y % t.slidesPerGroup == 0 && p.push(b),
                        c.push(b),
                        b = b + T + g),
                        e.virtualSize += T + g,
                        w = T,
                        y += 1
                    }
                }
                if (e.virtualSize = Math.max(e.virtualSize, i) + v,
                s && r && ("slide" === t.effect || "coverflow" === t.effect) && a.css({
                    width: e.virtualSize + t.spaceBetween + "px"
                }),
                ae.flexbox && !t.setWrapperSize || (e.isHorizontal() ? a.css({
                    width: e.virtualSize + t.spaceBetween + "px"
                }) : a.css({
                    height: e.virtualSize + t.spaceBetween + "px"
                })),
                1 < t.slidesPerColumn && (e.virtualSize = (T + t.spaceBetween) * x,
                e.virtualSize = Math.ceil(e.virtualSize / t.slidesPerColumn) - t.spaceBetween,
                e.isHorizontal() ? a.css({
                    width: e.virtualSize + t.spaceBetween + "px"
                }) : a.css({
                    height: e.virtualSize + t.spaceBetween + "px"
                }),
                t.centeredSlides)) {
                    E = [];
                    for (var U = 0; U < p.length; U += 1) {
                        var K = p[U];
                        t.roundLengths && (K = Math.floor(K)),
                        p[U] < e.virtualSize + p[0] && E.push(K)
                    }
                    p = E
                }
                if (!t.centeredSlides) {
                    E = [];
                    for (var _ = 0; _ < p.length; _ += 1) {
                        var Z = p[_];
                        t.roundLengths && (Z = Math.floor(Z)),
                        p[_] <= e.virtualSize - i && E.push(Z)
                    }
                    p = E,
                    1 < Math.floor(e.virtualSize - i) - Math.floor(p[p.length - 1]) && p.push(e.virtualSize - i)
                }
                if (0 === p.length && (p = [0]),
                0 !== t.spaceBetween && (e.isHorizontal() ? s ? l.css({
                    marginLeft: g + "px"
                }) : l.css({
                    marginRight: g + "px"
                }) : l.css({
                    marginBottom: g + "px"
                })),
                t.centerInsufficientSlides) {
                    var Q = 0;
                    if (u.forEach(function(e) {
                        Q += e + (t.spaceBetween ? t.spaceBetween : 0)
                    }),
                    (Q -= t.spaceBetween) < i) {
                        var J = (i - Q) / 2;
                        p.forEach(function(e, t) {
                            p[t] = e - J
                        }),
                        c.forEach(function(e, t) {
                            c[t] = e + J
                        })
                    }
                }
                te.extend(e, {
                    slides: l,
                    snapGrid: p,
                    slidesGrid: c,
                    slidesSizesGrid: u
                }),
                d !== o && e.emit("slidesLengthChange"),
                p.length !== f && (e.params.watchOverflow && e.checkOverflow(),
                e.emit("snapGridLengthChange")),
                c.length !== m && e.emit("slidesGridLengthChange"),
                (t.watchSlidesProgress || t.watchSlidesVisibility) && e.updateSlidesOffset()
            }
        },
        updateAutoHeight: function(e) {
            var t, a = this, i = [], s = 0;
            if ("number" == typeof e ? a.setTransition(e) : !0 === e && a.setTransition(a.params.speed),
            "auto" !== a.params.slidesPerView && 1 < a.params.slidesPerView)
                for (t = 0; t < Math.ceil(a.params.slidesPerView); t += 1) {
                    var r = a.activeIndex + t;
                    if (r > a.slides.length)
                        break;
                    i.push(a.slides.eq(r)[0])
                }
            else
                i.push(a.slides.eq(a.activeIndex)[0]);
            for (t = 0; t < i.length; t += 1)
                if (void 0 !== i[t]) {
                    var n = i[t].offsetHeight;
                    s = s < n ? n : s
                }
            s && a.$wrapperEl.css("height", s + "px")
        },
        updateSlidesOffset: function() {
            for (var e = this.slides, t = 0; t < e.length; t += 1)
                e[t].swiperSlideOffset = this.isHorizontal() ? e[t].offsetLeft : e[t].offsetTop
        },
        updateSlidesProgress: function(e) {
            void 0 === e && (e = this && this.translate || 0);
            var t = this
              , a = t.params
              , i = t.slides
              , s = t.rtlTranslate;
            if (0 !== i.length) {
                void 0 === i[0].swiperSlideOffset && t.updateSlidesOffset();
                var r = -e;
                s && (r = e),
                i.removeClass(a.slideVisibleClass),
                t.visibleSlidesIndexes = [],
                t.visibleSlides = [];
                for (var n = 0; n < i.length; n += 1) {
                    var o = i[n]
                      , l = (r + (a.centeredSlides ? t.minTranslate() : 0) - o.swiperSlideOffset) / (o.swiperSlideSize + a.spaceBetween);
                    if (a.watchSlidesVisibility) {
                        var d = -(r - o.swiperSlideOffset)
                          , p = d + t.slidesSizesGrid[n];
                        (0 <= d && d < t.size - 1 || 1 < p && p <= t.size || d <= 0 && p >= t.size) && (t.visibleSlides.push(o),
                        t.visibleSlidesIndexes.push(n),
                        i.eq(n).addClass(a.slideVisibleClass))
                    }
                    o.progress = s ? -l : l
                }
                t.visibleSlides = I(t.visibleSlides)
            }
        },
        updateProgress: function(e) {
            void 0 === e && (e = this && this.translate || 0);
            var t = this
              , a = t.params
              , i = t.maxTranslate() - t.minTranslate()
              , s = t.progress
              , r = t.isBeginning
              , n = t.isEnd
              , o = r
              , l = n;
            n = 0 == i ? r = !(s = 0) : (r = (s = (e - t.minTranslate()) / i) <= 0,
            1 <= s),
            te.extend(t, {
                progress: s,
                isBeginning: r,
                isEnd: n
            }),
            (a.watchSlidesProgress || a.watchSlidesVisibility) && t.updateSlidesProgress(e),
            r && !o && t.emit("reachBeginning toEdge"),
            n && !l && t.emit("reachEnd toEdge"),
            (o && !r || l && !n) && t.emit("fromEdge"),
            t.emit("progress", s)
        },
        updateSlidesClasses: function() {
            var e, t = this, a = t.slides, i = t.params, s = t.$wrapperEl, r = t.activeIndex, n = t.realIndex, o = t.virtual && i.virtual.enabled;
            a.removeClass(i.slideActiveClass + " " + i.slideNextClass + " " + i.slidePrevClass + " " + i.slideDuplicateActiveClass + " " + i.slideDuplicateNextClass + " " + i.slideDuplicatePrevClass),
            (e = o ? t.$wrapperEl.find("." + i.slideClass + '[data-swiper-slide-index="' + r + '"]') : a.eq(r)).addClass(i.slideActiveClass),
            i.loop && (e.hasClass(i.slideDuplicateClass) ? s.children("." + i.slideClass + ":not(." + i.slideDuplicateClass + ')[data-swiper-slide-index="' + n + '"]').addClass(i.slideDuplicateActiveClass) : s.children("." + i.slideClass + "." + i.slideDuplicateClass + '[data-swiper-slide-index="' + n + '"]').addClass(i.slideDuplicateActiveClass));
            var l = e.nextAll("." + i.slideClass).eq(0).addClass(i.slideNextClass);
            i.loop && 0 === l.length && (l = a.eq(0)).addClass(i.slideNextClass);
            var d = e.prevAll("." + i.slideClass).eq(0).addClass(i.slidePrevClass);
            i.loop && 0 === d.length && (d = a.eq(-1)).addClass(i.slidePrevClass),
            i.loop && (l.hasClass(i.slideDuplicateClass) ? s.children("." + i.slideClass + ":not(." + i.slideDuplicateClass + ')[data-swiper-slide-index="' + l.attr("data-swiper-slide-index") + '"]').addClass(i.slideDuplicateNextClass) : s.children("." + i.slideClass + "." + i.slideDuplicateClass + '[data-swiper-slide-index="' + l.attr("data-swiper-slide-index") + '"]').addClass(i.slideDuplicateNextClass),
            d.hasClass(i.slideDuplicateClass) ? s.children("." + i.slideClass + ":not(." + i.slideDuplicateClass + ')[data-swiper-slide-index="' + d.attr("data-swiper-slide-index") + '"]').addClass(i.slideDuplicatePrevClass) : s.children("." + i.slideClass + "." + i.slideDuplicateClass + '[data-swiper-slide-index="' + d.attr("data-swiper-slide-index") + '"]').addClass(i.slideDuplicatePrevClass))
        },
        updateActiveIndex: function(e) {
            var t, a = this, i = a.rtlTranslate ? a.translate : -a.translate, s = a.slidesGrid, r = a.snapGrid, n = a.params, o = a.activeIndex, l = a.realIndex, d = a.snapIndex, p = e;
            if (void 0 === p) {
                for (var c = 0; c < s.length; c += 1)
                    void 0 !== s[c + 1] ? i >= s[c] && i < s[c + 1] - (s[c + 1] - s[c]) / 2 ? p = c : i >= s[c] && i < s[c + 1] && (p = c + 1) : i >= s[c] && (p = c);
                n.normalizeSlideIndex && (p < 0 || void 0 === p) && (p = 0)
            }
            if ((t = 0 <= r.indexOf(i) ? r.indexOf(i) : Math.floor(p / n.slidesPerGroup)) >= r.length && (t = r.length - 1),
            p !== o) {
                var u = parseInt(a.slides.eq(p).attr("data-swiper-slide-index") || p, 10);
                te.extend(a, {
                    snapIndex: t,
                    realIndex: u,
                    previousIndex: o,
                    activeIndex: p
                }),
                a.emit("activeIndexChange"),
                a.emit("snapIndexChange"),
                l !== u && a.emit("realIndexChange"),
                (a.initialized || a.runCallbacksOnInit) && a.emit("slideChange")
            } else
                t !== d && (a.snapIndex = t,
                a.emit("snapIndexChange"))
        },
        updateClickedSlide: function(e) {
            var t = this
              , a = t.params
              , i = I(e.target).closest("." + a.slideClass)[0]
              , s = !1;
            if (i)
                for (var r = 0; r < t.slides.length; r += 1)
                    t.slides[r] === i && (s = !0);
            if (!i || !s)
                return t.clickedSlide = void 0,
                void (t.clickedIndex = void 0);
            t.clickedSlide = i,
            t.virtual && t.params.virtual.enabled ? t.clickedIndex = parseInt(I(i).attr("data-swiper-slide-index"), 10) : t.clickedIndex = I(i).index(),
            a.slideToClickedSlide && void 0 !== t.clickedIndex && t.clickedIndex !== t.activeIndex && t.slideToClickedSlide()
        }
    };
    var p = {
        getTranslate: function(e) {
            void 0 === e && (e = this.isHorizontal() ? "x" : "y");
            var t = this.params
              , a = this.rtlTranslate
              , i = this.translate
              , s = this.$wrapperEl;
            if (t.virtualTranslate)
                return a ? -i : i;
            var r = te.getTranslate(s[0], e);
            return a && (r = -r),
            r || 0
        },
        setTranslate: function(e, t) {
            var a = this
              , i = a.rtlTranslate
              , s = a.params
              , r = a.$wrapperEl
              , n = a.progress
              , o = 0
              , l = 0;
            a.isHorizontal() ? o = i ? -e : e : l = e,
            s.roundLengths && (o = Math.floor(o),
            l = Math.floor(l)),
            s.virtualTranslate || (ae.transforms3d ? r.transform("translate3d(" + o + "px, " + l + "px, 0px)") : r.transform("translate(" + o + "px, " + l + "px)")),
            a.previousTranslate = a.translate,
            a.translate = a.isHorizontal() ? o : l;
            var d = a.maxTranslate() - a.minTranslate();
            (0 == d ? 0 : (e - a.minTranslate()) / d) !== n && a.updateProgress(e),
            a.emit("setTranslate", a.translate, t)
        },
        minTranslate: function() {
            return -this.snapGrid[0]
        },
        maxTranslate: function() {
            return -this.snapGrid[this.snapGrid.length - 1]
        }
    };
    var c = {
        setTransition: function(e, t) {
            this.$wrapperEl.transition(e),
            this.emit("setTransition", e, t)
        },
        transitionStart: function(e, t) {
            void 0 === e && (e = !0);
            var a = this
              , i = a.activeIndex
              , s = a.params
              , r = a.previousIndex;
            s.autoHeight && a.updateAutoHeight();
            var n = t;
            if (n = n || (r < i ? "next" : i < r ? "prev" : "reset"),
            a.emit("transitionStart"),
            e && i !== r) {
                if ("reset" === n)
                    return void a.emit("slideResetTransitionStart");
                a.emit("slideChangeTransitionStart"),
                "next" === n ? a.emit("slideNextTransitionStart") : a.emit("slidePrevTransitionStart")
            }
        },
        transitionEnd: function(e, t) {
            void 0 === e && (e = !0);
            var a = this
              , i = a.activeIndex
              , s = a.previousIndex;
            a.animating = !1,
            a.setTransition(0);
            var r = t;
            if (r = r || (s < i ? "next" : i < s ? "prev" : "reset"),
            a.emit("transitionEnd"),
            e && i !== s) {
                if ("reset" === r)
                    return void a.emit("slideResetTransitionEnd");
                a.emit("slideChangeTransitionEnd"),
                "next" === r ? a.emit("slideNextTransitionEnd") : a.emit("slidePrevTransitionEnd")
            }
        }
    };
    var u = {
        slideTo: function(e, t, a, i) {
            void 0 === e && (e = 0),
            void 0 === t && (t = this.params.speed),
            void 0 === a && (a = !0);
            var s = this
              , r = e;
            r < 0 && (r = 0);
            var n = s.params
              , o = s.snapGrid
              , l = s.slidesGrid
              , d = s.previousIndex
              , p = s.activeIndex
              , c = s.rtlTranslate;
            if (s.animating && n.preventInteractionOnTransition)
                return !1;
            var u = Math.floor(r / n.slidesPerGroup);
            u >= o.length && (u = o.length - 1),
            (p || n.initialSlide || 0) === (d || 0) && a && s.emit("beforeSlideChangeStart");
            var h, v = -o[u];
            if (s.updateProgress(v),
            n.normalizeSlideIndex)
                for (var f = 0; f < l.length; f += 1)
                    -Math.floor(100 * v) >= Math.floor(100 * l[f]) && (r = f);
            if (s.initialized && r !== p) {
                if (!s.allowSlideNext && v < s.translate && v < s.minTranslate())
                    return !1;
                if (!s.allowSlidePrev && v > s.translate && v > s.maxTranslate() && (p || 0) !== r)
                    return !1
            }
            return h = p < r ? "next" : r < p ? "prev" : "reset",
            c && -v === s.translate || !c && v === s.translate ? (s.updateActiveIndex(r),
            n.autoHeight && s.updateAutoHeight(),
            s.updateSlidesClasses(),
            "slide" !== n.effect && s.setTranslate(v),
            "reset" !== h && (s.transitionStart(a, h),
            s.transitionEnd(a, h)),
            !1) : (0 !== t && ae.transition ? (s.setTransition(t),
            s.setTranslate(v),
            s.updateActiveIndex(r),
            s.updateSlidesClasses(),
            s.emit("beforeTransitionStart", t, i),
            s.transitionStart(a, h),
            s.animating || (s.animating = !0,
            s.onSlideToWrapperTransitionEnd || (s.onSlideToWrapperTransitionEnd = function(e) {
                s && !s.destroyed && e.target === this && (s.$wrapperEl[0].removeEventListener("transitionend", s.onSlideToWrapperTransitionEnd),
                s.$wrapperEl[0].removeEventListener("webkitTransitionEnd", s.onSlideToWrapperTransitionEnd),
                s.onSlideToWrapperTransitionEnd = null,
                delete s.onSlideToWrapperTransitionEnd,
                s.transitionEnd(a, h))
            }
            ),
            s.$wrapperEl[0].addEventListener("transitionend", s.onSlideToWrapperTransitionEnd),
            s.$wrapperEl[0].addEventListener("webkitTransitionEnd", s.onSlideToWrapperTransitionEnd))) : (s.setTransition(0),
            s.setTranslate(v),
            s.updateActiveIndex(r),
            s.updateSlidesClasses(),
            s.emit("beforeTransitionStart", t, i),
            s.transitionStart(a, h),
            s.transitionEnd(a, h)),
            !0)
        },
        slideToLoop: function(e, t, a, i) {
            void 0 === e && (e = 0),
            void 0 === t && (t = this.params.speed),
            void 0 === a && (a = !0);
            var s = e;
            return this.params.loop && (s += this.loopedSlides),
            this.slideTo(s, t, a, i)
        },
        slideNext: function(e, t, a) {
            void 0 === e && (e = this.params.speed),
            void 0 === t && (t = !0);
            var i = this
              , s = i.params
              , r = i.animating;
            return s.loop ? !r && (i.loopFix(),
            i._clientLeft = i.$wrapperEl[0].clientLeft,
            i.slideTo(i.activeIndex + s.slidesPerGroup, e, t, a)) : i.slideTo(i.activeIndex + s.slidesPerGroup, e, t, a)
        },
        slidePrev: function(e, t, a) {
            void 0 === e && (e = this.params.speed),
            void 0 === t && (t = !0);
            var i = this
              , s = i.params
              , r = i.animating
              , n = i.snapGrid
              , o = i.slidesGrid
              , l = i.rtlTranslate;
            if (s.loop) {
                if (r)
                    return !1;
                i.loopFix(),
                i._clientLeft = i.$wrapperEl[0].clientLeft
            }
            function d(e) {
                return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e)
            }
            var p, c = d(l ? i.translate : -i.translate), u = n.map(function(e) {
                return d(e)
            }), h = (o.map(function(e) {
                return d(e)
            }),
            n[u.indexOf(c)],
            n[u.indexOf(c) - 1]);
            return void 0 !== h && (p = o.indexOf(h)) < 0 && (p = i.activeIndex - 1),
            i.slideTo(p, e, t, a)
        },
        slideReset: function(e, t, a) {
            return void 0 === e && (e = this.params.speed),
            void 0 === t && (t = !0),
            this.slideTo(this.activeIndex, e, t, a)
        },
        slideToClosest: function(e, t, a) {
            void 0 === e && (e = this.params.speed),
            void 0 === t && (t = !0);
            var i = this
              , s = i.activeIndex
              , r = Math.floor(s / i.params.slidesPerGroup);
            if (r < i.snapGrid.length - 1) {
                var n = i.rtlTranslate ? i.translate : -i.translate
                  , o = i.snapGrid[r];
                (i.snapGrid[r + 1] - o) / 2 < n - o && (s = i.params.slidesPerGroup)
            }
            return i.slideTo(s, e, t, a)
        },
        slideToClickedSlide: function() {
            var e, t = this, a = t.params, i = t.$wrapperEl, s = "auto" === a.slidesPerView ? t.slidesPerViewDynamic() : a.slidesPerView, r = t.clickedIndex;
            if (a.loop) {
                if (t.animating)
                    return;
                e = parseInt(I(t.clickedSlide).attr("data-swiper-slide-index"), 10),
                a.centeredSlides ? r < t.loopedSlides - s / 2 || r > t.slides.length - t.loopedSlides + s / 2 ? (t.loopFix(),
                r = i.children("." + a.slideClass + '[data-swiper-slide-index="' + e + '"]:not(.' + a.slideDuplicateClass + ")").eq(0).index(),
                te.nextTick(function() {
                    t.slideTo(r)
                })) : t.slideTo(r) : r > t.slides.length - s ? (t.loopFix(),
                r = i.children("." + a.slideClass + '[data-swiper-slide-index="' + e + '"]:not(.' + a.slideDuplicateClass + ")").eq(0).index(),
                te.nextTick(function() {
                    t.slideTo(r)
                })) : t.slideTo(r)
            } else
                t.slideTo(r)
        }
    };
    var h = {
        loopCreate: function() {
            var i = this
              , e = i.params
              , t = i.$wrapperEl;
            t.children("." + e.slideClass + "." + e.slideDuplicateClass).remove();
            var s = t.children("." + e.slideClass);
            if (e.loopFillGroupWithBlank) {
                var a = e.slidesPerGroup - s.length % e.slidesPerGroup;
                if (a !== e.slidesPerGroup) {
                    for (var r = 0; r < a; r += 1) {
                        var n = I(f.createElement("div")).addClass(e.slideClass + " " + e.slideBlankClass);
                        t.append(n)
                    }
                    s = t.children("." + e.slideClass)
                }
            }
            "auto" !== e.slidesPerView || e.loopedSlides || (e.loopedSlides = s.length),
            i.loopedSlides = parseInt(e.loopedSlides || e.slidesPerView, 10),
            i.loopedSlides += e.loopAdditionalSlides,
            i.loopedSlides > s.length && (i.loopedSlides = s.length);
            var o = []
              , l = [];
            s.each(function(e, t) {
                var a = I(t);
                e < i.loopedSlides && l.push(t),
                e < s.length && e >= s.length - i.loopedSlides && o.push(t),
                a.attr("data-swiper-slide-index", e)
            });
            for (var d = 0; d < l.length; d += 1)
                t.append(I(l[d].cloneNode(!0)).addClass(e.slideDuplicateClass));
            for (var p = o.length - 1; 0 <= p; p -= 1)
                t.prepend(I(o[p].cloneNode(!0)).addClass(e.slideDuplicateClass))
        },
        loopFix: function() {
            var e, t = this, a = t.params, i = t.activeIndex, s = t.slides, r = t.loopedSlides, n = t.allowSlidePrev, o = t.allowSlideNext, l = t.snapGrid, d = t.rtlTranslate;
            t.allowSlidePrev = !0,
            t.allowSlideNext = !0;
            var p = -l[i] - t.getTranslate();
            if (i < r)
                e = s.length - 3 * r + i,
                e += r,
                t.slideTo(e, 0, !1, !0) && 0 != p && t.setTranslate((d ? -t.translate : t.translate) - p);
            else if ("auto" === a.slidesPerView && 2 * r <= i || i >= s.length - r) {
                e = -s.length + i + r,
                e += r,
                t.slideTo(e, 0, !1, !0) && 0 != p && t.setTranslate((d ? -t.translate : t.translate) - p)
            }
            t.allowSlidePrev = n,
            t.allowSlideNext = o
        },
        loopDestroy: function() {
            var e = this.$wrapperEl
              , t = this.params
              , a = this.slides;
            e.children("." + t.slideClass + "." + t.slideDuplicateClass + ",." + t.slideClass + "." + t.slideBlankClass).remove(),
            a.removeAttr("data-swiper-slide-index")
        }
    };
    var v = {
        setGrabCursor: function(e) {
            if (!(ae.touch || !this.params.simulateTouch || this.params.watchOverflow && this.isLocked)) {
                var t = this.el;
                t.style.cursor = "move",
                t.style.cursor = e ? "-webkit-grabbing" : "-webkit-grab",
                t.style.cursor = e ? "-moz-grabbin" : "-moz-grab",
                t.style.cursor = e ? "grabbing" : "grab"
            }
        },
        unsetGrabCursor: function() {
            ae.touch || this.params.watchOverflow && this.isLocked || (this.el.style.cursor = "")
        }
    };
    var m = {
        appendSlide: function(e) {
            var t = this
              , a = t.$wrapperEl
              , i = t.params;
            if (i.loop && t.loopDestroy(),
            "object" == typeof e && "length"in e)
                for (var s = 0; s < e.length; s += 1)
                    e[s] && a.append(e[s]);
            else
                a.append(e);
            i.loop && t.loopCreate(),
            i.observer && ae.observer || t.update()
        },
        prependSlide: function(e) {
            var t = this
              , a = t.params
              , i = t.$wrapperEl
              , s = t.activeIndex;
            a.loop && t.loopDestroy();
            var r = s + 1;
            if ("object" == typeof e && "length"in e) {
                for (var n = 0; n < e.length; n += 1)
                    e[n] && i.prepend(e[n]);
                r = s + e.length
            } else
                i.prepend(e);
            a.loop && t.loopCreate(),
            a.observer && ae.observer || t.update(),
            t.slideTo(r, 0, !1)
        },
        addSlide: function(e, t) {
            var a = this
              , i = a.$wrapperEl
              , s = a.params
              , r = a.activeIndex;
            s.loop && (r -= a.loopedSlides,
            a.loopDestroy(),
            a.slides = i.children("." + s.slideClass));
            var n = a.slides.length;
            if (e <= 0)
                a.prependSlide(t);
            else if (n <= e)
                a.appendSlide(t);
            else {
                for (var o = e < r ? r + 1 : r, l = [], d = n - 1; e <= d; d -= 1) {
                    var p = a.slides.eq(d);
                    p.remove(),
                    l.unshift(p)
                }
                if ("object" == typeof t && "length"in t) {
                    for (var c = 0; c < t.length; c += 1)
                        t[c] && i.append(t[c]);
                    o = e < r ? r + t.length : r
                } else
                    i.append(t);
                for (var u = 0; u < l.length; u += 1)
                    i.append(l[u]);
                s.loop && a.loopCreate(),
                s.observer && ae.observer || a.update(),
                s.loop ? a.slideTo(o + a.loopedSlides, 0, !1) : a.slideTo(o, 0, !1)
            }
        },
        removeSlide: function(e) {
            var t = this
              , a = t.params
              , i = t.$wrapperEl
              , s = t.activeIndex;
            a.loop && (s -= t.loopedSlides,
            t.loopDestroy(),
            t.slides = i.children("." + a.slideClass));
            var r, n = s;
            if ("object" == typeof e && "length"in e) {
                for (var o = 0; o < e.length; o += 1)
                    r = e[o],
                    t.slides[r] && t.slides.eq(r).remove(),
                    r < n && (n -= 1);
                n = Math.max(n, 0)
            } else
                r = e,
                t.slides[r] && t.slides.eq(r).remove(),
                r < n && (n -= 1),
                n = Math.max(n, 0);
            a.loop && t.loopCreate(),
            a.observer && ae.observer || t.update(),
            a.loop ? t.slideTo(n + t.loopedSlides, 0, !1) : t.slideTo(n, 0, !1)
        },
        removeAllSlides: function() {
            for (var e = [], t = 0; t < this.slides.length; t += 1)
                e.push(t);
            this.removeSlide(e)
        }
    }
      , g = function() {
        var e = ee.navigator.userAgent
          , t = {
            ios: !1,
            android: !1,
            androidChrome: !1,
            desktop: !1,
            windows: !1,
            iphone: !1,
            ipod: !1,
            ipad: !1,
            cordova: ee.cordova || ee.phonegap,
            phonegap: ee.cordova || ee.phonegap
        }
          , a = e.match(/(Windows Phone);?[\s\/]+([\d.]+)?/)
          , i = e.match(/(Android);?[\s\/]+([\d.]+)?/)
          , s = e.match(/(iPad).*OS\s([\d_]+)/)
          , r = e.match(/(iPod)(.*OS\s([\d_]+))?/)
          , n = !s && e.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
        if (a && (t.os = "windows",
        t.osVersion = a[2],
        t.windows = !0),
        i && !a && (t.os = "android",
        t.osVersion = i[2],
        t.android = !0,
        t.androidChrome = 0 <= e.toLowerCase().indexOf("chrome")),
        (s || n || r) && (t.os = "ios",
        t.ios = !0),
        n && !r && (t.osVersion = n[2].replace(/_/g, "."),
        t.iphone = !0),
        s && (t.osVersion = s[2].replace(/_/g, "."),
        t.ipad = !0),
        r && (t.osVersion = r[3] ? r[3].replace(/_/g, ".") : null,
        t.iphone = !0),
        t.ios && t.osVersion && 0 <= e.indexOf("Version/") && "10" === t.osVersion.split(".")[0] && (t.osVersion = e.toLowerCase().split("version/")[1].split(" ")[0]),
        t.desktop = !(t.os || t.android || t.webView),
        t.webView = (n || s || r) && e.match(/.*AppleWebKit(?!.*Safari)/i),
        t.os && "ios" === t.os) {
            var o = t.osVersion.split(".")
              , l = f.querySelector('meta[name="viewport"]');
            t.minimalUi = !t.webView && (r || n) && (1 * o[0] == 7 ? 1 <= 1 * o[1] : 7 < 1 * o[0]) && l && 0 <= l.getAttribute("content").indexOf("minimal-ui")
        }
        return t.pixelRatio = ee.devicePixelRatio || 1,
        t
    }();
    function b() {
        var e = this
          , t = e.params
          , a = e.el;
        if (!a || 0 !== a.offsetWidth) {
            t.breakpoints && e.setBreakpoint();
            var i = e.allowSlideNext
              , s = e.allowSlidePrev
              , r = e.snapGrid;
            if (e.allowSlideNext = !0,
            e.allowSlidePrev = !0,
            e.updateSize(),
            e.updateSlides(),
            t.freeMode) {
                var n = Math.min(Math.max(e.translate, e.maxTranslate()), e.minTranslate());
                e.setTranslate(n),
                e.updateActiveIndex(),
                e.updateSlidesClasses(),
                t.autoHeight && e.updateAutoHeight()
            } else
                e.updateSlidesClasses(),
                ("auto" === t.slidesPerView || 1 < t.slidesPerView) && e.isEnd && !e.params.centeredSlides ? e.slideTo(e.slides.length - 1, 0, !1, !0) : e.slideTo(e.activeIndex, 0, !1, !0);
            e.autoplay && e.autoplay.running && e.autoplay.paused && e.autoplay.run(),
            e.allowSlidePrev = s,
            e.allowSlideNext = i,
            e.params.watchOverflow && r !== e.snapGrid && e.checkOverflow()
        }
    }
    var w = {
        init: !0,
        direction: "horizontal",
        touchEventsTarget: "container",
        initialSlide: 0,
        speed: 300,
        preventInteractionOnTransition: !1,
        edgeSwipeDetection: !1,
        edgeSwipeThreshold: 20,
        freeMode: !1,
        freeModeMomentum: !0,
        freeModeMomentumRatio: 1,
        freeModeMomentumBounce: !0,
        freeModeMomentumBounceRatio: 1,
        freeModeMomentumVelocityRatio: 1,
        freeModeSticky: !1,
        freeModeMinimumVelocity: .02,
        autoHeight: !1,
        setWrapperSize: !1,
        virtualTranslate: !1,
        effect: "slide",
        breakpoints: void 0,
        breakpointsInverse: !1,
        spaceBetween: 0,
        slidesPerView: 1,
        slidesPerColumn: 1,
        slidesPerColumnFill: "column",
        slidesPerGroup: 1,
        centeredSlides: !1,
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0,
        normalizeSlideIndex: !0,
        centerInsufficientSlides: !1,
        watchOverflow: !1,
        roundLengths: !1,
        touchRatio: 1,
        touchAngle: 45,
        simulateTouch: !0,
        shortSwipes: !0,
        longSwipes: !0,
        longSwipesRatio: .5,
        longSwipesMs: 300,
        followFinger: !0,
        allowTouchMove: !0,
        threshold: 0,
        touchMoveStopPropagation: !0,
        touchStartPreventDefault: !0,
        touchStartForcePreventDefault: !1,
        touchReleaseOnEdges: !1,
        uniqueNavElements: !0,
        resistance: !0,
        resistanceRatio: .85,
        watchSlidesProgress: !1,
        watchSlidesVisibility: !1,
        grabCursor: !1,
        preventClicks: !0,
        preventClicksPropagation: !0,
        slideToClickedSlide: !1,
        preloadImages: !0,
        updateOnImagesReady: !0,
        loop: !1,
        loopAdditionalSlides: 0,
        loopedSlides: null,
        loopFillGroupWithBlank: !1,
        allowSlidePrev: !0,
        allowSlideNext: !0,
        swipeHandler: null,
        noSwiping: !0,
        noSwipingClass: "swiper-no-swiping",
        noSwipingSelector: null,
        passiveListeners: !0,
        containerModifierClass: "swiper-container-",
        slideClass: "swiper-slide",
        slideBlankClass: "swiper-slide-invisible-blank",
        slideActiveClass: "swiper-slide-active",
        slideDuplicateActiveClass: "swiper-slide-duplicate-active",
        slideVisibleClass: "swiper-slide-visible",
        slideDuplicateClass: "swiper-slide-duplicate",
        slideNextClass: "swiper-slide-next",
        slideDuplicateNextClass: "swiper-slide-duplicate-next",
        slidePrevClass: "swiper-slide-prev",
        slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
        wrapperClass: "swiper-wrapper",
        runCallbacksOnInit: !0
    }
      , y = {
        update: d,
        translate: p,
        transition: c,
        slide: u,
        loop: h,
        grabCursor: v,
        manipulation: m,
        events: {
            attachEvents: function() {
                var e = this
                  , t = e.params
                  , a = e.touchEvents
                  , i = e.el
                  , s = e.wrapperEl;
                e.onTouchStart = function(e) {
                    var t = this
                      , a = t.touchEventsData
                      , i = t.params
                      , s = t.touches;
                    if (!t.animating || !i.preventInteractionOnTransition) {
                        var r = e;
                        if (r.originalEvent && (r = r.originalEvent),
                        a.isTouchEvent = "touchstart" === r.type,
                        (a.isTouchEvent || !("which"in r) || 3 !== r.which) && !(!a.isTouchEvent && "button"in r && 0 < r.button || a.isTouched && a.isMoved))
                            if (i.noSwiping && I(r.target).closest(i.noSwipingSelector ? i.noSwipingSelector : "." + i.noSwipingClass)[0])
                                t.allowClick = !0;
                            else if (!i.swipeHandler || I(r).closest(i.swipeHandler)[0]) {
                                s.currentX = "touchstart" === r.type ? r.targetTouches[0].pageX : r.pageX,
                                s.currentY = "touchstart" === r.type ? r.targetTouches[0].pageY : r.pageY;
                                var n = s.currentX
                                  , o = s.currentY
                                  , l = i.edgeSwipeDetection || i.iOSEdgeSwipeDetection
                                  , d = i.edgeSwipeThreshold || i.iOSEdgeSwipeThreshold;
                                if (!l || !(n <= d || n >= ee.screen.width - d)) {
                                    if (te.extend(a, {
                                        isTouched: !0,
                                        isMoved: !1,
                                        allowTouchCallbacks: !0,
                                        isScrolling: void 0,
                                        startMoving: void 0
                                    }),
                                    s.startX = n,
                                    s.startY = o,
                                    a.touchStartTime = te.now(),
                                    t.allowClick = !0,
                                    t.updateSize(),
                                    t.swipeDirection = void 0,
                                    0 < i.threshold && (a.allowThresholdMove = !1),
                                    "touchstart" !== r.type) {
                                        var p = !0;
                                        I(r.target).is(a.formElements) && (p = !1),
                                        f.activeElement && I(f.activeElement).is(a.formElements) && f.activeElement !== r.target && f.activeElement.blur();
                                        var c = p && t.allowTouchMove && i.touchStartPreventDefault;
                                        (i.touchStartForcePreventDefault || c) && r.preventDefault()
                                    }
                                    t.emit("touchStart", r)
                                }
                            }
                    }
                }
                .bind(e),
                e.onTouchMove = function(e) {
                    var t = this
                      , a = t.touchEventsData
                      , i = t.params
                      , s = t.touches
                      , r = t.rtlTranslate
                      , n = e;
                    if (n.originalEvent && (n = n.originalEvent),
                    a.isTouched) {
                        if (!a.isTouchEvent || "mousemove" !== n.type) {
                            var o = "touchmove" === n.type ? n.targetTouches[0].pageX : n.pageX
                              , l = "touchmove" === n.type ? n.targetTouches[0].pageY : n.pageY;
                            if (n.preventedByNestedSwiper)
                                return s.startX = o,
                                void (s.startY = l);
                            if (!t.allowTouchMove)
                                return t.allowClick = !1,
                                void (a.isTouched && (te.extend(s, {
                                    startX: o,
                                    startY: l,
                                    currentX: o,
                                    currentY: l
                                }),
                                a.touchStartTime = te.now()));
                            if (a.isTouchEvent && i.touchReleaseOnEdges && !i.loop)
                                if (t.isVertical()) {
                                    if (l < s.startY && t.translate <= t.maxTranslate() || l > s.startY && t.translate >= t.minTranslate())
                                        return a.isTouched = !1,
                                        void (a.isMoved = !1)
                                } else if (o < s.startX && t.translate <= t.maxTranslate() || o > s.startX && t.translate >= t.minTranslate())
                                    return;
                            if (a.isTouchEvent && f.activeElement && n.target === f.activeElement && I(n.target).is(a.formElements))
                                return a.isMoved = !0,
                                void (t.allowClick = !1);
                            if (a.allowTouchCallbacks && t.emit("touchMove", n),
                            !(n.targetTouches && 1 < n.targetTouches.length)) {
                                s.currentX = o,
                                s.currentY = l;
                                var d = s.currentX - s.startX
                                  , p = s.currentY - s.startY;
                                if (!(t.params.threshold && Math.sqrt(Math.pow(d, 2) + Math.pow(p, 2)) < t.params.threshold)) {
                                    var c;
                                    if (void 0 === a.isScrolling)
                                        t.isHorizontal() && s.currentY === s.startY || t.isVertical() && s.currentX === s.startX ? a.isScrolling = !1 : 25 <= d * d + p * p && (c = 180 * Math.atan2(Math.abs(p), Math.abs(d)) / Math.PI,
                                        a.isScrolling = t.isHorizontal() ? c > i.touchAngle : 90 - c > i.touchAngle);
                                    if (a.isScrolling && t.emit("touchMoveOpposite", n),
                                    void 0 === a.startMoving && (s.currentX === s.startX && s.currentY === s.startY || (a.startMoving = !0)),
                                    a.isScrolling)
                                        a.isTouched = !1;
                                    else if (a.startMoving) {
                                        t.allowClick = !1,
                                        n.preventDefault(),
                                        i.touchMoveStopPropagation && !i.nested && n.stopPropagation(),
                                        a.isMoved || (i.loop && t.loopFix(),
                                        a.startTranslate = t.getTranslate(),
                                        t.setTransition(0),
                                        t.animating && t.$wrapperEl.trigger("webkitTransitionEnd transitionend"),
                                        a.allowMomentumBounce = !1,
                                        !i.grabCursor || !0 !== t.allowSlideNext && !0 !== t.allowSlidePrev || t.setGrabCursor(!0),
                                        t.emit("sliderFirstMove", n)),
                                        t.emit("sliderMove", n),
                                        a.isMoved = !0;
                                        var u = t.isHorizontal() ? d : p;
                                        s.diff = u,
                                        u *= i.touchRatio,
                                        r && (u = -u),
                                        t.swipeDirection = 0 < u ? "prev" : "next",
                                        a.currentTranslate = u + a.startTranslate;
                                        var h = !0
                                          , v = i.resistanceRatio;
                                        if (i.touchReleaseOnEdges && (v = 0),
                                        0 < u && a.currentTranslate > t.minTranslate() ? (h = !1,
                                        i.resistance && (a.currentTranslate = t.minTranslate() - 1 + Math.pow(-t.minTranslate() + a.startTranslate + u, v))) : u < 0 && a.currentTranslate < t.maxTranslate() && (h = !1,
                                        i.resistance && (a.currentTranslate = t.maxTranslate() + 1 - Math.pow(t.maxTranslate() - a.startTranslate - u, v))),
                                        h && (n.preventedByNestedSwiper = !0),
                                        !t.allowSlideNext && "next" === t.swipeDirection && a.currentTranslate < a.startTranslate && (a.currentTranslate = a.startTranslate),
                                        !t.allowSlidePrev && "prev" === t.swipeDirection && a.currentTranslate > a.startTranslate && (a.currentTranslate = a.startTranslate),
                                        0 < i.threshold) {
                                            if (!(Math.abs(u) > i.threshold || a.allowThresholdMove))
                                                return void (a.currentTranslate = a.startTranslate);
                                            if (!a.allowThresholdMove)
                                                return a.allowThresholdMove = !0,
                                                s.startX = s.currentX,
                                                s.startY = s.currentY,
                                                a.currentTranslate = a.startTranslate,
                                                void (s.diff = t.isHorizontal() ? s.currentX - s.startX : s.currentY - s.startY)
                                        }
                                        i.followFinger && ((i.freeMode || i.watchSlidesProgress || i.watchSlidesVisibility) && (t.updateActiveIndex(),
                                        t.updateSlidesClasses()),
                                        i.freeMode && (0 === a.velocities.length && a.velocities.push({
                                            position: s[t.isHorizontal() ? "startX" : "startY"],
                                            time: a.touchStartTime
                                        }),
                                        a.velocities.push({
                                            position: s[t.isHorizontal() ? "currentX" : "currentY"],
                                            time: te.now()
                                        })),
                                        t.updateProgress(a.currentTranslate),
                                        t.setTranslate(a.currentTranslate))
                                    }
                                }
                            }
                        }
                    } else
                        a.startMoving && a.isScrolling && t.emit("touchMoveOpposite", n)
                }
                .bind(e),
                e.onTouchEnd = function(e) {
                    var t = this
                      , a = t.touchEventsData
                      , i = t.params
                      , s = t.touches
                      , r = t.rtlTranslate
                      , n = t.$wrapperEl
                      , o = t.slidesGrid
                      , l = t.snapGrid
                      , d = e;
                    if (d.originalEvent && (d = d.originalEvent),
                    a.allowTouchCallbacks && t.emit("touchEnd", d),
                    a.allowTouchCallbacks = !1,
                    !a.isTouched)
                        return a.isMoved && i.grabCursor && t.setGrabCursor(!1),
                        a.isMoved = !1,
                        void (a.startMoving = !1);
                    i.grabCursor && a.isMoved && a.isTouched && (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) && t.setGrabCursor(!1);
                    var p, c = te.now(), u = c - a.touchStartTime;
                    if (t.allowClick && (t.updateClickedSlide(d),
                    t.emit("tap", d),
                    u < 300 && 300 < c - a.lastClickTime && (a.clickTimeout && clearTimeout(a.clickTimeout),
                    a.clickTimeout = te.nextTick(function() {
                        t && !t.destroyed && t.emit("click", d)
                    }, 300)),
                    u < 300 && c - a.lastClickTime < 300 && (a.clickTimeout && clearTimeout(a.clickTimeout),
                    t.emit("doubleTap", d))),
                    a.lastClickTime = te.now(),
                    te.nextTick(function() {
                        t.destroyed || (t.allowClick = !0)
                    }),
                    !a.isTouched || !a.isMoved || !t.swipeDirection || 0 === s.diff || a.currentTranslate === a.startTranslate)
                        return a.isTouched = !1,
                        a.isMoved = !1,
                        void (a.startMoving = !1);
                    if (a.isTouched = !1,
                    a.isMoved = !1,
                    a.startMoving = !1,
                    p = i.followFinger ? r ? t.translate : -t.translate : -a.currentTranslate,
                    i.freeMode) {
                        if (p < -t.minTranslate())
                            return void t.slideTo(t.activeIndex);
                        if (p > -t.maxTranslate())
                            return void (t.slides.length < l.length ? t.slideTo(l.length - 1) : t.slideTo(t.slides.length - 1));
                        if (i.freeModeMomentum) {
                            if (1 < a.velocities.length) {
                                var h = a.velocities.pop()
                                  , v = a.velocities.pop()
                                  , f = h.position - v.position
                                  , m = h.time - v.time;
                                t.velocity = f / m,
                                t.velocity /= 2,
                                Math.abs(t.velocity) < i.freeModeMinimumVelocity && (t.velocity = 0),
                                (150 < m || 300 < te.now() - h.time) && (t.velocity = 0)
                            } else
                                t.velocity = 0;
                            t.velocity *= i.freeModeMomentumVelocityRatio,
                            a.velocities.length = 0;
                            var g = 1e3 * i.freeModeMomentumRatio
                              , b = t.velocity * g
                              , w = t.translate + b;
                            r && (w = -w);
                            var y, x, T = !1, E = 20 * Math.abs(t.velocity) * i.freeModeMomentumBounceRatio;
                            if (w < t.maxTranslate())
                                i.freeModeMomentumBounce ? (w + t.maxTranslate() < -E && (w = t.maxTranslate() - E),
                                y = t.maxTranslate(),
                                T = !0,
                                a.allowMomentumBounce = !0) : w = t.maxTranslate(),
                                i.loop && i.centeredSlides && (x = !0);
                            else if (w > t.minTranslate())
                                i.freeModeMomentumBounce ? (w - t.minTranslate() > E && (w = t.minTranslate() + E),
                                y = t.minTranslate(),
                                T = !0,
                                a.allowMomentumBounce = !0) : w = t.minTranslate(),
                                i.loop && i.centeredSlides && (x = !0);
                            else if (i.freeModeSticky) {
                                for (var S, C = 0; C < l.length; C += 1)
                                    if (l[C] > -w) {
                                        S = C;
                                        break
                                    }
                                w = -(w = Math.abs(l[S] - w) < Math.abs(l[S - 1] - w) || "next" === t.swipeDirection ? l[S] : l[S - 1])
                            }
                            if (x && t.once("transitionEnd", function() {
                                t.loopFix()
                            }),
                            0 !== t.velocity)
                                g = r ? Math.abs((-w - t.translate) / t.velocity) : Math.abs((w - t.translate) / t.velocity);
                            else if (i.freeModeSticky)
                                return void t.slideToClosest();
                            i.freeModeMomentumBounce && T ? (t.updateProgress(y),
                            t.setTransition(g),
                            t.setTranslate(w),
                            t.transitionStart(!0, t.swipeDirection),
                            t.animating = !0,
                            n.transitionEnd(function() {
                                t && !t.destroyed && a.allowMomentumBounce && (t.emit("momentumBounce"),
                                t.setTransition(i.speed),
                                t.setTranslate(y),
                                n.transitionEnd(function() {
                                    t && !t.destroyed && t.transitionEnd()
                                }))
                            })) : t.velocity ? (t.updateProgress(w),
                            t.setTransition(g),
                            t.setTranslate(w),
                            t.transitionStart(!0, t.swipeDirection),
                            t.animating || (t.animating = !0,
                            n.transitionEnd(function() {
                                t && !t.destroyed && t.transitionEnd()
                            }))) : t.updateProgress(w),
                            t.updateActiveIndex(),
                            t.updateSlidesClasses()
                        } else if (i.freeModeSticky)
                            return void t.slideToClosest();
                        (!i.freeModeMomentum || u >= i.longSwipesMs) && (t.updateProgress(),
                        t.updateActiveIndex(),
                        t.updateSlidesClasses())
                    } else {
                        for (var M = 0, P = t.slidesSizesGrid[0], k = 0; k < o.length; k += i.slidesPerGroup)
                            void 0 !== o[k + i.slidesPerGroup] ? p >= o[k] && p < o[k + i.slidesPerGroup] && (P = o[(M = k) + i.slidesPerGroup] - o[k]) : p >= o[k] && (M = k,
                            P = o[o.length - 1] - o[o.length - 2]);
                        var z = (p - o[M]) / P;
                        if (u > i.longSwipesMs) {
                            if (!i.longSwipes)
                                return void t.slideTo(t.activeIndex);
                            "next" === t.swipeDirection && (z >= i.longSwipesRatio ? t.slideTo(M + i.slidesPerGroup) : t.slideTo(M)),
                            "prev" === t.swipeDirection && (z > 1 - i.longSwipesRatio ? t.slideTo(M + i.slidesPerGroup) : t.slideTo(M))
                        } else {
                            if (!i.shortSwipes)
                                return void t.slideTo(t.activeIndex);
                            "next" === t.swipeDirection && t.slideTo(M + i.slidesPerGroup),
                            "prev" === t.swipeDirection && t.slideTo(M)
                        }
                    }
                }
                .bind(e),
                e.onClick = function(e) {
                    this.allowClick || (this.params.preventClicks && e.preventDefault(),
                    this.params.preventClicksPropagation && this.animating && (e.stopPropagation(),
                    e.stopImmediatePropagation()))
                }
                .bind(e);
                var r = "container" === t.touchEventsTarget ? i : s
                  , n = !!t.nested;
                if (ae.touch || !ae.pointerEvents && !ae.prefixedPointerEvents) {
                    if (ae.touch) {
                        var o = !("touchstart" !== a.start || !ae.passiveListener || !t.passiveListeners) && {
                            passive: !0,
                            capture: !1
                        };
                        r.addEventListener(a.start, e.onTouchStart, o),
                        r.addEventListener(a.move, e.onTouchMove, ae.passiveListener ? {
                            passive: !1,
                            capture: n
                        } : n),
                        r.addEventListener(a.end, e.onTouchEnd, o)
                    }
                    (t.simulateTouch && !g.ios && !g.android || t.simulateTouch && !ae.touch && g.ios) && (r.addEventListener("mousedown", e.onTouchStart, !1),
                    f.addEventListener("mousemove", e.onTouchMove, n),
                    f.addEventListener("mouseup", e.onTouchEnd, !1))
                } else
                    r.addEventListener(a.start, e.onTouchStart, !1),
                    f.addEventListener(a.move, e.onTouchMove, n),
                    f.addEventListener(a.end, e.onTouchEnd, !1);
                (t.preventClicks || t.preventClicksPropagation) && r.addEventListener("click", e.onClick, !0),
                e.on(g.ios || g.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", b, !0)
            },
            detachEvents: function() {
                var e = this
                  , t = e.params
                  , a = e.touchEvents
                  , i = e.el
                  , s = e.wrapperEl
                  , r = "container" === t.touchEventsTarget ? i : s
                  , n = !!t.nested;
                if (ae.touch || !ae.pointerEvents && !ae.prefixedPointerEvents) {
                    if (ae.touch) {
                        var o = !("onTouchStart" !== a.start || !ae.passiveListener || !t.passiveListeners) && {
                            passive: !0,
                            capture: !1
                        };
                        r.removeEventListener(a.start, e.onTouchStart, o),
                        r.removeEventListener(a.move, e.onTouchMove, n),
                        r.removeEventListener(a.end, e.onTouchEnd, o)
                    }
                    (t.simulateTouch && !g.ios && !g.android || t.simulateTouch && !ae.touch && g.ios) && (r.removeEventListener("mousedown", e.onTouchStart, !1),
                    f.removeEventListener("mousemove", e.onTouchMove, n),
                    f.removeEventListener("mouseup", e.onTouchEnd, !1))
                } else
                    r.removeEventListener(a.start, e.onTouchStart, !1),
                    f.removeEventListener(a.move, e.onTouchMove, n),
                    f.removeEventListener(a.end, e.onTouchEnd, !1);
                (t.preventClicks || t.preventClicksPropagation) && r.removeEventListener("click", e.onClick, !0),
                e.off(g.ios || g.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", b)
            }
        },
        breakpoints: {
            setBreakpoint: function() {
                var e = this
                  , t = e.activeIndex
                  , a = e.initialized
                  , i = e.loopedSlides;
                void 0 === i && (i = 0);
                var s = e.params
                  , r = s.breakpoints;
                if (r && (!r || 0 !== Object.keys(r).length)) {
                    var n = e.getBreakpoint(r);
                    if (n && e.currentBreakpoint !== n) {
                        var o = n in r ? r[n] : void 0;
                        o && ["slidesPerView", "spaceBetween", "slidesPerGroup"].forEach(function(e) {
                            var t = o[e];
                            void 0 !== t && (o[e] = "slidesPerView" !== e || "AUTO" !== t && "auto" !== t ? "slidesPerView" === e ? parseFloat(t) : parseInt(t, 10) : "auto")
                        });
                        var l = o || e.originalParams
                          , d = l.direction && l.direction !== s.direction
                          , p = s.loop && (l.slidesPerView !== s.slidesPerView || d);
                        d && a && e.changeDirection(),
                        te.extend(e.params, l),
                        te.extend(e, {
                            allowTouchMove: e.params.allowTouchMove,
                            allowSlideNext: e.params.allowSlideNext,
                            allowSlidePrev: e.params.allowSlidePrev
                        }),
                        e.currentBreakpoint = n,
                        p && a && (e.loopDestroy(),
                        e.loopCreate(),
                        e.updateSlides(),
                        e.slideTo(t - i + e.loopedSlides, 0, !1)),
                        e.emit("breakpoint", l)
                    }
                }
            },
            getBreakpoint: function(e) {
                if (e) {
                    var t = !1
                      , a = [];
                    Object.keys(e).forEach(function(e) {
                        a.push(e)
                    }),
                    a.sort(function(e, t) {
                        return parseInt(e, 10) - parseInt(t, 10)
                    });
                    for (var i = 0; i < a.length; i += 1) {
                        var s = a[i];
                        this.params.breakpointsInverse ? s <= ee.innerWidth && (t = s) : s >= ee.innerWidth && !t && (t = s)
                    }
                    return t || "max"
                }
            }
        },
        checkOverflow: {
            checkOverflow: function() {
                var e = this
                  , t = e.isLocked;
                e.isLocked = 1 === e.snapGrid.length,
                e.allowSlideNext = !e.isLocked,
                e.allowSlidePrev = !e.isLocked,
                t !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock"),
                t && t !== e.isLocked && (e.isEnd = !1,
                e.navigation.update())
            }
        },
        classes: {
            addClasses: function() {
                var t = this.classNames
                  , a = this.params
                  , e = this.rtl
                  , i = this.$el
                  , s = [];
                s.push("initialized"),
                s.push(a.direction),
                a.freeMode && s.push("free-mode"),
                ae.flexbox || s.push("no-flexbox"),
                a.autoHeight && s.push("autoheight"),
                e && s.push("rtl"),
                1 < a.slidesPerColumn && s.push("multirow"),
                g.android && s.push("android"),
                g.ios && s.push("ios"),
                (ie.isIE || ie.isEdge) && (ae.pointerEvents || ae.prefixedPointerEvents) && s.push("wp8-" + a.direction),
                s.forEach(function(e) {
                    t.push(a.containerModifierClass + e)
                }),
                i.addClass(t.join(" "))
            },
            removeClasses: function() {
                var e = this.$el
                  , t = this.classNames;
                e.removeClass(t.join(" "))
            }
        },
        images: {
            loadImage: function(e, t, a, i, s, r) {
                var n;
                function o() {
                    r && r()
                }
                e.complete && s ? o() : t ? ((n = new ee.Image).onload = o,
                n.onerror = o,
                i && (n.sizes = i),
                a && (n.srcset = a),
                t && (n.src = t)) : o()
            },
            preloadImages: function() {
                var e = this;
                function t() {
                    null != e && e && !e.destroyed && (void 0 !== e.imagesLoaded && (e.imagesLoaded += 1),
                    e.imagesLoaded === e.imagesToLoad.length && (e.params.updateOnImagesReady && e.update(),
                    e.emit("imagesReady")))
                }
                e.imagesToLoad = e.$el.find("img");
                for (var a = 0; a < e.imagesToLoad.length; a += 1) {
                    var i = e.imagesToLoad[a];
                    e.loadImage(i, i.currentSrc || i.getAttribute("src"), i.srcset || i.getAttribute("srcset"), i.sizes || i.getAttribute("sizes"), !0, t)
                }
            }
        }
    }
      , x = {}
      , T = function(u) {
        function h() {
            for (var e, t, s, a = [], i = arguments.length; i--; )
                a[i] = arguments[i];
            s = (s = 1 === a.length && a[0].constructor && a[0].constructor === Object ? a[0] : (t = (e = a)[0],
            e[1])) || {},
            s = te.extend({}, s),
            t && !s.el && (s.el = t),
            u.call(this, s),
            Object.keys(y).forEach(function(t) {
                Object.keys(y[t]).forEach(function(e) {
                    h.prototype[e] || (h.prototype[e] = y[t][e])
                })
            });
            var r = this;
            void 0 === r.modules && (r.modules = {}),
            Object.keys(r.modules).forEach(function(e) {
                var t = r.modules[e];
                if (t.params) {
                    var a = Object.keys(t.params)[0]
                      , i = t.params[a];
                    if ("object" != typeof i || null === i)
                        return;
                    if (!(a in s && "enabled"in i))
                        return;
                    !0 === s[a] && (s[a] = {
                        enabled: !0
                    }),
                    "object" != typeof s[a] || "enabled"in s[a] || (s[a].enabled = !0),
                    s[a] || (s[a] = {
                        enabled: !1
                    })
                }
            });
            var n = te.extend({}, w);
            r.useModulesParams(n),
            r.params = te.extend({}, n, x, s),
            r.originalParams = te.extend({}, r.params),
            r.passedParams = te.extend({}, s);
            var o = (r.$ = I)(r.params.el);
            if (t = o[0]) {
                if (1 < o.length) {
                    var l = [];
                    return o.each(function(e, t) {
                        var a = te.extend({}, s, {
                            el: t
                        });
                        l.push(new h(a))
                    }),
                    l
                }
                t.swiper = r,
                o.data("swiper", r);
                var d, p, c = o.children("." + r.params.wrapperClass);
                return te.extend(r, {
                    $el: o,
                    el: t,
                    $wrapperEl: c,
                    wrapperEl: c[0],
                    classNames: [],
                    slides: I(),
                    slidesGrid: [],
                    snapGrid: [],
                    slidesSizesGrid: [],
                    isHorizontal: function() {
                        return "horizontal" === r.params.direction
                    },
                    isVertical: function() {
                        return "vertical" === r.params.direction
                    },
                    rtl: "rtl" === t.dir.toLowerCase() || "rtl" === o.css("direction"),
                    rtlTranslate: "horizontal" === r.params.direction && ("rtl" === t.dir.toLowerCase() || "rtl" === o.css("direction")),
                    wrongRTL: "-webkit-box" === c.css("display"),
                    activeIndex: 0,
                    realIndex: 0,
                    isBeginning: !0,
                    isEnd: !1,
                    translate: 0,
                    previousTranslate: 0,
                    progress: 0,
                    velocity: 0,
                    animating: !1,
                    allowSlideNext: r.params.allowSlideNext,
                    allowSlidePrev: r.params.allowSlidePrev,
                    touchEvents: (d = ["touchstart", "touchmove", "touchend"],
                    p = ["mousedown", "mousemove", "mouseup"],
                    ae.pointerEvents ? p = ["pointerdown", "pointermove", "pointerup"] : ae.prefixedPointerEvents && (p = ["MSPointerDown", "MSPointerMove", "MSPointerUp"]),
                    r.touchEventsTouch = {
                        start: d[0],
                        move: d[1],
                        end: d[2]
                    },
                    r.touchEventsDesktop = {
                        start: p[0],
                        move: p[1],
                        end: p[2]
                    },
                    ae.touch || !r.params.simulateTouch ? r.touchEventsTouch : r.touchEventsDesktop),
                    touchEventsData: {
                        isTouched: void 0,
                        isMoved: void 0,
                        allowTouchCallbacks: void 0,
                        touchStartTime: void 0,
                        isScrolling: void 0,
                        currentTranslate: void 0,
                        startTranslate: void 0,
                        allowThresholdMove: void 0,
                        formElements: "input, select, option, textarea, button, video",
                        lastClickTime: te.now(),
                        clickTimeout: void 0,
                        velocities: [],
                        allowMomentumBounce: void 0,
                        isTouchEvent: void 0,
                        startMoving: void 0
                    },
                    allowClick: !0,
                    allowTouchMove: r.params.allowTouchMove,
                    touches: {
                        startX: 0,
                        startY: 0,
                        currentX: 0,
                        currentY: 0,
                        diff: 0
                    },
                    imagesToLoad: [],
                    imagesLoaded: 0
                }),
                r.useModules(),
                r.params.init && r.init(),
                r
            }
        }
        u && (h.__proto__ = u);
        var e = {
            extendedDefaults: {
                configurable: !0
            },
            defaults: {
                configurable: !0
            },
            Class: {
                configurable: !0
            },
            $: {
                configurable: !0
            }
        };
        return ((h.prototype = Object.create(u && u.prototype)).constructor = h).prototype.slidesPerViewDynamic = function() {
            var e = this
              , t = e.params
              , a = e.slides
              , i = e.slidesGrid
              , s = e.size
              , r = e.activeIndex
              , n = 1;
            if (t.centeredSlides) {
                for (var o, l = a[r].swiperSlideSize, d = r + 1; d < a.length; d += 1)
                    a[d] && !o && (n += 1,
                    s < (l += a[d].swiperSlideSize) && (o = !0));
                for (var p = r - 1; 0 <= p; p -= 1)
                    a[p] && !o && (n += 1,
                    s < (l += a[p].swiperSlideSize) && (o = !0))
            } else
                for (var c = r + 1; c < a.length; c += 1)
                    i[c] - i[r] < s && (n += 1);
            return n
        }
        ,
        h.prototype.update = function() {
            var a = this;
            if (a && !a.destroyed) {
                var e = a.snapGrid
                  , t = a.params;
                t.breakpoints && a.setBreakpoint(),
                a.updateSize(),
                a.updateSlides(),
                a.updateProgress(),
                a.updateSlidesClasses(),
                a.params.freeMode ? (i(),
                a.params.autoHeight && a.updateAutoHeight()) : (("auto" === a.params.slidesPerView || 1 < a.params.slidesPerView) && a.isEnd && !a.params.centeredSlides ? a.slideTo(a.slides.length - 1, 0, !1, !0) : a.slideTo(a.activeIndex, 0, !1, !0)) || i(),
                t.watchOverflow && e !== a.snapGrid && a.checkOverflow(),
                a.emit("update")
            }
            function i() {
                var e = a.rtlTranslate ? -1 * a.translate : a.translate
                  , t = Math.min(Math.max(e, a.maxTranslate()), a.minTranslate());
                a.setTranslate(t),
                a.updateActiveIndex(),
                a.updateSlidesClasses()
            }
        }
        ,
        h.prototype.changeDirection = function(a, e) {
            void 0 === e && (e = !0);
            var t = this
              , i = t.params.direction;
            return (a = a || ("horizontal" === i ? "vertical" : "horizontal")) === i || "horizontal" !== a && "vertical" !== a || (t.$el.removeClass("" + t.params.containerModifierClass + i + " wp8-" + i).addClass("" + t.params.containerModifierClass + a),
            (ie.isIE || ie.isEdge) && (ae.pointerEvents || ae.prefixedPointerEvents) && t.$el.addClass(t.params.containerModifierClass + "wp8-" + a),
            t.params.direction = a,
            t.slides.each(function(e, t) {
                "vertical" === a ? t.style.width = "" : t.style.height = ""
            }),
            t.emit("changeDirection"),
            e && t.update()),
            t
        }
        ,
        h.prototype.init = function() {
            var e = this;
            e.initialized || (e.emit("beforeInit"),
            e.params.breakpoints && e.setBreakpoint(),
            e.addClasses(),
            e.params.loop && e.loopCreate(),
            e.updateSize(),
            e.updateSlides(),
            e.params.watchOverflow && e.checkOverflow(),
            e.params.grabCursor && e.setGrabCursor(),
            e.params.preloadImages && e.preloadImages(),
            e.params.loop ? e.slideTo(e.params.initialSlide + e.loopedSlides, 0, e.params.runCallbacksOnInit) : e.slideTo(e.params.initialSlide, 0, e.params.runCallbacksOnInit),
            e.attachEvents(),
            e.initialized = !0,
            e.emit("init"))
        }
        ,
        h.prototype.destroy = function(e, t) {
            void 0 === e && (e = !0),
            void 0 === t && (t = !0);
            var a = this
              , i = a.params
              , s = a.$el
              , r = a.$wrapperEl
              , n = a.slides;
            return void 0 === a.params || a.destroyed || (a.emit("beforeDestroy"),
            a.initialized = !1,
            a.detachEvents(),
            i.loop && a.loopDestroy(),
            t && (a.removeClasses(),
            s.removeAttr("style"),
            r.removeAttr("style"),
            n && n.length && n.removeClass([i.slideVisibleClass, i.slideActiveClass, i.slideNextClass, i.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-slide-index").removeAttr("data-swiper-column").removeAttr("data-swiper-row")),
            a.emit("destroy"),
            Object.keys(a.eventsListeners).forEach(function(e) {
                a.off(e)
            }),
            !1 !== e && (a.$el[0].swiper = null,
            a.$el.data("swiper", null),
            te.deleteProps(a)),
            a.destroyed = !0),
            null
        }
        ,
        h.extendDefaults = function(e) {
            te.extend(x, e)
        }
        ,
        e.extendedDefaults.get = function() {
            return x
        }
        ,
        e.defaults.get = function() {
            return w
        }
        ,
        e.Class.get = function() {
            return u
        }
        ,
        e.$.get = function() {
            return I
        }
        ,
        Object.defineProperties(h, e),
        h
    }(e)
      , E = {
        name: "device",
        proto: {
            device: g
        },
        static: {
            device: g
        }
    }
      , S = {
        name: "support",
        proto: {
            support: ae
        },
        static: {
            support: ae
        }
    }
      , C = {
        name: "browser",
        proto: {
            browser: ie
        },
        static: {
            browser: ie
        }
    }
      , M = {
        name: "resize",
        create: function() {
            var e = this;
            te.extend(e, {
                resize: {
                    resizeHandler: function() {
                        e && !e.destroyed && e.initialized && (e.emit("beforeResize"),
                        e.emit("resize"))
                    },
                    orientationChangeHandler: function() {
                        e && !e.destroyed && e.initialized && e.emit("orientationchange")
                    }
                }
            })
        },
        on: {
            init: function() {
                ee.addEventListener("resize", this.resize.resizeHandler),
                ee.addEventListener("orientationchange", this.resize.orientationChangeHandler)
            },
            destroy: function() {
                ee.removeEventListener("resize", this.resize.resizeHandler),
                ee.removeEventListener("orientationchange", this.resize.orientationChangeHandler)
            }
        }
    }
      , P = {
        func: ee.MutationObserver || ee.WebkitMutationObserver,
        attach: function(e, t) {
            void 0 === t && (t = {});
            var a = this
              , i = new P.func(function(e) {
                if (1 !== e.length) {
                    var t = function() {
                        a.emit("observerUpdate", e[0])
                    };
                    ee.requestAnimationFrame ? ee.requestAnimationFrame(t) : ee.setTimeout(t, 0)
                } else
                    a.emit("observerUpdate", e[0])
            }
            );
            i.observe(e, {
                attributes: void 0 === t.attributes || t.attributes,
                childList: void 0 === t.childList || t.childList,
                characterData: void 0 === t.characterData || t.characterData
            }),
            a.observer.observers.push(i)
        },
        init: function() {
            var e = this;
            if (ae.observer && e.params.observer) {
                if (e.params.observeParents)
                    for (var t = e.$el.parents(), a = 0; a < t.length; a += 1)
                        e.observer.attach(t[a]);
                e.observer.attach(e.$el[0], {
                    childList: e.params.observeSlideChildren
                }),
                e.observer.attach(e.$wrapperEl[0], {
                    attributes: !1
                })
            }
        },
        destroy: function() {
            this.observer.observers.forEach(function(e) {
                e.disconnect()
            }),
            this.observer.observers = []
        }
    }
      , k = {
        name: "observer",
        params: {
            observer: !1,
            observeParents: !1,
            observeSlideChildren: !1
        },
        create: function() {
            te.extend(this, {
                observer: {
                    init: P.init.bind(this),
                    attach: P.attach.bind(this),
                    destroy: P.destroy.bind(this),
                    observers: []
                }
            })
        },
        on: {
            init: function() {
                this.observer.init()
            },
            destroy: function() {
                this.observer.destroy()
            }
        }
    }
      , z = {
        update: function(e) {
            var t = this
              , a = t.params
              , i = a.slidesPerView
              , s = a.slidesPerGroup
              , r = a.centeredSlides
              , n = t.params.virtual
              , o = n.addSlidesBefore
              , l = n.addSlidesAfter
              , d = t.virtual
              , p = d.from
              , c = d.to
              , u = d.slides
              , h = d.slidesGrid
              , v = d.renderSlide
              , f = d.offset;
            t.updateActiveIndex();
            var m, g, b, w = t.activeIndex || 0;
            m = t.rtlTranslate ? "right" : t.isHorizontal() ? "left" : "top",
            b = r ? (g = Math.floor(i / 2) + s + o,
            Math.floor(i / 2) + s + l) : (g = i + (s - 1) + o,
            s + l);
            var y = Math.max((w || 0) - b, 0)
              , x = Math.min((w || 0) + g, u.length - 1)
              , T = (t.slidesGrid[y] || 0) - (t.slidesGrid[0] || 0);
            function E() {
                t.updateSlides(),
                t.updateProgress(),
                t.updateSlidesClasses(),
                t.lazy && t.params.lazy.enabled && t.lazy.load()
            }
            if (te.extend(t.virtual, {
                from: y,
                to: x,
                offset: T,
                slidesGrid: t.slidesGrid
            }),
            p === y && c === x && !e)
                return t.slidesGrid !== h && T !== f && t.slides.css(m, T + "px"),
                void t.updateProgress();
            if (t.params.virtual.renderExternal)
                return t.params.virtual.renderExternal.call(t, {
                    offset: T,
                    from: y,
                    to: x,
                    slides: function() {
                        for (var e = [], t = y; t <= x; t += 1)
                            e.push(u[t]);
                        return e
                    }()
                }),
                void E();
            var S = []
              , C = [];
            if (e)
                t.$wrapperEl.find("." + t.params.slideClass).remove();
            else
                for (var M = p; M <= c; M += 1)
                    (M < y || x < M) && t.$wrapperEl.find("." + t.params.slideClass + '[data-swiper-slide-index="' + M + '"]').remove();
            for (var P = 0; P < u.length; P += 1)
                y <= P && P <= x && (void 0 === c || e ? C.push(P) : (c < P && C.push(P),
                P < p && S.push(P)));
            C.forEach(function(e) {
                t.$wrapperEl.append(v(u[e], e))
            }),
            S.sort(function(e, t) {
                return t - e
            }).forEach(function(e) {
                t.$wrapperEl.prepend(v(u[e], e))
            }),
            t.$wrapperEl.children(".swiper-slide").css(m, T + "px"),
            E()
        },
        renderSlide: function(e, t) {
            var a = this
              , i = a.params.virtual;
            if (i.cache && a.virtual.cache[t])
                return a.virtual.cache[t];
            var s = i.renderSlide ? I(i.renderSlide.call(a, e, t)) : I('<div class="' + a.params.slideClass + '" data-swiper-slide-index="' + t + '">' + e + "</div>");
            return s.attr("data-swiper-slide-index") || s.attr("data-swiper-slide-index", t),
            i.cache && (a.virtual.cache[t] = s),
            s
        },
        appendSlide: function(e) {
            if ("object" == typeof e && "length"in e)
                for (var t = 0; t < e.length; t += 1)
                    e[t] && this.virtual.slides.push(e[t]);
            else
                this.virtual.slides.push(e);
            this.virtual.update(!0)
        },
        prependSlide: function(e) {
            var t = this
              , a = t.activeIndex
              , i = a + 1
              , s = 1;
            if (Array.isArray(e)) {
                for (var r = 0; r < e.length; r += 1)
                    e[r] && t.virtual.slides.unshift(e[r]);
                i = a + e.length,
                s = e.length
            } else
                t.virtual.slides.unshift(e);
            if (t.params.virtual.cache) {
                var n = t.virtual.cache
                  , o = {};
                Object.keys(n).forEach(function(e) {
                    o[parseInt(e, 10) + s] = n[e]
                }),
                t.virtual.cache = o
            }
            t.virtual.update(!0),
            t.slideTo(i, 0)
        },
        removeSlide: function(e) {
            var t = this;
            if (null != e) {
                var a = t.activeIndex;
                if (Array.isArray(e))
                    for (var i = e.length - 1; 0 <= i; i -= 1)
                        t.virtual.slides.splice(e[i], 1),
                        t.params.virtual.cache && delete t.virtual.cache[e[i]],
                        e[i] < a && (a -= 1),
                        a = Math.max(a, 0);
                else
                    t.virtual.slides.splice(e, 1),
                    t.params.virtual.cache && delete t.virtual.cache[e],
                    e < a && (a -= 1),
                    a = Math.max(a, 0);
                t.virtual.update(!0),
                t.slideTo(a, 0)
            }
        },
        removeAllSlides: function() {
            var e = this;
            e.virtual.slides = [],
            e.params.virtual.cache && (e.virtual.cache = {}),
            e.virtual.update(!0),
            e.slideTo(0, 0)
        }
    }
      , $ = {
        name: "virtual",
        params: {
            virtual: {
                enabled: !1,
                slides: [],
                cache: !0,
                renderSlide: null,
                renderExternal: null,
                addSlidesBefore: 0,
                addSlidesAfter: 0
            }
        },
        create: function() {
            var e = this;
            te.extend(e, {
                virtual: {
                    update: z.update.bind(e),
                    appendSlide: z.appendSlide.bind(e),
                    prependSlide: z.prependSlide.bind(e),
                    removeSlide: z.removeSlide.bind(e),
                    removeAllSlides: z.removeAllSlides.bind(e),
                    renderSlide: z.renderSlide.bind(e),
                    slides: e.params.virtual.slides,
                    cache: {}
                }
            })
        },
        on: {
            beforeInit: function() {
                var e = this;
                if (e.params.virtual.enabled) {
                    e.classNames.push(e.params.containerModifierClass + "virtual");
                    var t = {
                        watchSlidesProgress: !0
                    };
                    te.extend(e.params, t),
                    te.extend(e.originalParams, t),
                    e.params.initialSlide || e.virtual.update()
                }
            },
            setTranslate: function() {
                this.params.virtual.enabled && this.virtual.update()
            }
        }
    }
      , L = {
        handle: function(e) {
            var t = this
              , a = t.rtlTranslate
              , i = e;
            i.originalEvent && (i = i.originalEvent);
            var s = i.keyCode || i.charCode;
            if (!t.allowSlideNext && (t.isHorizontal() && 39 === s || t.isVertical() && 40 === s || 34 === s))
                return !1;
            if (!t.allowSlidePrev && (t.isHorizontal() && 37 === s || t.isVertical() && 38 === s || 33 === s))
                return !1;
            if (!(i.shiftKey || i.altKey || i.ctrlKey || i.metaKey || f.activeElement && f.activeElement.nodeName && ("input" === f.activeElement.nodeName.toLowerCase() || "textarea" === f.activeElement.nodeName.toLowerCase()))) {
                if (t.params.keyboard.onlyInViewport && (33 === s || 34 === s || 37 === s || 39 === s || 38 === s || 40 === s)) {
                    var r = !1;
                    if (0 < t.$el.parents("." + t.params.slideClass).length && 0 === t.$el.parents("." + t.params.slideActiveClass).length)
                        return;
                    var n = ee.innerWidth
                      , o = ee.innerHeight
                      , l = t.$el.offset();
                    a && (l.left -= t.$el[0].scrollLeft);
                    for (var d = [[l.left, l.top], [l.left + t.width, l.top], [l.left, l.top + t.height], [l.left + t.width, l.top + t.height]], p = 0; p < d.length; p += 1) {
                        var c = d[p];
                        0 <= c[0] && c[0] <= n && 0 <= c[1] && c[1] <= o && (r = !0)
                    }
                    if (!r)
                        return
                }
                t.isHorizontal() ? (33 !== s && 34 !== s && 37 !== s && 39 !== s || (i.preventDefault ? i.preventDefault() : i.returnValue = !1),
                (34 !== s && 39 !== s || a) && (33 !== s && 37 !== s || !a) || t.slideNext(),
                (33 !== s && 37 !== s || a) && (34 !== s && 39 !== s || !a) || t.slidePrev()) : (33 !== s && 34 !== s && 38 !== s && 40 !== s || (i.preventDefault ? i.preventDefault() : i.returnValue = !1),
                34 !== s && 40 !== s || t.slideNext(),
                33 !== s && 38 !== s || t.slidePrev()),
                t.emit("keyPress", s)
            }
        },
        enable: function() {
            this.keyboard.enabled || (I(f).on("keydown", this.keyboard.handle),
            this.keyboard.enabled = !0)
        },
        disable: function() {
            this.keyboard.enabled && (I(f).off("keydown", this.keyboard.handle),
            this.keyboard.enabled = !1)
        }
    }
      , D = {
        name: "keyboard",
        params: {
            keyboard: {
                enabled: !1,
                onlyInViewport: !0
            }
        },
        create: function() {
            te.extend(this, {
                keyboard: {
                    enabled: !1,
                    enable: L.enable.bind(this),
                    disable: L.disable.bind(this),
                    handle: L.handle.bind(this)
                }
            })
        },
        on: {
            init: function() {
                this.params.keyboard.enabled && this.keyboard.enable()
            },
            destroy: function() {
                this.keyboard.enabled && this.keyboard.disable()
            }
        }
    };
    var O = {
        lastScrollTime: te.now(),
        event: -1 < ee.navigator.userAgent.indexOf("firefox") ? "DOMMouseScroll" : function() {
            var e = "onwheel"
              , t = e in f;
            if (!t) {
                var a = f.createElement("div");
                a.setAttribute(e, "return;"),
                t = "function" == typeof a[e]
            }
            return !t && f.implementation && f.implementation.hasFeature && !0 !== f.implementation.hasFeature("", "") && (t = f.implementation.hasFeature("Events.wheel", "3.0")),
            t
        }() ? "wheel" : "mousewheel",
        normalize: function(e) {
            var t = 0
              , a = 0
              , i = 0
              , s = 0;
            return "detail"in e && (a = e.detail),
            "wheelDelta"in e && (a = -e.wheelDelta / 120),
            "wheelDeltaY"in e && (a = -e.wheelDeltaY / 120),
            "wheelDeltaX"in e && (t = -e.wheelDeltaX / 120),
            "axis"in e && e.axis === e.HORIZONTAL_AXIS && (t = a,
            a = 0),
            i = 10 * t,
            s = 10 * a,
            "deltaY"in e && (s = e.deltaY),
            "deltaX"in e && (i = e.deltaX),
            (i || s) && e.deltaMode && (1 === e.deltaMode ? (i *= 40,
            s *= 40) : (i *= 800,
            s *= 800)),
            i && !t && (t = i < 1 ? -1 : 1),
            s && !a && (a = s < 1 ? -1 : 1),
            {
                spinX: t,
                spinY: a,
                pixelX: i,
                pixelY: s
            }
        },
        handleMouseEnter: function() {
            this.mouseEntered = !0
        },
        handleMouseLeave: function() {
            this.mouseEntered = !1
        },
        handle: function(e) {
            var t = e
              , a = this
              , i = a.params.mousewheel;
            if (!a.mouseEntered && !i.releaseOnEdges)
                return !0;
            t.originalEvent && (t = t.originalEvent);
            var s = 0
              , r = a.rtlTranslate ? -1 : 1
              , n = O.normalize(t);
            if (i.forceToAxis)
                if (a.isHorizontal()) {
                    if (!(Math.abs(n.pixelX) > Math.abs(n.pixelY)))
                        return !0;
                    s = n.pixelX * r
                } else {
                    if (!(Math.abs(n.pixelY) > Math.abs(n.pixelX)))
                        return !0;
                    s = n.pixelY
                }
            else
                s = Math.abs(n.pixelX) > Math.abs(n.pixelY) ? -n.pixelX * r : -n.pixelY;
            if (0 === s)
                return !0;
            if (i.invert && (s = -s),
            a.params.freeMode) {
                a.params.loop && a.loopFix();
                var o = a.getTranslate() + s * i.sensitivity
                  , l = a.isBeginning
                  , d = a.isEnd;
                if (o >= a.minTranslate() && (o = a.minTranslate()),
                o <= a.maxTranslate() && (o = a.maxTranslate()),
                a.setTransition(0),
                a.setTranslate(o),
                a.updateProgress(),
                a.updateActiveIndex(),
                a.updateSlidesClasses(),
                (!l && a.isBeginning || !d && a.isEnd) && a.updateSlidesClasses(),
                a.params.freeModeSticky && (clearTimeout(a.mousewheel.timeout),
                a.mousewheel.timeout = te.nextTick(function() {
                    a.slideToClosest()
                }, 300)),
                a.emit("scroll", t),
                a.params.autoplay && a.params.autoplayDisableOnInteraction && a.autoplay.stop(),
                o === a.minTranslate() || o === a.maxTranslate())
                    return !0
            } else {
                if (60 < te.now() - a.mousewheel.lastScrollTime)
                    if (s < 0)
                        if (a.isEnd && !a.params.loop || a.animating) {
                            if (i.releaseOnEdges)
                                return !0
                        } else
                            a.slideNext(),
                            a.emit("scroll", t);
                    else if (a.isBeginning && !a.params.loop || a.animating) {
                        if (i.releaseOnEdges)
                            return !0
                    } else
                        a.slidePrev(),
                        a.emit("scroll", t);
                a.mousewheel.lastScrollTime = (new ee.Date).getTime()
            }
            return t.preventDefault ? t.preventDefault() : t.returnValue = !1,
            !1
        },
        enable: function() {
            var e = this;
            if (!O.event)
                return !1;
            if (e.mousewheel.enabled)
                return !1;
            var t = e.$el;
            return "container" !== e.params.mousewheel.eventsTarged && (t = I(e.params.mousewheel.eventsTarged)),
            t.on("mouseenter", e.mousewheel.handleMouseEnter),
            t.on("mouseleave", e.mousewheel.handleMouseLeave),
            t.on(O.event, e.mousewheel.handle),
            e.mousewheel.enabled = !0
        },
        disable: function() {
            var e = this;
            if (!O.event)
                return !1;
            if (!e.mousewheel.enabled)
                return !1;
            var t = e.$el;
            return "container" !== e.params.mousewheel.eventsTarged && (t = I(e.params.mousewheel.eventsTarged)),
            t.off(O.event, e.mousewheel.handle),
            !(e.mousewheel.enabled = !1)
        }
    }
      , A = {
        update: function() {
            var e = this
              , t = e.params.navigation;
            if (!e.params.loop) {
                var a = e.navigation
                  , i = a.$nextEl
                  , s = a.$prevEl;
                s && 0 < s.length && (e.isBeginning ? s.addClass(t.disabledClass) : s.removeClass(t.disabledClass),
                s[e.params.watchOverflow && e.isLocked ? "addClass" : "removeClass"](t.lockClass)),
                i && 0 < i.length && (e.isEnd ? i.addClass(t.disabledClass) : i.removeClass(t.disabledClass),
                i[e.params.watchOverflow && e.isLocked ? "addClass" : "removeClass"](t.lockClass))
            }
        },
        onPrevClick: function(e) {
            e.preventDefault(),
            this.isBeginning && !this.params.loop || this.slidePrev()
        },
        onNextClick: function(e) {
            e.preventDefault(),
            this.isEnd && !this.params.loop || this.slideNext()
        },
        init: function() {
            var e, t, a = this, i = a.params.navigation;
            (i.nextEl || i.prevEl) && (i.nextEl && (e = I(i.nextEl),
            a.params.uniqueNavElements && "string" == typeof i.nextEl && 1 < e.length && 1 === a.$el.find(i.nextEl).length && (e = a.$el.find(i.nextEl))),
            i.prevEl && (t = I(i.prevEl),
            a.params.uniqueNavElements && "string" == typeof i.prevEl && 1 < t.length && 1 === a.$el.find(i.prevEl).length && (t = a.$el.find(i.prevEl))),
            e && 0 < e.length && e.on("click", a.navigation.onNextClick),
            t && 0 < t.length && t.on("click", a.navigation.onPrevClick),
            te.extend(a.navigation, {
                $nextEl: e,
                nextEl: e && e[0],
                $prevEl: t,
                prevEl: t && t[0]
            }))
        },
        destroy: function() {
            var e = this
              , t = e.navigation
              , a = t.$nextEl
              , i = t.$prevEl;
            a && a.length && (a.off("click", e.navigation.onNextClick),
            a.removeClass(e.params.navigation.disabledClass)),
            i && i.length && (i.off("click", e.navigation.onPrevClick),
            i.removeClass(e.params.navigation.disabledClass))
        }
    }
      , H = {
        update: function() {
            var e = this
              , t = e.rtl
              , s = e.params.pagination;
            if (s.el && e.pagination.el && e.pagination.$el && 0 !== e.pagination.$el.length) {
                var r, a = e.virtual && e.params.virtual.enabled ? e.virtual.slides.length : e.slides.length, i = e.pagination.$el, n = e.params.loop ? Math.ceil((a - 2 * e.loopedSlides) / e.params.slidesPerGroup) : e.snapGrid.length;
                if (e.params.loop ? ((r = Math.ceil((e.activeIndex - e.loopedSlides) / e.params.slidesPerGroup)) > a - 1 - 2 * e.loopedSlides && (r -= a - 2 * e.loopedSlides),
                n - 1 < r && (r -= n),
                r < 0 && "bullets" !== e.params.paginationType && (r = n + r)) : r = void 0 !== e.snapIndex ? e.snapIndex : e.activeIndex || 0,
                "bullets" === s.type && e.pagination.bullets && 0 < e.pagination.bullets.length) {
                    var o, l, d, p = e.pagination.bullets;
                    if (s.dynamicBullets && (e.pagination.bulletSize = p.eq(0)[e.isHorizontal() ? "outerWidth" : "outerHeight"](!0),
                    i.css(e.isHorizontal() ? "width" : "height", e.pagination.bulletSize * (s.dynamicMainBullets + 4) + "px"),
                    1 < s.dynamicMainBullets && void 0 !== e.previousIndex && (e.pagination.dynamicBulletIndex += r - e.previousIndex,
                    e.pagination.dynamicBulletIndex > s.dynamicMainBullets - 1 ? e.pagination.dynamicBulletIndex = s.dynamicMainBullets - 1 : e.pagination.dynamicBulletIndex < 0 && (e.pagination.dynamicBulletIndex = 0)),
                    o = r - e.pagination.dynamicBulletIndex,
                    d = ((l = o + (Math.min(p.length, s.dynamicMainBullets) - 1)) + o) / 2),
                    p.removeClass(s.bulletActiveClass + " " + s.bulletActiveClass + "-next " + s.bulletActiveClass + "-next-next " + s.bulletActiveClass + "-prev " + s.bulletActiveClass + "-prev-prev " + s.bulletActiveClass + "-main"),
                    1 < i.length)
                        p.each(function(e, t) {
                            var a = I(t)
                              , i = a.index();
                            i === r && a.addClass(s.bulletActiveClass),
                            s.dynamicBullets && (o <= i && i <= l && a.addClass(s.bulletActiveClass + "-main"),
                            i === o && a.prev().addClass(s.bulletActiveClass + "-prev").prev().addClass(s.bulletActiveClass + "-prev-prev"),
                            i === l && a.next().addClass(s.bulletActiveClass + "-next").next().addClass(s.bulletActiveClass + "-next-next"))
                        });
                    else if (p.eq(r).addClass(s.bulletActiveClass),
                    s.dynamicBullets) {
                        for (var c = p.eq(o), u = p.eq(l), h = o; h <= l; h += 1)
                            p.eq(h).addClass(s.bulletActiveClass + "-main");
                        c.prev().addClass(s.bulletActiveClass + "-prev").prev().addClass(s.bulletActiveClass + "-prev-prev"),
                        u.next().addClass(s.bulletActiveClass + "-next").next().addClass(s.bulletActiveClass + "-next-next")
                    }
                    if (s.dynamicBullets) {
                        var v = Math.min(p.length, s.dynamicMainBullets + 4)
                          , f = (e.pagination.bulletSize * v - e.pagination.bulletSize) / 2 - d * e.pagination.bulletSize
                          , m = t ? "right" : "left";
                        p.css(e.isHorizontal() ? m : "top", f + "px")
                    }
                }
                if ("fraction" === s.type && (i.find("." + s.currentClass).text(s.formatFractionCurrent(r + 1)),
                i.find("." + s.totalClass).text(s.formatFractionTotal(n))),
                "progressbar" === s.type) {
                    var g;
                    g = s.progressbarOpposite ? e.isHorizontal() ? "vertical" : "horizontal" : e.isHorizontal() ? "horizontal" : "vertical";
                    var b = (r + 1) / n
                      , w = 1
                      , y = 1;
                    "horizontal" === g ? w = b : y = b,
                    i.find("." + s.progressbarFillClass).transform("translate3d(0,0,0) scaleX(" + w + ") scaleY(" + y + ")").transition(e.params.speed)
                }
                "custom" === s.type && s.renderCustom ? (i.html(s.renderCustom(e, r + 1, n)),
                e.emit("paginationRender", e, i[0])) : e.emit("paginationUpdate", e, i[0]),
                i[e.params.watchOverflow && e.isLocked ? "addClass" : "removeClass"](s.lockClass)
            }
        },
        render: function() {
            var e = this
              , t = e.params.pagination;
            if (t.el && e.pagination.el && e.pagination.$el && 0 !== e.pagination.$el.length) {
                var a = e.virtual && e.params.virtual.enabled ? e.virtual.slides.length : e.slides.length
                  , i = e.pagination.$el
                  , s = "";
                if ("bullets" === t.type) {
                    for (var r = e.params.loop ? Math.ceil((a - 2 * e.loopedSlides) / e.params.slidesPerGroup) : e.snapGrid.length, n = 0; n < r; n += 1)
                        t.renderBullet ? s += t.renderBullet.call(e, n, t.bulletClass) : s += "<" + t.bulletElement + ' class="' + t.bulletClass + '"></' + t.bulletElement + ">";
                    i.html(s),
                    e.pagination.bullets = i.find("." + t.bulletClass)
                }
                "fraction" === t.type && (s = t.renderFraction ? t.renderFraction.call(e, t.currentClass, t.totalClass) : '<span class="' + t.currentClass + '"></span> / <span class="' + t.totalClass + '"></span>',
                i.html(s)),
                "progressbar" === t.type && (s = t.renderProgressbar ? t.renderProgressbar.call(e, t.progressbarFillClass) : '<span class="' + t.progressbarFillClass + '"></span>',
                i.html(s)),
                "custom" !== t.type && e.emit("paginationRender", e.pagination.$el[0])
            }
        },
        init: function() {
            var a = this
              , e = a.params.pagination;
            if (e.el) {
                var t = I(e.el);
                0 !== t.length && (a.params.uniqueNavElements && "string" == typeof e.el && 1 < t.length && 1 === a.$el.find(e.el).length && (t = a.$el.find(e.el)),
                "bullets" === e.type && e.clickable && t.addClass(e.clickableClass),
                t.addClass(e.modifierClass + e.type),
                "bullets" === e.type && e.dynamicBullets && (t.addClass("" + e.modifierClass + e.type + "-dynamic"),
                a.pagination.dynamicBulletIndex = 0,
                e.dynamicMainBullets < 1 && (e.dynamicMainBullets = 1)),
                "progressbar" === e.type && e.progressbarOpposite && t.addClass(e.progressbarOppositeClass),
                e.clickable && t.on("click", "." + e.bulletClass, function(e) {
                    e.preventDefault();
                    var t = I(this).index() * a.params.slidesPerGroup;
                    a.params.loop && (t += a.loopedSlides),
                    a.slideTo(t)
                }),
                te.extend(a.pagination, {
                    $el: t,
                    el: t[0]
                }))
            }
        },
        destroy: function() {
            var e = this
              , t = e.params.pagination;
            if (t.el && e.pagination.el && e.pagination.$el && 0 !== e.pagination.$el.length) {
                var a = e.pagination.$el;
                a.removeClass(t.hiddenClass),
                a.removeClass(t.modifierClass + t.type),
                e.pagination.bullets && e.pagination.bullets.removeClass(t.bulletActiveClass),
                t.clickable && a.off("click", "." + t.bulletClass)
            }
        }
    }
      , G = {
        setTranslate: function() {
            var e = this;
            if (e.params.scrollbar.el && e.scrollbar.el) {
                var t = e.scrollbar
                  , a = e.rtlTranslate
                  , i = e.progress
                  , s = t.dragSize
                  , r = t.trackSize
                  , n = t.$dragEl
                  , o = t.$el
                  , l = e.params.scrollbar
                  , d = s
                  , p = (r - s) * i;
                a ? 0 < (p = -p) ? (d = s - p,
                p = 0) : r < -p + s && (d = r + p) : p < 0 ? (d = s + p,
                p = 0) : r < p + s && (d = r - p),
                e.isHorizontal() ? (ae.transforms3d ? n.transform("translate3d(" + p + "px, 0, 0)") : n.transform("translateX(" + p + "px)"),
                n[0].style.width = d + "px") : (ae.transforms3d ? n.transform("translate3d(0px, " + p + "px, 0)") : n.transform("translateY(" + p + "px)"),
                n[0].style.height = d + "px"),
                l.hide && (clearTimeout(e.scrollbar.timeout),
                o[0].style.opacity = 1,
                e.scrollbar.timeout = setTimeout(function() {
                    o[0].style.opacity = 0,
                    o.transition(400)
                }, 1e3))
            }
        },
        setTransition: function(e) {
            this.params.scrollbar.el && this.scrollbar.el && this.scrollbar.$dragEl.transition(e)
        },
        updateSize: function() {
            var e = this;
            if (e.params.scrollbar.el && e.scrollbar.el) {
                var t = e.scrollbar
                  , a = t.$dragEl
                  , i = t.$el;
                a[0].style.width = "",
                a[0].style.height = "";
                var s, r = e.isHorizontal() ? i[0].offsetWidth : i[0].offsetHeight, n = e.size / e.virtualSize, o = n * (r / e.size);
                s = "auto" === e.params.scrollbar.dragSize ? r * n : parseInt(e.params.scrollbar.dragSize, 10),
                e.isHorizontal() ? a[0].style.width = s + "px" : a[0].style.height = s + "px",
                i[0].style.display = 1 <= n ? "none" : "",
                e.params.scrollbar.hide && (i[0].style.opacity = 0),
                te.extend(t, {
                    trackSize: r,
                    divider: n,
                    moveDivider: o,
                    dragSize: s
                }),
                t.$el[e.params.watchOverflow && e.isLocked ? "addClass" : "removeClass"](e.params.scrollbar.lockClass)
            }
        },
        getPointerPosition: function(e) {
            return this.isHorizontal() ? "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX || e.clientX : "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY || e.clientY
        },
        setDragPosition: function(e) {
            var t, a = this, i = a.scrollbar, s = a.rtlTranslate, r = i.$el, n = i.dragSize, o = i.trackSize, l = i.dragStartPos;
            t = (i.getPointerPosition(e) - r.offset()[a.isHorizontal() ? "left" : "top"] - (null !== l ? l : n / 2)) / (o - n),
            t = Math.max(Math.min(t, 1), 0),
            s && (t = 1 - t);
            var d = a.minTranslate() + (a.maxTranslate() - a.minTranslate()) * t;
            a.updateProgress(d),
            a.setTranslate(d),
            a.updateActiveIndex(),
            a.updateSlidesClasses()
        },
        onDragStart: function(e) {
            var t = this
              , a = t.params.scrollbar
              , i = t.scrollbar
              , s = t.$wrapperEl
              , r = i.$el
              , n = i.$dragEl;
            t.scrollbar.isTouched = !0,
            t.scrollbar.dragStartPos = e.target === n[0] || e.target === n ? i.getPointerPosition(e) - e.target.getBoundingClientRect()[t.isHorizontal() ? "left" : "top"] : null,
            e.preventDefault(),
            e.stopPropagation(),
            s.transition(100),
            n.transition(100),
            i.setDragPosition(e),
            clearTimeout(t.scrollbar.dragTimeout),
            r.transition(0),
            a.hide && r.css("opacity", 1),
            t.emit("scrollbarDragStart", e)
        },
        onDragMove: function(e) {
            var t = this.scrollbar
              , a = this.$wrapperEl
              , i = t.$el
              , s = t.$dragEl;
            this.scrollbar.isTouched && (e.preventDefault ? e.preventDefault() : e.returnValue = !1,
            t.setDragPosition(e),
            a.transition(0),
            i.transition(0),
            s.transition(0),
            this.emit("scrollbarDragMove", e))
        },
        onDragEnd: function(e) {
            var t = this
              , a = t.params.scrollbar
              , i = t.scrollbar.$el;
            t.scrollbar.isTouched && (t.scrollbar.isTouched = !1,
            a.hide && (clearTimeout(t.scrollbar.dragTimeout),
            t.scrollbar.dragTimeout = te.nextTick(function() {
                i.css("opacity", 0),
                i.transition(400)
            }, 1e3)),
            t.emit("scrollbarDragEnd", e),
            a.snapOnRelease && t.slideToClosest())
        },
        enableDraggable: function() {
            var e = this;
            if (e.params.scrollbar.el) {
                var t = e.scrollbar
                  , a = e.touchEventsTouch
                  , i = e.touchEventsDesktop
                  , s = e.params
                  , r = t.$el[0]
                  , n = !(!ae.passiveListener || !s.passiveListeners) && {
                    passive: !1,
                    capture: !1
                }
                  , o = !(!ae.passiveListener || !s.passiveListeners) && {
                    passive: !0,
                    capture: !1
                };
                ae.touch ? (r.addEventListener(a.start, e.scrollbar.onDragStart, n),
                r.addEventListener(a.move, e.scrollbar.onDragMove, n),
                r.addEventListener(a.end, e.scrollbar.onDragEnd, o)) : (r.addEventListener(i.start, e.scrollbar.onDragStart, n),
                f.addEventListener(i.move, e.scrollbar.onDragMove, n),
                f.addEventListener(i.end, e.scrollbar.onDragEnd, o))
            }
        },
        disableDraggable: function() {
            var e = this;
            if (e.params.scrollbar.el) {
                var t = e.scrollbar
                  , a = e.touchEventsTouch
                  , i = e.touchEventsDesktop
                  , s = e.params
                  , r = t.$el[0]
                  , n = !(!ae.passiveListener || !s.passiveListeners) && {
                    passive: !1,
                    capture: !1
                }
                  , o = !(!ae.passiveListener || !s.passiveListeners) && {
                    passive: !0,
                    capture: !1
                };
                ae.touch ? (r.removeEventListener(a.start, e.scrollbar.onDragStart, n),
                r.removeEventListener(a.move, e.scrollbar.onDragMove, n),
                r.removeEventListener(a.end, e.scrollbar.onDragEnd, o)) : (r.removeEventListener(i.start, e.scrollbar.onDragStart, n),
                f.removeEventListener(i.move, e.scrollbar.onDragMove, n),
                f.removeEventListener(i.end, e.scrollbar.onDragEnd, o))
            }
        },
        init: function() {
            var e = this;
            if (e.params.scrollbar.el) {
                var t = e.scrollbar
                  , a = e.$el
                  , i = e.params.scrollbar
                  , s = I(i.el);
                e.params.uniqueNavElements && "string" == typeof i.el && 1 < s.length && 1 === a.find(i.el).length && (s = a.find(i.el));
                var r = s.find("." + e.params.scrollbar.dragClass);
                0 === r.length && (r = I('<div class="' + e.params.scrollbar.dragClass + '"></div>'),
                s.append(r)),
                te.extend(t, {
                    $el: s,
                    el: s[0],
                    $dragEl: r,
                    dragEl: r[0]
                }),
                i.draggable && t.enableDraggable()
            }
        },
        destroy: function() {
            this.scrollbar.disableDraggable()
        }
    }
      , N = {
        setTransform: function(e, t) {
            var a = this.rtl
              , i = I(e)
              , s = a ? -1 : 1
              , r = i.attr("data-swiper-parallax") || "0"
              , n = i.attr("data-swiper-parallax-x")
              , o = i.attr("data-swiper-parallax-y")
              , l = i.attr("data-swiper-parallax-scale")
              , d = i.attr("data-swiper-parallax-opacity");
            if (n || o ? (n = n || "0",
            o = o || "0") : this.isHorizontal() ? (n = r,
            o = "0") : (o = r,
            n = "0"),
            n = 0 <= n.indexOf("%") ? parseInt(n, 10) * t * s + "%" : n * t * s + "px",
            o = 0 <= o.indexOf("%") ? parseInt(o, 10) * t + "%" : o * t + "px",
            null != d) {
                var p = d - (d - 1) * (1 - Math.abs(t));
                i[0].style.opacity = p
            }
            if (null == l)
                i.transform("translate3d(" + n + ", " + o + ", 0px)");
            else {
                var c = l - (l - 1) * (1 - Math.abs(t));
                i.transform("translate3d(" + n + ", " + o + ", 0px) scale(" + c + ")")
            }
        },
        setTranslate: function() {
            var i = this
              , e = i.$el
              , t = i.slides
              , s = i.progress
              , r = i.snapGrid;
            e.children("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each(function(e, t) {
                i.parallax.setTransform(t, s)
            }),
            t.each(function(e, t) {
                var a = t.progress;
                1 < i.params.slidesPerGroup && "auto" !== i.params.slidesPerView && (a += Math.ceil(e / 2) - s * (r.length - 1)),
                a = Math.min(Math.max(a, -1), 1),
                I(t).find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each(function(e, t) {
                    i.parallax.setTransform(t, a)
                })
            })
        },
        setTransition: function(s) {
            void 0 === s && (s = this.params.speed);
            this.$el.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each(function(e, t) {
                var a = I(t)
                  , i = parseInt(a.attr("data-swiper-parallax-duration"), 10) || s;
                0 === s && (i = 0),
                a.transition(i)
            })
        }
    }
      , B = {
        getDistanceBetweenTouches: function(e) {
            if (e.targetTouches.length < 2)
                return 1;
            var t = e.targetTouches[0].pageX
              , a = e.targetTouches[0].pageY
              , i = e.targetTouches[1].pageX
              , s = e.targetTouches[1].pageY;
            return Math.sqrt(Math.pow(i - t, 2) + Math.pow(s - a, 2))
        },
        onGestureStart: function(e) {
            var t = this
              , a = t.params.zoom
              , i = t.zoom
              , s = i.gesture;
            if (i.fakeGestureTouched = !1,
            i.fakeGestureMoved = !1,
            !ae.gestures) {
                if ("touchstart" !== e.type || "touchstart" === e.type && e.targetTouches.length < 2)
                    return;
                i.fakeGestureTouched = !0,
                s.scaleStart = B.getDistanceBetweenTouches(e)
            }
            s.$slideEl && s.$slideEl.length || (s.$slideEl = I(e.target).closest(".swiper-slide"),
            0 === s.$slideEl.length && (s.$slideEl = t.slides.eq(t.activeIndex)),
            s.$imageEl = s.$slideEl.find("img, svg, canvas"),
            s.$imageWrapEl = s.$imageEl.parent("." + a.containerClass),
            s.maxRatio = s.$imageWrapEl.attr("data-swiper-zoom") || a.maxRatio,
            0 !== s.$imageWrapEl.length) ? (s.$imageEl.transition(0),
            t.zoom.isScaling = !0) : s.$imageEl = void 0
        },
        onGestureChange: function(e) {
            var t = this.params.zoom
              , a = this.zoom
              , i = a.gesture;
            if (!ae.gestures) {
                if ("touchmove" !== e.type || "touchmove" === e.type && e.targetTouches.length < 2)
                    return;
                a.fakeGestureMoved = !0,
                i.scaleMove = B.getDistanceBetweenTouches(e)
            }
            i.$imageEl && 0 !== i.$imageEl.length && (a.scale = ae.gestures ? e.scale * a.currentScale : i.scaleMove / i.scaleStart * a.currentScale,
            a.scale > i.maxRatio && (a.scale = i.maxRatio - 1 + Math.pow(a.scale - i.maxRatio + 1, .5)),
            a.scale < t.minRatio && (a.scale = t.minRatio + 1 - Math.pow(t.minRatio - a.scale + 1, .5)),
            i.$imageEl.transform("translate3d(0,0,0) scale(" + a.scale + ")"))
        },
        onGestureEnd: function(e) {
            var t = this.params.zoom
              , a = this.zoom
              , i = a.gesture;
            if (!ae.gestures) {
                if (!a.fakeGestureTouched || !a.fakeGestureMoved)
                    return;
                if ("touchend" !== e.type || "touchend" === e.type && e.changedTouches.length < 2 && !g.android)
                    return;
                a.fakeGestureTouched = !1,
                a.fakeGestureMoved = !1
            }
            i.$imageEl && 0 !== i.$imageEl.length && (a.scale = Math.max(Math.min(a.scale, i.maxRatio), t.minRatio),
            i.$imageEl.transition(this.params.speed).transform("translate3d(0,0,0) scale(" + a.scale + ")"),
            a.currentScale = a.scale,
            a.isScaling = !1,
            1 === a.scale && (i.$slideEl = void 0))
        },
        onTouchStart: function(e) {
            var t = this.zoom
              , a = t.gesture
              , i = t.image;
            a.$imageEl && 0 !== a.$imageEl.length && (i.isTouched || (g.android && e.preventDefault(),
            i.isTouched = !0,
            i.touchesStart.x = "touchstart" === e.type ? e.targetTouches[0].pageX : e.pageX,
            i.touchesStart.y = "touchstart" === e.type ? e.targetTouches[0].pageY : e.pageY))
        },
        onTouchMove: function(e) {
            var t = this
              , a = t.zoom
              , i = a.gesture
              , s = a.image
              , r = a.velocity;
            if (i.$imageEl && 0 !== i.$imageEl.length && (t.allowClick = !1,
            s.isTouched && i.$slideEl)) {
                s.isMoved || (s.width = i.$imageEl[0].offsetWidth,
                s.height = i.$imageEl[0].offsetHeight,
                s.startX = te.getTranslate(i.$imageWrapEl[0], "x") || 0,
                s.startY = te.getTranslate(i.$imageWrapEl[0], "y") || 0,
                i.slideWidth = i.$slideEl[0].offsetWidth,
                i.slideHeight = i.$slideEl[0].offsetHeight,
                i.$imageWrapEl.transition(0),
                t.rtl && (s.startX = -s.startX,
                s.startY = -s.startY));
                var n = s.width * a.scale
                  , o = s.height * a.scale;
                if (!(n < i.slideWidth && o < i.slideHeight)) {
                    if (s.minX = Math.min(i.slideWidth / 2 - n / 2, 0),
                    s.maxX = -s.minX,
                    s.minY = Math.min(i.slideHeight / 2 - o / 2, 0),
                    s.maxY = -s.minY,
                    s.touchesCurrent.x = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX,
                    s.touchesCurrent.y = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY,
                    !s.isMoved && !a.isScaling) {
                        if (t.isHorizontal() && (Math.floor(s.minX) === Math.floor(s.startX) && s.touchesCurrent.x < s.touchesStart.x || Math.floor(s.maxX) === Math.floor(s.startX) && s.touchesCurrent.x > s.touchesStart.x))
                            return void (s.isTouched = !1);
                        if (!t.isHorizontal() && (Math.floor(s.minY) === Math.floor(s.startY) && s.touchesCurrent.y < s.touchesStart.y || Math.floor(s.maxY) === Math.floor(s.startY) && s.touchesCurrent.y > s.touchesStart.y))
                            return void (s.isTouched = !1)
                    }
                    e.preventDefault(),
                    e.stopPropagation(),
                    s.isMoved = !0,
                    s.currentX = s.touchesCurrent.x - s.touchesStart.x + s.startX,
                    s.currentY = s.touchesCurrent.y - s.touchesStart.y + s.startY,
                    s.currentX < s.minX && (s.currentX = s.minX + 1 - Math.pow(s.minX - s.currentX + 1, .8)),
                    s.currentX > s.maxX && (s.currentX = s.maxX - 1 + Math.pow(s.currentX - s.maxX + 1, .8)),
                    s.currentY < s.minY && (s.currentY = s.minY + 1 - Math.pow(s.minY - s.currentY + 1, .8)),
                    s.currentY > s.maxY && (s.currentY = s.maxY - 1 + Math.pow(s.currentY - s.maxY + 1, .8)),
                    r.prevPositionX || (r.prevPositionX = s.touchesCurrent.x),
                    r.prevPositionY || (r.prevPositionY = s.touchesCurrent.y),
                    r.prevTime || (r.prevTime = Date.now()),
                    r.x = (s.touchesCurrent.x - r.prevPositionX) / (Date.now() - r.prevTime) / 2,
                    r.y = (s.touchesCurrent.y - r.prevPositionY) / (Date.now() - r.prevTime) / 2,
                    Math.abs(s.touchesCurrent.x - r.prevPositionX) < 2 && (r.x = 0),
                    Math.abs(s.touchesCurrent.y - r.prevPositionY) < 2 && (r.y = 0),
                    r.prevPositionX = s.touchesCurrent.x,
                    r.prevPositionY = s.touchesCurrent.y,
                    r.prevTime = Date.now(),
                    i.$imageWrapEl.transform("translate3d(" + s.currentX + "px, " + s.currentY + "px,0)")
                }
            }
        },
        onTouchEnd: function() {
            var e = this.zoom
              , t = e.gesture
              , a = e.image
              , i = e.velocity;
            if (t.$imageEl && 0 !== t.$imageEl.length) {
                if (!a.isTouched || !a.isMoved)
                    return a.isTouched = !1,
                    void (a.isMoved = !1);
                a.isTouched = !1,
                a.isMoved = !1;
                var s = 300
                  , r = 300
                  , n = i.x * s
                  , o = a.currentX + n
                  , l = i.y * r
                  , d = a.currentY + l;
                0 !== i.x && (s = Math.abs((o - a.currentX) / i.x)),
                0 !== i.y && (r = Math.abs((d - a.currentY) / i.y));
                var p = Math.max(s, r);
                a.currentX = o,
                a.currentY = d;
                var c = a.width * e.scale
                  , u = a.height * e.scale;
                a.minX = Math.min(t.slideWidth / 2 - c / 2, 0),
                a.maxX = -a.minX,
                a.minY = Math.min(t.slideHeight / 2 - u / 2, 0),
                a.maxY = -a.minY,
                a.currentX = Math.max(Math.min(a.currentX, a.maxX), a.minX),
                a.currentY = Math.max(Math.min(a.currentY, a.maxY), a.minY),
                t.$imageWrapEl.transition(p).transform("translate3d(" + a.currentX + "px, " + a.currentY + "px,0)")
            }
        },
        onTransitionEnd: function() {
            var e = this.zoom
              , t = e.gesture;
            t.$slideEl && this.previousIndex !== this.activeIndex && (t.$imageEl.transform("translate3d(0,0,0) scale(1)"),
            t.$imageWrapEl.transform("translate3d(0,0,0)"),
            e.scale = 1,
            e.currentScale = 1,
            t.$slideEl = void 0,
            t.$imageEl = void 0,
            t.$imageWrapEl = void 0)
        },
        toggle: function(e) {
            var t = this.zoom;
            t.scale && 1 !== t.scale ? t.out() : t.in(e)
        },
        in: function(e) {
            var t, a, i, s, r, n, o, l, d, p, c, u, h, v, f, m, g = this, b = g.zoom, w = g.params.zoom, y = b.gesture, x = b.image;
            y.$slideEl || (y.$slideEl = g.clickedSlide ? I(g.clickedSlide) : g.slides.eq(g.activeIndex),
            y.$imageEl = y.$slideEl.find("img, svg, canvas"),
            y.$imageWrapEl = y.$imageEl.parent("." + w.containerClass)),
            y.$imageEl && 0 !== y.$imageEl.length && (y.$slideEl.addClass("" + w.zoomedSlideClass),
            a = void 0 === x.touchesStart.x && e ? (t = "touchend" === e.type ? e.changedTouches[0].pageX : e.pageX,
            "touchend" === e.type ? e.changedTouches[0].pageY : e.pageY) : (t = x.touchesStart.x,
            x.touchesStart.y),
            b.scale = y.$imageWrapEl.attr("data-swiper-zoom") || w.maxRatio,
            b.currentScale = y.$imageWrapEl.attr("data-swiper-zoom") || w.maxRatio,
            e ? (f = y.$slideEl[0].offsetWidth,
            m = y.$slideEl[0].offsetHeight,
            i = y.$slideEl.offset().left + f / 2 - t,
            s = y.$slideEl.offset().top + m / 2 - a,
            o = y.$imageEl[0].offsetWidth,
            l = y.$imageEl[0].offsetHeight,
            d = o * b.scale,
            p = l * b.scale,
            h = -(c = Math.min(f / 2 - d / 2, 0)),
            v = -(u = Math.min(m / 2 - p / 2, 0)),
            (r = i * b.scale) < c && (r = c),
            h < r && (r = h),
            (n = s * b.scale) < u && (n = u),
            v < n && (n = v)) : n = r = 0,
            y.$imageWrapEl.transition(300).transform("translate3d(" + r + "px, " + n + "px,0)"),
            y.$imageEl.transition(300).transform("translate3d(0,0,0) scale(" + b.scale + ")"))
        },
        out: function() {
            var e = this
              , t = e.zoom
              , a = e.params.zoom
              , i = t.gesture;
            i.$slideEl || (i.$slideEl = e.clickedSlide ? I(e.clickedSlide) : e.slides.eq(e.activeIndex),
            i.$imageEl = i.$slideEl.find("img, svg, canvas"),
            i.$imageWrapEl = i.$imageEl.parent("." + a.containerClass)),
            i.$imageEl && 0 !== i.$imageEl.length && (t.scale = 1,
            t.currentScale = 1,
            i.$imageWrapEl.transition(300).transform("translate3d(0,0,0)"),
            i.$imageEl.transition(300).transform("translate3d(0,0,0) scale(1)"),
            i.$slideEl.removeClass("" + a.zoomedSlideClass),
            i.$slideEl = void 0)
        },
        enable: function() {
            var e = this
              , t = e.zoom;
            if (!t.enabled) {
                t.enabled = !0;
                var a = !("touchstart" !== e.touchEvents.start || !ae.passiveListener || !e.params.passiveListeners) && {
                    passive: !0,
                    capture: !1
                };
                ae.gestures ? (e.$wrapperEl.on("gesturestart", ".swiper-slide", t.onGestureStart, a),
                e.$wrapperEl.on("gesturechange", ".swiper-slide", t.onGestureChange, a),
                e.$wrapperEl.on("gestureend", ".swiper-slide", t.onGestureEnd, a)) : "touchstart" === e.touchEvents.start && (e.$wrapperEl.on(e.touchEvents.start, ".swiper-slide", t.onGestureStart, a),
                e.$wrapperEl.on(e.touchEvents.move, ".swiper-slide", t.onGestureChange, a),
                e.$wrapperEl.on(e.touchEvents.end, ".swiper-slide", t.onGestureEnd, a)),
                e.$wrapperEl.on(e.touchEvents.move, "." + e.params.zoom.containerClass, t.onTouchMove)
            }
        },
        disable: function() {
            var e = this
              , t = e.zoom;
            if (t.enabled) {
                e.zoom.enabled = !1;
                var a = !("touchstart" !== e.touchEvents.start || !ae.passiveListener || !e.params.passiveListeners) && {
                    passive: !0,
                    capture: !1
                };
                ae.gestures ? (e.$wrapperEl.off("gesturestart", ".swiper-slide", t.onGestureStart, a),
                e.$wrapperEl.off("gesturechange", ".swiper-slide", t.onGestureChange, a),
                e.$wrapperEl.off("gestureend", ".swiper-slide", t.onGestureEnd, a)) : "touchstart" === e.touchEvents.start && (e.$wrapperEl.off(e.touchEvents.start, ".swiper-slide", t.onGestureStart, a),
                e.$wrapperEl.off(e.touchEvents.move, ".swiper-slide", t.onGestureChange, a),
                e.$wrapperEl.off(e.touchEvents.end, ".swiper-slide", t.onGestureEnd, a)),
                e.$wrapperEl.off(e.touchEvents.move, "." + e.params.zoom.containerClass, t.onTouchMove)
            }
        }
    }
      , X = {
        loadInSlide: function(e, l) {
            void 0 === l && (l = !0);
            var d = this
              , p = d.params.lazy;
            if (void 0 !== e && 0 !== d.slides.length) {
                var c = d.virtual && d.params.virtual.enabled ? d.$wrapperEl.children("." + d.params.slideClass + '[data-swiper-slide-index="' + e + '"]') : d.slides.eq(e)
                  , t = c.find("." + p.elementClass + ":not(." + p.loadedClass + "):not(." + p.loadingClass + ")");
                !c.hasClass(p.elementClass) || c.hasClass(p.loadedClass) || c.hasClass(p.loadingClass) || (t = t.add(c[0])),
                0 !== t.length && t.each(function(e, t) {
                    var i = I(t);
                    i.addClass(p.loadingClass);
                    var s = i.attr("data-background")
                      , r = i.attr("data-src")
                      , n = i.attr("data-srcset")
                      , o = i.attr("data-sizes");
                    d.loadImage(i[0], r || s, n, o, !1, function() {
                        if (null != d && d && (!d || d.params) && !d.destroyed) {
                            if (s ? (i.css("background-image", 'url("' + s + '")'),
                            i.removeAttr("data-background")) : (n && (i.attr("srcset", n),
                            i.removeAttr("data-srcset")),
                            o && (i.attr("sizes", o),
                            i.removeAttr("data-sizes")),
                            r && (i.attr("src", r),
                            i.removeAttr("data-src"))),
                            i.addClass(p.loadedClass).removeClass(p.loadingClass),
                            c.find("." + p.preloaderClass).remove(),
                            d.params.loop && l) {
                                var e = c.attr("data-swiper-slide-index");
                                if (c.hasClass(d.params.slideDuplicateClass)) {
                                    var t = d.$wrapperEl.children('[data-swiper-slide-index="' + e + '"]:not(.' + d.params.slideDuplicateClass + ")");
                                    d.lazy.loadInSlide(t.index(), !1)
                                } else {
                                    var a = d.$wrapperEl.children("." + d.params.slideDuplicateClass + '[data-swiper-slide-index="' + e + '"]');
                                    d.lazy.loadInSlide(a.index(), !1)
                                }
                            }
                            d.emit("lazyImageReady", c[0], i[0])
                        }
                    }),
                    d.emit("lazyImageLoad", c[0], i[0])
                })
            }
        },
        load: function() {
            var i = this
              , t = i.$wrapperEl
              , a = i.params
              , s = i.slides
              , e = i.activeIndex
              , r = i.virtual && a.virtual.enabled
              , n = a.lazy
              , o = a.slidesPerView;
            function l(e) {
                if (r) {
                    if (t.children("." + a.slideClass + '[data-swiper-slide-index="' + e + '"]').length)
                        return !0
                } else if (s[e])
                    return !0;
                return !1
            }
            function d(e) {
                return r ? I(e).attr("data-swiper-slide-index") : I(e).index()
            }
            if ("auto" === o && (o = 0),
            i.lazy.initialImageLoaded || (i.lazy.initialImageLoaded = !0),
            i.params.watchSlidesVisibility)
                t.children("." + a.slideVisibleClass).each(function(e, t) {
                    var a = r ? I(t).attr("data-swiper-slide-index") : I(t).index();
                    i.lazy.loadInSlide(a)
                });
            else if (1 < o)
                for (var p = e; p < e + o; p += 1)
                    l(p) && i.lazy.loadInSlide(p);
            else
                i.lazy.loadInSlide(e);
            if (n.loadPrevNext)
                if (1 < o || n.loadPrevNextAmount && 1 < n.loadPrevNextAmount) {
                    for (var c = n.loadPrevNextAmount, u = o, h = Math.min(e + u + Math.max(c, u), s.length), v = Math.max(e - Math.max(u, c), 0), f = e + o; f < h; f += 1)
                        l(f) && i.lazy.loadInSlide(f);
                    for (var m = v; m < e; m += 1)
                        l(m) && i.lazy.loadInSlide(m)
                } else {
                    var g = t.children("." + a.slideNextClass);
                    0 < g.length && i.lazy.loadInSlide(d(g));
                    var b = t.children("." + a.slidePrevClass);
                    0 < b.length && i.lazy.loadInSlide(d(b))
                }
        }
    }
      , V = {
        LinearSpline: function(e, t) {
            var a, i, s, r, n, o = function(e, t) {
                for (i = -1,
                a = e.length; 1 < a - i; )
                    e[s = a + i >> 1] <= t ? i = s : a = s;
                return a
            };
            return this.x = e,
            this.y = t,
            this.lastIndex = e.length - 1,
            this.interpolate = function(e) {
                return e ? (n = o(this.x, e),
                r = n - 1,
                (e - this.x[r]) * (this.y[n] - this.y[r]) / (this.x[n] - this.x[r]) + this.y[r]) : 0
            }
            ,
            this
        },
        getInterpolateFunction: function(e) {
            var t = this;
            t.controller.spline || (t.controller.spline = t.params.loop ? new V.LinearSpline(t.slidesGrid,e.slidesGrid) : new V.LinearSpline(t.snapGrid,e.snapGrid))
        },
        setTranslate: function(e, t) {
            var a, i, s = this, r = s.controller.control;
            function n(e) {
                var t = s.rtlTranslate ? -s.translate : s.translate;
                "slide" === s.params.controller.by && (s.controller.getInterpolateFunction(e),
                i = -s.controller.spline.interpolate(-t)),
                i && "container" !== s.params.controller.by || (a = (e.maxTranslate() - e.minTranslate()) / (s.maxTranslate() - s.minTranslate()),
                i = (t - s.minTranslate()) * a + e.minTranslate()),
                s.params.controller.inverse && (i = e.maxTranslate() - i),
                e.updateProgress(i),
                e.setTranslate(i, s),
                e.updateActiveIndex(),
                e.updateSlidesClasses()
            }
            if (Array.isArray(r))
                for (var o = 0; o < r.length; o += 1)
                    r[o] !== t && r[o]instanceof T && n(r[o]);
            else
                r instanceof T && t !== r && n(r)
        },
        setTransition: function(t, e) {
            var a, i = this, s = i.controller.control;
            function r(e) {
                e.setTransition(t, i),
                0 !== t && (e.transitionStart(),
                e.params.autoHeight && te.nextTick(function() {
                    e.updateAutoHeight()
                }),
                e.$wrapperEl.transitionEnd(function() {
                    s && (e.params.loop && "slide" === i.params.controller.by && e.loopFix(),
                    e.transitionEnd())
                }))
            }
            if (Array.isArray(s))
                for (a = 0; a < s.length; a += 1)
                    s[a] !== e && s[a]instanceof T && r(s[a]);
            else
                s instanceof T && e !== s && r(s)
        }
    }
      , Y = {
        makeElFocusable: function(e) {
            return e.attr("tabIndex", "0"),
            e
        },
        addElRole: function(e, t) {
            return e.attr("role", t),
            e
        },
        addElLabel: function(e, t) {
            return e.attr("aria-label", t),
            e
        },
        disableEl: function(e) {
            return e.attr("aria-disabled", !0),
            e
        },
        enableEl: function(e) {
            return e.attr("aria-disabled", !1),
            e
        },
        onEnterKey: function(e) {
            var t = this
              , a = t.params.a11y;
            if (13 === e.keyCode) {
                var i = I(e.target);
                t.navigation && t.navigation.$nextEl && i.is(t.navigation.$nextEl) && (t.isEnd && !t.params.loop || t.slideNext(),
                t.isEnd ? t.a11y.notify(a.lastSlideMessage) : t.a11y.notify(a.nextSlideMessage)),
                t.navigation && t.navigation.$prevEl && i.is(t.navigation.$prevEl) && (t.isBeginning && !t.params.loop || t.slidePrev(),
                t.isBeginning ? t.a11y.notify(a.firstSlideMessage) : t.a11y.notify(a.prevSlideMessage)),
                t.pagination && i.is("." + t.params.pagination.bulletClass) && i[0].click()
            }
        },
        notify: function(e) {
            var t = this.a11y.liveRegion;
            0 !== t.length && (t.html(""),
            t.html(e))
        },
        updateNavigation: function() {
            var e = this;
            if (!e.params.loop) {
                var t = e.navigation
                  , a = t.$nextEl
                  , i = t.$prevEl;
                i && 0 < i.length && (e.isBeginning ? e.a11y.disableEl(i) : e.a11y.enableEl(i)),
                a && 0 < a.length && (e.isEnd ? e.a11y.disableEl(a) : e.a11y.enableEl(a))
            }
        },
        updatePagination: function() {
            var i = this
              , s = i.params.a11y;
            i.pagination && i.params.pagination.clickable && i.pagination.bullets && i.pagination.bullets.length && i.pagination.bullets.each(function(e, t) {
                var a = I(t);
                i.a11y.makeElFocusable(a),
                i.a11y.addElRole(a, "button"),
                i.a11y.addElLabel(a, s.paginationBulletMessage.replace(/{{index}}/, a.index() + 1))
            })
        },
        init: function() {
            var e = this;
            e.$el.append(e.a11y.liveRegion);
            var t, a, i = e.params.a11y;
            e.navigation && e.navigation.$nextEl && (t = e.navigation.$nextEl),
            e.navigation && e.navigation.$prevEl && (a = e.navigation.$prevEl),
            t && (e.a11y.makeElFocusable(t),
            e.a11y.addElRole(t, "button"),
            e.a11y.addElLabel(t, i.nextSlideMessage),
            t.on("keydown", e.a11y.onEnterKey)),
            a && (e.a11y.makeElFocusable(a),
            e.a11y.addElRole(a, "button"),
            e.a11y.addElLabel(a, i.prevSlideMessage),
            a.on("keydown", e.a11y.onEnterKey)),
            e.pagination && e.params.pagination.clickable && e.pagination.bullets && e.pagination.bullets.length && e.pagination.$el.on("keydown", "." + e.params.pagination.bulletClass, e.a11y.onEnterKey)
        },
        destroy: function() {
            var e, t, a = this;
            a.a11y.liveRegion && 0 < a.a11y.liveRegion.length && a.a11y.liveRegion.remove(),
            a.navigation && a.navigation.$nextEl && (e = a.navigation.$nextEl),
            a.navigation && a.navigation.$prevEl && (t = a.navigation.$prevEl),
            e && e.off("keydown", a.a11y.onEnterKey),
            t && t.off("keydown", a.a11y.onEnterKey),
            a.pagination && a.params.pagination.clickable && a.pagination.bullets && a.pagination.bullets.length && a.pagination.$el.off("keydown", "." + a.params.pagination.bulletClass, a.a11y.onEnterKey)
        }
    }
      , F = {
        init: function() {
            var e = this;
            if (e.params.history) {
                if (!ee.history || !ee.history.pushState)
                    return e.params.history.enabled = !1,
                    void (e.params.hashNavigation.enabled = !0);
                var t = e.history;
                t.initialized = !0,
                t.paths = F.getPathValues(),
                (t.paths.key || t.paths.value) && (t.scrollToSlide(0, t.paths.value, e.params.runCallbacksOnInit),
                e.params.history.replaceState || ee.addEventListener("popstate", e.history.setHistoryPopState))
            }
        },
        destroy: function() {
            this.params.history.replaceState || ee.removeEventListener("popstate", this.history.setHistoryPopState)
        },
        setHistoryPopState: function() {
            this.history.paths = F.getPathValues(),
            this.history.scrollToSlide(this.params.speed, this.history.paths.value, !1)
        },
        getPathValues: function() {
            var e = ee.location.pathname.slice(1).split("/").filter(function(e) {
                return "" !== e
            })
              , t = e.length;
            return {
                key: e[t - 2],
                value: e[t - 1]
            }
        },
        setHistory: function(e, t) {
            if (this.history.initialized && this.params.history.enabled) {
                var a = this.slides.eq(t)
                  , i = F.slugify(a.attr("data-history"));
                ee.location.pathname.includes(e) || (i = e + "/" + i);
                var s = ee.history.state;
                s && s.value === i || (this.params.history.replaceState ? ee.history.replaceState({
                    value: i
                }, null, i) : ee.history.pushState({
                    value: i
                }, null, i))
            }
        },
        slugify: function(e) {
            return e.toString().replace(/\s+/g, "-").replace(/[^\w-]+/g, "").replace(/--+/g, "-").replace(/^-+/, "").replace(/-+$/, "")
        },
        scrollToSlide: function(e, t, a) {
            var i = this;
            if (t)
                for (var s = 0, r = i.slides.length; s < r; s += 1) {
                    var n = i.slides.eq(s);
                    if (F.slugify(n.attr("data-history")) === t && !n.hasClass(i.params.slideDuplicateClass)) {
                        var o = n.index();
                        i.slideTo(o, e, a)
                    }
                }
            else
                i.slideTo(0, e, a)
        }
    }
      , R = {
        onHashCange: function() {
            var e = this
              , t = f.location.hash.replace("#", "");
            if (t !== e.slides.eq(e.activeIndex).attr("data-hash")) {
                var a = e.$wrapperEl.children("." + e.params.slideClass + '[data-hash="' + t + '"]').index();
                if (void 0 === a)
                    return;
                e.slideTo(a)
            }
        },
        setHash: function() {
            var e = this;
            if (e.hashNavigation.initialized && e.params.hashNavigation.enabled)
                if (e.params.hashNavigation.replaceState && ee.history && ee.history.replaceState)
                    ee.history.replaceState(null, null, "#" + e.slides.eq(e.activeIndex).attr("data-hash") || "");
                else {
                    var t = e.slides.eq(e.activeIndex)
                      , a = t.attr("data-hash") || t.attr("data-history");
                    f.location.hash = a || ""
                }
        },
        init: function() {
            var e = this;
            if (!(!e.params.hashNavigation.enabled || e.params.history && e.params.history.enabled)) {
                e.hashNavigation.initialized = !0;
                var t = f.location.hash.replace("#", "");
                if (t)
                    for (var a = 0, i = e.slides.length; a < i; a += 1) {
                        var s = e.slides.eq(a);
                        if ((s.attr("data-hash") || s.attr("data-history")) === t && !s.hasClass(e.params.slideDuplicateClass)) {
                            var r = s.index();
                            e.slideTo(r, 0, e.params.runCallbacksOnInit, !0)
                        }
                    }
                e.params.hashNavigation.watchState && I(ee).on("hashchange", e.hashNavigation.onHashCange)
            }
        },
        destroy: function() {
            this.params.hashNavigation.watchState && I(ee).off("hashchange", this.hashNavigation.onHashCange)
        }
    }
      , q = {
        run: function() {
            var e = this
              , t = e.slides.eq(e.activeIndex)
              , a = e.params.autoplay.delay;
            t.attr("data-swiper-autoplay") && (a = t.attr("data-swiper-autoplay") || e.params.autoplay.delay),
            clearTimeout(e.autoplay.timeout),
            e.autoplay.timeout = te.nextTick(function() {
                e.params.autoplay.reverseDirection ? e.params.loop ? (e.loopFix(),
                e.slidePrev(e.params.speed, !0, !0),
                e.emit("autoplay")) : e.isBeginning ? e.params.autoplay.stopOnLastSlide ? e.autoplay.stop() : (e.slideTo(e.slides.length - 1, e.params.speed, !0, !0),
                e.emit("autoplay")) : (e.slidePrev(e.params.speed, !0, !0),
                e.emit("autoplay")) : e.params.loop ? (e.loopFix(),
                e.slideNext(e.params.speed, !0, !0),
                e.emit("autoplay")) : e.isEnd ? e.params.autoplay.stopOnLastSlide ? e.autoplay.stop() : (e.slideTo(0, e.params.speed, !0, !0),
                e.emit("autoplay")) : (e.slideNext(e.params.speed, !0, !0),
                e.emit("autoplay"))
            }, a)
        },
        start: function() {
            var e = this;
            return void 0 === e.autoplay.timeout && (!e.autoplay.running && (e.autoplay.running = !0,
            e.emit("autoplayStart"),
            e.autoplay.run(),
            !0))
        },
        stop: function() {
            var e = this;
            return !!e.autoplay.running && (void 0 !== e.autoplay.timeout && (e.autoplay.timeout && (clearTimeout(e.autoplay.timeout),
            e.autoplay.timeout = void 0),
            e.autoplay.running = !1,
            e.emit("autoplayStop"),
            !0))
        },
        pause: function(e) {
            var t = this;
            t.autoplay.running && (t.autoplay.paused || (t.autoplay.timeout && clearTimeout(t.autoplay.timeout),
            t.autoplay.paused = !0,
            0 !== e && t.params.autoplay.waitForTransition ? (t.$wrapperEl[0].addEventListener("transitionend", t.autoplay.onTransitionEnd),
            t.$wrapperEl[0].addEventListener("webkitTransitionEnd", t.autoplay.onTransitionEnd)) : (t.autoplay.paused = !1,
            t.autoplay.run())))
        }
    }
      , W = {
        setTranslate: function() {
            for (var e = this, t = e.slides, a = 0; a < t.length; a += 1) {
                var i = e.slides.eq(a)
                  , s = -i[0].swiperSlideOffset;
                e.params.virtualTranslate || (s -= e.translate);
                var r = 0;
                e.isHorizontal() || (r = s,
                s = 0);
                var n = e.params.fadeEffect.crossFade ? Math.max(1 - Math.abs(i[0].progress), 0) : 1 + Math.min(Math.max(i[0].progress, -1), 0);
                i.css({
                    opacity: n
                }).transform("translate3d(" + s + "px, " + r + "px, 0px)")
            }
        },
        setTransition: function(e) {
            var a = this
              , t = a.slides
              , i = a.$wrapperEl;
            if (t.transition(e),
            a.params.virtualTranslate && 0 !== e) {
                var s = !1;
                t.transitionEnd(function() {
                    if (!s && a && !a.destroyed) {
                        s = !0,
                        a.animating = !1;
                        for (var e = ["webkitTransitionEnd", "transitionend"], t = 0; t < e.length; t += 1)
                            i.trigger(e[t])
                    }
                })
            }
        }
    }
      , j = {
        setTranslate: function() {
            var e, t = this, a = t.$el, i = t.$wrapperEl, s = t.slides, r = t.width, n = t.height, o = t.rtlTranslate, l = t.size, d = t.params.cubeEffect, p = t.isHorizontal(), c = t.virtual && t.params.virtual.enabled, u = 0;
            d.shadow && (p ? (0 === (e = i.find(".swiper-cube-shadow")).length && (e = I('<div class="swiper-cube-shadow"></div>'),
            i.append(e)),
            e.css({
                height: r + "px"
            })) : 0 === (e = a.find(".swiper-cube-shadow")).length && (e = I('<div class="swiper-cube-shadow"></div>'),
            a.append(e)));
            for (var h = 0; h < s.length; h += 1) {
                var v = s.eq(h)
                  , f = h;
                c && (f = parseInt(v.attr("data-swiper-slide-index"), 10));
                var m = 90 * f
                  , g = Math.floor(m / 360);
                o && (m = -m,
                g = Math.floor(-m / 360));
                var b = Math.max(Math.min(v[0].progress, 1), -1)
                  , w = 0
                  , y = 0
                  , x = 0;
                f % 4 == 0 ? (w = 4 * -g * l,
                x = 0) : (f - 1) % 4 == 0 ? (w = 0,
                x = 4 * -g * l) : (f - 2) % 4 == 0 ? (w = l + 4 * g * l,
                x = l) : (f - 3) % 4 == 0 && (w = -l,
                x = 3 * l + 4 * l * g),
                o && (w = -w),
                p || (y = w,
                w = 0);
                var T = "rotateX(" + (p ? 0 : -m) + "deg) rotateY(" + (p ? m : 0) + "deg) translate3d(" + w + "px, " + y + "px, " + x + "px)";
                if (b <= 1 && -1 < b && (u = 90 * f + 90 * b,
                o && (u = 90 * -f - 90 * b)),
                v.transform(T),
                d.slideShadows) {
                    var E = p ? v.find(".swiper-slide-shadow-left") : v.find(".swiper-slide-shadow-top")
                      , S = p ? v.find(".swiper-slide-shadow-right") : v.find(".swiper-slide-shadow-bottom");
                    0 === E.length && (E = I('<div class="swiper-slide-shadow-' + (p ? "left" : "top") + '"></div>'),
                    v.append(E)),
                    0 === S.length && (S = I('<div class="swiper-slide-shadow-' + (p ? "right" : "bottom") + '"></div>'),
                    v.append(S)),
                    E.length && (E[0].style.opacity = Math.max(-b, 0)),
                    S.length && (S[0].style.opacity = Math.max(b, 0))
                }
            }
            if (i.css({
                "-webkit-transform-origin": "50% 50% -" + l / 2 + "px",
                "-moz-transform-origin": "50% 50% -" + l / 2 + "px",
                "-ms-transform-origin": "50% 50% -" + l / 2 + "px",
                "transform-origin": "50% 50% -" + l / 2 + "px"
            }),
            d.shadow)
                if (p)
                    e.transform("translate3d(0px, " + (r / 2 + d.shadowOffset) + "px, " + -r / 2 + "px) rotateX(90deg) rotateZ(0deg) scale(" + d.shadowScale + ")");
                else {
                    var C = Math.abs(u) - 90 * Math.floor(Math.abs(u) / 90)
                      , M = 1.5 - (Math.sin(2 * C * Math.PI / 360) / 2 + Math.cos(2 * C * Math.PI / 360) / 2)
                      , P = d.shadowScale
                      , k = d.shadowScale / M
                      , z = d.shadowOffset;
                    e.transform("scale3d(" + P + ", 1, " + k + ") translate3d(0px, " + (n / 2 + z) + "px, " + -n / 2 / k + "px) rotateX(-90deg)")
                }
            var $ = ie.isSafari || ie.isUiWebView ? -l / 2 : 0;
            i.transform("translate3d(0px,0," + $ + "px) rotateX(" + (t.isHorizontal() ? 0 : u) + "deg) rotateY(" + (t.isHorizontal() ? -u : 0) + "deg)")
        },
        setTransition: function(e) {
            var t = this.$el;
            this.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e),
            this.params.cubeEffect.shadow && !this.isHorizontal() && t.find(".swiper-cube-shadow").transition(e)
        }
    }
      , U = {
        setTranslate: function() {
            for (var e = this, t = e.slides, a = e.rtlTranslate, i = 0; i < t.length; i += 1) {
                var s = t.eq(i)
                  , r = s[0].progress;
                e.params.flipEffect.limitRotation && (r = Math.max(Math.min(s[0].progress, 1), -1));
                var n = -180 * r
                  , o = 0
                  , l = -s[0].swiperSlideOffset
                  , d = 0;
                if (e.isHorizontal() ? a && (n = -n) : (d = l,
                o = -n,
                n = l = 0),
                s[0].style.zIndex = -Math.abs(Math.round(r)) + t.length,
                e.params.flipEffect.slideShadows) {
                    var p = e.isHorizontal() ? s.find(".swiper-slide-shadow-left") : s.find(".swiper-slide-shadow-top")
                      , c = e.isHorizontal() ? s.find(".swiper-slide-shadow-right") : s.find(".swiper-slide-shadow-bottom");
                    0 === p.length && (p = I('<div class="swiper-slide-shadow-' + (e.isHorizontal() ? "left" : "top") + '"></div>'),
                    s.append(p)),
                    0 === c.length && (c = I('<div class="swiper-slide-shadow-' + (e.isHorizontal() ? "right" : "bottom") + '"></div>'),
                    s.append(c)),
                    p.length && (p[0].style.opacity = Math.max(-r, 0)),
                    c.length && (c[0].style.opacity = Math.max(r, 0))
                }
                s.transform("translate3d(" + l + "px, " + d + "px, 0px) rotateX(" + o + "deg) rotateY(" + n + "deg)")
            }
        },
        setTransition: function(e) {
            var a = this
              , t = a.slides
              , i = a.activeIndex
              , s = a.$wrapperEl;
            if (t.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e),
            a.params.virtualTranslate && 0 !== e) {
                var r = !1;
                t.eq(i).transitionEnd(function() {
                    if (!r && a && !a.destroyed) {
                        r = !0,
                        a.animating = !1;
                        for (var e = ["webkitTransitionEnd", "transitionend"], t = 0; t < e.length; t += 1)
                            s.trigger(e[t])
                    }
                })
            }
        }
    }
      , K = {
        setTranslate: function() {
            for (var e = this, t = e.width, a = e.height, i = e.slides, s = e.$wrapperEl, r = e.slidesSizesGrid, n = e.params.coverflowEffect, o = e.isHorizontal(), l = e.translate, d = o ? t / 2 - l : a / 2 - l, p = o ? n.rotate : -n.rotate, c = n.depth, u = 0, h = i.length; u < h; u += 1) {
                var v = i.eq(u)
                  , f = r[u]
                  , m = (d - v[0].swiperSlideOffset - f / 2) / f * n.modifier
                  , g = o ? p * m : 0
                  , b = o ? 0 : p * m
                  , w = -c * Math.abs(m)
                  , y = o ? 0 : n.stretch * m
                  , x = o ? n.stretch * m : 0;
                Math.abs(x) < .001 && (x = 0),
                Math.abs(y) < .001 && (y = 0),
                Math.abs(w) < .001 && (w = 0),
                Math.abs(g) < .001 && (g = 0),
                Math.abs(b) < .001 && (b = 0);
                var T = "translate3d(" + x + "px," + y + "px," + w + "px)  rotateX(" + b + "deg) rotateY(" + g + "deg)";
                if (v.transform(T),
                v[0].style.zIndex = 1 - Math.abs(Math.round(m)),
                n.slideShadows) {
                    var E = o ? v.find(".swiper-slide-shadow-left") : v.find(".swiper-slide-shadow-top")
                      , S = o ? v.find(".swiper-slide-shadow-right") : v.find(".swiper-slide-shadow-bottom");
                    0 === E.length && (E = I('<div class="swiper-slide-shadow-' + (o ? "left" : "top") + '"></div>'),
                    v.append(E)),
                    0 === S.length && (S = I('<div class="swiper-slide-shadow-' + (o ? "right" : "bottom") + '"></div>'),
                    v.append(S)),
                    E.length && (E[0].style.opacity = 0 < m ? m : 0),
                    S.length && (S[0].style.opacity = 0 < -m ? -m : 0)
                }
            }
            (ae.pointerEvents || ae.prefixedPointerEvents) && (s[0].style.perspectiveOrigin = d + "px 50%")
        },
        setTransition: function(e) {
            this.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e)
        }
    }
      , _ = {
        init: function() {
            var e = this
              , t = e.params.thumbs
              , a = e.constructor;
            t.swiper instanceof a ? (e.thumbs.swiper = t.swiper,
            te.extend(e.thumbs.swiper.originalParams, {
                watchSlidesProgress: !0,
                slideToClickedSlide: !1
            }),
            te.extend(e.thumbs.swiper.params, {
                watchSlidesProgress: !0,
                slideToClickedSlide: !1
            })) : te.isObject(t.swiper) && (e.thumbs.swiper = new a(te.extend({}, t.swiper, {
                watchSlidesVisibility: !0,
                watchSlidesProgress: !0,
                slideToClickedSlide: !1
            })),
            e.thumbs.swiperCreated = !0),
            e.thumbs.swiper.$el.addClass(e.params.thumbs.thumbsContainerClass),
            e.thumbs.swiper.on("tap", e.thumbs.onThumbClick)
        },
        onThumbClick: function() {
            var e = this
              , t = e.thumbs.swiper;
            if (t) {
                var a = t.clickedIndex
                  , i = t.clickedSlide;
                if (!(i && I(i).hasClass(e.params.thumbs.slideThumbActiveClass) || null == a)) {
                    var s;
                    if (s = t.params.loop ? parseInt(I(t.clickedSlide).attr("data-swiper-slide-index"), 10) : a,
                    e.params.loop) {
                        var r = e.activeIndex;
                        e.slides.eq(r).hasClass(e.params.slideDuplicateClass) && (e.loopFix(),
                        e._clientLeft = e.$wrapperEl[0].clientLeft,
                        r = e.activeIndex);
                        var n = e.slides.eq(r).prevAll('[data-swiper-slide-index="' + s + '"]').eq(0).index()
                          , o = e.slides.eq(r).nextAll('[data-swiper-slide-index="' + s + '"]').eq(0).index();
                        s = void 0 === n ? o : void 0 === o ? n : o - r < r - n ? o : n
                    }
                    e.slideTo(s)
                }
            }
        },
        update: function(e) {
            var t = this
              , a = t.thumbs.swiper;
            if (a) {
                var i = "auto" === a.params.slidesPerView ? a.slidesPerViewDynamic() : a.params.slidesPerView;
                if (t.realIndex !== a.realIndex) {
                    var s, r = a.activeIndex;
                    if (a.params.loop) {
                        a.slides.eq(r).hasClass(a.params.slideDuplicateClass) && (a.loopFix(),
                        a._clientLeft = a.$wrapperEl[0].clientLeft,
                        r = a.activeIndex);
                        var n = a.slides.eq(r).prevAll('[data-swiper-slide-index="' + t.realIndex + '"]').eq(0).index()
                          , o = a.slides.eq(r).nextAll('[data-swiper-slide-index="' + t.realIndex + '"]').eq(0).index();
                        s = void 0 === n ? o : void 0 === o ? n : o - r == r - n ? r : o - r < r - n ? o : n
                    } else
                        s = t.realIndex;
                    a.visibleSlidesIndexes && a.visibleSlidesIndexes.indexOf(s) < 0 && (a.params.centeredSlides ? s = r < s ? s - Math.floor(i / 2) + 1 : s + Math.floor(i / 2) - 1 : r < s && (s = s - i + 1),
                    a.slideTo(s, e ? 0 : void 0))
                }
                var l = 1
                  , d = t.params.thumbs.slideThumbActiveClass;
                if (1 < t.params.slidesPerView && !t.params.centeredSlides && (l = t.params.slidesPerView),
                a.slides.removeClass(d),
                a.params.loop || a.params.virtual)
                    for (var p = 0; p < l; p += 1)
                        a.$wrapperEl.children('[data-swiper-slide-index="' + (t.realIndex + p) + '"]').addClass(d);
                else
                    for (var c = 0; c < l; c += 1)
                        a.slides.eq(t.realIndex + c).addClass(d)
            }
        }
    }
      , Z = [E, S, C, M, k, $, D, {
        name: "mousewheel",
        params: {
            mousewheel: {
                enabled: !1,
                releaseOnEdges: !1,
                invert: !1,
                forceToAxis: !1,
                sensitivity: 1,
                eventsTarged: "container"
            }
        },
        create: function() {
            var e = this;
            te.extend(e, {
                mousewheel: {
                    enabled: !1,
                    enable: O.enable.bind(e),
                    disable: O.disable.bind(e),
                    handle: O.handle.bind(e),
                    handleMouseEnter: O.handleMouseEnter.bind(e),
                    handleMouseLeave: O.handleMouseLeave.bind(e),
                    lastScrollTime: te.now()
                }
            })
        },
        on: {
            init: function() {
                this.params.mousewheel.enabled && this.mousewheel.enable()
            },
            destroy: function() {
                this.mousewheel.enabled && this.mousewheel.disable()
            }
        }
    }, {
        name: "navigation",
        params: {
            navigation: {
                nextEl: null,
                prevEl: null,
                hideOnClick: !1,
                disabledClass: "swiper-button-disabled",
                hiddenClass: "swiper-button-hidden",
                lockClass: "swiper-button-lock"
            }
        },
        create: function() {
            var e = this;
            te.extend(e, {
                navigation: {
                    init: A.init.bind(e),
                    update: A.update.bind(e),
                    destroy: A.destroy.bind(e),
                    onNextClick: A.onNextClick.bind(e),
                    onPrevClick: A.onPrevClick.bind(e)
                }
            })
        },
        on: {
            init: function() {
                this.navigation.init(),
                this.navigation.update()
            },
            toEdge: function() {
                this.navigation.update()
            },
            fromEdge: function() {
                this.navigation.update()
            },
            destroy: function() {
                this.navigation.destroy()
            },
            click: function(e) {
                var t, a = this, i = a.navigation, s = i.$nextEl, r = i.$prevEl;
                !a.params.navigation.hideOnClick || I(e.target).is(r) || I(e.target).is(s) || (s ? t = s.hasClass(a.params.navigation.hiddenClass) : r && (t = r.hasClass(a.params.navigation.hiddenClass)),
                !0 === t ? a.emit("navigationShow", a) : a.emit("navigationHide", a),
                s && s.toggleClass(a.params.navigation.hiddenClass),
                r && r.toggleClass(a.params.navigation.hiddenClass))
            }
        }
    }, {
        name: "pagination",
        params: {
            pagination: {
                el: null,
                bulletElement: "span",
                clickable: !1,
                hideOnClick: !1,
                renderBullet: null,
                renderProgressbar: null,
                renderFraction: null,
                renderCustom: null,
                progressbarOpposite: !1,
                type: "bullets",
                dynamicBullets: !1,
                dynamicMainBullets: 1,
                formatFractionCurrent: function(e) {
                    return e
                },
                formatFractionTotal: function(e) {
                    return e
                },
                bulletClass: "swiper-pagination-bullet",
                bulletActiveClass: "swiper-pagination-bullet-active",
                modifierClass: "swiper-pagination-",
                currentClass: "swiper-pagination-current",
                totalClass: "swiper-pagination-total",
                hiddenClass: "swiper-pagination-hidden",
                progressbarFillClass: "swiper-pagination-progressbar-fill",
                progressbarOppositeClass: "swiper-pagination-progressbar-opposite",
                clickableClass: "swiper-pagination-clickable",
                lockClass: "swiper-pagination-lock"
            }
        },
        create: function() {
            var e = this;
            te.extend(e, {
                pagination: {
                    init: H.init.bind(e),
                    render: H.render.bind(e),
                    update: H.update.bind(e),
                    destroy: H.destroy.bind(e),
                    dynamicBulletIndex: 0
                }
            })
        },
        on: {
            init: function() {
                this.pagination.init(),
                this.pagination.render(),
                this.pagination.update()
            },
            activeIndexChange: function() {
                this.params.loop ? this.pagination.update() : void 0 === this.snapIndex && this.pagination.update()
            },
            snapIndexChange: function() {
                this.params.loop || this.pagination.update()
            },
            slidesLengthChange: function() {
                this.params.loop && (this.pagination.render(),
                this.pagination.update())
            },
            snapGridLengthChange: function() {
                this.params.loop || (this.pagination.render(),
                this.pagination.update())
            },
            destroy: function() {
                this.pagination.destroy()
            },
            click: function(e) {
                var t = this;
                t.params.pagination.el && t.params.pagination.hideOnClick && 0 < t.pagination.$el.length && !I(e.target).hasClass(t.params.pagination.bulletClass) && (!0 === t.pagination.$el.hasClass(t.params.pagination.hiddenClass) ? t.emit("paginationShow", t) : t.emit("paginationHide", t),
                t.pagination.$el.toggleClass(t.params.pagination.hiddenClass))
            }
        }
    }, {
        name: "scrollbar",
        params: {
            scrollbar: {
                el: null,
                dragSize: "auto",
                hide: !1,
                draggable: !1,
                snapOnRelease: !0,
                lockClass: "swiper-scrollbar-lock",
                dragClass: "swiper-scrollbar-drag"
            }
        },
        create: function() {
            var e = this;
            te.extend(e, {
                scrollbar: {
                    init: G.init.bind(e),
                    destroy: G.destroy.bind(e),
                    updateSize: G.updateSize.bind(e),
                    setTranslate: G.setTranslate.bind(e),
                    setTransition: G.setTransition.bind(e),
                    enableDraggable: G.enableDraggable.bind(e),
                    disableDraggable: G.disableDraggable.bind(e),
                    setDragPosition: G.setDragPosition.bind(e),
                    getPointerPosition: G.getPointerPosition.bind(e),
                    onDragStart: G.onDragStart.bind(e),
                    onDragMove: G.onDragMove.bind(e),
                    onDragEnd: G.onDragEnd.bind(e),
                    isTouched: !1,
                    timeout: null,
                    dragTimeout: null
                }
            })
        },
        on: {
            init: function() {
                this.scrollbar.init(),
                this.scrollbar.updateSize(),
                this.scrollbar.setTranslate()
            },
            update: function() {
                this.scrollbar.updateSize()
            },
            resize: function() {
                this.scrollbar.updateSize()
            },
            observerUpdate: function() {
                this.scrollbar.updateSize()
            },
            setTranslate: function() {
                this.scrollbar.setTranslate()
            },
            setTransition: function(e) {
                this.scrollbar.setTransition(e)
            },
            destroy: function() {
                this.scrollbar.destroy()
            }
        }
    }, {
        name: "parallax",
        params: {
            parallax: {
                enabled: !1
            }
        },
        create: function() {
            te.extend(this, {
                parallax: {
                    setTransform: N.setTransform.bind(this),
                    setTranslate: N.setTranslate.bind(this),
                    setTransition: N.setTransition.bind(this)
                }
            })
        },
        on: {
            beforeInit: function() {
                this.params.parallax.enabled && (this.params.watchSlidesProgress = !0,
                this.originalParams.watchSlidesProgress = !0)
            },
            init: function() {
                this.params.parallax.enabled && this.parallax.setTranslate()
            },
            setTranslate: function() {
                this.params.parallax.enabled && this.parallax.setTranslate()
            },
            setTransition: function(e) {
                this.params.parallax.enabled && this.parallax.setTransition(e)
            }
        }
    }, {
        name: "zoom",
        params: {
            zoom: {
                enabled: !1,
                maxRatio: 3,
                minRatio: 1,
                toggle: !0,
                containerClass: "swiper-zoom-container",
                zoomedSlideClass: "swiper-slide-zoomed"
            }
        },
        create: function() {
            var i = this
              , t = {
                enabled: !1,
                scale: 1,
                currentScale: 1,
                isScaling: !1,
                gesture: {
                    $slideEl: void 0,
                    slideWidth: void 0,
                    slideHeight: void 0,
                    $imageEl: void 0,
                    $imageWrapEl: void 0,
                    maxRatio: 3
                },
                image: {
                    isTouched: void 0,
                    isMoved: void 0,
                    currentX: void 0,
                    currentY: void 0,
                    minX: void 0,
                    minY: void 0,
                    maxX: void 0,
                    maxY: void 0,
                    width: void 0,
                    height: void 0,
                    startX: void 0,
                    startY: void 0,
                    touchesStart: {},
                    touchesCurrent: {}
                },
                velocity: {
                    x: void 0,
                    y: void 0,
                    prevPositionX: void 0,
                    prevPositionY: void 0,
                    prevTime: void 0
                }
            };
            "onGestureStart onGestureChange onGestureEnd onTouchStart onTouchMove onTouchEnd onTransitionEnd toggle enable disable in out".split(" ").forEach(function(e) {
                t[e] = B[e].bind(i)
            }),
            te.extend(i, {
                zoom: t
            });
            var s = 1;
            Object.defineProperty(i.zoom, "scale", {
                get: function() {
                    return s
                },
                set: function(e) {
                    if (s !== e) {
                        var t = i.zoom.gesture.$imageEl ? i.zoom.gesture.$imageEl[0] : void 0
                          , a = i.zoom.gesture.$slideEl ? i.zoom.gesture.$slideEl[0] : void 0;
                        i.emit("zoomChange", e, t, a)
                    }
                    s = e
                }
            })
        },
        on: {
            init: function() {
                this.params.zoom.enabled && this.zoom.enable()
            },
            destroy: function() {
                this.zoom.disable()
            },
            touchStart: function(e) {
                this.zoom.enabled && this.zoom.onTouchStart(e)
            },
            touchEnd: function(e) {
                this.zoom.enabled && this.zoom.onTouchEnd(e)
            },
            doubleTap: function(e) {
                this.params.zoom.enabled && this.zoom.enabled && this.params.zoom.toggle && this.zoom.toggle(e)
            },
            transitionEnd: function() {
                this.zoom.enabled && this.params.zoom.enabled && this.zoom.onTransitionEnd()
            }
        }
    }, {
        name: "lazy",
        params: {
            lazy: {
                enabled: !1,
                loadPrevNext: !1,
                loadPrevNextAmount: 1,
                loadOnTransitionStart: !1,
                elementClass: "swiper-lazy",
                loadingClass: "swiper-lazy-loading",
                loadedClass: "swiper-lazy-loaded",
                preloaderClass: "swiper-lazy-preloader"
            }
        },
        create: function() {
            te.extend(this, {
                lazy: {
                    initialImageLoaded: !1,
                    load: X.load.bind(this),
                    loadInSlide: X.loadInSlide.bind(this)
                }
            })
        },
        on: {
            beforeInit: function() {
                this.params.lazy.enabled && this.params.preloadImages && (this.params.preloadImages = !1)
            },
            init: function() {
                this.params.lazy.enabled && !this.params.loop && 0 === this.params.initialSlide && this.lazy.load()
            },
            scroll: function() {
                this.params.freeMode && !this.params.freeModeSticky && this.lazy.load()
            },
            resize: function() {
                this.params.lazy.enabled && this.lazy.load()
            },
            scrollbarDragMove: function() {
                this.params.lazy.enabled && this.lazy.load()
            },
            transitionStart: function() {
                var e = this;
                e.params.lazy.enabled && (!e.params.lazy.loadOnTransitionStart && (e.params.lazy.loadOnTransitionStart || e.lazy.initialImageLoaded) || e.lazy.load())
            },
            transitionEnd: function() {
                this.params.lazy.enabled && !this.params.lazy.loadOnTransitionStart && this.lazy.load()
            }
        }
    }, {
        name: "controller",
        params: {
            controller: {
                control: void 0,
                inverse: !1,
                by: "slide"
            }
        },
        create: function() {
            var e = this;
            te.extend(e, {
                controller: {
                    control: e.params.controller.control,
                    getInterpolateFunction: V.getInterpolateFunction.bind(e),
                    setTranslate: V.setTranslate.bind(e),
                    setTransition: V.setTransition.bind(e)
                }
            })
        },
        on: {
            update: function() {
                this.controller.control && this.controller.spline && (this.controller.spline = void 0,
                delete this.controller.spline)
            },
            resize: function() {
                this.controller.control && this.controller.spline && (this.controller.spline = void 0,
                delete this.controller.spline)
            },
            observerUpdate: function() {
                this.controller.control && this.controller.spline && (this.controller.spline = void 0,
                delete this.controller.spline)
            },
            setTranslate: function(e, t) {
                this.controller.control && this.controller.setTranslate(e, t)
            },
            setTransition: function(e, t) {
                this.controller.control && this.controller.setTransition(e, t)
            }
        }
    }, {
        name: "a11y",
        params: {
            a11y: {
                enabled: !0,
                notificationClass: "swiper-notification",
                prevSlideMessage: "Previous slide",
                nextSlideMessage: "Next slide",
                firstSlideMessage: "This is the first slide",
                lastSlideMessage: "This is the last slide",
                paginationBulletMessage: "Go to slide {{index}}"
            }
        },
        create: function() {
            var t = this;
            te.extend(t, {
                a11y: {
                    liveRegion: I('<span class="' + t.params.a11y.notificationClass + '" aria-live="assertive" aria-atomic="true"></span>')
                }
            }),
            Object.keys(Y).forEach(function(e) {
                t.a11y[e] = Y[e].bind(t)
            })
        },
        on: {
            init: function() {
                this.params.a11y.enabled && (this.a11y.init(),
                this.a11y.updateNavigation())
            },
            toEdge: function() {
                this.params.a11y.enabled && this.a11y.updateNavigation()
            },
            fromEdge: function() {
                this.params.a11y.enabled && this.a11y.updateNavigation()
            },
            paginationUpdate: function() {
                this.params.a11y.enabled && this.a11y.updatePagination()
            },
            destroy: function() {
                this.params.a11y.enabled && this.a11y.destroy()
            }
        }
    }, {
        name: "history",
        params: {
            history: {
                enabled: !1,
                replaceState: !1,
                key: "slides"
            }
        },
        create: function() {
            var e = this;
            te.extend(e, {
                history: {
                    init: F.init.bind(e),
                    setHistory: F.setHistory.bind(e),
                    setHistoryPopState: F.setHistoryPopState.bind(e),
                    scrollToSlide: F.scrollToSlide.bind(e),
                    destroy: F.destroy.bind(e)
                }
            })
        },
        on: {
            init: function() {
                this.params.history.enabled && this.history.init()
            },
            destroy: function() {
                this.params.history.enabled && this.history.destroy()
            },
            transitionEnd: function() {
                this.history.initialized && this.history.setHistory(this.params.history.key, this.activeIndex)
            }
        }
    }, {
        name: "hash-navigation",
        params: {
            hashNavigation: {
                enabled: !1,
                replaceState: !1,
                watchState: !1
            }
        },
        create: function() {
            var e = this;
            te.extend(e, {
                hashNavigation: {
                    initialized: !1,
                    init: R.init.bind(e),
                    destroy: R.destroy.bind(e),
                    setHash: R.setHash.bind(e),
                    onHashCange: R.onHashCange.bind(e)
                }
            })
        },
        on: {
            init: function() {
                this.params.hashNavigation.enabled && this.hashNavigation.init()
            },
            destroy: function() {
                this.params.hashNavigation.enabled && this.hashNavigation.destroy()
            },
            transitionEnd: function() {
                this.hashNavigation.initialized && this.hashNavigation.setHash()
            }
        }
    }, {
        name: "autoplay",
        params: {
            autoplay: {
                enabled: !1,
                delay: 3e3,
                waitForTransition: !0,
                disableOnInteraction: !0,
                stopOnLastSlide: !1,
                reverseDirection: !1
            }
        },
        create: function() {
            var t = this;
            te.extend(t, {
                autoplay: {
                    running: !1,
                    paused: !1,
                    run: q.run.bind(t),
                    start: q.start.bind(t),
                    stop: q.stop.bind(t),
                    pause: q.pause.bind(t),
                    onTransitionEnd: function(e) {
                        t && !t.destroyed && t.$wrapperEl && e.target === this && (t.$wrapperEl[0].removeEventListener("transitionend", t.autoplay.onTransitionEnd),
                        t.$wrapperEl[0].removeEventListener("webkitTransitionEnd", t.autoplay.onTransitionEnd),
                        t.autoplay.paused = !1,
                        t.autoplay.running ? t.autoplay.run() : t.autoplay.stop())
                    }
                }
            })
        },
        on: {
            init: function() {
                this.params.autoplay.enabled && this.autoplay.start()
            },
            beforeTransitionStart: function(e, t) {
                this.autoplay.running && (t || !this.params.autoplay.disableOnInteraction ? this.autoplay.pause(e) : this.autoplay.stop())
            },
            sliderFirstMove: function() {
                this.autoplay.running && (this.params.autoplay.disableOnInteraction ? this.autoplay.stop() : this.autoplay.pause())
            },
            destroy: function() {
                this.autoplay.running && this.autoplay.stop()
            }
        }
    }, {
        name: "effect-fade",
        params: {
            fadeEffect: {
                crossFade: !1
            }
        },
        create: function() {
            te.extend(this, {
                fadeEffect: {
                    setTranslate: W.setTranslate.bind(this),
                    setTransition: W.setTransition.bind(this)
                }
            })
        },
        on: {
            beforeInit: function() {
                var e = this;
                if ("fade" === e.params.effect) {
                    e.classNames.push(e.params.containerModifierClass + "fade");
                    var t = {
                        slidesPerView: 1,
                        slidesPerColumn: 1,
                        slidesPerGroup: 1,
                        watchSlidesProgress: !0,
                        spaceBetween: 0,
                        virtualTranslate: !0
                    };
                    te.extend(e.params, t),
                    te.extend(e.originalParams, t)
                }
            },
            setTranslate: function() {
                "fade" === this.params.effect && this.fadeEffect.setTranslate()
            },
            setTransition: function(e) {
                "fade" === this.params.effect && this.fadeEffect.setTransition(e)
            }
        }
    }, {
        name: "effect-cube",
        params: {
            cubeEffect: {
                slideShadows: !0,
                shadow: !0,
                shadowOffset: 20,
                shadowScale: .94
            }
        },
        create: function() {
            te.extend(this, {
                cubeEffect: {
                    setTranslate: j.setTranslate.bind(this),
                    setTransition: j.setTransition.bind(this)
                }
            })
        },
        on: {
            beforeInit: function() {
                var e = this;
                if ("cube" === e.params.effect) {
                    e.classNames.push(e.params.containerModifierClass + "cube"),
                    e.classNames.push(e.params.containerModifierClass + "3d");
                    var t = {
                        slidesPerView: 1,
                        slidesPerColumn: 1,
                        slidesPerGroup: 1,
                        watchSlidesProgress: !0,
                        resistanceRatio: 0,
                        spaceBetween: 0,
                        centeredSlides: !1,
                        virtualTranslate: !0
                    };
                    te.extend(e.params, t),
                    te.extend(e.originalParams, t)
                }
            },
            setTranslate: function() {
                "cube" === this.params.effect && this.cubeEffect.setTranslate()
            },
            setTransition: function(e) {
                "cube" === this.params.effect && this.cubeEffect.setTransition(e)
            }
        }
    }, {
        name: "effect-flip",
        params: {
            flipEffect: {
                slideShadows: !0,
                limitRotation: !0
            }
        },
        create: function() {
            te.extend(this, {
                flipEffect: {
                    setTranslate: U.setTranslate.bind(this),
                    setTransition: U.setTransition.bind(this)
                }
            })
        },
        on: {
            beforeInit: function() {
                var e = this;
                if ("flip" === e.params.effect) {
                    e.classNames.push(e.params.containerModifierClass + "flip"),
                    e.classNames.push(e.params.containerModifierClass + "3d");
                    var t = {
                        slidesPerView: 1,
                        slidesPerColumn: 1,
                        slidesPerGroup: 1,
                        watchSlidesProgress: !0,
                        spaceBetween: 0,
                        virtualTranslate: !0
                    };
                    te.extend(e.params, t),
                    te.extend(e.originalParams, t)
                }
            },
            setTranslate: function() {
                "flip" === this.params.effect && this.flipEffect.setTranslate()
            },
            setTransition: function(e) {
                "flip" === this.params.effect && this.flipEffect.setTransition(e)
            }
        }
    }, {
        name: "effect-coverflow",
        params: {
            coverflowEffect: {
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: !0
            }
        },
        create: function() {
            te.extend(this, {
                coverflowEffect: {
                    setTranslate: K.setTranslate.bind(this),
                    setTransition: K.setTransition.bind(this)
                }
            })
        },
        on: {
            beforeInit: function() {
                var e = this;
                "coverflow" === e.params.effect && (e.classNames.push(e.params.containerModifierClass + "coverflow"),
                e.classNames.push(e.params.containerModifierClass + "3d"),
                e.params.watchSlidesProgress = !0,
                e.originalParams.watchSlidesProgress = !0)
            },
            setTranslate: function() {
                "coverflow" === this.params.effect && this.coverflowEffect.setTranslate()
            },
            setTransition: function(e) {
                "coverflow" === this.params.effect && this.coverflowEffect.setTransition(e)
            }
        }
    }, {
        name: "thumbs",
        params: {
            thumbs: {
                swiper: null,
                slideThumbActiveClass: "swiper-slide-thumb-active",
                thumbsContainerClass: "swiper-container-thumbs"
            }
        },
        create: function() {
            te.extend(this, {
                thumbs: {
                    swiper: null,
                    init: _.init.bind(this),
                    update: _.update.bind(this),
                    onThumbClick: _.onThumbClick.bind(this)
                }
            })
        },
        on: {
            beforeInit: function() {
                var e = this.params.thumbs;
                e && e.swiper && (this.thumbs.init(),
                this.thumbs.update(!0))
            },
            slideChange: function() {
                this.thumbs.swiper && this.thumbs.update()
            },
            update: function() {
                this.thumbs.swiper && this.thumbs.update()
            },
            resize: function() {
                this.thumbs.swiper && this.thumbs.update()
            },
            observerUpdate: function() {
                this.thumbs.swiper && this.thumbs.update()
            },
            setTransition: function(e) {
                var t = this.thumbs.swiper;
                t && t.setTransition(e)
            },
            beforeDestroy: function() {
                var e = this.thumbs.swiper;
                e && this.thumbs.swiperCreated && e && e.destroy()
            }
        }
    }];
    return void 0 === T.use && (T.use = T.Class.use,
    T.installModule = T.Class.installModule),
    T.use(Z),
    T
});
