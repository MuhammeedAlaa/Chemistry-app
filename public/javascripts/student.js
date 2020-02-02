var myApp = angular.module('myApp', []);

myApp.controller('namesCtrl', function($scope, $http) {
    $scope.triggerForm = false;
    $scope.editForm = false;
    $scope.addForm = false;
    $scope.order = 'name';
    $scope.users = [];
    $scope.courses = [];
    $scope.chosenCourse = '';
    $http({
        method: 'GET',
        url: '/assistant/studentInfo'
    }).then(function successCallback(response) {
        console.log("API is used successfully");
        console.log(response.data);
        
        for (var i = 0; i < response.data.assistIds.length; i++) {
            $scope.users.push({
                assistid: response.data.assistIds[i],
                name: response.data.fullnames[i],
                phone: response.data.phones[i],
                parent_phone: response.data.parent_phones[i],
                code: response.data.studCodes[i],
                password: response.data.studpasswords[i],
                blackpoints: response.data.blackpoints[i],
                school: response.data.schools[i],
                course_id: response.data.course_id[i],
                course_name: response.data.course_name[i]
            });
        }
    }, function errorCallback(response) {
        alert(response.statusText);
    });
    $http({
        method: 'GET',
        url: '/admin/Coursedata'
    }).then(function successCallback(response) {
        console.log("API is used successfully");
        $scope.chosenCourse = "";
        for (var i = 0; i < response.data.course_name.length; i++) {
            $scope.courses.push({
                id: response.data.course_id[i],
                name: response.data.course_name[i],
            });
            console.log(response.data.course_id[i] + "   " + response.data.course_name[i]);
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
        console.log($scope.users[index]);
        var spaceindex = $scope.users[index].name.indexOf(" ");
        $scope.crudFormfName = $scope.users[index].name.substring(0, spaceindex);
        $scope.crudFormLname = $scope.users[index].name.substring(spaceindex + 1, $scope.users[index].name.length);
        $scope.crudFormCode = $scope.users[index].code;
        $scope.crudFormPhone = $scope.users[index].phone;
        $scope.crudFormPassword = $scope.users[index].password;
        $scope.crudFormparentPhone = $scope.users[index].parent_phone;
        $scope.crudFormparentBlackPoints = $scope.users[index].blackpoints;
        $scope.crudFormSName = $scope.users[index].school;
        $('#editfName').attr("placeholder", "Edit Student First Name");
        $('#editlName').attr("placeholder", "Edit Student Last Name");
        $('#editCode').attr("placeholder", "Edit Student Code");
        $('#editPhone').attr("placeholder", "Edit Student Phone");
        $('#editPassword').attr("placeholder", "Edit Student Password");
        $('#editCode').attr('type', 'hidden');
        $('#labelCode').hide();
        $('#editfName').attr('type', 'text');
        $('#labelFname').show();
        $('#editlName').attr('type', 'text');
        $('#labelLname').show();
        $('#editparentPhone').attr('type', 'text');
        $('#labelParent').show();
        $('#editPassword').attr('type', 'password');
        $('#labelPassword').show();
        $('#editShcool').attr('type', 'text');
        $('#labelSchool').show();
        $('#editblackpoints').attr('type', 'text');
        $('#labelBlack').show();
        $('#lbcourse').hide();
        $('#Course').hide();
    };

    $scope.saveEdit = function(userId) {
        if (userId == 'new') {
            var newUser = {
                name: '',
                phone: $scope.crudFormPhone,
                code: $scope.crudFormCode,
                password: $scope.crudFormPhone,
                parent_phone: '',
                crudFormparentBlackPoints: '',
                school: '',
                assistid: '',
                course_id: $scope.chosenCourse,
                course_name: ''
            };
            for (var index = 0; index < $scope.courses.length; index++) {
               if($scope.courses[index].id == $scope.chosenCourse)
                {
                    newUser.course_name = $scope.courses[index].name; 
                    break;
                }
           }
           
            
            $http({
                method: 'POST',
                url: '/assistant/AddStudent' ,
                data: newUser
            }).then(function successCallback(response) {
                console.log("API is used successfully");
                $scope.users.push(newUser);
            }, function errorCallback(response) {
                alert(response.statusText);
            });
        } else {
            var fullname = $scope.crudFormfName + " " + $scope.crudFormLname;
            console.log(fullname);

            var editUser = {
                name: fullname,
                phone: $scope.crudFormPhone,
                parent_phone: $scope.crudFormparentPhone,
                code: $scope.users[userId].code,
                password: $scope.crudFormPassword,
                blackpoints: $scope.crudFormparentBlackPoints,
                school: $scope.crudFormSName,
                assistid: '',
                course_id: $scope.chosenCourse,
                course_name: ''
            };
            $http({
                method: 'POST',
                url: '/assistant/EditStudent',
                data: editUser
            }).then(function successCallback(response) {
                $scope.users[userId].name = editUser.name;
                $scope.users[userId].phone = editUser.phone;
                $scope.users[userId].password = editUser.password;
                $scope.users[userId].blackpoints = editUser.blackpoints;
                $scope.users[userId].school = editUser.school;
                $scope.users[userId].parent_phone = editUser.parent_phone;
                console.log($scope.users[userId]);

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
            url: '/assistant/deleteStudent',
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
        $scope.crudFormparentPhone = '';
        $scope.crudFormparentBlackPoints = '';
        $scope.crudFormSName = '';
        $scope.crudFormPassword = '';
        $('#editfName').attr("placeholder", "Add Student First Name");
        $('#editlName').attr("placeholder", "Add Student Last Name");
        $('#editCode').attr("placeholder", "Add Student Code");
        $('#editPhone').attr("placeholder", "Add Student Phone");
        $('#editparentPhone').attr("placeholder", "Add Student Parent Phone");
        $('#editPassword').attr("placeholder", "Add Student Password");
        $('#editShcool').attr("placeholder", "Add Student School");
        $('#editCode').attr('type', 'text');
        $('#labelCode').show();

        $('#editfName').attr('type', 'hidden');
        $('#labelFname').hide();

        $('#editlName').attr('type', 'hidden');
        $('#labelLname').hide();

        $('#editparentPhone').attr('type', 'hidden');
        $('#labelParent').hide();

        $('#editPassword').attr('type', 'hidden');
        $('#labelPassword').hide();

        $('#editShcool').attr('type', 'hidden');
        $('#labelSchool').hide();

        $('#editblackpoints').attr('type', 'hidden');
        $('#labelBlack').hide();

        $('#Course').show();
        $('#lbcourse').show();
    };
});