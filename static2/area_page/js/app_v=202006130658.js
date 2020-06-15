$(function () {
    //给页面绑定滑轮滚动事件
    $(document).on('scroll', scrollFunc);
    changeTab();
    changeCard();
    changeTabPage();
    onChangeAddress();
    foldContent();
    //banner 轮播
    var bannerSlide = null;
    bannerSlide = new Swiper('#bannerSlide .swiper-container', {
        centeredSlides: true,
        slideToClickedSlide: false,
        preventClicksPropagation: true,
        loop: true,
        autoplay: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            type: 'custom',
            renderCustom: function (swiper, current, total) {
                var customPaginationHtml = '';
                for (var i = 0; i < total; i++) {
                    if (i === (current - 1)) {
                        // if($('.e-commerce-header').length > 0) {
                        //     if(scrollTop <= 10){
                        //         $('.e-commerce-header').css({
                        //             // backgroundImage: "linear-gradient(292deg, #4256e8, #576bff)",
                        //         })
                        //     }
                        // }
                        customPaginationHtml += '<div class="slide-page"><div class="item active-slide"></div></div>';
                    } else {
                        // if($('.e-commerce-header').length > 0) {
                        //     if(scrollTop <= 10){
                        //         $('.e-commerce-header').css({
                        //             // backgroundImage: "linear-gradient(292deg, #2C64EF,#4589FB)",
                        //         })
                        //     }
                        // }
                        customPaginationHtml += '<div class="slide-page"><div class="item"></div></div>';
                    }
                }
                return customPaginationHtml;
            },
        },
        on: {
            slideChange: function () {
                myAnmiate();
                $('.slide-page').on("click", function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    let index = $('.slide-page').index(this);
                    bannerSlide.slideToLoop(index, 1000, false);//切换到第一个slide，速度为1秒
                });
            },
        }
    });

    $("#bannerSlide .swiper-container").hover(function () {
        bannerSlide.autoplay.stop();
        $('.slide-page .item').stop();
    }, function () {
        bannerSlide.autoplay.start();
        myAnmiate();
    });

    if ($('.slide-page .item').length > 0) {
        myAnmiate();
        $('.slide-page').on("click", function (e) {
            e.preventDefault();
            e.stopPropagation();
            let index = $('.slide-page').index(this);
            bannerSlide.slideToLoop(index, 1000, false);//切换到第一个slide，速度为1秒
        });
    }
    //解决方案 swiperSulutionSlide
    var swiperSulutionSlide = null;
    swiperSulutionSlide = new Swiper('#swiperSulutionSlide .swiper-container', {
        spaceBetween: 20,
        centeredSlides: true,
        slideToClickedSlide: false,
        preventClicksPropagation: true,
        // loop: true,
        autoplay: false,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        scrollbar: {
            el: '.swiper-scrollbar',
        },
    });
    $("#bannerSlide .swiper-container").hover(function () {
        swiperSulutionSlide.autoplay.stop();
    }, function () {
        swiperSulutionSlide.autoplay.start();
    });

    //小程序
    var swiperSolutionSlide = null;
    swiperSolutionSlide = new Swiper('#swiperSolutionSlide .swiper-container', {
        centeredSlides: true,
        slideToClickedSlide: false,
        preventClicksPropagation: true,
        autoplay: false,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        }
    });

    //app页面案例
    var appCaseSlide = null;
    if (isPhone() || $('.new-app-case .swiper-slide').length > 5) {
        appCaseSlide = new Swiper('#appCaseSlide .swiper-container', {
            slidesPerView: 5,
            spaceBetween: 20,
            centeredSlides: true,
            slideToClickedSlide: false,
            preventClicksPropagation: true,
            loop: true,
            autoplay: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                900: {
                    slidesPerView: 3,
                    spaceBetween: 16,
                }
            }
        })
        $("#appCaseSlide .swiper-container").hover(function () {
            appCaseSlide.autoplay.stop();
        }, function () {
            appCaseSlide.autoplay.start();
        });
    } else {
        $('#appCaseSlide .swiper-container').addClass('swiper-no-swiping')
        appCaseSlide = new Swiper('#appCaseSlide .swiper-container', {
            slidesPerView: 5,
            spaceBetween: 20,
            centeredSlides: true,
            slideToClickedSlide: false,
            preventClicksPropagation: false,
            loop: true,
            autoplay: false,
            noSwiping: true,
            breakpoints: {
                900: {
                    slidesPerView: 3,
                    spaceBetween: 16,
                }
            }
        })
    }

    //微信小程序页面案例
    if (isPhone()) {
        var miniProgramCaseSlide = new Swiper('#miniProgramCaseSlide .swiper-container', {
            slidesPerView: 3,
            spaceBetween: 24,
            centeredSlides: true,
            slideToClickedSlide: false,
            preventClicksPropagation: false,
            loop: true,
            autoplay: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                900: {
                    slidesPerView: 3,
                    spaceBetween: 16,
                }
            }
        });
        $("#miniProgramCaseSlide .swiper-container").hover(function () {
            miniProgramCaseSlide.autoplay.stop();
        }, function () {
            miniProgramCaseSlide.autoplay.start();
        });
    } else {
        $('#miniProgramCaseSlide .swiper-container').addClass('swiper-no-swiping')
        var miniProgramCaseSlide = new Swiper('#miniProgramCaseSlide .swiper-container', {
            slidesPerView: 3,
            spaceBetween: 24,
            centeredSlides: true,
            slideToClickedSlide: false,
            preventClicksPropagation: false,
            loop: true,
            autoplay: false,
            noSwiping: true,
            breakpoints: {
                900: {
                    slidesPerView: 3,
                    spaceBetween: 16,
                }
            }
        });
    }


    //web页面案例
    var webCaseSlide = new Swiper('#webCaseSlide .swiper-container', {
        slidesPerView: 1.5,
        spaceBetween: 24,
        centeredSlides: true,
        slideToClickedSlide: false,
        preventClicksPropagation: true,
        autoplay: true,
        loop: true,
        loopedSlides: 5,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            900: {
                slidesPerView: 1.6,
                spaceBetween: 16,
            }
        }
    });
    $("#webCaseSlide .swiper-container").hover(function () {
        webCaseSlide.autoplay.stop();
    }, function () {
        webCaseSlide.autoplay.start();
    });
    //互联网 案例
    var webInternetCaseSlide = new Swiper('#webInternetCaseSlide .swiper-container', {
        slidesPerView: 1.854,
        spaceBetween: 24,
        centeredSlides: true,
        slideToClickedSlide: false,
        preventClicksPropagation: true,
        autoplay: true,
        loop: true,
        freeMode: false,
        loopedSlides: 5,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            900: {
                slidesPerView: 1.6,
                spaceBetween: 16,
            }
        }
    });
    $('.internet-case .swiper-slide').hover(function () {
        let slideActive = $('.internet-case .swiper-slide-active').attr('slide');
        let slide = $(this).attr('slide');
        let index = $('.internet-case .swiper-slide').index(this);
        if (slideActive === slide) {
            $('.internet-case .swiper-slide .case-dec').eq(index).css({
                display: 'block',
            })
        }
    }, function () {
        $('.internet-case .swiper-slide .case-dec').css({
            display: 'none',
        })
    });
    $("#webInternetCaseSlide .swiper-container").hover(function () {
        webInternetCaseSlide.autoplay.stop();
    }, function () {
        webInternetCaseSlide.autoplay.start();
    });
    //流程
    var flowNav = new Swiper('#flowNav', {
        slidesPerView: $('#flowNav .swiper-slide').length,
        speed: 700,
        autoplay: true,
        watchSlidesVisibility: true,/*避免出现bug*/
    });
    var flowContent = new Swiper('#flowContent', {
        autoplay: true,
        speed: 700,
        watchSlidesVisibility: true,/*避免出现bug*/
        thumbs: {
            swiper: flowNav,
        },
        breakpoints: {
            900: {
                pagination: {
                    el: '#flowContent .swiper-pagination',
                },
            }
        }
    });
    $(".flow-slide").hover(function () {
        flowNav.autoplay.stop();
        flowContent.autoplay.stop();
    }, function () {
        flowNav.autoplay.start();
        flowContent.autoplay.start();
    })
    $(document).on('click', '.header-menu a[href^="#"]', function (event) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top - 80
        }, 1000);
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            $('.header-menu').slideToggle("1000");
            $('.menu-toggle').toggleClass('active');
        }
    });
    $('.menu-toggle').click(function () {
        event.preventDefault();
        $(this).toggleClass('active');
        $('.header-menu').slideToggle("1000");
    })

    //新app - 自定义滚动条
    if ($('.app-wrap')) {
        scrollBar();
    }

    //App
    if ($('#closed-footer-form').length > 0) {
        footerMin();
    }
});

