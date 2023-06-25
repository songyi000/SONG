;(function(win, doc, undefined) {

    'use strict';   
    
    var $WIN = $(window);       
    var $DOC = $(document); 
    
    var Body = {
        scrollTop :'',
        lock: function(){
        if ($('body').is(".scroll-no")) {
                return;
            }
            Body.scrollTop = window.pageYOffset;
            $('#wrap').css({
                top: - (Body.scrollTop)
            });
            $('body').addClass('scroll-no');
        },
        unlock: function(){
            if( $("body").hasClass("scroll-no") ){
                $('body').removeClass('scroll-no');
                $('#wrap').removeAttr('style');
                window.scrollTo(0, Body.scrollTop);
            }
        }
    }
    
    
    KAUI.common = {
        init : function(){              
            KAUI.common.gnbNav.init();
            KAUI.select.init();         
            KAUI.form.init();
            KAUI.tooltip.init();    
            //KAUI.table.scroll();
            KAUI.scrollBar.init({
                callback: function(){
                    console.log('end');
                }
            });     
            KAUI.datepicker.init({
                id: 'input id name',
                date: 'YYYY.MM.DD',
                min: 'YYYY.MM.DD',
                max: 'YYYY.MM.DD',
                title: 'title name',
                isFooter : false,               
                callback: function(){
                    console.log('callback init');
                }
            });

            //callback
            // KAUI.callback.{datepicker.id} = (v) => {
            //  console.log('select date value:', v);
            // }
        
            KAUI.common.totalSch.init();
            //KAUI.common.findFund();
            KAUI.common.findFundFunc.toggle();          
            KAUI.common.fundComp.fixed();
            //KAUI.common.fundComp.toggle(); 개발처리
            //KAUI.common.fundComp.open(); 
            KAUI.common.windowScroll(); 
            KAUI.common.snsTips();
            //KAUI.common.subTab();
            KAUI.common.reitsEffect.init();
            KAUI.common.inView();
            KAUI.common.topBnr.init();
            KAUI.common.scrlTabFixed.init();
            KAUI.common.skipNav();
            setTimeout(function() {
                KAUI.common.floatingTop();
            },300);

            // 모달 호출
            const btns = document.querySelectorAll('.btn-modal');

            for (const btn of btns) {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    const el = e.currentTarget;
                    const id = el.dataset.id;
                    const src = el.dataset.src;

                    // callback 함수 필요할경우
                    if (id === 'sampleModal') {
                        KAUI.modal.show({ 
                            id:id, 
                            src: src,
                            callback: () => {
                                //alert(111);
                            }
                        });
                    } else {
                        KAUI.modal.show({ 
                            id:id, 
                            src: src
                        });
                    }
                });
            }   
        },
        pageDefault : {             
            header : function() { 
                if ($('.gnb-wrap').length > 0) { 
                    $('.gnb-wrap').load('/kiam/pcWeb/pub_include/header.html', function() {
                        //KAUI.common.gnbNav.init();
                    });
                }
            },
            footer : function() { 
                if ($('.foot-wrap').length > 0) $('.foot-wrap').load('/kiam/pcWeb/pub_include/footer.html');            
            }
        },
        skipNav : function() { 
            $('#skipNavi > a').on('click', function(e) {
                var containerTop = $('#content').offset().top,
                    fixedH = $('.gnb-wrap').find('.gnb-nav').innerHeight(); 

                $('html, body').stop(true, false).animate({
                    scrollTop : containerTop-fixedH
                });
            });
        },
        gnbNav : {
            gnb : $('.gnb'),
            gnbMenu : $('.gnb nav > ul.menu'),
            gnbMenuLi : $('.gnb nav > ul > li'),    
            bg: $('.gnb-bg'),
            tabTimeout: '',
            openTimeout: '',
            closeTimeout: '',  
            // 서브 열림
            open : function(target,time){
                clearTimeout(KAUI.common.gnbNav.closeTimeout);
                var openInit = function(){
                    var $subMenu = $('.gnb .sub');  
                    var $gnbBg = $('.gnb-bg');              

                    $('.gnb-wrap').addClass('show');    
                    $('.gnb nav > ul > li').children('a').attr('aria-expanded','false');
                    $('.gnb nav > ul > li').removeClass('hover');
                    $(target).find('> li > a').attr('aria-expanded','true');                                    
                    KAUI.common.gnbNav.tabTimeout = setTimeout(function(){
                        $subMenu.stop(true,false).fadeIn(100);
                        var subMenuH = $('.gnb').outerHeight() - 88;
                        $gnbBg.css({'height':subMenuH});
                    },100); 
                };

                if(!!time){
                    KAUI.common.gnbNav.openTimeout = setTimeout(function() {                        
                        openInit();
                    }, time);
                }else{
                    openInit();
                }
            },
            // 서브 닫힘
            close: function (time) {
                clearTimeout(KAUI.common.gnbNav.openTimeout);
                clearTimeout(KAUI.common.gnbNav.tabTimeout);
                var closeInit = function(){
                    $('.gnb-wrap').removeClass('show'); 
                    $('.gnb nav > ul > li').children('a').attr('aria-expanded','false');
                    $('.gnb nav > ul > li').removeClass('hover');
                    $('.gnb .sub').removeClass('active').removeAttr('style');
                    $('.gnb-bg').css({'height':'0'});
                };
                if(!!time){
                    KAUI.common.gnbNav.closeTimeout = setTimeout(function(){
                        closeInit();
                    },time)
                }else{
                    closeInit();
                }
            },  
            scroll : function (){
                if(!$('.gnb-nav').length) return;

                var $topBnr = $('.top-bnr-group');
                var $gnbNav = $('.gnb-nav');
                var gnbNavTop = $gnbNav.offset().top;

                $WIN.scroll(function() {
                    var scrlTop = $WIN.scrollTop();
                    var $gnb = $('.gnb-wrap');              
                    if(scrlTop > gnbNavTop) {
                        if(!!!$gnb.hasClass('fixed')) $gnb.addClass('fixed');                       
                    } else {
                        $gnb.removeClass('fixed');
                    }
                });
            },
            // 실행
            init : function () {                
                var menu = $('.gnb nav > ul');  
                var $openDep1 = '';         
                menu.on('mouseover focusin', function (e){
                    var $this = $(this);
                    if(e.type == 'mouseover'){
                        KAUI.common.gnbNav.open($this,100);
                    }else{
                        KAUI.common.gnbNav.open($this);
                    }
                    $openDep1 = $this;
                }).on('mouseout focusout', function (e){
                    if(e.type == 'mouseout'){
                        KAUI.common.gnbNav.close(100);
                    }else{
                        KAUI.common.gnbNav.close(10);
                    }
                });

                KAUI.common.gnbNav.scroll();
            }
        },
        totalSch : {
            $t: null,
            $parent: null,
            $target: null,          
            className: null,
            openFn: function() {
                Body.lock();
                var o = this;
                o.$parent.addClass('active');               
                o.$target.css({'height':'400px'});
                o.$target.show();
                setTimeout(function() {
                    o.$target.css('opacity',1);
                },10);
                KAUI.common.focusMove('.gnb-wrap .sch-cont');
            },
            closeFn: function() {
                Body.unlock();
                var o = this;
                o.$parent.removeClass('active');
                o.$target.css('opacity','0');
                o.$target.hide();
                o.$target.css({'height': 0});               
            },
            activeFn: function() {
                var o = this;
                if(!o.$parent.hasClass(o.className)) {
                    o.openFn();
                } else {
                    o.closeFn();
                }
            },
            init: function(v) {
                var o = this;
                o.$t = $('.gnb-wrap .btn-sch');
                o.$parent = o.$t.parent(),
                o.$target = $('.gnb-wrap .sch-cont'),
                o.$CloseBtn = $('.gnb-wrap .btn-close');                
                o.className = 'active';

                o.$t.off().on('click', function() {
                    o.activeFn();
                });

                o.$CloseBtn.off().on('click', function() {
                    o.closeFn();
                });

                if(v === 'open') {
                    o.openFn();
                }
                if(v === 'close') {
                    o.closeFn();
                }
            }
        },  
        toggleMenu : {  
            open : function(v){
                var el = $(v);
                var target = el.closest('.fund-check');
                var infoText = '<span class="toggle-info hide">완료</span>';
                var btn = el.find('span').append(infoText);

                if(!target.hasClass('on')) target.addClass('on');

            },
            hide : function(v){
                var el = $(v);
                var target = el.closest('.fund-check');
                target.removeClass('on');
                target.find('.toggle-info').remove();               
            }
        },
        dropMenu : function(opt) { 
            var el = $('#' + opt.id).find('.ui-drop-btn');

            el.on('click', function(e) {
                e.preventDefault(); 
                var gTarget = $('.ui-drop-wrap');
                var $this = $(this);
                if(!$this.closest('.ui-drop-wrap').hasClass('on')){
                    $this.closest('.ui-drop-wrap').addClass('on');
                } else {
                    $this.closest('.ui-drop-wrap').removeClass('on');
                }
            });

            $(document).on('click', function(e) {
                if ($(e.target).closest('.ui-drop-wrap').length == 0) $('.ui-drop-wrap').removeClass('on');
            });
        },
        schTabs : function(opt) {
            var el = $('#' + opt.id).find('.ui-tab-btn'),
                idx = opt.current,
                $gTarget = $('#' + opt.id),
                tabInfoTxts = '<span class="tab-info-txts hide">선택됨</span>';            

            $gTarget.find('.ui-tab-btn').removeClass('selected').attr('aria-seleted', false);               
            $gTarget.find('.ui-tab-btn').find('.tab-info-txts').remove();       
            el.eq(idx).addClass('selected').attr('aria-seleted', true);
            el.eq(idx).append(tabInfoTxts);

            el.on('click', function(e) {
                e.preventDefault();                 
                var $this = $(this);
                $gTarget.find('.ui-tab-btn').removeClass('selected').attr('aria-seleted', false);
                $gTarget.find('.ui-tab-btn').find('.tab-info-txts').remove();                           
                if (!!!$this.hasClass('selected')) {
                    $this.addClass('selected').attr('aria-seleted', true);
                    $this.append(tabInfoTxts);
                } 
            });
        },
        findFundFunc : {                    
            speed: 200,         
            tabTimeout: '',
            openTimeout: '',
            closeTimeout: '',
            state:false,            
            show : function(target,time){               
                var $this = target;
                var el_pnl = $this.closest('.fund-sch-wrap').find('.find-more');    
                
                var openInit = function(){  
                    el_pnl.attr({'aria-hidden':'false'}).slideDown(200);                                                                         
                    $this.find('span').text('검색옵션 닫기').closest('.fund-sch-wrap').addClass('on');        
                    KAUI.common.findFundFunc.state = true; 
                    var focusTarget = el_pnl.find('.range-risk .ui-range');
                    focusTarget.find('input:visible:enabled:first').focus();                
                }

                if(!!time){
                    KAUI.common.findFundFunc.openTimeout = setTimeout(function() {
                        openInit();
                    }, time);
                }else{
                    openInit();
                }               
            },
            // 서브 닫힘
            hide:function (target,time) {               
                var $this = target;
                var el_pnl = $this.closest('.fund-sch-wrap').find('.find-more');    
                var el_pnl_height = el_pnl.outerHeight();               

                var closeInit = function(){                 
                    $this.find('span').text('검색옵션 열기').closest('.fund-sch-wrap').removeClass('on');                     
                    el_pnl.attr({'aria-hidden':'true'}).removeAttr('tabindex').slideUp(200);                    
                    KAUI.common.findFundFunc.state = false; 
                }

                if(!!time){
                    KAUI.common.gnbNav.closeTimeout = setTimeout(function(){
                        closeInit();
                    },time)
                }else{
                    closeInit();
                }               
            },  
            // 실행
            toggle : function () {
                var el = $('.find-bar').find('.btn-option');                    
                el.on('click', function (e){
                    e.preventDefault(); 
                    var $this = $(this);                    

                    if(!!!KAUI.common.findFundFunc.state){                                              
                        KAUI.common.findFundFunc.show($this,50);
                    } else {
                        KAUI.common.findFundFunc.hide($this,50);
                    }       
                    
                });
            }       
        },
        windowScroll : function() {         
            $WIN.scroll(function() { 
                if ($('.fund-find-wrap').length > 0) { 
                    KAUI.common.fundComp.fixed();
                }
           });
        },  
        fundComp : {
            fixed : function(){
                if (!$('.fund-find-wrap').length > 0) return;                               
                
                var $wrap = $('.kiam-wrap'), 
                    $fundcp = $('.fund-compare'),
                    $container = $('.sub-wrap'),
                    winH = $WIN.height(),
                    winScrollTop = $WIN.scrollTop(),
                    containerTop = $container.offset().top,
                    footTop = $('.foot-wrap').offset().top,                 
                    $fundCpBtn = $fundcp.find('.btn-toggle');   

                    $wrap.addClass('fundcp-btm');

                // if(footTop>=winScrollTop+winH) $fundcp.removeAttr("style");
                // else $fundcp.css({"bottom":((winScrollTop+winH)-footTop)+"px"}); 

                var topMg = Math.max(((winScrollTop + winH) - footTop), 0); 
                var isCpFix = containerTop+topMg < winScrollTop;                             
                //var isCpFix = containerTop+topMg < winScrollTop && footTop-winH > winScrollTop;    
                if(isCpFix) { !$fundcp.is(".fixed") && $fundcp.addClass("fixed"); }
                else $fundcp.is(".fixed") && $fundcp.removeClass("fixed");   

            }, 
            hide : function(){
                var $fundcp = $('.fund-compare'),
                    el = $fundcp.find('.btn-toggle');
                Body.unlock();
                el.removeClass('active').find('span').text('선택한 상품비교 열기');
                $fundcp.find('.result').removeClass('active');
                $fundcp.find('.summary').removeClass('active'); 
                $('body').removeClass('fc-active');
            },
            open : function(v) {                
                var $fundcp = $('.fund-compare');
                var target = $fundcp.find('.fund-comp-result');
                var el = $(v);

                if(!el.hasClass('active')) {
                    Body.lock();
                    el.addClass('active').find('span').text('선택한 상품비교 닫기');
                    $fundcp.find('.result').addClass('active');
                    $fundcp.find('.summary').addClass('active');
                    if (!$('body').is(".fc-active")) {
                        $('body').addClass('fc-active');
                    }                   
                }                   
            }           
        },
        snsTips : function(opt) {
            var $target = $('.share-sns');
            $target.each(function(){
                var target = $(this),
                $btn = $(this).find('.btn-share'),
                $tipConts = target.find('.tip-sns'),
                tipCloseBtn = '<button type="button" class="icon-close" aria-label="close"><span class="hide">공유하기 닫기</span></button>';
                
                var isClose = $(this).find('.icon-close');

                if (!isClose.length) {
                    $tipConts.append(tipCloseBtn);
                }

                var $closeBtn = $tipConts.find('.icon-close');

                $btn.attr('title','내용열기');
                $btn.off('click.snsTips').on('click.snsTips', function(e) {
                    e.preventDefault();
                    if(!!!target.hasClass('active')){                       
                        target.addClass('active');                      
                        $tipConts.attr({'tabindex':'0'});
                        $(this).attr('title','내용닫기');
                    } else {
                        target.removeClass('active');
                        $tipConts.attr({'tabindex':'-1'});
                        $(this).attr('title','내용열기');
                    }
                }); 
                
               $closeBtn.off('click.snsClose').on('click.snsClose', function(e) {
                    target.removeClass('active');
                    target.find('.btn-shareSns').attr('title','내용열기');
                    $tipConts.attr({'tabindex':'-1'});                  
                });
            });

            $(document).on('click', function(e) {
                if ($(e.target).closest('.share-sns').length == 0) { 
                    var target = $('.share-sns');
                    target.removeClass('active');
                    target.find('.tip-sns').attr({'tabindex':'-1'});
                    $('.share-sns .btn-share').attr('title','내용열기');
                 }
            });

        },
        subTab : function(){            
            var subTarget = $('.ui-tab-btns');
            
            subTarget.each(function(){
                var el = $(this).find('button');
                
                el.off('click.el').on('click.el', function(e){
                    console.log('test');
                    el.removeClass('on');
                    e.preventDefault(); 
                    var $this = $(this),
                        tabFirst = $this.attr('data-tab');
                        $this.addClass('on');
    
                    // if (btns.length > 0){
                    //  subLink.each(function(i){
                    //      var ths = $(this),
                    //          tabSecond = ths.attr('data-subtab');
                    //      if(tabFirst == tabSecond){
                    //          ths.addClass('on').attr('aria-hidden', 'false').show();
                    //      }else{
                    //          ths.removeClass('on').attr('aria-hidden', 'true').hide();
                    //      }
                    //  })
                    // }
                });
            });         
        },
        reitsEffect : {
            init : function(){
                if (!$('.reits-wrap').length) return;
                KAUI.common.reitsEffect.slide();    
                //KAUI.common.reitsEffect.scrollEvt();                              
            },          
            slide : function () {
            
                var $reitsSlide = $('#reitsSlide');    

                $reitsSlide.on("init", function(event, slick){                     
                    $("#slider-page").find('.current').text(parseInt(slick.currentSlide + 1));
                    $("#slider-page").find('.total').text(slick.slideCount);

                    var barWid = Math.floor(100 / slick.slideCount),
                        itemsW = barWid + '%';

                    $('.pro-bar').css({ width:itemsW});    
                });

                $reitsSlide.slick({ 
                    draggable: true,
                    infinite: false,
                    slidesToShow: 1, 
                    slidesToScroll: 1,
                    autoplay: false, 
                    arrows:false,
                    dots:false, 
                    accessibility: false,
                    variableWidth:true,
                    speed:1000 ,
                    adaptiveHeight: true,
                    cssEase: 'ease-in-out',
                    // fade: true,
                    touchThreshold: 100       
                });

                $reitsSlide.on("afterChange", function (event, slick, currentSlide) {                    

                    $("#slider-page").find('.current').text(parseInt(slick.currentSlide + 1));
                    $("#slider-page").find('.total').text(slick.slideCount);

                    var barWid = Math.floor(100 / slick.slideCount);
                    
                    $(".pro-bar").animate({
                        "width": (barWid * (currentSlide+1))+"%"
                    },10);
                }); 
            }
        },
        focusMove:function(tar){
            if(!$(tar).is(':visible'))return;
            var $focusEl = 'a[href], area[href], input:not([disabled]), input:not([readonly]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex=0]';
            var $focusable = $(tar).find($focusEl);
            var $focusLength = $focusable.length;
            $focusable.first().on('keydown',function(e){
                var $keyCode = (e.keyCode?e.keyCode:e.which);
                if($keyCode == 9){
                    if(e.shiftKey){
                        $focusable.eq($focusLength-1).focus();
                        e.preventDefault();
                    };
                };
            });
            $focusable.last().on('keydown',function(e){
                var $keyCode = (e.keyCode?e.keyCode:e.which);
                if ($keyCode == 9){
                    if(e.shiftKey){
                    } else{
                        $focusable.eq(0).focus();
                        e.preventDefault();
                    };
                };
            });
        },
        inView:function() {
            var inView = window.inView || false;
            if (!document.querySelector('[data-component="inview"]')) { // inview 객체
                                                                        // 없을 시
                return;
            }
            if (!inView) { // js load 불가 시, 전체적으로 isIn 클래스 추가
                $('[data-component="inview"]').addClass('isIn');
                console.error('inview 객체는 있지만 inview js파일이 없습니다. in-view.min.js 파일을 import해주세요.');
                return;
            }
            inView.offset({
                top: 0,
                bottom: window.innerHeight * 0.2,
            });
            inView('[data-component="inview"]')
                .on('enter', function(el){ // inview 시 callback
                    el.classList.add('isIn');                   
                })
                .on('exit', function(el){ // outview 시 callback

            });
        },
        // floatingTop: function(){ 
        //  console.log('floating');        
        //  var $window = $(window), $wrap = $('.kiam-wrap'), $footer = $('.foot-wrap'), $content = $('#content');          
        //  var topHtml = '<div class="ui-floating-top"><button class="btn-top"><span class="hide">컨텐츠 상단으로 이동</span></button></div>';          

        //  $content.after(topHtml);    

        //  var $floating = $('.ui-floating-top'), $btnTop = $('.btn-top');

        //  $window.scroll(function() {
        //      var y = $(this).scrollTop();
        //      var winH = $window.height();
        //      var wrapH = $wrap.height();
        //      var footerH = $footer.outerHeight();

        //      if(y > $wrap.height() - $window.height() - $footer.height()){                                   
        //          $floating.css({'position':'absolute', 'top':$wrap.height() - $footer.height() - 180 });
        //      } else {                
        //          $floating.removeAttr('style');
        //      }       
                
        //      ($window.scrollTop() > 100) ? $btnTop.fadeIn() : $btnTop.fadeOut();
        //  });

        //  $btnTop.on('click', function(e) {
        //      e.preventDefault();
        //      console.log('click');
        //      $('html, body').animate({scrollTop:0}, 300);    
        //      window.location.href='#wrap';           
        //  });
        // },   
        floatingTop:function(){         
            var $window = $(window), $wrap = $('.kiam-wrap'), $footer = $('.foot-wrap'), $content = $('#content');          
            var topHtml = '<div class="ui-floating-top"><button class="btn-top"><span class="hide">컨텐츠 상단으로 이동</span></button></div>';          
            
            $content.after(topHtml);    
            
            var goTop = $('.btn-top'); 

            $WIN.on('scroll', function () {
                var winH = $WIN.height();   
                var footer = $('.foot-wrap');
                var winScT = $WIN.scrollTop();
                var overScreenT = winScT + winH;                                
                var $wrap = $('.kiam-wrap');        
                if($('.foot-wrap').length) var footerT = footer.offset().top;

                if (goTop.length > 0) {
                    var goTop_B = 38;
                    var goTop_F = 125; // 펀드상품 하단 고정영역 있을경우
    
                    if (winScT == 0) {                      
                        goTop.stop().animate({ 'opacity': '0' }, 100, function () { goTop.hide(); });
                    } else {                        
                        goTop.show();
                        goTop.stop().animate({ 'opacity': '1' }, 100);
                    }                   
    
                    if (overScreenT > footerT) {
                        goTop_B = overScreenT - footerT + goTop_B;
                        goTop_F = overScreenT - footerT + goTop_F - 80;
                    }
                    
                    if($wrap.is(".fundcp-btm")) goTop.css('bottom', goTop_F + 'px');
                    else goTop.css('bottom', goTop_B + 'px');                  

                }
            }).scroll();

            goTop.on('click', function(e) {
                e.preventDefault();         
                $('html, body').animate({scrollTop:0}, 300);    
                //window.location.href='#wrap';           
            });

        },  
        topBnr: {           
            isActive:false,     
            init: function (){              
                var $topBnr = $('.top-bnr-group');
                var $topBnrBtn = $topBnr.find('.btn-close');    
                
                $topBnrBtn.on('click', function() {
                    KAUI.common.topBnr.hide();
                });
            },
            show: function (){          
                if(!!!KAUI.common.topBnr.isActive) {
                    $('.top-bnr-group').addClass('active');
                    KAUI.common.topBnr.isActive = true;
                }               
            },
            hide : function () {
                if(KAUI.common.topBnr.isActive) {
                    $('.top-bnr-group').removeClass('active');
                    KAUI.common.topBnr.isActive = false;
                }   
            }
        },
        scrlTabFixed : {
            init : function() {
                var config = null;
                
                KAUI.common.scrlTabFixed.config = {
                    winH : $WIN.height(),
                    target : $('.scroll-fixed').find('.ui-tab-wrap'),
                    cont : $('.scroll-fixed').find('.ui-tab-wrap').siblings('.ui-tab-content').find('.ui-tab-pnl'),
                    offsetTop : 0
                };

                config = KAUI.common.scrlTabFixed.config;      
                if(config.target.length > 0) {
                    KAUI.common.scrlTabFixed.bindEvents();
                }
            },            
            bindEvents : function() {
                var config = KAUI.common.scrlTabFixed.config;
                
                config.offsetTop = config.target.offset().top;
                
                $(window).off('scroll.scrollFixed');
                $(window).on('scroll.scrollFixed', function() {
                    var fixedTop = $('.gnb').height(),
                        targetHeight = config.target.innerHeight();
                    
                    if(config.target.css('position') !== 'fixed' && config.offsetTop !== config.target.offset().top){
                        config.offsetTop = config.target.offset().top;
                    }
                    
                    if($(window).scrollTop() > config.offsetTop-fixedTop) {
                        config.target.parent().css({
                            paddingTop: config.target.innerHeight()+'px'
                        });
                        
                        config.target.css({
                            position : 'fixed',
                            top: fixedTop+'px',
                            left: 0,
                            width: '100%',
                            zIndex: 100,
                            background: '#fff'
                        });                       
                      
                        var $offsetCont = config.target.siblings('.ui-tab-content').find('.ui-tab-pnl');
                        var $menu = config.target.find('.ui-tab-list li');
                        
                        $offsetCont.each(function() {
                           
                            var offsetTop = $(this).offset().top - (targetHeight + fixedTop),
                                offsetHeight = offsetTop + parseInt($(this).innerHeight(), 10),
                                winTop = $(window).scrollTop();                            
                          
                            if(winTop + config.winH >= parseInt($(document).innerHeight(), 10) - 5) {
                                var idx = $('.ui-tab-pnl').length-1;
                                $menu.removeClass('selected');
                                $menu.eq(idx).addClass('selected');

                                
                            } else if(winTop >= offsetTop && winTop < offsetHeight) {
                                var idx = $(this).index('.ui-tab-pnl');
                                $menu.removeClass('selected');
                                $menu.eq(idx).addClass('selected');
                            }
                        });                        
                        
                    } else {
                        config.target.removeAttr('style');
                        config.target.parent().css('padding-top', 0);                        
                       
                    }
                });                
                 
                config.target.off('click.scrollFixed');
                config.target.on('click.scrollFixed', 'a', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    var getHref = $(this).attr('href'),
                        $contTarget = $(getHref),
                        contOffsetTop = $contTarget.offset().top,
                        fixedTop = $('.gnb').height() + config.target.innerHeight() - 1,
                        result = contOffsetTop - fixedTop;
                    
                    $('html, body').stop(true, false).animate({
                        scrollTop : result+'px'
                    });
                    
                });
                
            }       
        }
    }

    //기본실행
    doc.addEventListener("DOMContentLoaded", function(){
        KAUI.common.init();
        investHover();
    }); 
    
})(window, document);

