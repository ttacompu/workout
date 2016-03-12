/**
 * Created by ttacompu on 11/13/2015.
 */

'use strict';

angular.module('workoutBuilder')
    .factory("exerciseBuilderService", ['workoutService', 'Exercise', '$q', function (workoutService, Exercise, $q) {
        var service = {};
        var buildingExercise;
        var newExercise;
        service.startBuilding = function (name) {
            //We are going to edit an existing exercise
            if (name) {
                 return workoutService.getExercise(name).then(function(exercise){
                     buildingExercise = exercise;
                     newExercise = false;
                     return buildingExercise;
                });
            }
            else {
                buildingExercise = new Exercise({});
                newExercise = true;
                return $q.when(buildingExercise);
            }
        };

        service.save = function () {
            var exercise = newExercise ? workoutService.addExercise(buildingExercise)
                : workoutService.updateExercise(buildingExercise);
            newExercise = false;
            return exercise;
        };

        service.delete = function () {
            workoutService.deleteExercise(buildingExercise.name);
        };

        service.addVideo = function () {
            buildingExercise.related.videos.push("");
        };

        service.canDeleteExercise = function () {
            return !newExercise;
        }

        service.deleteVideo = function (index) {
            if (index >= 0) buildingExercise.related.videos.splice(index, 1);
        }

        return service;
    }]);

