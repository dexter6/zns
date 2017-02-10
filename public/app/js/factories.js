app.factory('DataFactory', function ($http) {
    return{
        getVijesti:function (callback) {
            $http.get('api/vijesti', {cache:true}).success(callback);
        },
        postVijesti:function (vijest, callback) {
            $http.post('api/vijesti', {vijest:vijest}).success(callback);
        },
        deleteVijest:function (id, callback) {
            $http.delete('api/vijesti/'+id).success(callback);
        },
        editVijesti:function (vijest, callback) {
            $http.put('/api/vijesti', {vijest:vijest}).success(callback);
        },
        getClanovi:function (callback) {
            $http.get('api/clanovi', {cache:true}).success(callback);
        },
        postClan:function (clan, callback) {
            $http.post('api/clanovi',{clan:clan}).success(callback);
        },
        editClan:function (clan, callback) {
            $http.put('/api/clanovi', {clan:clan}).success(callback);
        },
        deleteClan:function (id, callback) {
            $http.delete('/api/clanovi/' + id).success(callback);
        },
        getAlbumi:function (callback) {
            $http.get('/api/albumi').success(callback);
        },
        getSlike:function (callback) {
            $http.get('/api/slike').success(callback);
        }
    }
});

app.factory('AuthToken', function($window){


    return {

        getToken : function(){

            return $window.localStorage.getItem('token');

        },

        setToken : function(token) {

            if (token) {

                $window.localStorage.setItem('token', token);

            } else {

                $window.localStorage.removeItem('token');

            }

        }
    }

});

app.factory('Auth', function($http, $q, AuthToken, $rootScope,$location){

    return {

        login : function(credentials, callback){

            $http.post('/auth', {credentials: credentials}).success(function(data) {

                if (data.token != undefined) {

                    AuthToken.setToken(data.token);
                    $rootScope.user = data.user;

                    $rootScope.authenticated = true;
                    $location.path('/')

                } else {

                    callback(data);

                }



            });

        },

        logout : function(){

            $rootScope.authenticated=false;
            $rootScope.user={};
            AuthToken.setToken();
            $location.path('/')

        },

        isLoggedIn:function(){

            return  (AuthToken.getToken()) ? true : false;

        },
        register:function (credentials, callback) {
            return $http.post('/auth/reg', {credentials:credentials}).success(callback);
        }


    };


});

//servis koji ce ukljuciti token u headere svakog requesta na server
app.factory('interceptorService', function($location, $q, AuthToken, $rootScope){

    var interceptorService = {};


    interceptorService.request=function (config){

        var token=AuthToken.getToken();

        if (token) config.headers['x-access-token'] = token;


        return config;

    };

    interceptorService.responseError=function(response){

        if (response.status == 403){

            AuthToken.setToken();
            $location.path('/');
            $rootScope.redirected=true;

        }

        return $q.reject(response);

    };

    return interceptorService;


});