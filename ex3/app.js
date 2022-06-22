var app = angular.module("MyApp", []);

app.controller("Calculator" ,function ($scope) {
    var str = "",x,ans;
    $scope.buttons = function (e) {
        console.log(e.target.textContent);
        x = e.target.textContent;
        if (x == "=") {
            ans = eval(str);
            $scope.screen = ans;
        } else if (x == "Cl") {
            str = "";
            $scope.screen = "";
        } else {
            str += x;
            $scope.screen = str;
        }  
    }
});
