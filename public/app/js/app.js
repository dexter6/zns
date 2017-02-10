var app = angular.module('znsApp', ['ngRoute']);


app.config(function ($routeProvider) {
    $routeProvider.
    when('/',{
        templateUrl:'app/views/templates/vijesti.html',
        controller: 'VijestiCtrl'
    }).when('/galerija', {
        templateUrl:'app/views/templates/albumi.html',
        controller: 'AlbumiCtrl'
    }).when('/reg', {
        templateUrl:'app/views/templates/reg.html',
        controller: 'RegCtrl'
    }).when('/clanovi', {
        templateUrl:'app/views/templates/clanovi.html',
        controller: 'ClanoviCtrl'
    }).when('/dokumenti', {
        templateUrl:'app/views/templates/dokumenti.html',
        controller: 'DokumentiCtrl'
    }).when('/login', {
        templateUrl:'app/views/templates/login.html',
        controller: 'LoginCtrl'
    }).when('/slike', {
        templateUrl: 'app/views/templates/galerija.html',
        controller: 'GalerijaCtrl'
    }).otherwise({
        redirectTo: '/'
    });


});