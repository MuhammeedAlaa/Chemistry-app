var myApp = angular.module('myApp', []);

myApp.controller('namesCtrl', function($scope, $http) {
    $scope.triggerForm = false;
    $scope.editForm = false;
    $scope.addForm = false;
    $scope.order = 'name';

    $scope.centers = [];

    $http({
        method: 'GET',
        url: '/admin/Centerdata'
    }).then(function successCallback(response) {
        console.log("API is used successfully");
           for(var i = 0; i < response.data.center_name.length; i++){
            $scope.centers.push({
                name: response.data.center_name[i],
            });
        }
        
    }, function errorCallback(response) {
        alert(response.statusText);
    });

    $scope.orderBy = function(filter) {
        $scope.order = filter;
    };

    $scope.editCenter = function(center) {
        var index = $scope.centers.indexOf(center);
        console.log(index);
        
        $scope.triggerForm = true;
        $scope.editForm = true;
        $scope.addForm = false;
        $scope.centerExisted = false;
        $scope.editCenterId = index;
        $scope.crudFormName = $scope.centers[index].name;        
        $('#editName').attr("placeholder", "Edit Center Name");
    };

    $scope.saveEdit = function(centerId) {
        
        if (centerId == 'new') {
            var newData = {
                name: $scope.crudFormName,
                old: $scope.centers
            };
            
            $http({
                method: 'POST',
                url: '/admin/AddCenter',
                data: newData
            }).then(function successCallback(response) {
                console.log("API is used successfully");
                $scope.centers.push(newCenter);
            }, function errorCallback(response) {
                alert(response.statusText);
            });
        } else {
            var newCenterdata = {
                oldCentername: $scope.centers[centerId].name,
                NewCentername:  $scope.crudFormName,
                old: $scope.centers
            };

            $http({
                method: 'POST',
                url: '/admin/EditCenter',
                data: newCenterdata
            }).then(function successCallback(response) {
                console.log("API is used successfully");
                $scope.centers[centerId].name = $scope.crudFormName;
            }, function errorCallback(response) {
                alert(response.statusText);
            });
        }
        $scope.triggerForm = false;
        $scope.editForm = false;
        $scope.editCenterId = 0;
    };

    $scope.deleteCenter = function(center) {
        var index = $scope.centers.indexOf(center);
        console.log(center);
        $http({
            method: 'POST',
            url: '/admin/DeleteCenter',
            data: $scope.centers[index]
        }).then(function successCallback(response) {
            console.log("API is used successfully");
            $scope.centers.splice(index, 1);
        }, function errorCallback(response) {
            alert(response.statusText);
        });

    };

    $scope.addCenter = function() {
        $scope.editCenterId = 'new';
        $scope.triggerForm = true;
        $scope.editForm = false;
        $scope.addForm = true;
        $scope.centerExisted = false;
        $scope.centerForm.$setUntouched();
        $scope.crudFormName = '';
        $('#editName').attr("placeholder", "Add Center Name");
    };
});