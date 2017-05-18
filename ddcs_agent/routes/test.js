/**
 * Created by Administrator on 2017/5/12.
 */
var _ = require('lodash');
var ps = require('current-processes');

ps.get(function(err, processes) {

    var sorted = _.sortBy(processes, 'cpu');
    var top5  = sorted.reverse().splice(0,5);

    console.log(top5);
});