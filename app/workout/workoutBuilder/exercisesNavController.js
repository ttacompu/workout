/**
 * Created by ttacompu on 11/14/2015.
 */
angular.module('workoutApp')
    .controller('exercisesNavController', ['$scope', 'workoutService', 'workoutBuilderService', function ($scope, workoutService, workoutBuilderService) {
        $scope.addExercise = function (exercise) {
            workoutBuilderService.addExercise(exercise);
        }
        var init = function () {
            $scope.exercises = workoutService.Exercises.query();
        };
        init();
    }]);
