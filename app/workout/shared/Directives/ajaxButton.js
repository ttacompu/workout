/**
 * Created by ttacompu on 11/20/2015.
 */
angular.module("workoutFeature").directive("ajaxButton",['$compile', '$animate', function($compile, $animate){
    return {
        transclude: true,
        restrict: 'E',
        scope: {
            onClick: '&',
            submitting: '@'
        },
        replace: true,
        template: '<button ng-disabled="busy"><span class="glyphicon glyphicon-refresh spin" ng-show="busy"></span><span ng-transclude=""></span></button>',
        link: function (scope, element, attr) {
            if (attr.submitting !== undefined && attr.submitting != null) {
                attr.$observe("submitting", function (value) {
                    if (value) scope.busy = JSON.parse(value);
                });
            }
            if (attr.onClick) {
                element.on('click', function (event) {
                    scope.$apply(function () {
                        var result = scope.onClick();
                        if (attr.submitting !== undefined && attr.submitting != null) return;    //submitting attribute if there takes priority.
                        if (result.finally) {
                            scope.busy = true;
                            result.finally(function () { scope.busy = false });
                        }
                    });
                });
            }
        }
    }
}]);

