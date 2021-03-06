//案例头部背景响应式
$(document).ready(function() {
    var caseHtmlWidth = window.innerWidth;
    var caseHtmlHeight = window.innerHeight;
    toggleSolution(caseHtmlWidth);
    $(window).resize(function(event) {
        caseHtmlWidth = window.innerWidth;
        caseHtmlHeight = window.innerHeight;
        toggleSolution(caseHtmlWidth);
    });
});


// 切换区块链解决方案显示隐藏
var toggleSolution = function(w){
    if(w <= 767){
        $('.solution-info-container.solution-active').siblings('div.solution-info-container').removeClass('hidden');
    }else{
        $('.solution-info-container.solution-active').siblings('div.solution-info-container').addClass('hidden');
    }
};

$('.solution-tab').click(function(e){
    $(this).addClass('active').siblings('div').removeClass('active');
    var target = $(this).attr('data-target');
    setSolutionActive(target);
});
$('.solution-control').click(function(e) {
    var solutionTabs = $('.solution-tab');
    var activeEle = parseInt($('.solution-tab.active').attr('data-target'));
    if($(this).attr('data-control') == 'prev'){
        if(activeEle == 0){
            activeEle = 3;
        }else{
            activeEle--;
        }
    }
    if($(this).attr('data-control') == 'next'){
        if(activeEle == 3){
            activeEle = 0;
        }else{
            activeEle++;
        }
    }
    $(solutionTabs[activeEle]).addClass('active').siblings('.solution-tab').removeClass('active');
    setSolutionActive(activeEle);
});
var setSolutionActive = function(index) {
    $('#solution' + index).removeClass('hidden').addClass('solution-active').siblings('div.solution-info-container').removeClass('solution-active').addClass('hidden');
};


// 案例服务切换
$('#appDevelopStep .step-item').click(function() {
    var targetContent = $(this).attr('data-target');
    $(this).addClass('active').siblings('li').removeClass('active');
    $(targetContent).addClass('active').siblings('.step-content-item').removeClass('active');
    var viewWidth = $('body').width();
    var stepIndex = $(this).index();
    switch(stepIndex){
        case 1:
            $('#appDevelopStep').css({'transform':'translateX(0)'})
        break;
        case 2:
            if(viewWidth <= 414 && viewWidth > 375){
                $('#appDevelopStep').css({'transform':'translateX(-120px)'})
            }else if(viewWidth <= 375 && viewWidth > 320){
                $('#appDevelopStep').css({'transform':'translateX(-150px)'})
            }else if(viewWidth <= 320){
                $('#appDevelopStep').css({'transform':'translateX(-200px)'})
            }
        break;
    }
});
