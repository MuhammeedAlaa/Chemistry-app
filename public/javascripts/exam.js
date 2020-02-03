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
    $scope.crudFormparentFullMark = '';
    $scope.chosenCenter = '';
    $scope.chosenCourse = '';
    $scope.chosenLecture = '';
    $('#saveandcancel').hide();
    $('#studenttable').hide();
    $('#lec').hide();
    $('#lblec').hide();
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

    $scope.orderBy = function(filter) {
        $scope.order = filter;
        $scope.reverse = !$scope.reverse;
    };
    $scope.insertExam = function() {
        if ($scope.chosenCourse != '' && $scope.chosenCenter != '' && $scope.chosenLecture != '' && $scope.crudFormparentFullMark != '') {
            $scope.triggerForm = true;
            $scope.addForm = true;
            $http({
                method: 'POST',
                url: '/admin/insertexam',
                data: {
                    lecture_num: $scope.chosenLecture,
                    center_name: $scope.chosenCenter,
                    course_id: $scope.chosenCourse,
                    full_mark: $scope.crudFormparentFullMark
                }
            }).then(function successCallback(response) {
                console.log("API is used successfully");
                $(location).attr('href', '/admin');
            }, function errorCallback(response) {
                alert(response.statusText);
            });
        }  else  {
            alert("Please choose Coure and Center and put full mark for the exam");
        }
    };
    $scope.showLec = function () {        
    if($scope.chosenCourse != '' && $scope.chosenCenter != ''){
        $http({
            method: 'GET',
            url: '/assistant/lecturenumber/' + $scope.chosenCourse + '/' + $scope.chosenCenter
        }).then(function successCallback(response) {
            $('#lec').val("");            
            for(var o = 0; o< $scope.lectures.length ;o ++ ){
                $('#'+$scope.lectures[o].id ).remove();} 
            for (var i = 0; i < response.data.lecture_num.length; i++) {
                $scope.lectures.push({
                    id: response.data.lecture_num[i],
                    day: response.data.day[i],
                    hour: response.data.hour[i]
                });
                $('#lec').append(`<option value="${response.data.lecture_num[i]}" id="${response.data.lecture_num[i]}"> 
                                       ${" Day: " + response.data.day[i] + " Time: " + response.data.hour[i]} 
                                  </option>`); 
            }
        }, function errorCallback(response) {
            alert(response.statusText);
        });
        $('#lec').show();
        $('#lblec').show(); 
    } 
    
    };
    

});