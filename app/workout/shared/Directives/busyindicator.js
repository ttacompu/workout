/**
 * Created by ttacompu on 11/20/2015.
 */

angular.module("workoutFeature").directive("busyIndicator",['$compile', function($compile){
    return{
        transclude: true,
        template : "<div><div ng-transclude></div><label ng-show='busy' class='text-info glyphicon glyphicon-refresh spin'></label></div>",
        controller : ["$scope",function($scope){
            this.show = function () {
                $scope.busy = true;
            };
            this.hide = function(){
                $scope.busy = false;
            }

        }]


    }
}]);
