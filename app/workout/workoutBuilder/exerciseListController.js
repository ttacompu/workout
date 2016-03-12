/**
 * Created by ttacompu on 11/15/2015.
 */
angular.module('workoutApp')
    .controller('exerciseListController', ['$scope', 'workoutService', '$location', function ($scope, workoutService, $location) {
        $scope.goto = function (exercise) {
            $location.path('/builder/exercises/' + exercise.name);
        }
        var init = function () {
            $scope.exercises = workoutService.Exercises.query();
        };
        init();
    }]);

