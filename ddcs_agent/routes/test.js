/**
 * Created by Administrator on 2017/5/12.
 */
var _ = require('lodash');
var ps = require('current-processes');
var os = require("os");
var child = require("child_process");
// var freemem = os.freemem();
// var totalmem = os.totalmem();
// console.log("freemem:"+freemem);
// console.log("totalmem:"+totalmem);
// console.log("rate:"+freemem/totalmem);
//
// ps.get(function(err, processes) {
//
//     var sorted = _.sortBy(processes, 'cpu');
//     var top5  = sorted.reverse().splice(0,5);
//
//     console.log(top5[0]);
// });
// console.log(os.platform())
// var ls = child.spawn("ipconfig");
var json = {
    "a":"123",
    "b":"234",
    "c":"345"
};
if(1){
    for(var item in json){
        // console.log(json[item])
        if( item == "c"){
            console.log(json[item]);
            break;
        };
    }
}

