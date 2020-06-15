$(function () {
    $('#quicklyOpenSubModal').css({display: 'block'});
    //落地页手机端 右侧栏不展示
    // if (!isPhone()) {
    //     $('#quicklyOpenSubModal').css({display: 'block'})
    // } else {
    //     $('#quicklyOpenSubModal').css({display: 'none'})
    // }
    //53客服弹窗关闭后 弹出自定义弹窗
    // $(document.body).on('click', '#inv_box_53kf div:first-child', function () {
    //     setTimeout(showLandingKfAlertModal, 15000);
    // });
    //自定义弹窗，页面加载完后2s弹出
    if (!isPhone()) {
        setTimeout(showLandingKfAlertModal, 5000);
    }

    //打开53客服咨询窗口
    $('.open-53kf-btn').on('click', function () {
        if (isPhone()) {
            let tb_53_api = $53.createApi();
            tb_53_api.push('cmd', 'mtalk');
            tb_53_api.query();
        } else {
            if (PageData && PageData.tb_53_client_ur) {
                window.open(PageData.tb_53_client_ur);
            }
        }
    });
    //
    $('#submit-phone-to-53kf').on('click', function () {
        let phone = $('#53kf-submit-phone').val().trim();
        if (phone) {
            if ($53) {
                let tb_53_auto_api = $53.createApi();
                tb_53_auto_api.push('cmd', 'lword');
                tb_53_auto_api.push('msg', '获取报价');
                tb_53_auto_api.push('phone', phone);
                tb_53_auto_api.query();
                let msg = '你好，我需要获取关于项目报价的详细信息，我的手机号为: ' + phone;
                tb_53_auto_api.push('cmd', 'custmsg');
                tb_53_auto_api.push('msg', msg);
                tb_53_auto_api.push('type', '1'); //type:0 无操作  type:1 打开悬浮窗  type:2打开新窗口
                tb_53_auto_api.query();
                //清空input的value
                $('#53kf-submit-phone').val('');
            }
        } else {
            $('#53kf-submit-phone').addClass('input-warning');
        }
    });

    //解决微信浏览器输入框顶部布局不会弹的问题
    $("input,textarea,select").blur(function () {
        setTimeout(function () {
            let scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
            window.scrollTo(0, Math.max(scrollHeight - 1, 0));
        }, 100)
        /*setTimeout(() => {
            var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
            window.scrollTo(0, Math.max(scrollHeight - 1, 0));
        }, 100);*/
    });
    // 按钮显示弹框
    $(".open-submit-modal-btn").click(function () {
        closedLandingKfAlertModal();
        SubmitModal.showModal();
    });
    //案例点击显示弹框
    // $(".case-slide").find(".swiper-slide").on('click', function () {
    //     closedLandingKfAlertModal();
    //     SubmitModal.showModal();
    // });
    //返回顶部
    $(document).on('scroll', function () {
        let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        if (scrollTop > 500) {
            $('.quickly-open-btn.callback-top-btn').show();
        } else {
            $('.quickly-open-btn.callback-top-btn').hide();
        }
    });
    callBackTop();
    isSelectPickerShow();
});

//定时弹窗
function showLandingKfAlertModal() {
    //判断提交需求表单是否显示
    if ($('.landing-submit-modal').css("display") == 'none') {
        $('.modal-alter').show();
    }
}

// 关闭弹窗后15秒后自动展示
function closedLandingKfAlertModal() {
    $('.modal-alter').hide();
    setTimeout(showLandingKfAlertModal, 20000);
}

//提交需求的弹框
//判断弹框中是否有    selectpicker
function isSelectPickerShow() {
    let display = $('.composite-project-category').css('display');
    if (display === 'none') {
        $('.composite-project-category').html(' ')
    }
}

//提交表单数据处理
function submitForm(wrapId) {
    let subData = {};
    //姓名 手机号 描述 预算 公司名
    let filedList = ['name', 'phone', 'description', 'budget', 'company', 'project_category'];
    for (let i = 0; i < filedList.length; i++) {
        let filedName = filedList[i];
        let selector = "#{wrapId} [name='{filedName}']".replace('{wrapId}', wrapId).replace('{filedName}', filedName);
        if ($(selector).length > 0) {
            let fieldValue = $(selector).val() && ($(selector).val() instanceof Array)
                ?
                $(selector).val().join(',').trim()
                :
                $(selector).val().trim();
            // let fieldValue = value;
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
    for (let filedName in subData) {
        let fieldValue = subData[filedName];
        if (!fieldValue) {
            return
        }
    }
    $('#' + wrapId + ' .submit-ing-footer').show();
    for (let i = 0; i < filedList.length; i++) {
        let filedName = filedList[i];
        let selector = "#{wrapId} [name='{filedName}']".replace('{wrapId}', wrapId).replace('{filedName}', filedName);
        $(selector).val('')
    }
    if ($(".selectpicker").length > 0) {
        $(".selectpicker").selectpicker('refresh');//刷新
    }
    submitProposalFoot(subData, wrapId);
}

//提交表单后 结果展示
function submitProposalFoot(proposalData, wrapId) {
    commonSubmitProposal(proposalData, function (data) {
        if (data.result) {
            $('#' + wrapId + ' .submit-success-center.success').show();
            $('#' + wrapId + ' .submit-success-center.err').hide();

            $('#' + wrapId + ' #footer-success').show();
            $('#' + wrapId + ' #footer-error').hide();
        } else {
            $('#' + wrapId + ' .submit-success-center.success').hide();
            $('#' + wrapId + ' .submit-success-center.err').show();

            $('#' + wrapId + ' #footer-success').hide();
            $('#' + wrapId + ' #footer-error').show();
        }
        $('#' + wrapId + ' .submit-ing-footer').hide();
        $('#' + wrapId + ' .submit-success-footer').show();
        $('#closed-footer-form').hide();
        setTimeout(function () {
            $('#' + wrapId + ' .submit-ing-footer').hide();
            $('#' + wrapId + ' .submit-success-footer').hide();
            $('#' + wrapId + ' #footer-success').hide();
            $('#' + wrapId + ' #footer-error').hide();
            $('#closed-footer-form').show();
        }, 3600)
    });
}

//提交需求 需求内容监测
function textAreaInput(e) {
    if (e.target.value.length >= 5) {
        $(e.target).siblings('.form-description-message').hide();
        $(e.target).removeClass('form-warning');
    }
}

//获取报价 手机号监听
function phoneInput(e) {
    if (e.target.value && e.target.value.trim()) {
        $(e.target).removeClass('input-warning')
    }
}

// 返回顶部
function callBackTop() {
    $('.quickly-open-btn.callback-top-btn').on('click', function () {
        // document.body.scrollTop  = 0;
        // document.documentElement.scrollTop = 0;
        $("html,body").animate({"scrollTop": 0}, 'slow')
    });
}


//侧边栏效果   id:dom的id  默认的bottom   滚动的top值
function sliderScrollFunc(id, defaultBottom, scrTop, resultBottom) {
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset;
    var dom = document.getElementById(id);
    if (dom) {
        if (scrollTop >= scrTop) {
            dom.style.bottom = resultBottom + 'px';
        } else {
            dom.style.bottom = scrollTop - defaultBottom + "px";
        }
    }
}

function scrollFn() {
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset;
    if (scrollTop > 0) {
        $('#header').css({
            backgroundImage: "linear-gradient(137deg, #0045ED 0%, #132CA7 100%)"
        })
    } else {
        $('#header').css({
            backgroundImage: 'none',
        });
    }
}