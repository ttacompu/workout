/**
 * Created by ttacompu on 11/20/2015.
 */
/**
 * Created by ttacompu on 9/7/2015.
 */
'use strict';

/* directives */
angular.module("workoutFeature").directive('ngConfirm', [function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.bind('click', function () {
                var message = attrs.ngConfirmMessage || 'Are you sure?';
                if (message && confirm(message)) {
                    scope.$apply(attrs.ngConfirm);
                }
            });
        }
    }
}]);

