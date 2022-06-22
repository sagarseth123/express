var app=angular.module("MyApp",['ngRoute','ngAnimate']);

app.config(['$routeProvider',function($routeProvider){
    $routeProvider
    .when('/home',{
        templateUrl:'views/home.html'
    })
    .when('/contact',{
        templateUrl:'views/contact.html'
    })
    .when('/about',{
        templateUrl:'views/about.html'
    })
    .otherwise({
        redirectTo: '/home'
     });

}]);

app.controller("myController", function ($scope) {
    
});

app.controller("HomeController",function($scope,$http){
    console.log("working");
    $http.get('/books').then(function (res) {
        $scope.books = res.data;
    }, function (err) {
        console.log("we get an error");
    });

    $scope.addBook = function () {
        var data = {
            name: $scope.bookname,
            price:$scope.bookPrice
        }
        console.log(data);
        $http.post('/add', data).then(function (res) {
            $scope.books = res.data;
            console.log(res.data);
        }, function (res) {
            console.log("found err");
        });
        $scope.bookname = "";
        $scope.bookPrice = "";
    }

    $scope.delete = function (filename) {
        //console.log(filename);
        $http.get('/delete/'+filename).then(function (res) {
            console.log(res.data);
            $scope.books = res.data;
        }, function (err) {
            console.log(err);
        });
    }

    $scope.update = function () {
        $http.get('/update/' + $scope.bookname + '/' + $scope.bookPrice).then(function (res) {
            $scope.books = res.data;
        }, function (err) {
            console.log(err);
        });
    }
});