// 页面header
function switchNavBg() {
    console.log(32);
    var w = $(window).width();
    var y = $(window).scrollTop();
    var isOpenToggleBtn = $('.navbar-toggle .icon-close-bar').hasClass('hidden')
    if (y > 40) {
        $('#top').removeClass('new-face').addClass('with-shadow');
    } else {
        if (isOpenToggleBtn) {
            $('#top:not(.no-banner)').addClass('new-face').removeClass('with-shadow');
        } else {
            $('#top').removeClass('new-face').addClass('with-shadow');
        }
    }
};

//新app页面自定义滚动条
function scrollBar() {
    let scrollElement = $('.section-service-process .service-list-warp');
    //获取内容的宽
    var contentWidth = $('.section-service-process .service-list').width();
    //可视区的宽
    var clientWidth = scrollElement.width();
    //比例
    var proportion = clientWidth / contentWidth;
    //滚动条的总宽度 ---- 外层轨道
    var scrollWidth = $('.section-service-process .scroll-box').width();
    //设置内层轨道的宽度
    $('.scroll-box .scroll-step').css({
        width: scrollWidth * proportion,
    });
    //内容最大滚动距离
    var contentMaxScrollLeft = contentWidth - clientWidth;
    scrollElement.on('scroll', function () {
        //内容滚动的left值
        let scrollLeft = scrollElement.scrollLeft();
        //设置滚动条外层轨道的滚动距离 - left
        $('.scroll-box .scroll-step').css({
            left: scrollLeft / contentMaxScrollLeft * (scrollWidth - $('.scroll-box .scroll-step').width()),
        })
    })
}

