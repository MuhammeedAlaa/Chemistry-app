// jshint esversion:8
var myApp = angular.module('myApp', []);


myApp.controller('namesCtrl', function($scope, $http) {
    $scope.triggerForm = true;
    $scope.addForm = false;
    $scope.order = 'code';
    $scope.reverse = true;
    $scope.centers = [];
    $scope.courses = [];
    $scope.lectures = [];
    $scope.users = [];
    $scope.chosenCenter = '';
    $scope.chosenCourse = '';
    $('#saveandcancel').hide();
    $('#studenttable').hide();
    $http({
        method: 'GET',
        url: '/admin/Centerdata'
    }).then(function successCallback(response) {
        console.log("API is used successfully");
        $scope.chosenCenter = "";
        for (var i = 0; i < response.data.center_name.length; i++) {
            $scope.centers.push({
                name: response.data.center_name[i],
                id: i
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
        $scope.reverse = !$scope.reverse;
    };
    $scope.viewlecattend = function() {
        if ($scope.chosenCourse != '' && $scope.chosenCenter != '') {
            $scope.triggerForm = true;
            $scope.addForm = true;
            $('#view').hide();
            $('#lbcourse').hide();
            $('#Course').hide();
            $('#lbcenter').hide();
            $('#selectcenter').hide();
            $('#saveandcancel').show();
            $http({
                method: 'GET',
                url: '/assistant/studentInfoCourse2/' + $scope.chosenCourse,
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
                        school: response.data.schools[i],
                        attend: response.data.attend[i],
                        lec_num: -1,
                        center_name: '',
                        course_id: -1,
                        exam_num: -1
                    });
                }
            }, function errorCallback(response) {
                alert(response.statusText);
            });
                $('#studenttable').show();
        }  else if($scope.chosenCourse == '' && $scope.chosenCenter == '') {
            alert("Please choose Coure and Center");
        } else if($scope.chosenCenter == '') {
            alert("Please choose Center");
        } else if ($scope.chosenCourse == ''){
            alert("Please choose Course");
        } else {
            alert("Please choose Lecture");
        }
    };
});