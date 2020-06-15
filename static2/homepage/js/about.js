var spaceWidth = window.innerWidth;
$(document).ready(function() {
    var spaceWidth = window.innerWidth;
    $('.left-angel').css({
        'border-left': spaceWidth + 'px solid transparent',
    });
    $('.right-angel').css({
        'border-left': spaceWidth + 'px solid #fff'
    });
    let popLogo = $('#partnerLogoWall > .partner-logo');
    // var popLogo = $('#partnerLogoWall > .test');
    for(let i = 0; i <  popLogo.length; i++){
        moveLogo(popLogo[i], 30);
    }
    $(window).resize(function() {
        spaceWidth = window.innerWidth;
        $('.left-angel').css({
            'border-left': spaceWidth + 'px solid transparent'
        });
        $('.right-angel').css({
            'border-left': spaceWidth + 'px solid #fff'
        });
    });
});

var moveLogo = function(select, step){
    var target = $(select);
    var pHeight = $('#partnerLogoWall').height();
    var targetTransform = target.css('transform');
    var startY = '';
    var startX = '';
    if(targetTransform.search('matrix3d') != -1){
        startY = parseInt(target.css('transform').substring(9).split(',')[13]);
        startX = parseInt(target.css('transform').substring(9).split(',')[12]);
    }else{
        startY = parseInt(target.css('transform').substring(7).split(',')[5]);
        startX = parseInt(target.css('transform').substring(7).split(',')[4]);
    }
    window.setInterval(function() {
        target.css('opacity',1);
        startY -= step;
        if(startY < 0){
            startY = pHeight;
            target.css('opacity',0);
        }
        target.css('transform', 'translate3d('+ startX +'px, '+ startY +'px, 0)');
    },2000)
}

