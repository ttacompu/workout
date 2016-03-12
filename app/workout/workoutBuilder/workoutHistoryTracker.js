/**
 * Created by ttacompu on 11/8/2015.
 */
angular.module('workoutApp')
    .factory('workoutHistoryTracker', ['$rootScope', 'appEvents', 'localStorageService', function  ($rootScope, appEvents, localStorageService) {
        var maxHistoryItems = 20; //Track for last 20 exercise
        var storageKey = "workouthistory";
        var workoutHistory = localStorageService.get(storageKey) || [];
        var currentWorkoutLog = null;

        $rootScope.$on("$routeChangeSuccess", function(){
            if (currentWorkoutLog) {
                service.endTracking(false);
            }

        });

        $rootScope.$on(appEvents.workout.exerciseStarted, function (e, args) {
            currentWorkoutLog.lastExercise = args.title;
            ++currentWorkoutLog.exercisesDone;
            localStorageService.add(storageKey, workoutHistory);

        });


        var service = {
            startTracking : function(){
                currentWorkoutLog = { startedOn: new Date().toISOString(), completed: false, exercisesDone: 0 };
                if(workoutHistory.length > maxHistoryItems){
                    workoutHistory.shift();
                }
                workoutHistory.push(currentWorkoutLog);
               localStorageService.add(storageKey, workoutHistory);
            },
            endTracking : function(completed){
                currentWorkoutLog.completed = completed;
                currentWorkoutLog.endedOn = new Date().toISOString();
                currentWorkoutLog = null;
                localStorageService.add(storageKey, workoutHistory);
            },
            getHistory : function () {
                return workoutHistory;
            }
        };
        return service;
    }]);
