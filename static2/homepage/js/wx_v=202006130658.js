var gear_wx = {
    clear_form: function () {
        var filedList = ['name', 'phone', 'wechat_qq', 'description'];
        for (var i = 0; i < filedList.length; i++) {
            var filedName = filedList[i];
            var selector = "#bottom-form [name='{filedName}']".replace('{filedName}', filedName);
            if ($(selector).length > 0) {
                $(selector).val('');
                $(selector).removeClass('form-warning');
            }
        }
    },
    validate_proposal: function () {
        var filedList = ['name', 'phone', 'wechat_qq', 'description'];
        var result = true;
        for (var i = 0; i < filedList.length; i++) {
            var filedName = filedList[i];
            var selector = "#bottom-form [name='{filedName}']".replace('{filedName}', filedName);
            var field = $(selector);
            if (field.length > 0) {
                if (filedName == 'description') {
                    if (field.val() && field.val().length >= 5) {
                        field.removeClass("form-warning");
                        $('#bottom-form .form-description-message').hide();
                    } else {
                        field.addClass("form-warning");
                        $('#bottom-form .form-description-message').show();
                        result = false;
                    }
                } else {
                    if (field.val()) {
                        field.removeClass("form-warning");
                    } else {
                        field.addClass("form-warning");
                        result = false;
                    }
                }
            }
        }
        return result;

    },
    submit_proposal: function () {
        if (gear_wx.validate_proposal()) {
            var subWxProposal = {};
            subWxProposal.name = $('#wxName').val();
            subWxProposal.phone = $('#wxPhone').val();
            subWxProposal.description = $('#wxDescription').val();
            subWxProposal.type = '微信小程序';
            SubmitModal.submitProposalData(subWxProposal);
            SubmitModal.showModal();
            gear_wx.clear_form();
        }
    }
};
$(document).ready(function () {
    $('#bottom-form').on('submit', function (e) {
        e.preventDefault();
    });
    $(".wx-submit-proposal").click(gear_wx.submit_proposal)
});

// 新 Wx
console.log($('#questions-div .question-list li'));
$('#questions-div .question-list li').hover(function(){
    $('#questions-div .question-list li').removeClass('active');
    $(this).addClass('active');

},function(){
    // $(this).removeClass('active')
})