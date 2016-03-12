/**
 * Created by ttacompu on 11/13/2015.
 */
/// <reference path="services.js" />
'use strict';

/* Services */
angular.module('workoutBuilder')
    .factory("workoutBuilderService", ['workoutService', 'WorkoutPlan', 'Exercise','$q', function (workoutService, WorkoutPlan, Exercise, $q) {
        var service = {};
        var buildingWorkout;
        var newWorkout;
        service.startBuilding = function (name) {
            //We are going to edit an existing workout
            if (name) {
                return workoutService.getWorkout(name).then(function (workout) {
                    buildingWorkout = workout;
                    newWorkout = false;
                    return buildingWorkout;
                });
            }
            else {
                buildingWorkout = new WorkoutPlan({});
                newWorkout = true;
                return $q.when(buildingWorkout);
            }
        };
        service.removeExercise = function (exercise) {
            buildingWorkout.exercises.splice(buildingWorkout.exercises.indexOf(exercise), 1);
        };

        service.save = function () {
            var promise = newWorkout ? workoutService.addWorkout(buildingWorkout)
                : workoutService.updateWorkout(buildingWorkout);
            promise.then(function (workout) {
                newWorkout = false;
            });
            return promise;
        };

        service.moveExerciseTo = function (exercise, toIndex) {
            if (toIndex < 0 || toIndex >= buildingWorkout.exercises) return;
            var currentIndex = buildingWorkout.exercises.indexOf(exercise);
            buildingWorkout.exercises.splice(toIndex, 0, buildingWorkout.exercises.splice(currentIndex, 1)[0]);
        }

        service.addExercise = function (exercise) {
            buildingWorkout.exercises.push({ details: exercise, duration: 30 });
        };

        service.canDeleteWorkout = function () {
            return !newWorkout;
        }

        service.delete = function () {
            if (newWorkout) return; // A new workout cannot be deleted.
            workoutService.deleteWorkout(buildingWorkout.name);
        }

        return service;
    }]);


