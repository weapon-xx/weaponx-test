countClick(1); ..... //1、第三方实现统计：预约点击量
//2、发起预约请求
orderGameCenter({
    appid : 1105826135, //预约游戏的appid
    jsonid : 194994,    //项目ID，区分来源（不同业务ID不同，来源的jsonid如何创建？请参阅第4部分）
    callback : function(json){
        var msg = "系统繁忙，请稍后再试", ret,
            allMsg = {
                0 : "恭喜你预约成功",
                1995001 : "你已经预约过了"
            };
        try{
            ret = json.data.key.retBody.result;//更多返回码含义请参阅第3部分
            ret == 0 && countClick(2);//3、请求成功，第三方实现统计：预约成功
            msg = allMsg[ret] || msg;
        }catch(e){}
        alert(msg);
    }
})
//第三方统计号码包、点击率逻辑
function countClick(success){
}
function orderGameCenter(args){
    var cb = args.callback;
    //预约游戏的appid
    var appid = args.appid;
    //项目ID，区分来源
    var jsonid = args.jsonid;
    //平台ID，区分安卓和IOS
    var isIOS = /iphone|ipad|ipod|itouch/.test( navigator.userAgent.toLowerCase() );
    var platid = isIOS ? 2 : 1;
    var g_tk = getToken();
    //拼接请求串，注意：tt字段的值必须整数不能用双引号括起来
    var orderUrl = location.protocol + '//info.gamecenter.qq.com/cgi-bin/gc_gameinfo_v2_fcgi?param={"key":{"param":{"tt":' + platid + ',"appid":"' + appid + '","source":"' + jsonid + '"},"module":"gc_gameinfo_v2","method":"subscribeUpcomingGameV2"}}&g_tk=' + g_tk;
    //发起请求
    requestAjax({
        url: orderUrl,
        callback: function (json) {
            cb && cb(json);//请求回调
        }
    });
    //获取Token
    function getToken() {
        for (var t = 5381, e = getCookie("skey") || "", i = 0, n = e.length; i < n; ++i)
            t += (t << 5) + e.charCodeAt(i);
        return 2147483647 & t
    }
    //获取cookie
    function getCookie(t) {
        if (document.cookie && "" !== document.cookie) {
            var e = document.cookie.split("; ");
            t = encodeURIComponent(t);
            for (var i, n = 0, o = e.length; n < o; n++)
                if (i = e[n].split("="),
                t == i[0])
                    return decodeURIComponent(i[1] || "")
        }
        return null
    }
    //AJAX请求
    function requestAjax(data){
        var url = data.url, cache = data.cache || false, dataType = data.dataType || 'json',
              timeout = data.timeout || 5000, callback = data.callback;
        if(!data.token_diseabled && (url.indexOf('&g_tk=') < 0 && url.indexOf('?g_tk=') < 0)){
            url += (url.indexOf('?') > -1 ? '&g_tk=' : '?g_tk=') + getToken();
        }
        $.ajax({
            url : url,
            cache   : cache,
            dataType: dataType,
            timeout : timeout,
            xhrFields: {
                withCredentials: true
            },
            success : function(json){
                /*jshint expr:true*/
                callback && callback(json);
            },
            error : function(){
                /*jshint expr:true*/
                callback && callback({
                    result : 5,
                    ret    : 5,
                    msg    : "网络异常，请稍后再试！"
                });
            }
        });
    }
}
3 返回

{
    "data": {
        "key1": {
            "method": "subscribeUpcomingGameV2",
            "retBody": {
                "data": {
                    "dummy": 0,
                    "societyUrl": "",
                    "tribeId": 351946,
                    "yybPreDownloadId": 0
                },
                "message": "",
                "result": 1995001  //关注：返回码
            },
            "retCode": 0,
            "retMsg": ""
        }
    },
    "ecode": 0
}
