/**
 * Created by ttacompu on 11/20/2015.
 */
angular.module("workoutFeature").directive("remoteValidator",['$parse', function($parse){
    return{
        require : ['ngModel', '?^busyIndicator'],
        link : function (scope, elm, attr, ctrls) {
            var expfn = $parse(attr["remoteValidatorFunction"]);
            var validatorName = attr["remoteValidator"];
            var ngModelCtrl = ctrls[0];
            var busyIndicator = ctrls[1];

            ngModelCtrl.$asyncValidators[validatorName] = function (value) {
                return expfn(scope, { 'value': value });
            }

            if (busyIndicator) {
                scope.$watch(function(){
                    return ngModelCtrl.$pending;
                }, function (newValue) {
                    if (newValue && newValue[validatorName])
                        busyIndicator.show()
                    else
                        busyIndicator.hide()

                })
            }

        }
    }
}]);