/**
 * Created by ttacompu on 11/26/2015.
 */
describe("Directives", function () {
    var $compile, $rootScope, $scope;
    beforeEach(module('workoutApp'));
    beforeEach(module('workoutBuilder'));
    beforeEach(module('workoutFeature'));

    beforeEach(inject(function (_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
    }));

    describe("remote validator", function () {
        var inputElement;
        beforeEach(inject(function () {
            $scope.validate = function (value) {
            };

            inputElement = "<form name='testForm'><input type='text' name='unique' ng-model='name' remote-validator='unique'remote-validator-function='validate(value)' /></form>";
        }));

        it("should verify unique value when input change",inject(function($q){
            spyOn($scope, "validate").and.returnValue($q.when(true));
            $compile(inputElement)($scope);
            $scope.testForm.unique.$setViewValue("dummy");
            expect($scope.validate).toHaveBeenCalled();
        }))

    });
});