/*
 * fun:login interface
 * */
function registerAjaxInterface () {}
registerAjaxInterface.prototype.ajaxRequest = function(bAsync,jsonDataStr,callbackFunc)
{
    $.ajax({
        async :bAsync,
        type  :'post',
        url   :serverAddress  + "/user",
        data  :{"postData":jsonDataStr},
        error :function(jsonString) {
            var errJsonObj = jsonString;
            if(typeof jsonString == "string")
            {
                errJsonObj  = JSON.parse(jsonString);
            }
            errJsonObj.rstcode = "error";
            callbackFunc(JSON.stringify(errJsonObj));
        },
        success :function(jsonString) {
            callbackFunc(jsonString);
        }
    });
};