/**
 * Created by ttacompu on 11/12/2015.
 */
'use strict';

/* Filters */
angular.module('workoutFeature').filter('secondsToTime', function () {
    return function (input) {
        var sec = parseInt(input, 10);
        if (isNaN(sec)) return "00:00:00";

        var hours = Math.floor(sec / 3600);
        var minutes = Math.floor((sec - (hours * 3600)) / 60);
        var seconds = sec - (hours * 3600) - (minutes * 60);

        return ("0" + hours).substr(-2) + ':'
            + ("0" + minutes).substr(-2) + ':'
            + ("0" + seconds).substr(-2);
    }
});

angular.module('workoutFeature').filter('myLineBreakFilter', function () {
    return function (input) {
        if(input){
            var resultArr =  input.split('.');
            if(resultArr){
                return resultArr.join(".<br /><br />");
            }
            return input;
        }
        return input;

    }
});
