var app = angular.module("MyApp", []);

app.controller("AppController", function ($scope,$http) {
    $http.get('data.json').then(function (res) {
        console.log(res.data);
        $scope.files = res.data;
    });

    $scope.save=function(){
        var flag = 0;
        $scope.files.forEach(file => {
            if (file.filename == $scope.filename) {
                file.content += $scope.text;
                flag = 1;
            }
        });
        if (flag == 0) {
            var obj = {
                "filename": $scope.filename,
                "content":$scope.text
            }
            $scope.files.push(obj);
        }
        $scope.filename = "";
        $scope.text = "";
    }

    $scope.show = function (e) {
        $scope.files.forEach(file => {
            if (file.filename == e.target.textContent) {
                $scope.filename = file.filename;
                $scope.text = file.content;
            }
        });
    }

    $scope.delete = function (file) {
        var x = $scope.files.indexOf(file);
        $scope.files.splice(x, 1);
    }
})