// 대체투자 슬라이드 
var reitsSubSlide = function () {
    $('#reits-slider').slick({  
        infinite: false,    
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,      
        asNavFor: '#reits-slider-nav'
    });
    $('#reits-slider-nav').slick({
        infinite: false,
        slidesToShow:3,
        slidesToScroll:1,
        asNavFor:'#reits-slider',                        
        focusOnSelect: true,
        accessibility: false
    });
}

// 메인 슬라이드 
var mainVisualSlide = function () {

    $('#mainVisual').on('init', function(event, slick, slideCount) {
        var slidesCount = slick.slideCount; 
        if (slidesCount == 1) {$('.main-visual .slick-control').hide();}
    });

    var $mVSlide = $('#mainVisual').slick({
        infinite: true,
        autoplay: true,                   
        autoplaySpeed:6000,   
        speed:1000,            
        lazyLoad: 'progressive',
        appendDots:$('.visual-utils .slick-info .page'),
        dots: true,   
        arrows:false,   
        //accessibility: true,        
        focusOnChange: false,          
        pauseOnFocus:false,
        pauseOnHover:true,
        customPaging: function (slider, i) {
            return '<button type="button" class="btn-slick-dots" data-role="none" role="button" tabindex="0"><svg class="spinner on" width="14px" height="14px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">' +
                '<circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle></svg><span class="text">' + (i + 1) + '번째 배너' + '</span></button>';
        }
    });
    
    $('.main-visual .slick-control .pause').on('click',function(){
        $mVSlide.slick('slickPause');
        $('.mainVisual .slick-control .play').show().focus();
        $(this).hide();
        $('.main-visual .page .slick-dots li.slick-active').addClass('on');
        $('.main-visual .page .slick-dots li').removeClass('slick-active');
    });
    $('.main-visual .slick-control .play').on('click',function(){
        $mVSlide.slick('slickPlay');
        $('.main-visual .slick-control .pause').show().focus();
        $(this).hide();
        $('.main-visual .page .slick-dots .on').addClass('slick-active');
    });
} 

