var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("1.log from controller");
    var updatelist = function() {
        $http.get('/emplist').success(function(response) {
            console.log("3.Recieved the requested Data");
            $scope.emplist = response;
            $scope.employee = "";
        });
    };
    updatelist();


    $scope.addEmp = function() {
        $http.post('/emplist', $scope.employee).success(function(response) {
            console.log(response);
            updatelist();
        });
    };


    $scope.removeEmp = function(id) {
        $http.delete('/emplist/' + id).success(function(response) {
            updatelist();
        });
        console.log("Removed Employee ID:" + id);
    };

    $scope.editEmp = function(id) {
        console.log(id);
        $http.get('/emplist/' + id).success(function(response) {
            $scope.employee = response;

        });
    };


    $scope.updateEmp = function() {
        console.log($scope.employee._id);
        $http.put('/emplist/' + $scope.employee._id, $scope.employee).success(function(response) {
            updatelist();
            $scope.employee = "";
        });
    };

    $scope.clearall = function() {
        $scope.employee = "";
    }

}]);
