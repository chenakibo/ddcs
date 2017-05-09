/**
 * Created by Administrator on 2017/5/8.
 */
function uxAlert(content,callback,title)
{
    // if(hasBgFlag == undefined)
    // {
    //     hasBgFlag = false;
    // }
    // top.d3.select("#noDataBg")
    //     .style({
    //         "display":"none",
    //         "z-siteManager":"0"
    //     });
    if(content == "")
    {
        return;
    }
    var $alertCount = $('.closejAlert');
    if(typeof  $alertCount != "undefined")
    {
        if($alertCount.length > 0)
        {
            var $confirmBt = $('.ja_body').children('div');
            if($confirmBt.length == 0)
            {
                return;
            }
        }
    }
    var myTitle = title ||"优炫软件提示您";
    if(typeof $.jAlert == "function")
    {
        $.jAlert({'title':myTitle,
            'content': content,
            'theme':'blue',
            'btns':[{
                'text':'确认','closeAlert':true,'theme':'yellow','classes':'hintSureBtn'
            }],
            'replaceOtherAlerts':true,
            'closeBtnAlt':false,
            'animationTimeout': 400,
            'autofocus':'.ja_btn',
            'onClose': function(alert){
                if(typeof callback == "function")
                {
                    callback();
                }
                // if(hasBgFlag)
                // {
                //     top.d3.select("#noDataBg")
                //         .style({
                //             "display":"block",
                //             "z-siteManager":"1"
                //         });
                // }
                return false;
            }});
    }
    else
    {
        alert(content);
        if(typeof callback == "function")
        {
            callback();
        }
    }

}


function uxConfirm(content,callback,title)
{
    if(content == "")
    {
        if(typeof callback == "function")
        {
            callback(false);
        }
        return false;
    }
    var myTitle = title ||"优炫软件提示您";
    if(typeof $.jAlert == "function")
    {
        $.jAlert({
            'type':'confirm',
            'title':myTitle,
            'content': content,
            'theme':'blue',
            'animationTimeout': 400,
            'confirmQuestion': content,
            'replaceOtherAlerts':true,
            'confirmBtnText': '&nbsp;是&nbsp;',
            'denyBtnText': '&nbsp;否&nbsp;',
            'confirmAutofocus': '.confirmBtn',
            'onConfirm': function(e, btn){
                e.preventDefault();
                if(typeof callback == "function")
                {
                    callback(true);
                }
                return false;
            },
            'onDeny': function(e, btn){
                e.preventDefault();
                if(typeof callback == "function")
                {
                    callback(false);
                }
                return false;
            }
        });
    }
    else
    {
        var ret =  confirm(content);
        if(typeof callback == "function")
        {
            callback(ret);
        }
        return ret;
    }
}

