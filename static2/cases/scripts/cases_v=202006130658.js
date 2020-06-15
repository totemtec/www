//案例头部背景响应式
$(document).ready(function () {
    var caseHtmlWidth = window.innerWidth;
    var caseHtmlHeight = window.innerHeight;
    toggleSolution(caseHtmlWidth);
    $(window).resize(function (event) {
        caseHtmlWidth = window.innerWidth;
        caseHtmlHeight = window.innerHeight;
        toggleSolution(caseHtmlWidth);
    });
});


// 切换区块链解决方案显示隐藏
var toggleSolution = function (w) {
    if (w <= 767) {
        $('.solution-info-container.solution-active').siblings('div.solution-info-container').removeClass('hidden');
    } else {
        $('.solution-info-container.solution-active').siblings('div.solution-info-container').addClass('hidden');
    }
};

$('.solution-tab').click(function (e) {
    $(this).addClass('active').siblings('div').removeClass('active');
    var target = $(this).attr('data-target');
    setSolutionActive(target);
});
$('.solution-control').click(function (e) {
    var solutionTabs = $('.solution-tab');
    var activeEle = parseInt($('.solution-tab.active').attr('data-target'));
    if ($(this).attr('data-control') == 'prev') {
        if (activeEle == 0) {
            activeEle = 3;
        } else {
            activeEle--;
        }
    }
    if ($(this).attr('data-control') == 'next') {
        if (activeEle == 3) {
            activeEle = 0;
        } else {
            activeEle++;
        }
    }
    $(solutionTabs[activeEle]).addClass('active').siblings('.solution-tab').removeClass('active');
    setSolutionActive(activeEle);
});
var setSolutionActive = function (index) {
    $('#solution' + index).removeClass('hidden').addClass('solution-active').siblings('div.solution-info-container').removeClass('solution-active').addClass('hidden');
};


// 案例服务切换
$('#appDevelopStep .step-item').click(function () {
    var targetContent = $(this).attr('data-target');
    $(this).addClass('active').siblings('li').removeClass('active');
    $(targetContent).addClass('active').siblings('.step-content-item').removeClass('active');
    var viewWidth = $('body').width();
    var stepIndex = $(this).index();
    switch (stepIndex) {
        case 1:
            $('#appDevelopStep').css({'transform': 'translateX(0)'})
            break;
        case 2:
            if (viewWidth <= 414 && viewWidth > 375) {
                $('#appDevelopStep').css({'transform': 'translateX(-120px)'})
            } else if (viewWidth <= 375 && viewWidth > 320) {
                $('#appDevelopStep').css({'transform': 'translateX(-150px)'})
            } else if (viewWidth <= 320) {
                $('#appDevelopStep').css({'transform': 'translateX(-200px)'})
            }
            break;
    }
});

var contentWidth = $('#type-list').width();
//可视区的宽  ---
var clientWidth = $('#type-list ul').width();

//tab页的宽
var tabWidth = $('#type-list ul li').innerWidth();

var tabListNum =  $('#type-list ul li').length;  //tab 的个数

var pagNum = parseInt(clientWidth / tabWidth);  //每页多少个tab

var totalPage = Math.ceil(tabListNum / pagNum);  //多少页

paginationDom();

//创建分页器
function paginationDom() {
    var spanTamp = '';
    for (var i = 0; i < totalPage; i++) {
        var pageSpan = '';
        if (i == 0) {
            pageSpan = "<span class='pagination-item active-tab'></span>";
        } else {
            pageSpan = "<span class='pagination-item'></span>";
        }
        spanTamp += pageSpan;
    }
    $('#pagination-div .pagination-wrap').html(spanTamp);
}

//案例类型切换-一级
$('#type-list .type-list-item').on('click', function () {
    $('#type-list .type-list-item').removeClass('active');
    $(this).addClass('active');
});

//点击分页器
$('#pagination-div .pagination-item').on('click', function () {
    var index = $(this).index();
    $('#type-list').scrollLeft(index * clientWidth);
    $('#pagination-div .pagination-item').removeClass('active-tab');
    $(this).addClass('active-tab');
});

//滚动改变分页器
$('#type-list').on('scroll', function () {
    var scrollLeft = $('#type-list').scrollLeft();
    var currentPage = Math.ceil(scrollLeft / clientWidth);  //滚动到第几页
    $('#pagination-div .pagination-item').removeClass('active-tab');
    $('#pagination-div .pagination-item').eq(currentPage).addClass('active-tab')
});


//案例类型切换-二级
$('#case-tab-nav ul li a').on('click', function () {
    $('#case-tab-nav ul li a').removeClass('active');
    $(this).addClass('active');
    var index = $(this).index();

});