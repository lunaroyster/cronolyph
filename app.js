$(document).ready(function(){
    window.newActivity = $('#newActivity');
    window.newActivity.modal({
        opacity: 0.5
    });
});
// import * as activityLib from "activity";
var app = angular.module("cronolyph", ['ngRoute']);

app.service('cronolyphService', function() {
    return window.cronolyph;
})

app.factory('ActivityContainerService', function(cronolyphService) {
    var ActivityContainer = cronolyphService.ActivityContainer;
    if(localStorage.serializedActivityContainer) {
        var ac = ActivityContainer.unserialize(localStorage.serializedActivityContainer);
    }
    else {
        var ac = new cronolyphService.ActivityContainer();
    }
    setInterval(function () {
        console.log("Syncing");
        localStorage.serializedActivityContainer = JSON.stringify(ac);
    }, 5000);
    return ac;
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
            localStorage.activities = ActivityContainer.activities;
        }
        else {
            activity.start();
        }
    };
    $scope.showActivityModal = function() {
        // console.log(angular.element('#newActivity'))
        window.newActivity.modal('open');
    };
    $scope.timeUntilNow = function(activity) {
        d = activity.timeUntilNow;
        return moment.duration(d).format("HH mm ss S")
    }
    // $scope.updateCallbacks = [];
    setInterval(function () {
        // for (var fn in $scope.updateCallbacks) {
        //     fn();
        // }
        $scope.$digest();
    }, 100);
});
