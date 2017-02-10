app.controller('NavCtrl', function($scope, $location, $rootScope) {

    $scope.authen = $rootScope.authenticated;
    console.log($scope.authen + 'Ovo je navCtrl');
    $scope.checkUrl = function (value){
        $scope.url = $location.url();

        if(value.substring(1) == $scope.url){
            return "w3-white";
        }
        else{
            return "w3-red";
        }

    }

    $scope.getCurrent = function () {
        return $scope.nav["#"+$location.url()];

    }



    $scope.nav = {"#/":"Početna", "#/clanovi":"Članovi", "#/dokumenti":"Dokumenti", "#/galerija":"Galerija"};
});

app.controller('ClanoviCtrl', function ($scope, DataFactory, $rootScope) {

    if(!angular.isDefined($rootScope.user)){
        $scope.level = 'nije admin';
    }else{
        $scope.level = $rootScope.user.level;
    }
    console.log($scope.level);



    $scope.getClans = function () {
        DataFactory.getClanovi(function (data) {
            $scope.clanovi = data.clanovi.map(function (x) {
                if(x.slika == null){
                    x.slika = '../assets/img/bruno.jpg'
                }
                return x;
            });
            console.log($scope.clanovi);

        });
    };

    $scope.getClans();
    $scope.add = false;
    $scope.editId=-1;


    $scope.setEdit = function (i) {
        $scope.editId = i;
    };

    $scope.doneEditing = function (clan) {
        $scope.editId = -1;
        DataFactory.editClan(clan, function (res) {
            console.log(res);
        })
    };

    $scope.addClan = function (valid) {



            DataFactory.postClan($scope.new, function (data) {
                if($scope.new.slika==null){
                    $scope.new.slika='../assets/img/bruno.jpg';
                }
                $scope.clanovi.push($scope.new);
                $scope.add = false;
                $scope.new = {};

            });

        $scope.getClans();
        };

    $scope.delete = function (id) {
        if(confirm('Jeste li sigurni?')){
            DataFactory.deleteClan(id, function (data) {
                $scope.getClans();
                })

        }
    };

});

app.controller('ForumCtrl', function ($scope) {
    $scope.nezz = "Koji bog?";

});

app.controller('VijestiCtrl', function ($scope, DataFactory, $window, $rootScope ) {

    $scope.auth = $rootScope.authenticated;
    console.log($scope.auth);
    if(!angular.isDefined($rootScope.user)){
        $scope.level = 'nije admin';
    }else{
        $scope.level = $rootScope.user.level;
    }
    console.log($scope.level);

    $scope.tinyinit = function () {
        tinymce.init({
            selector: 'textarea',
            height: 200,
            width: 600,

            plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table contextmenu paste code'
            ],
            toolbar: 'undo redo | insert | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media',
            content_css: '//www.tinymce.com/css/codepen.min.css'
        });
    };

    $scope.editId = -1;
    $scope.add = false;

    DataFactory.getVijesti(function (data) {
        $scope.vijesti = data.vijesti;
    });

    $scope.setEdit = function (i) {
        $scope.editId = i;
    };

    $scope.doneEditing = function (i) {
        $scope.editId = -1;
        DataFactory.editVijesti($scope.vijesti[i], function (res) {
            console.log(res);
        });
    };

    $scope.delete = function (index) {
        if(confirm('Jeste li sigurni?')){
            DataFactory.deleteVijest($scope.vijesti[index].id, function (data) {
                $scope.vijesti = $scope.vijesti.filter(function (vijest, i) {
                    if (i!= index )
                        return true;
                })
            })
        }
    };

    $scope.dodajToggle = function () {
        $scope.add = !$scope.add;
        if($scope.add){
            $scope.tinyinit();
        }

    }
    
    $scope.addVijest = function (valid) {

        console.log(tinyMCE.activeEditor.getContent());
        if(tinyMCE.activeEditor.getContent()==""){
            $window.alert('Unesite tekst vijesti!');
        }
        else{

        $scope.new.tekst = tinyMCE.activeEditor.getContent();
         DataFactory.postVijesti($scope.new, function (data) {
         $scope.vijesti.push($scope.new);
         $scope.add = false;
         $scope.new = {};
         tinyMCE.activeEditor.setContent('');
         })


    }};

});




app.controller('DokumentiCtrl', function ($scope, $rootScope) {
    console.log("Dokumenti");

    $scope.tinyinit = function () {
        tinymce.init({
            selector: 'textarea',
            height: 200,
            width: 600,

            plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table contextmenu paste code'
            ],
            toolbar: 'undo redo | insert | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media',
            content_css: '//www.tinymce.com/css/codepen.min.css'
        });
    };


    $scope.$on('$routeChangeSuccess', function(next, current) {
        //Tiny ostavlja istancu editora kod route changea pa ne radi na povratku, treba se removati pa opet napraviti init
        if(tinyMCE.activeEditor != null){
            tinymce.EditorManager.remove();

        }
        $scope.tinyinit();
    });

    $scope.getEditor = function () {
        console.log(tinyMCE.activeEditor.getContent());
    }


});

app.controller('GalerijaCtrl', function ($scope, $rootScope, DataFactory) {
    $scope.index = 0;
    $scope.images = ["../assets/img/01.jpg", "../assets/img/02.jpg", "../assets//img/03.jpg", "../assets//img/04.jpg", "../assets//img/05.jpg"];
    $scope.album = $rootScope.album;

    DataFactory.getSlike(function (data) {
        $scope.slike = data.slike.filter(function (x) {
            if(x.album==$rootScope.album.id)
                return x;
        });
        console.log($scope.slike);
    });







    $scope.nextImg = function () {
        if($scope.slike.length > $scope.index + 1){
            $scope.index +=1;
        }


        console.log($scope.index);


    };

    $scope.prevImg = function () {
        if ($scope.index > 0){
            $scope.index -=1;
        }

        console.log($scope.index);

    };

});

app.controller('AlbumiCtrl', function ($scope, DataFactory, $rootScope, $location) {
    DataFactory.getAlbumi(function (data) {
        $scope.albumi = data.albumi;
        console.log($scope.albumi);
    });

    $scope.openAlbum = function (album) {
        $rootScope.album = album;
        console.log($rootScope.albumId);
        $location.path('/slike');
    }

});

app.controller('LoginCtrl', function ($scope, $rootScope, Auth, $location) {

    if ($rootScope.authenticated){
        Auth.logout();
    }

    $scope.login=function(){

        Auth.login($scope.credentials, function(data){

            console.log(data);
            $scope.message=data.description;

        });

    }

});

app.controller('RegCtrl', function ($scope, $rootScope,$location, Auth) {
    if($rootScope.authenticated)
        $location.path('/')

    $scope.register = function () {
        Auth.register($scope.newuser, function (res) {
            Auth.login(user, function (data) {
                console.log(data);
            })
        })
    }
});