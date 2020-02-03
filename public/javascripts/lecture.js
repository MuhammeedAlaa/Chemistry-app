// jshint esversion:8
var myApp = angular.module('myApp', []);


myApp.controller('namesCtrl', function ($scope, $http) {
    $scope.triggerForm = false;
    $scope.editForm = false;
    $scope.addForm = false;
    $scope.order = 'name';
    $scope.reverse = true;
    $scope.centers = [];
    $scope.courses = [];
    $scope.lectures = [];
    $scope.chosenCenter = '';
    $scope.chosenCourse = '';
    $scope.chosenday = "";
    $scope.chosenhour = "";

    $http({
        method: 'GET',
        url: '/admin/lecturedata'
    }).then(function successCallback(response) {
        $scope.lectures = response.data;
    }, function errorCallback(response) {
        alert(response.statusText);
    });

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
        }
    }, function errorCallback(response) {
        alert(response.statusText);
    });


    $scope.orderBy = function (filter) {
        $scope.order = filter;
        $scope.reverse = !$scope.reverse;
    };



    $scope.saveEdit = function (lectureId) {
        if (lectureId == 'new') {
            var newLecture = {
                center_name: $scope.chosenCenter,
                course_id: $scope.chosenCourse,
                day: $scope.chosenday,
                hour: $('#Time').val() + ":00",
                course_name: $( "#Course option:selected" ).text()
            };
            $http({
                method: 'POST',
                url: '/admin/AddLecture',
                data: newLecture
            }).then(function successCallback(response) {
                console.log("API is used successfully");
                $scope.lectures.push(newLecture);
            }, function errorCallback(response) {
                alert(response.statusText);
            });
        } else {
            var data = {
                center_name: $scope.chosenCenter,
                course_id: $scope.chosenCourse,
                day: $scope.chosenday,
                hour: $('#Time').val() + ":00",
                old_center_name: $scope.old_center_name,
                old_course_id: $scope.old_course_id,
                old_day: $scope.old_day,
                old_hour: $scope.old_hour
            };

            $http({
                method: 'POST',
                url: '/admin/EditLecture',
                data: data
            }).then(function successCallback(response) {
                console.log("API is used successfully");
                $scope.lectures[lectureId].center_name = $scope.chosenCenter;
                var index_new_course = $scope.courses.findIndex(x => x.id ==`${$scope.chosenCourse}`);        
                $scope.lectures[lectureId].course_name = $scope.courses[index_new_course].name;
                $scope.lectures[lectureId].day = $scope.chosenday;
                $scope.lectures[lectureId].hour =  $('#Time').val()+":00";
            }, function errorCallback(response) {
                alert(response.statusText);
            });
        }
        $scope.triggerForm = false;
        $scope.editForm = false;
        $scope.editlectureId = 0;
    };

    $scope.deletelecture = function (lecture) {
        var index = $scope.lectures.indexOf(lecture);
        $scope.lectureId = index;
        $scope.old_center_name = $scope.lectures[index].center_name;
        var old_course_name = $scope.lectures[index].course_name;
        var index_old_course = $scope.courses.findIndex(x => x.name ==`${old_course_name}`);        
        $scope.old_course_id = $scope.courses[index_old_course].id;
        $scope.old_day = $scope.lectures[index].day;
        $scope.old_hour = $scope.lectures[index].hour;

        $http({
            method: 'POST',
            url: '/admin/DeleteLecture',
            data: {
                center_name: $scope.old_center_name,
                course_id: $scope.old_course_id,
                day: $scope.old_day,
                hour: $scope.old_hour
            }
        }).then(function successCallback(response) {
            console.log("API is used successfully");
            $scope.lectures.splice(index, 1);
        }, function errorCallback(response) {
            alert(response.statusText);
        });
        

    };

    $scope.addlecture = function () {
        $scope.lectureId = 'new';
        $scope.triggerForm = true;
        $scope.editForm = false;
        $scope.addForm = true;
        $scope.lectureExisted = false;
        $scope.lectureForm.$setUntouched();
        
    };
    $scope.editlecture = function (lecture) {
        var index = $scope.lectures.indexOf(lecture);
        $scope.triggerForm = true;
        $scope.editForm = true;
        $scope.addForm = false;
        $scope.lectureExisted = false;
        $scope.lectureId = index;
        $scope.old_center_name = $scope.lectures[index].center_name;
        var old_course_name = $scope.lectures[index].course_name;
        var index_old_course = $scope.courses.findIndex(x => x.name ==`${old_course_name}`);        
        $scope.old_course_id = $scope.courses[index_old_course].id;
        $scope.old_day = $scope.lectures[index].day;
        $scope.old_hour = $scope.lectures[index].hour;
    };
});