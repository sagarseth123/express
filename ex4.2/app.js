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

app.controller("myController",function($scope){
    console.log("working");
});