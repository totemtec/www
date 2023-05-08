function hasAllKeys(keyList, object) {
    for (let index in keyList) {
        if (!object.hasOwnProperty(keyList[index])) {
            return false
        }
    }
    return true
}

function urlParamsParse(str) {
    let params = {};
    let paramStr = str || window.location.search.slice(1);
    if (paramStr.length <= 0) {
        return params
    }
    paramStr.replace(/([^=&]+)=([^&]*)/g, function (m, key, value) {
        params[decodeURIComponent(key)] = decodeURIComponent(value);
    });
    return params;
}

//通用Request
function commonRequest(type, url, params, func) {
    params = params ? params : {};
    if (type.toUpperCase() != 'GET') {
        params = JSON.stringify(params)
    }
    let request = $.ajax({
        type: type,
        url: url,
        contentType: 'application/json',
        data: params,
        success: function (data) {
            func(data);
        },
        error: function (err) {
            func(err);
        }
    });
    return request
}

function buildProposalData(proposalData) {
    let params = urlParamsParse();
    if (location.hash) {
        proposalData.code = location.hash.substr(1);
    }
    if (params.track_code) {
        proposalData.track_code = params.track_code;
    }
    proposalData.path = window.location.pathname;
    proposalData.href = window.location.href;
    let referer = $.cookie('gearSourceReferer');
    if (referer && proposalData.href != referer) {
        proposalData.recent_referer = referer
    }
    if (document.referrer) {
        if (document.referrer.indexOf("ad.toutiao") != -1) {
            proposalData.recent_referer = document.referrer;
            proposalData.source = "头条"
        } else if (document.referrer.indexOf("www.baidu.com") != -1) {
            proposalData.recent_referer = document.referrer;
            proposalData.source = "百度"
        }
    }
    return proposalData

}

function commonSubmitProposal(proposalData, func) {
    if (hasAllKeys(['name', 'phone', 'description'], proposalData)) {
        let subData = buildProposalData(proposalData);
        let url = '/projects/proposal/submit';
        commonRequest('POST', url, subData, func)
    } else {
        func({result: false, message: "姓名、联系方式、需求描述为必填"});
    }
}


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

function isMobile() {
    return isPhone()
}

// 拨打电话
function callTal() {
    if (isPhone()) {
        window.location.href = "tel:138-8888-8888";
    }
}

$(function () {
    setSourceReferer()
});

//Referer的设置
function setSourceReferer() {
    let params = urlParamsParse();
    if (params.hasOwnProperty('source')) {
        let referer = $.cookie('gearSourceReferer');
        if (!(params.source != 'baidu' && referer && referer.indexOf("source=baidu") != -1)) {
            $.cookie('gearSourceReferer', window.location.href, {expires: 1});
        }
    }
}