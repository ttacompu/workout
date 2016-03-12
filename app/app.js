/**
 * Created by ttacompu on 11/7/2015.
 */
(function(){
    "use strict";
    angular.module("workoutApp", ["ngRoute","ngSanitize","ngResource",'ngAnimate', "ngMessages","workoutFeature", "workoutBuilder", "mediaPlayer","ui.bootstrap", 'LocalStorageModule']);
    angular.module('workoutBuilder', ['workoutFeature']);
    angular.module("workoutFeature", [])

})();
