/**
 * Created by ttacompu on 11/13/2015.
 */


(function () {
    "use strict";
    angular.module("workoutApp").controller("workoutDetailController", ['$scope', 'workoutService', 'workoutBuilderService', 'selectedWorkout', '$location', '$routeParams', '$q',function ($scope,workoutService,
        workoutBuilderService, selectedWorkout, $location, $routeParams, $q) {

        $scope.uniqueUserName = function(value){
            if(!value || value === $routeParams.id) return $q.when(true);

            return workoutService.getWorkout(value.toLowerCase())
                .then(function(data){
                    return $q.reject()},
                function()
                { return true }
            );
        }

        $scope.removeExercise = function (exercise) {
            workoutBuilderService.removeExercise(exercise);
        };

        $scope.save = function () {
            if ($scope.formWorkout.$invalid) return;
            $scope.submitted = true;      // Will force validations
            return workoutBuilderService.save().then(function (workout) {
                $scope.workout = workout;
                $scope.formWorkout.$setPristine();
                $scope.submitted = false;
            });
        }

        $scope.$watch('formWorkout.exerciseCount', function (newValue) {
            if (newValue) {
                newValue.$setValidity("count", $scope.workout.exercises.length > 0);
            }
        });

        $scope.$watch('workout.exercises.length', function (newValue, oldValue) {
            if (newValue != oldValue) {
                $scope.formWorkout.exerciseCount.$dirty = true;
                $scope.formWorkout.$setDirty();
                $scope.formWorkout.exerciseCount.$setValidity("count", newValue > 0);
            }
        });

        $scope.hasError = function (modelController, error) {
            return (modelController.$dirty || $scope.submitted) && error;
        }

        $scope.reset = function () {
            $scope.workout = workoutBuilderService.startBuilding($routeParams.id);
            $scope.formWorkout.$setPristine();
            $scope.submitted = false;      // Will force validations
        };

        $scope.moveExerciseTo = function (exercise, location) {
            workoutBuilderService.moveExerciseTo(exercise, location);
        };

        $scope.durations = [{ title: "15 seconds", value: 15 },
            { title: "30 seconds", value: 30 },
            { title: "45 seconds", value: 45 },
            { title: "1 minute", value: 60 },
            { title: "1 minute 15 seconds", value: 75 },
            { title: "1 minute 30 seconds", value: 90 },
            { title: "1 minute 45 seconds", value: 105 },
            { title: "2 minutes", value: 120 },
            { title: "2 minutes 15 seconds", value: 135 },
            { title: "2 minutes 30 seconds", value: 150 },
            { title: "2 minutes 45 seconds", value: 165 },
            { title: "3 minutes", value: 180 },
            { title: "3 minutes 15 seconds", value: 195 },
            { title: "3 minutes 30 seconds", value: 210 },
            { title: "3 minutes 45 seconds", value: 225 },
            { title: "4 minutes", value: 240 },
            { title: "4 minutes 15 seconds", value: 255 },
            { title: "4 minutes 30 seconds", value: 270 },
            { title: "4 minutes 45 seconds", value: 285 },
            { title: "5 minutes", value: 300 }];

        $scope.canDeleteWorkout = function () {
            return workoutBuilderService.canDeleteWorkout();
        }

        $scope.deleteWorkout = function () {
            workoutBuilderService.delete().then(function (data) {
                $location.path('/builder/workouts/');
            });
        };
        var init = function () {
            $scope.workout = selectedWorkout;
        };
        init();


    }])
})();
