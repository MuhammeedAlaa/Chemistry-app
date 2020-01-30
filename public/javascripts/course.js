var myApp = angular.module('myApp', []);

myApp.controller('namesCtrl', function($scope, $http) {
    $scope.triggerForm = false;
    $scope.editForm = false;
    $scope.addForm = false;
    $scope.order = 'name';

    $scope.users = [];

    $http({
        method: 'GET',
        url: '/admin/Coursedata'
    }).then(function successCallback(response) {
        console.log("API is used successfully");
        for (var i = 0; i < response.data.numberofassistance; i++) {
            $scope.users.push({
                code: response.data.course_id[i],
                name: response.data.course_name[i],
            });
        }
    }, function errorCallback(response) {
        alert(response.statusText);
    });

    $scope.orderBy = function(filter) {
        $scope.order = filter;
    };

    $scope.editUser = function(user) {
        var index = $scope.users.indexOf(user);
        $scope.triggerForm = true;
        $scope.editForm = true;
        $scope.addForm = false;
        $scope.codeExisted = false;
        $scope.editUserId = index;
        var spaceindex = $scope.users[index].name.indexOf(" ");
        $scope.crudFormName = $scope.users[index].name;
        $scope.crudFormCode = $scope.users[index].code;

        $('#editName').attr("placeholder", "Edit Assistant Course Name");
        $('#editCode').attr("placeholder", "Edit Course ID");
    };

    $scope.saveEdit = function(userId) {
        if (userId == 'new') {
            var newid = $scope.users.length + 1;
            var fullname = $scope.crudFormName;
            var newUser = {
                id: newid,
                name: fullname,
                code: $scope.crudFormCode
            };
            $http({
                method: 'POST',
                url: '/admin/AddCourse',
                data: newUser
            }).then(function successCallback(response) {
                console.log("API is used successfully");
                $scope.users.push(newUser);
            }, function errorCallback(response) {
                alert(response.statusText);
            });
        } else {
            $scope.users[userId].name = $scope.crudFormName;
            $scope.users[userId].code = $scope.crudFormCode;
            $http({
                method: 'POST',
                url: '/admin/EditCourse',
                data: $scope.users[userId]
            }).then(function successCallback(response) {
                console.log("API is used successfully");
            }, function errorCallback(response) {
                alert(response.statusText);
            });
        }

        $scope.triggerForm = false;
        $scope.editForm = false;
        $scope.editUserId = 0;
    };

    $scope.deleteUser = function(user) {
        var index = $scope.users.indexOf(user);
        $http({
            method: 'POST',
            url: '/admin/DeleteCourse',
            data: $scope.users[index]
        }).then(function successCallback(response) {
            console.log("API is used successfully");
            $scope.users.splice(index, 1);
        }, function errorCallback(response) {
            alert(response.statusText);
        });

    };

    $scope.addUser = function() {
        $scope.editUserId = 'new';
        $scope.triggerForm = true;
        $scope.editForm = false;
        $scope.addForm = true;
        $scope.codeExisted = false;
        $scope.userForm.$setUntouched();
        $scope.crudFormName = '';
        $scope.crudFormCode = '';
        $('#editName').attr("placeholder", "Add Assistant Course Name");
        $('#editCode').attr("placeholder", "Add Assistant Code");
    };
});