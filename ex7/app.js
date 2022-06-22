var app = angular.module("MyApp", []);

app.controller("AppController", function ($scope,$http) {
    console.log("hello");
    $http.get('/data.json').then(function (res) {
        videos = res.data;
        console.log(videos);
        $scope.videos = videos;
    });
});