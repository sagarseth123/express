var cApp = angular.module("cApp", ["ngRoute"]);

cApp.config([
  "$routeProvider",
  function ($routeProvider) {
    $routeProvider
      .when("/home", {
        templateUrl: "home.html",
      })
      .when("/register", {
        templateUrl: "register.html",
      })
      .when("/insert", {
        template: "<h1> {{ response }} </h1>",
        controller: "routingCtrl",
      })
      .when("/users", {
        templateUrl: "user_list.html",
        controller: "usersCtrl",
      })
      .otherwise({
        redirectTo: "/register",
      });
  },
]);

//MEAN stack register form

cApp.service("getFormData", [
  function () {
    this.extractData = function (formNode) {
      var formDataObj = {};
      var formData = new FormData(formNode);
      for (var key of formData.keys()) {
        formDataObj[key] = formData.get(key);
      }
      return formDataObj;
    };
  },
]);

cApp.service("shareService", [
  function () {
    var toShare = {};
    this.get = function () {
      return toShare;
    };
    this.set = function (newValue) {
      toShare = newValue;
    };
  },
]);

cApp.controller("userRegisterCtrl", [
  "$http",
  "$location",
  "getFormData",
  "shareService",
  "$scope",
  function ($http, $location, getFormData, shareService, $scope) {
    $scope.formData = {}; // data to be sent via http

    // pre-populate form data (for easy-debugging)
    $scope.populate = function () {
      document.forms["register_form"]["f_name"].value = "Donald";
      document.forms["register_form"]["l_name"].value = "Trump";
      document.forms["register_form"]["email"].value = "don_trump@gmail.com";
      document.forms["register_form"]["pwd"].value = "asdfg";
    };

    $scope.submitData = function () {
      var formNode = document.forms["register_form"];
      var formDataObj = JSON.stringify(getFormData.extractData(formNode));

      $http({
        method: "POST",
        url: "http://127.0.0.1:3000/insert",
        headers: {
          "Content-Type": "application/json" /*or whatever type is relevant */,
          Accept: "application/json" /* ditto */,
        },
        data: formDataObj,
      }).then(function (response) {
        // asynchronous!
        shareService.set(response.data);
        $location.path("/insert");
      });
    };
  },
]);

cApp.controller("routingCtrl", [
  "$http",
  "shareService",
  "$scope",
  function ($http, shareService, $scope) {
    $scope.response = shareService.get();
  },
]);

cApp.controller("usersCtrl", [
  "$http",
  "$scope",
  function ($http, $scope) {
    $scope.userList = [];
    $http({
      method: "GET",
      url: "http://127.0.0.1:3000/users",
    }).then(function (response) {
      $scope.userList = response.data;
      // console.log($scope.customerData);
    });

    $scope.deleteUser = function (email) {
      console.log("I've been deleted! " + email);
      $http({
        method: "DELETE",
        params: {
          email: email,
        },
        url: "http://127.0.0.1:3000/users",
      }).then(function (response) {
        $scope.userList = response.data;
        // console.log($scope.customerData);
      });
    };
  },
]);