//电商平台
function scrollFunc() {
    switchNavBg();
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset;
    var sectionMore = document.getElementById('section-more-container');
    if (sectionMore) {
        if (scrollTop >= 176) {
            sectionMore.style.bottom = '150px';
        } else {
            sectionMore.style.bottom = scrollTop - 26 + "px";
        }
    }
    if (scrollTop > 0) {
        $('.e-commerce-header').css({
            backgroundImage: "linear-gradient(292deg, #4256e8, #576bff)",
        })
    } else {
        $('.e-commerce-header').css({
            backgroundImage: 'none',
        })
    }

}




//物联网-覆盖业务
function changeTab() {
    let tabTop = $('.internet-work .solution-list-mobile-top .tab');
    let itemTop = $('.section-business-dec-top .section-business-item');
    tabTop.on('click', function () {
        tabTop.removeClass('active');
        itemTop.removeClass('active-content');
        $(this).addClass('active');
        let index = tabTop.index(this);
        itemTop.eq(index).addClass('active-content');
    });
    let tabBottom = $('.internet-work .solution-list-mobile-bottom .tab');
    let itemBottom = $('.section-business-dec-bottom .section-business-item');
    tabBottom.on('click', function () {
        tabBottom.removeClass('active');
        itemBottom.removeClass('active-content');
        let index = tabBottom.index(this);
        $(this).addClass('active');
        itemBottom.eq(index).addClass('active-content');
    });

    //动态设置tab的高度   高度等于宽度
    var width = tabTop.width();
    tabTop.css({
        height: width,
    });
    tabBottom.css({
        height: width,
    });
}

