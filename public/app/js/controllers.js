app.controller('NavCtrl', function($scope, $location, $rootScope, $route) {

    $scope.authen = firebase.auth().currentUser;
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

    $scope.login=function(){


        firebase.auth().signInWithEmailAndPassword("denis.vidalin@gmail.com", "De13129936")
            .catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                if (errorCode === 'auth/wrong-password') {
                    alert('Wrong password.');
                } else {
                    alert(errorMessage);
                }
                console.log(error);
            }).then(function (user) {
                $scope.authen = user.email;
                $rootScope.user = $scope.authen;
                console.log(user.email);
                $route.reload();
        });





    };

    $scope.signOut = function () {

        firebase.auth().signOut().then(function() {
            console.log('Signed Out');
            $scope.authen = null;
            $rootScope.user = null;
            $route.reload();
        }, function(error) {
            console.error('Sign Out Error', error);
        });
    };



    $scope.nav = {"#/":"Početna", "#/clanovi":"Članovi", "#/dokumenti":"Dokumenti", "#/galerija":"Galerija"};






});

app.controller('ClanoviCtrl', function ($scope, DataFactory, $rootScope, $routeParams) {






    $scope.getClans = function () {
        DataFactory.getClanovi($routeParams.part, function (data) {
            $scope.clanovi= Object.keys(data).map(function (k) {

                return data[k];
            });

            $scope.clanovi.map(function (k) {
                if(!angular.isDefined(k.slika)){
                    k.slika = "assets/img/bruno.jpg";
                }
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

    $scope.auth = $rootScope.user;
    console.log($scope.auth);
    if($scope.user == "denis.vidalin@gmail.com"){
        $scope.level = 'admin';
    }else{
        $scope.level = "nije, admin"
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
        $scope.vijesti = data;
        console.log($scope.vijesti);
        $(function() {
            $('#carousel').carouFredSel({
                responsive: true,
                items: {
                    visible: 1,

                },
                scroll: {
                    duration: 350,
                    timeoutDuration: 2500,
                    fx: 'uncover-fade'
                },
                pagination: '#pager',
                swipe: {
                    onMouse: true,
                    onTouch: true
                },
                mouswheel: true,
                cookie: true
            });
        });
    });

    $scope.setEdit = function (key) {
        $scope.editId = key;
    };

    $scope.doneEditing = function (i) {
        $scope.editId = -1;
        DataFactory.editVijesti($scope.vijesti[i], i, function (res) {
            console.log(res);
        });
    };

    $scope.delete = function (key) {
        if(confirm('Jeste li sigurni?')){
            DataFactory.deleteVijest(key, function (data) {

                console.log(key);
                delete $scope.vijesti[key];
                console.log($scope.vijesti);

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

        $scope.new.sadrzaj = tinyMCE.activeEditor.getContent();
        $scope.new.autor = $rootScope.user;
        $scope.new.timestamp = new Date();




        console.log($scope.new);



         DataFactory.postVijesti($scope.new, function (data) {

             console.log(data.name);

             $scope.vijesti[data] = $scope.new;
            $scope.add = false;
            $scope.new = {};
            tinyMCE.activeEditor.setContent('');

         });






        }};












});




app.controller('DokumentiCtrl', function ($scope, $rootScope, DataFactory, $routeParams) {


    var part = $routeParams.part;
    var ref = firebase.database().ref();
    var dbRef = ref.child('dokumenti' + part);



    DataFactory.getDokumenti(part, function (data) {
        $scope.datoteke = data;


        console.log($scope.datoteke);


    });





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

    var uploader = document.getElementById('uploader');
    var progressbar = document.getElementById('progress');

    uploader.addEventListener('change', function (e) {
        var file = e.target.files[0];



        var storageRef = firebase.storage().ref('dokumenti/' + part + '/' + file.name);

        var task = storageRef.put(file);

        task.on('state_changed',
            function progress(snapshot){

                var postotak = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(postotak);
                progressbar.value = postotak;
            },
            function error(err) {

            },
            function complete() {

                console.log(task.snapshot);
                console.log(dbRef);
                var key = dbRef.push().key;
                console.log(key);
                var updates = {};
                var datoteka = {ime:file.name, url:task.snapshot.downloadURL}
                updates[key] = datoteka;
                dbRef.update(updates);
                $scope.datoteke[key] = datoteka;
                console.log($scope.datoteke);
            }
        );



    });

    $scope.Obrisi = function (key) {
        console.log("Brišem");
        DataFactory.deleteDokument(part + '/' +key, function (data) {
            delete $scope.datoteke[key];
            console.log($scope.datoteke);

        });
    }







});

app.controller('GalerijaCtrl', function ($scope, $rootScope, DataFactory) {
    $scope.index = 0;
    $scope.images = ["../assets/img/01.jpg", "../assets/img/02.jpg", "../assets//img/03.jpg", "../assets//img/04.jpg", "../assets//img/05.jpg"];
    $scope.album = $rootScope.album;

    DataFactory.getSlike(function (data) {
        $scope.slike = data.filter(function (x) {
            console.log("X: " + x.album);
            console.log("Scope: " + $scope.album);
            if(x.album == $scope.album){
                return x;
            }
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

        console.log(data);
        $scope.albumi = data;


    });

    $scope.openAlbum = function (album) {
        $rootScope.album = album;
        //console.log($rootScope.albumId);


        $location.path('/slike');


    }

});

app.controller('LoginCtrl', function ($scope, $rootScope, $location) {




    $scope.login=function(){


        firebase.auth().signInWithEmailAndPassword("denis.vidalin@gmail.com", "De13129936")
            .catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                if (errorCode === 'auth/wrong-password') {
                    alert('Wrong password.');
                } else {
                    alert(errorMessage);
                }
                console.log(error);
            }).then(function (user) {
            $rootScope.user = user.email;
            console.log(user.email);
        });





    };

    $scope.signOut = function () {

        firebase.auth().signOut().then(function() {
            console.log('Signed Out');
            $rootScope.user = null;
        }, function(error) {
            console.error('Sign Out Error', error);
        });
    };

});

app.controller('RegCtrl', function ($scope, $rootScope,$location) {
    if($rootScope.user != null)
        $location.path('/')

    console.log($rootScope.user);

    $scope.register = function () {

        firebase.auth().createUserWithEmailAndPassword($scope.newuser.mail, $scope.newuser.password)
            .catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                if (errorCode == 'auth/weak-password') {
                    alert('The password is too weak.');
                } else {
                    alert(errorMessage);
                }
                console.log(error);
            }).then(function (user) {
                console.log(user.emailVerified);
                if(!user.emailVerified){
                    user.sendEmailVerification();
                }
        });
    }
});