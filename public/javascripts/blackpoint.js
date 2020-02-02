var myApp = angular.module('myApp', []);

myApp.controller('namesCtrl', function($scope, $http) {
    $scope.triggerForm = false;
    $scope.editForm = false;
    $scope.addForm = false;
    $scope.order = 'name';

    $scope.users = [];

    $http({
        method: 'GET',
        url: '/assistant/BPData'
    }).then(function successCallback(response) {
        console.log("API is used successfully");
        for (var i = 0; i < response.data.assistIds.length; i++) {
            $scope.users.push({
                assistid: response.data.assistIds[i],
                name: response.data.fullnames[i],
                phone: response.data.phones[i],
                parent_phone: response.data.parent_phones[i],
                code: response.data.studCodes[i],
                password: response.data.studpasswords[i],
                blackpoints: response.data.blackpoints[i],
                school: response.data.schools[i]

            });
        }
    }, function errorCallback(response) {
        alert(response.statusText);
    });
    $scope.orderBy = function(filter) {
        $scope.order = filter;
    };
    $scope.editBP1 = function(user) {
        var index = $scope.users.indexOf(user);
        if ($scope.users[index].blackpoints != 4) {
            $http({
                method: 'POST',
                url: '/assistant/EditBPplus',
                data: $scope.users[index]
            }).then(function successCallback(response) {

                $scope.users[index].blackpoints += 1;

                console.log($scope.users[index]);

                console.log("API is used successfully");
            }, function errorCallback(response) {
                alert(response.statusText);
            });
        }
    };
    $scope.editBP2 = function(user) {
        var index = $scope.users.indexOf(user);
        if ($scope.users[index].blackpoints != 0) {
            $http({
                method: 'POST',
                url: '/assistant/EditBPminus',
                data: $scope.users[index]
            }).then(function successCallback(response) {
                $scope.users[index].blackpoints -= 1;
                console.log($scope.users[index]);

                console.log("API is used successfully");
            }, function errorCallback(response) {
                alert(response.statusText);
            });
        }
    };
    $scope.orderBy = function(filter) {
        $scope.order = filter;
    };
});