/**
 * Created by ttacompu on 11/21/2015.
 */

describe("Controllers", function () {
    beforeEach(module('workoutApp'));
    var ctrl, $scope;

    describe("workoutController", function () {

        beforeEach(module(function ($provide) {
            $provide.factory("workoutService", function (WorkoutPlan, Exercise, $http, $q, $resource) {
                var mock = {};
                mock.sampleWorkout = new WorkoutPlan({
                    name: "testworkout",
                    title: "Test Workout",
                    description: "This is a test workout",
                    restBetweenExercise: "40",
                    exercises:  [{ details: new Exercise({ name: "exercise1", title: "Exercise 1", description: "Exercise 1 description", image: "/image1/path", nameSound: "audio1/path" }), duration: 50 },
                    { details: new Exercise({ name: "exercise2", title: "Exercise 2", description: "Exercise 2 description", image: "/image2/path", nameSound: "audio2/path" }), duration: 30 },
                    { details: new Exercise({ name: "exercise3", title: "Exercise 3", description: "Exercise 3 description", image: "/image3/path", nameSound: "audio3/path" }), duration: 20 }, ]
                });
                mock.getWorkout = function (name) {
                    return $q.when(mock.sampleWorkout);
                }
                mock.totalWorkoutDuration = 180;
                return mock;
            });
        }));


        beforeEach(function () {
            module(function ($provide) {
                $provide.value("workoutHistoryTracker", {
                    startTracking: function () {}, endTracking: function () {}
                });
            });
        });

        beforeEach(inject(function($rootScope, $controller, $interval, $location, workoutHistoryTracker, workoutService, appEvents, Exercise ){
                $scope = $rootScope.$new();
            spyOn($scope, "$emit");
            spyOn(workoutHistoryTracker, 'startTracking');
            ctrl = $controller('workoutController', {
                $scope: $scope,
                $interval: $interval,
                $location: $location,
                workoutHistoryTracker: workoutHistoryTracker,
                appEvents: appEvents,
                workoutService: workoutService,
                $routeParams: { id: "DummyWorkout" },
                Exercise: Exercise
            });
            $scope.$digest();
        }));

        it("should start the workout", inject(function (workoutService) {
            expect($scope.workoutPlan).toEqual(workoutService.sampleWorkout);
            expect($scope.workoutTimeRemaining).toEqual(workoutService.totalWorkoutDuration);
            expect($scope.workoutPaused).toBeFalsy();
        }));

        it("should start the first exercise", inject(function(workoutService, appEvents){
            expect($scope.currentExercise).toEqual(workoutService.sampleWorkout.exercises[0]);
            expect($scope.$emit).toHaveBeenCalledWith(appEvents.workout.exerciseStarted, workoutService.sampleWorkout.exercises[0].details);
        }));

        it("should start history tracking", inject(function(workoutHistoryTracker){
            expect(workoutHistoryTracker.startTracking).toHaveBeenCalled();

        }));

        it("should increase current exercise duration with time",inject(function($interval){
            expect($scope.currentExerciseDuration).toBe(0);
            $interval.flush(1000);
            expect($scope.currentExerciseDuration).toBe(1);
            $interval.flush(3000);
            expect($scope.currentExerciseDuration).toBe(4);
        }));

        it("should transition to next exercise on one exercise complete",inject(function(workoutService, $interval){
            $interval.flush(workoutService.sampleWorkout.exercises[0].duration * 1000);
            expect($scope.currentExercise.details.name).toBe("rest");
            expect($scope.currentExercise.duration).toBe(workoutService.sampleWorkout.restBetweenExercise);
        }));

        it("should not update timeremaining for pasued workout", inject(function(workoutService, $interval){
            expect($scope.workoutPaused).toBeFalsy();
            $interval.flush(1000);
            expect($scope.workoutTimeRemaining).toBe(workoutService.totalWorkoutDuration -1);
            $scope.pauseWorkout();
            expect($scope.workoutPaused).toBeTruthy();
            $interval.flush(1000);
            expect($scope.workoutTimeRemaining).toBe(workoutService.totalWorkoutDuration -1);
        }))
    });
})
