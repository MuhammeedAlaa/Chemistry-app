// jshint esversion:8
var myApp = angular.module('myApp', []);


myApp.controller('namesCtrl', function ($scope, $http) {
    $('th').css('cursor', 'pointer');
    $scope.triggerForm = false;
    $scope.editForm = false;
    $scope.addForm = false;
    $scope.order = 'lec_number';
    $scope.reverse = false;
    $scope.lectures = [];
    $scope.courses = [];
    $scope.LectureTimes = [];
    $scope.chosenCenter = '';
    $scope.chosenLecTime = '';
    $scope.chosenCourse = '';
    $scope.chosenday = "";
    $scope.chosendate = "";
    $scope.chosenhour = "";

    $http({
        method: 'GET',
        url: '/assistant/lecturedata'
    }).then(function successCallback(response) {
        $scope.lectures = response.data;
    }, function errorCallback(response) {
        alert(response.statusText);
    });


function updatetable(){
    $http({
        method: 'GET',
        url: '/assistant/baseLectureData'
    }).then(function successCallback(response) {
        
        chosenLecTime = "";
        data = response.data;
        for (let i = 0; i < data.length; i++) {
            data[i].id = i;
        }
        $scope.LectureTimes = data;
        console.log($scope.LectureTimes);
    }, function errorCallback(response) {
        alert(response.statusText);
    });
}
updatetable();

    $scope.orderBy = function (filter) {
        $scope.reverse = ($scope.order === filter) ? !$scope.reverse : false;
        $scope.order = filter;
    };



    $scope.saveEdit = function (lectureId) {
        if (lectureId == 'new') {
            $scope.chosenLecTime = $scope.LectureTimes[parseInt($scope.chosenLecTime)];
            console.log($scope.chosenLecTime);    
            var newLecture = {
                center_name: $scope.chosenLecTime.center_name,
                course_name: $scope.chosenLecTime.course_name,
                course_id: $scope.chosenLecTime.course_id,
                day: $scope.chosenLecTime.day,
                hour: $scope.chosenLecTime.hour,
                date: $( "#lecdate" ).val(),
                fullmark: $( "#fullmark" ).val()
            };
            $http({
                method: 'POST',
                url: '/assistant/AddLecture',
                data: newLecture
            }).then(function successCallback(response) {
                newLecture.lecture_num = response.data;
                $scope.lectures.push(newLecture);
            }, function errorCallback(response) {
                alert(response.statusText);
                $scope.lectures.push(newLecture);
            });
        } else {
            var data = {
                lecture_num: $scope.chosenLecTime.lecture_num,
                center_name: $scope.chosenLecTime.center_name,
                course_name: $scope.chosenLecTime.course_name,
                course_id: $scope.chosenLecTime.course_id,
                day: $scope.chosenLecTime.day,
                hour: $scope.chosenLecTime.hour,
                date: $( "#lecdate" ).val(),
                fullmark: $( "#fullmark" ).val()
            };

            $http({
                method: 'POST',
                url: '/assistant/EditLecture',
                data: data
            }).then(function successCallback(response) {
                $scope.lectures[lectureId].date = $( "#lecdate" ).val();
                $scope.lectures[lectureId].fullmark = $( "#fullmark" ).val();

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
        console.log();

        $http({
            method: 'POST',
            url: '/assistant/DeleteLecture',
            data: $scope.lectures[$scope.lectureId]
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
        $scope.chosenLecTime = "";
        $( "#lectureForm" ).show();
        $( "#lectureFormlbl" ).show();

        
    };
    $scope.editlecture = function (lecture) {
        var index = $scope.lectures.indexOf(lecture);
        console.log(index);
        $scope.triggerForm = true;
        $scope.editForm = true;
        $scope.addForm = false;
        $scope.lectureExisted = false;
        $scope.lectureId = index;
        $scope.chosenLecTime = $scope.lectures[index];
        $scope.chosenLecTime.lecture_num = $scope.lectures[index].lecture_num;
        $scope.chosenLecTime.course_id = $scope.lectures[index].course_id;
        $("#chosenLecTime").hide();
        $("#chosenLecTimelbl").hide();
        
    };
});