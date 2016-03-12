/**
 * Created by ttacompu on 11/13/2015.
 */

(function () {
    "use strict";
    angular.module("workoutApp").controller("workoutListController", ["$scope", "workoutService", "$location", function ($scope, workoutService, $location) {

        $scope.goto = function (workout) {
            $location.path('/builder/workouts/' + workout.name);
        }

        var init = function () {
             workoutService.getWorkouts().then(function(data){
                 $scope.workouts = data;
            })
        };
        init();

    }])
})();


