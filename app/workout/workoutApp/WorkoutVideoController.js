/**
 * Created by ttacompu on 11/12/2015.
 */

'use strict';

angular.module("workoutApp")
    .controller('workoutVideosController', ['$scope', '$uibModal', function ($scope, $uibModal) {
        $scope.playVideo = function (videoId) {
            $scope.pauseWorkout();
            var dailog = $uibModal.open({
                templateUrl: 'youtube-modal',
                controller: VideoPlayerController,
                scope:$scope.$new(true),
                resolve: {
                    video: function () {
                        return '//www.youtube.com/embed/' + videoId;
                    }
                },
                size: 'lg'
            }).result['finally'](function () {
                $scope.resumeWorkout();
            });
        };

        var VideoPlayerController = function ($scope, $modalInstance, video) {
            $scope.video = video;
            $scope.ok = function () {
                $modalInstance.close();
            };
        };
        VideoPlayerController['$inject'] = ['$scope', '$modalInstance', 'video'];

        var init = function () {
        };
        init();
    }]);
