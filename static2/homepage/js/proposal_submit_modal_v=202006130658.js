var SubmitModal = {
    showModal: function () {
        $('.landing-submit-modal').show();
        $('.landing-submit-modal .form-modal').show();
        stopBodyScroll(true);
    },
    closeModal: function () {
        $('.landing-submit-modal .center-box').hide();
        $('.landing-submit-modal').hide();
        stopBodyScroll(false);
    },
    descriptionAreaInput: function (e) {
        if (e.target.value.length >= 5) {
            $(e.target).siblings('.form-description-message').hide();
            $(e.target).removeClass('form-warning');
        }
    },
    submitProposalForm: function (wrapId) {
        var subData = {};
        //姓名 手机号 描述 预算 公司名
        var filedList = ['name', 'phone', 'description', 'budget', 'company', 'project_category'];
        for (var i = 0; i < filedList.length; i++) {
            var filedName = filedList[i];
            var selector = "#{wrapId} [name='{filedName}']".replace('{wrapId}', wrapId).replace('{filedName}', filedName);
            if ($(selector).length > 0) {
                var fieldValue = $(selector).val() && ($(selector).val() instanceof Array)
                    ?
                    $(selector).val().join(',').trim()
                    :
                    $(selector).val().trim();
                // var fieldValue = value;
                if (filedName == 'description') {
                    console.log(filedName)
                    if (!fieldValue || fieldValue.length < 5) {
                        $(selector).siblings('.form-description-message').show();
                        $(selector).addClass('form-warning');
                        return
                    }
                }
                subData[filedName] = fieldValue
            }
        }
        for (var filedName in subData) {
            var fieldValue = subData[filedName];
            if (!fieldValue) {
                return
            }
        }
        $('#' + wrapId + ' .submit-ing-footer').show();
        for (var i = 0; i < filedList.length; i++) {
            var filedName = filedList[i];
            var selector = "#{wrapId} [name='{filedName}']".replace('{wrapId}', wrapId).replace('{filedName}', filedName);
            $(selector).val('')
        }
        this.submitProposalData(subData)
    },
    submitProposalData: function (proposalData) {
        var that = this;
        $('.landing-submit-modal .form-modal').hide();
        $('.landing-submit-modal .loading-modal').show();
        commonSubmitProposal(proposalData, function (data) {
            if (data.result) {
                $('.landing-submit-modal .loading-modal').hide();
                $('.landing-submit-modal .success-modal').show();
            } else {
                $('.landing-submit-modal .loading-modal').hide();
                $('.landing-submit-modal .err-modal').show();
            }
            setTimeout(function () {
                that.closeModal()
            }, 3600)
        });
    },
}

//是否允许body滚动
function stopBodyScroll(isFixed) {
    if (isFixed) {
        var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        document.body.style.cssText
            +=
            'position:fixed;width:100%;top:-' + scrollTop + 'px;';
    } else {
        var body = document.body;
        body.style.position = 'static';
        var top = body.style.top;
        document.body.scrollTop = document.documentElement.scrollTop = -parseInt(top);
        body.style.top = '';
    }
}

$('.open-modal').click(SubmitModal.showModal);
//解决微信浏览器输入框顶部布局不会弹的问题
$("input,textarea,select").blur(function () {
    setTimeout(function () {
        var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
        window.scrollTo(0, Math.max(scrollHeight, 0));
    }, 100)
    /*setTimeout(() => {
        var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
        window.scrollTo(0, Math.max(scrollHeight - 1, 0));
    }, 100);*/
});


// 底部提交表单
function submitFootForm(wrapId) {
    var subData = {};
    //姓名 手机号 描述 预算 公司名
    var filedList = ['name', 'phone', 'description', 'budget', 'company', 'project_category'];
    for (var i = 0; i < filedList.length; i++) {
        var filedName = filedList[i];
        var selector = "#{wrapId} [name='{filedName}']".replace('{wrapId}', wrapId).replace('{filedName}', filedName);
        if ($(selector).length > 0) {
            var fieldValue = $(selector).val() && ($(selector).val() instanceof Array)
                ?
                $(selector).val().join(',').trim()
                :
                $(selector).val().trim();
            // var fieldValue = value;
            if (filedName == 'description') {
                console.log(filedName)
                if (!fieldValue || fieldValue.length < 5) {
                    $(selector).siblings('.form-description-message').show();
                    $(selector).addClass('form-warning');
                    return
                }
            }
            subData[filedName] = fieldValue
        }
    }
    for (var filedName in subData) {
        var fieldValue = subData[filedName];
        if (!fieldValue) {
            return
        }
    }
    $('#' + wrapId + ' .submit-ing-footer').show();
    for (var i = 0; i < filedList.length; i++) {
        var filedName = filedList[i];
        var selector = "#{wrapId} [name='{filedName}']".replace('{wrapId}', wrapId).replace('{filedName}', filedName);
        $(selector).val('')
    }
    this.submitFootData(wrapId,subData)
}
function submitFootData(wrapId,proposalData) {
    $('#' + wrapId + ' .form-modal').hide();
    $('#' + wrapId + ' .loading-modal').show();
    commonSubmitProposal(proposalData, function (data) {
        if (data.result) {
            $('#' + wrapId + ' .loading-modal').hide();
            $('#' + wrapId + ' .success-modal').show();
        } else {
            $('#' + wrapId + ' .loading-modal').hide();
            $('#' + wrapId + ' .err-modal').show();
        }
        setTimeout(function () {
            $('#' + wrapId + ' .loading-modal').hide();
            $('#' + wrapId + ' .success-modal').hide();
            $('#' + wrapId + ' .err-modal').hide();
            $('#' + wrapId + ' .form-modal').show();
        }, 3600)
    });
}
function closeForm(wrapId){

    $('#' + wrapId + ' .loading-modal').hide();
    $('#' + wrapId + ' .success-modal').hide();
    $('#' + wrapId + ' .err-modal').hide();
    $('#' + wrapId + ' .form-modal').show();
}