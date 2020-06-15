$(document).ready(function () {
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
})