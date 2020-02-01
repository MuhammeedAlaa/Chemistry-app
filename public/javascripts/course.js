var myApp = angular.module('myApp', []);

myApp.controller('namesCtrl', function($scope, $http) {
    $scope.triggerForm = false;
    $scope.editForm = false;
    $scope.addForm = false;
    $scope.order = 'name';

    $scope.courses = [];

    $http({
        method: 'GET',
        url: '/admin/Coursedata'
    }).then(function successCallback(response) {
        console.log("API is used successfully");
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
    };

    $scope.editCourse = function(course) {
        var index = $scope.courses.indexOf(course);
        $scope.triggerForm = true;
        $scope.editForm = true;
        $scope.addForm = false;
        $scope.courseExisted = false;
        $scope.editCourseId = index;
        $scope.crudFormName = $scope.courses[index].name;        
        $('#editName').attr("placeholder", "Edit Course Name");
    };

    $scope.saveEdit = function(courseId) {  
        if (courseId == 'new') {
            var newCourse = {
                name: $scope.crudFormName,
                id: -1  
            };
            $http({
                method: 'POST',
                url: '/admin/AddCourse',
                data: {
                    new: newCourse,
                    old: $scope.courses
                }
            }).then(function successCallback(response) {
                console.log("API is used successfully");
                $scope.courses.push(newCourse);
            }, function errorCallback(response) {
                alert(response.statusText);
            });
        } else {
            var newData = {
                oldcourse: $scope.courses[courseId],
                courses: $scope.courses,
                newname: $scope.crudFormName
            };
            console.log( $scope.courses[courseId]);
            $http({
                method: 'POST',
                url: '/admin/EditCourse',
                data: newData
            }).then(function successCallback(response) {
                console.log("API is used successfully");
                $scope.courses[courseId].name = $scope.crudFormName;
            }, function errorCallback(response) {
                alert(response.statusText);
            });
        }
        $scope.triggerForm = false;
        $scope.editForm = false;
        $scope.editCourseId = 0;
    };

    $scope.deleteCourse = function(course) {
        var index = $scope.courses.indexOf(course);
        console.log(course);
        $http({
            method: 'POST',
            url: '/admin/DeleteCourse',
            data: $scope.courses[index]
        }).then(function successCallback(response) {
            console.log("API is used successfully");
            $scope.courses.splice(index, 1);
        }, function errorCallback(response) {
            alert(response.statusText);
        });

    };

    $scope.addCourse = function() {
        $scope.editCourseId = 'new';
        $scope.triggerForm = true;
        $scope.editForm = false;
        $scope.addForm = true;
        $scope.courseExisted = false;
        $scope.courseForm.$setUntouched();
        $scope.crudFormName = '';
        $('#editName').attr("placeholder", "Add Course Name");
    };
});