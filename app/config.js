/**
 * Created by ttacompu on 11/7/2015.
 */
(function () {
    "use strict";
    angular.module('workoutApp').config(
        function ($routeProvider, $sceDelegateProvider, workoutServiceProvider, $httpProvider, ApiKeyAppenderInterceptorProvider) {

            ApiKeyAppenderInterceptorProvider.setApiKey("iDRbXy2-eScb78P0jnrBZhOBdXAoskEE");
            $httpProvider.interceptors.push('ApiKeyAppenderInterceptor');

            workoutServiceProvider.configure("7minworkout");

            $routeProvider.when('/start', { templateUrl: 'template/workout/start.html' });
            $routeProvider.when('/workout/:id', { templateUrl: 'template/workout/workout.html', controller: 'workoutController' });
            $routeProvider.when('/finish', { templateUrl: 'template/workout/finish.html' });



            $routeProvider.when('/builder', {
                redirectTo: '/builder/workouts'
            });

            $routeProvider.when('/builder/workouts', {
                templateUrl: 'template/workoutbuilder/workouts.html',
                leftNav: 'template/workoutbuilder/left-nav-main.html',
                topNav: 'template/workoutbuilder/top-nav.html',
                controller : 'workoutListController'
            });

            $routeProvider.when('/builder/workouts/new', {
                templateUrl: 'template/workoutbuilder/workout.html',
                leftNav: 'template/workoutbuilder/left-nav-exercises.html',
                topNav: 'template/workoutbuilder/top-nav.html',
                controller: 'workoutDetailController',
                resolve: {
                    selectedWorkout: ['workoutBuilderService', function (workoutBuilderService) {
                        return workoutBuilderService.startBuilding();
                    }],
                }
            });

            $routeProvider.when('/builder/workouts/:id', {
                templateUrl: 'template/workoutbuilder/workout.html',
                leftNav: 'template/workoutbuilder/left-nav-exercises.html',
                controller: 'workoutDetailController',
                topNav: 'template/workoutbuilder/top-nav.html',
                resolve: {
                    selectedWorkout: ['workoutBuilderService', '$route', '$location', function (workoutBuilderService, $route, $location) {
                        var workout = workoutBuilderService.startBuilding($route.current.params.id);
                        if (!workout) {
                            $location.path('/builder/workouts');    //If the workout not found redirect to workout list
                        }
                        return workout;
                    }],
                }
            });

            $routeProvider.when('/builder/exercises', {
                templateUrl: 'template/workoutbuilder/exercises.html',
                leftNav: 'template/workoutbuilder/left-nav-main.html',
                topNav: 'template/workoutbuilder/top-nav.html',
                controller:'exerciseListController'
            });

            $routeProvider.when('/builder/exercises/new', {
                templateUrl: 'template/workoutbuilder/exercise.html',
                controller: 'exerciseDetailController',
                topNav: 'template/workoutbuilder/top-nav.html'
            });
            $routeProvider.when('/builder/exercises/:id', {
                templateUrl: 'template/workoutbuilder/exercise.html',
                controller: 'exerciseDetailController',
                topNav: 'template/workoutbuilder/top-nav.html'
            });



            $routeProvider.otherwise({ redirectTo: '/start' });

            $sceDelegateProvider.resourceUrlWhitelist([
                // Allow same origin resource loads.
                'self',
                // Allow loading from our assets domain.  Notice the difference between * and **.
                'http://*.youtube.com/**']);

        }
    );
})();