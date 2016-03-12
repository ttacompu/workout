/**
 * Created by ttacompu on 11/15/2015.
 */

angular.module('workoutApp')
    .controller('exerciseDetailController', ['$scope', 'workoutService', '$routeParams', 'exerciseBuilderService', '$location', function ($scope, workoutService, $routeParams, exerciseBuilderService, $location) {
        $scope.save = function () {
            $scope.submitted = true;      // Will force validations
            if ($scope.formExercise.$invalid) return;
            exerciseBuilderService.save().then(function (data) {
                $scope.formExercise.$setPristine();
                $scope.submitted = false;
            });
        };

        $scope.hasError = function (modelController, error) {
            return (modelController.$dirty || $scope.submitted) && error;
        };

        $scope.reset = function () {
            $scope.exercise = exerciseBuilderService.startBuilding($routeParams.id);
            $scope.formExercise.$setPristine();
            $scope.submitted = false;      // Will force validations
        };

        $scope.canDeleteExercise = function () {
            return exerciseBuilderService.canDeleteExercise();
        }

        $scope.deleteExercise = function () {
            exerciseBuilderService.delete().then(function (data) {
                $location.path('/builder/exercises/');
            });
        };

        $scope.addVideo = function () {
            exerciseBuilderService.addVideo();
        };

        $scope.deleteVideo = function (index) {
            exerciseBuilderService.deleteVideo(index);
        };

        var init = function () {
            // We do not use the resolve property on the route to load exercise as we do it with workout.
            exerciseBuilderService.startBuilding($routeParams.id).then(function(data){
                $scope.exercise = data;
            })

            /*if ($routeParams.id) {   // In case of existing workout loaded from server need to wait to know whether the exercise exists.
                $scope.exercise.$promise.then(null, function (error) {
                    // If exercise not found we redirect back to exercise list page.
                    $location.path('/builder/exercises/');
                })
            }*/
        };

        init();

    }]);
