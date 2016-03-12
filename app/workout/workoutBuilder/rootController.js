/**
 * Created by ttacompu on 11/7/2015.
 */
(function () {
    "use strict";
    angular.module("workoutApp").controller("rootController", ["$scope", "$uibModal", function ($scope, $uibModal) {

        $scope.$on('$routeChangeSuccess',function(e, current, previous){
            $scope.currentRoute = current;
        });

        $scope.showWorkoutHistory = function(){
            var dialog = $uibModal.open({
                templateUrl : 'template/workout-history.html',
                controller: WorkoutHistoryController,
                size: 'lg'
            });
        }

        var WorkoutHistoryController = function($scope, $modalInstance, workoutHistoryTracker){
            $scope.search = {};
            $scope.search.completed = '';
            $scope.history = workoutHistoryTracker.getHistory();
            $scope.ok = function () {
                $modalInstance.close();
            };

        }

        WorkoutHistoryController['$inject'] =['$scope', '$modalInstance', 'workoutHistoryTracker'];

    }])
})();
