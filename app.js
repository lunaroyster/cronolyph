// import * as activityLib from "activity";
var app = angular.module("cronolyph", ['ngRoute']);

app.service('cronolyphService', function() {
    return window.cronolyph;
})

app.factory('ActivityContainerService', function(cronolyphService) {
    var ActivityContainer = new cronolyphService.ActivityContainer();
    return ActivityContainer;
});

app.controller('home', function($scope, ActivityContainerService) {
    $scope.ActivityContainer = ActivityContainerService;
    $scope.activityName = "Activity";
    $scope.createActivity = function() {
        ActivityContainerService.createActivity($scope.activityName);
    };
    $scope.switchState = function(activity) {
        if(activity.active) {
            activity.stop();
        }
        else {
            activity.start();
        }
    }
    // $scope.updateCallbacks = [];
    setInterval(function () {
        // for (var fn in $scope.updateCallbacks) {
        //     fn();
        // }
        $scope.$digest();
    }, 50);
});
