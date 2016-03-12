/**
 * Created by ttacompu on 11/26/2015.
 */
describe("Shared Services", function () {
    beforeEach(module('workoutApp'));
    beforeEach(module('workoutBuilder'));
    beforeEach(module('workoutFeature'));
    describe("Workout Service", function () {
        var WorkoutService, $httpBackend,
            collectionUrl = "https://api.mongolab.com/api/1/databases/testdb/collections", apiKey = "testKey";
        beforeEach(module(function(workoutServiceProvider, ApiKeyAppenderInterceptorProvider){
            workoutServiceProvider.configure("testdb");
            ApiKeyAppenderInterceptorProvider.setApiKey("testKey")
        }));

        beforeEach(inject(function (_workoutService_, _$httpBackend_) {
            WorkoutService = _workoutService_;
            $httpBackend = _$httpBackend_;
        }))

        it("should request all workout endpoints", function(){
            $httpBackend.expectGET(collectionUrl + "/workouts?apiKey=" + "testKey").respond([]);
            WorkoutService.getWorkouts();
            $httpBackend.flush();


        })

        it("should return a workout plan with specific name", inject(function (WorkoutPlan, $q) {
            spyOn(WorkoutService.Exercises,"query").and.returnValue({
                $promise : $q.when([{ name : "exercise1", title : "exercise 1"}])
            });

            $httpBackend.expectGET(collectionUrl +"/workouts/testplan?apiKey=" + "testKey").respond({
                name: "Workout1", title: "Workout 1", restBetweenExercise: 30
            });

            var result = null;
            WorkoutService.getWorkout("testplan")
                .then(function (workout) { result = workout;});
            $httpBackend.flush();
            expect(result.name).toBe("Workout1");
            expect(result instanceof WorkoutPlan).toBe(true);
            expect(WorkoutService.Exercises.query).toHaveBeenCalled();
        }));

        afterEach(function () {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });


    });
});