//电商 -- 解决方案
function changeCard() {
    var items = $('.e-commerce-section-solution .solution-item .top');
    var wraps = $('.e-commerce-section-solution .solution-item .wrap');
    var filterBlur = $('.e-commerce-section-solution .solution-item .solution-filter-blur');
    items.on('mouseenter', function () {
        let index = items.index(this);
        filterBlur.removeClass("activeblur");
        filterBlur.eq(index).addClass('activeblur');
        wraps.removeClass('active');
        wraps.eq(index).addClass('active');
    });
}

//电商 -- 零售系统
function changeTabPage() {
    var tabs = $('.section-e-commerce-system .content-list .content-item');
    var tabsContent = $('.section-e-commerce-system .content-dec .item-dec');
    var left = tabs.length > 0 && tabs[0].offsetWidth / 2 + tabs[0].offsetLeft / 2;
    $('.section-e-commerce-system .content-dec .arrow-top').css({
        left: left,
    });
    tabs.on('click', function () {
        tabsContent.removeClass('active');
        let index = tabs.index(this);
        tabsContent.eq(index).addClass('active');
        if (index == 0) {
            $('.section-e-commerce-system .content-dec .arrow-top').css({
                left: left - 5,
            });
        }
        left = tabs[index].offsetWidth / 2 + tabs[index].offsetLeft + tabs[0].offsetLeft / 2;
        $('.section-e-commerce-system .content-dec .arrow-top').css({
            left: left - 5,
        })
    })
}

//App footer最小化
function footerMin() {
    $('#closed-footer-form').on('click', function () {
        $(this).parent().hide();
        $('.min-footer-form-div').show();
        $('.internet-footer-empty-div').css({
            height: "0px"
        })
    });
    $('.min-footer-form-div').on('click', function () {
        $(this).hide();
        $('#closed-footer-form').parent().show();
        $('.internet-footer-empty-div').css({
            height: "166px"
        })
    });
}

function myAnmiate() {
    for (var i = 0; i < $('.slide-page .item').length; i++) {
        if ($($('.slide-page .item')[i]).hasClass("active-slide")) {
            $($('.slide-page .item')[i]).animate({
                width: "70px"
            }, 3000, "linear")
        }
    }
}

//新的小程序

$('.solution-section-mini-program .slider-item').on('mouseenter',function(){
   let index = $(this).index();

   let bgImg = 'content-bg-0' + (index+1);
    $('.solution-section-mini-program  #content').removeClass();
    $('.solution-section-mini-program  #content').addClass(bgImg);
    $('.solution-section-mini-program  #content').addClass("content");

   $('.solution-section-mini-program .slider-item').removeClass('active');
   $(this).addClass('active');

   $('.solution-section-mini-program .item-dec').removeClass('active');
   $('.solution-section-mini-program .item-dec').eq(index).addClass('active');

});

//
//
var liDom = $("#case-content-box .case-nav li");
var caseListDom = $("#case-content-box .case-list");
liDom.on('click',function(){
    liDom.removeClass('active');
    $(this).addClass('active');

    var index = $(this).index();
    caseListDom.css({
        display:"none"
    });
    caseListDom.eq(index).css({
        display:'block'
    })
});


//左侧了解更多
$('#section-slide .btn-list a').on('mouseenter',function(){
    $('#section-slide .btn-list a').removeClass('active');
    $(this).addClass('active');
});

//切换地址
function onChangeAddress(){
    $('#address-tab li').on('click',function () {
        var index = $(this).index();
        $('#address-tab li').removeClass('active');
        $(this).addClass('active');

        $('#address-tab .address-info').hide();
        $('#address-tab .address-info').eq(index).show();

        if(index === 0) {
            $('#address-tab .shanghai-bg').stop().animate({opacity: '0'},0);
            $('#address-tab .beijing-bg').stop().animate({opacity: '1'},600);
        }
        if(index === 1){
            $('#address-tab .shanghai-bg').stop().animate({opacity: '1'},600);
            $('#address-tab .beijing-bg').stop().animate({opacity: '0'},0);
        }
    })
}


//banner  文案展开
function foldContent(){
    $('.fold-content-icon span').on('click',function(){
        $('#fold-content').toggleClass('fold-content');
        $('.fold-content-icon').toggleClass('fold-content-scroll');
    })
}