var myApp = angular.module('myApp',[]);

myApp.controller('namesCtrl', function($scope, $http) {
    $scope.triggerForm = false;
    $scope.editForm = false;
    $scope.addForm = false;
    $scope.order = 'name'; 
   
    $scope.users = [];
   
    $http({
        method: 'GET',
        url: '/admin/assistant'
    }).then(function successCallback(response) {
        console.log("API is used successfully");
        for(var i = 0; i < response.data.numberofassistance; i++){
            console.log(response.data.phones[i]);           
            console.log(response.data.assistantId[i]);
            console.log(response.data.fullnames[i]);
            $scope.users.push({
                id: response.data.assistantId[i],
                name: response.data.fullnames[i],
                phone: response.data.phones[i],
                code: response.data.assistantCode[i],
                password: response.data.assistantPassword[i]
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
        $scope.crudFormfName = $scope.users[index].name.substring(0,spaceindex);
        $scope.crudFormLname = $scope.users[index].name.substring(spaceindex + 1, $scope.users[index].name.length);
        $scope.crudFormCode = $scope.users[index].code;
        $scope.crudFormPhone = $scope.users[index].phone;
        $scope.crudFormPassword = $scope.users[index].password;
    };

    $scope.saveEdit = function(userId) {
        if (userId == 'new') {
            var newid = $scope.users.length + 1;
            var fullname =  $scope.crudFormfName + " " + $scope.crudFormLname; 
            var newUser = {
                id: newid,
                name: fullname,
                phone:  $scope.crudFormPhone,
                code: $scope.crudFormCode,
                password: $scope.crudFormPassword
            };
            $http({
                method: 'POST',
                url: '/admin/addAssistant',
                data: newUser
            }).then(function successCallback(response) {
                console.log("API is used successfully");
                $scope.users.push(newUser);
            }, function errorCallback(response) {
                alert(response.statusText);
            });
        } else {
            $scope.users[userId].name = $scope.crudFormfName + " " + $scope.crudFormLname;
            $scope.users[userId].code = $scope.crudFormCode;
            $scope.users[userId].phone = $scope.crudFormPhone;
            $scope.users[userId].password = $scope.crudFormPassword;
            $http({
                method: 'POST',
                url: '/admin/EditAssistant',
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
            url: '/admin/delete',
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
        $scope.crudFormfName = '';
        $scope.crudFormLname = '';
        $scope.crudFormCode = '';
        $scope.crudFormPhone = '';
        $scope.crudFormPassword = '';
    };
});

