//提交需求 需求内容监
function textAreaInput(e) {
    if (e.target.value.length >= 5) {
        $(e.target).siblings('.form-description-message').hide()
        $(e.target).removeClass('form-warning');
    }
}

/*****新首页背景*****/
var switchNavBg = function () {
    var w = $(window).width();
    var y = $(window).scrollTop();
    var isOpenToggleBtn = $('.navbar-toggle .icon-close-bar').hasClass('hidden')
    if (y > 5) {
        $('#top').removeClass('new-face').addClass('with-shadow');
    } else {
        if (isOpenToggleBtn) {
            $('#top:not(.no-banner)').addClass('new-face').removeClass('with-shadow');
        } else {
            $('#top').removeClass('new-face').addClass('with-shadow');
        }
    }
};
switchNavBg();
/*****新首页背景结束*****/


var checkRealmName = function () {
    var host = window.location.hostname;
    if (host.search(/192|127|localhost|chilunyc.com/g) == -1) {
        $.ajax({
            type: 'POST',
            url: 'https://chilunyc.com/common/current_site',
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
            data: {hostname: host}
        })
    }
};

$(document).ready(function () {
    $('#proposal-form').on('submit', function (e) {
        e.preventDefault();
    });
    $(window).scroll(function (event) {
        switchNavBg();
    });
    switchNavBg();
    $(window).resize(function (event) {
        switchNavBg();
    });
    if (location.hash === '#submit_proposal') {
        SubmitModal.open_modal();
    }
    checkRealmName();
});


// 渲染提交需求按钮

//行业菜单
$('.hangye-has-arrow').click(function () {
    $(this).toggleClass('hangye-open');
});
$('.navbar-toggle').click(function () {
    var y = $(window).scrollTop();
    $('.navbar-toggle .icon-bar').toggleClass('hidden');
    $('.navbar-toggle .icon-close-bar').toggleClass('hidden');
    if (y == 0) {
        $('.site-header').toggleClass('new-face');
    }
});

//header  tab的选中样式
let pathName = window.location.pathname;
$('#headerNav a').each(function (index, item) {
    if ($(item).attr('href') == pathName) {
        $(item).addClass('nav-active');
    }
    if ($(item).attr('href') == '/cases/' && /^(\/cases\/)/.test(pathName)) {
        $(item).addClass('nav-active');
    }
});

$('#header-solution a').each(function (index, item) {
    if ($(item).attr('href') == pathName) {
        $('#header-solution-title').addClass('nav-active');
    }
});

//案例部分LOGO切换
$('#case-logo-div .case-logo-item').hover(function(){
    var index = $(this).index();
    $('#case-logo-dec .case-logo-dec-item').eq(index).show();
},function(){
    $('#case-logo-dec .case-logo-dec-item').hide();
});

$('#case-logo-dec .case-logo-dec-item').hover(function(){

    var index = $(this).index();
    $('#case-logo-dec .case-logo-dec-item').hide();
    $('#case-logo-dec .case-logo-dec-item').eq(index).show();

},function(){
    $('#case-logo-dec .case-logo-dec-item').hide();
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
            $('#address-tab .shanghai-bg').stop().animate({opacity: '0'},100);
            $('#address-tab .beijing-bg').stop().animate({opacity: '1'},400);
        }
        if(index === 1){
            $('#address-tab .shanghai-bg').stop().animate({opacity: '1'},400);
            $('#address-tab .beijing-bg').stop().animate({opacity: '0'},100);
        }
    })
}
onChangeAddress();

//移动端  tab切换
function onChangeTab() {
    $('#tab-box .tab').on('click',function(){
        var index = $(this).index();
        $('#tab-box .tab').removeClass('active');
        $(this).addClass('active');

        $('#content-div .content').hide();
        $('#content-div .content').eq(index).show();
    })
}
onChangeTab();

// 案例log轮播
// var caseNav = new Swiper ('#case-logo-nav', {
//     slidesPerView:4,
//     autoplay: false,
//     watchSlidesVisibility: true,/*避免出现bug*/
// });
// var caseContent = new Swiper('#case-logo-content', {
//     spaceBetween: 30,
//     autoplay: false,
//     speed: 700,
//     // effect : 'fade',
//     watchSlidesVisibility: true,/*避免出现bug*/
//     thumbs: {
//         swiper: caseNav,
//     },
// });
//
// $(".flow-slide").hover(function () {
//     caseNav.autoplay.stop();
//     caseContent.autoplay.stop();
// }, function () {
//     caseNav.autoplay.start();
//     caseContent.autoplay.start();
// });


//案例切换  自动切换
var activeIndex = 0;
var interVal = null;
function onChangeCases(index){
    activeIndex = index;
    $('#case-logo-nav .case-logo-item').removeClass('active');
    $('#case-logo-nav .case-logo-item').eq(index).addClass('active');

    $('#case-logo-content .case-logo-item').hide();
    $('#case-logo-content .case-logo-item').eq(index).show();

}


function setInter(){
    interVal = setInterval(function(){
        activeIndex++;
        if(activeIndex > $('#case-logo-nav .case-logo-item').length - 1){
            activeIndex = 0;
        }
        onChangeCases(activeIndex);

    },3000);
}
setInter();

var timer = null;
$('#case-logo-nav .case-logo-item').on('click',function(){
    var index = $(this).index();
    onChangeCases(index);

    clearInterval(interVal);

    if(!timer) {
        // clearTimeout(timer);
        timer = setTimeout(function () {
            setInter();
        }, 5000);
    }
});

// $('#case-logo-nav .case-logo-item').hover(function(){
//     console.log('clear');
//     clearInterval(interVal)
// },function(){
//     setInter();
// });
