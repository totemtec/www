function isPhone() {
    console.log(navigator.userAgent)
    let userAgentInfo = navigator.userAgent;
    let Agents = ["Android", "iPhone",
        "SymbianOS", "Windows Phone",
        "iPad", "iPod"];
    let flag = false;
    for (let v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = true;
            break;
        }
    }
    return flag
}

$('#open53kfBtn').click(function () {
    if (isPhone()) {
        let tb_53_api = $53.createApi();
        tb_53_api.push('cmd', 'mtalk');
        tb_53_api.query()
    } else {
        if ($53) {
            let tb_53_api = $53.createApi();
            tb_53_api.push('cmd', 'kfclient');
            tb_53_api.push('type', 'popup');
            let result = tb_53_api.query();
            console.log(result)
        } else if (PageData && PageData.tb_53_client_ur) {
            window.open(PageData.tb_53_client_ur);
        }
    }
});

$('#callBtn').click(function () {
    if (isPhone()) {
        callTal()
    }
});
