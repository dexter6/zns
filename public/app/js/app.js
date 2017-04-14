var app = angular.module('znsApp', ['ngRoute', 'ngSanitize']);


app.config(function ($routeProvider) {
    $routeProvider.
    when('/',{
        templateUrl:'app/views/templates/vijesti.html',
        controller: 'VijestiCtrl'
    }).when('/galerija', {
        templateUrl:'app/views/templates/albumi.html',
        controller: 'AlbumiCtrl'
    }).when('/vijest:key*', {
        templateUrl:'app/views/templates/vijest.html',
        controller: 'VijestCtrl'
    }).when('/reg', {
        templateUrl:'app/views/templates/reg.html',
        controller: 'RegCtrl'
    }).when('/clanovi:part*', {
        templateUrl:'app/views/templates/clanovi.html',
        controller: 'ClanoviCtrl'
    }).when('/dokumenti:part*', {
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