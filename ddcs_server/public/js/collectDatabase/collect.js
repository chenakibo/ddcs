$(function () {
    var data = {
        labels : ["January","February","March","April","May","June","July"],
        datasets : [
            {
                fillColor : "transparent",     //背景色，常用transparent透明
                strokeColor : "rgba(220,220,220,1)",  //线条颜色，也可用"#ffffff"
                pointColor : "rgba(220,220,220,1)",   //点的填充颜色
                pointStrokeColor : "#fff",            //点的外边框颜色
                data : [65,59,32,29,46,55,40]      //点的Y轴值
            },
            {
                fillColor : "rgba(151,187,205,0.5)",
                strokeColor : "rgba(151,187,205,1)",
                pointColor : "rgba(151,187,205,1)",
                pointStrokeColor : "#fff",
                data : [28,48,40,19,96,27,100]
            }
        ]
    };
    //定义图表的参数
    var config = {
        // scaleStartValue :null,     // Y 轴的起始值
        scaleLineColor : "rgba(0,0,0,.1)",    // Y/X轴的颜色
        // scaleLineWidth : 1,        // X,Y轴的宽度
        // scaleShowLabels : true,    // 刻度是否显示标签, 即Y轴上是否显示文字
        // scaleLabel : "<%=value%>", // Y轴上的刻度,即文字
        // scaleFontFamily : "'Arial'",  // 字体
        scaleFontSize : 20,        // 文字大小
        scaleFontStyle : "normal",  // 文字样式
        scaleFontColor : "#58b3ee",    // 文字颜色
        scaleShowGridLines : true,   // 是否显示网格
        scaleGridLineColor : "rgba(153,206,231,.05)",   // 网格颜色
        scaleGridLineWidth : 2,      // 网格宽度
        bezierCurve : false,         // 是否使用贝塞尔曲线? 即:线条是否弯曲
        pointDot : true,             // 是否显示点数
        pointDotRadius : 8,          // 圆点的大小
        pointDotStrokeWidth : 1,     // 圆点的笔触宽度, 即:圆点外层边框大小
        datasetStroke : true,        // 数据集行程
        datasetStrokeWidth : 2,      // 线条的宽度, 即:数据集
        datasetFill : true,         // 是否填充数据集
        animation : true,            // 是否执行动画
        animationSteps : 60,          // 动画的时间
        animationEasing : "easeOutQuart",    // 动画的特效
        onAnimationComplete : null    // 动画完成时的执行函数
    }
    var cxt = $("#myChart").get(0).getContext("2d");
    var line = new Chart(cxt);
    line.Line(data,config);


    /*
     * 跳转到首页
     * */
    $("#site_manager").click(function () {
        location.href="https://localhost:11111/index";
    });
    /*
     * 跳转到数据采集页面
     * */
    $("#data_collect").click(function () {
        location.href="https://localhost:11111/collect";
    });
    /*
     * 跳转到用户管理页面
     * */
    $("#user_manager").click(function () {
        location.href="https://localhost:11111/user";
    });
})