// 메인 공지팝업 슬라이드
var mainNotiSlide = function () {
    if(!$('.main-noice-slide').length) return;

    var sliderTitle = $('.slide-title');

    $('#mainNoticeSlider').on("init", function(event, slick){                     
        var notiTitle= $('#mainNoticeSlider .slick-active').attr('data-title');
        sliderTitle.text(notiTitle);     
         
        var slidesCount = slick.slideCount; 
        if (slidesCount == 1) {$('.main-noice-slide .slick-control').hide();}  
    }); 

    $('#mainNoticeSlider').slick({      
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        autoplay: true,                   
        autoplaySpeed:6000,
        speed:1000,
        appendDots:$('.noti-slide-info .page'),
        arrows:false,
        customPaging: function(slider, i) {
            return $('<button type="button" data-role="none" role="button" tabindex="0" />').text(i + 1 + '번째 서비스');
        }
    });

    $('.noti-slide-info .slick-control .pause').on('click',function(){        
        $('#mainNoticeSlider').slick('slickPause');
        $('.noti-slide-info .slick-control .play').show().focus();
        $(this).hide();
        $('.noti-slide-info .page .slick-dots li.slick-active').addClass('on');
        $('.noti-slide-info .page .slick-dots li').removeClass('slick-active');
    });
    $('.noti-slide-info .slick-control .play').on('click',function(){
        $('#mainNoticeSlider').slick('slickPlay');
        $('.noti-slide-info .slick-control .pause').show().focus();
        $(this).hide();
        $('.noti-slide-info .page .slick-dots .on').addClass('slick-active');
    });
    
    $('#mainNoticeSlider').on('afterChange', function(event, slick, currentSlide, nextSlide){
        var notiTitle= $('#mainNoticeSlider .slick-active').attr('data-title');
        sliderTitle.text(notiTitle);  
    });
}


// 대체 투자 오버시 제어
var investHover = function () {
    if (!$('.sub-wrap.port-wrap').length > 0) return;
    var el = $('.head-summary a');  
    
    el.eq(0).addClass('active');

    el.on('mouseover focusin', function (e){        
        var bgType = $(this).attr('data-bg'),
            target = $('.sub-wrap.port-wrap').find('.sub-head-wrap');

        el.removeClass('active');
        $(this).addClass('active');

        target.attr('data-type', bgType);       
        
    });
}







