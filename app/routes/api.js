module.exports=function(app,express, pool){
    var apiRouter = express.Router();

    apiRouter.get('/', function (req, res) {


        res.json({message: 'Dobrodošli na naš API!'});
    });

    apiRouter.route('/vijesti').get(function (req, res) {
        pool.getConnection(function (err, connection) {
            if(err){
                res.json({"code": 100, "status": "Error while connecting to database"});
                return;
            }

            connection.query('SELECT * FROM vijesti ORDER BY timestamp DESC', function (err, rows, fields) {
                connection.release();

                if(!err){
                    res.json({status : 'OK', vijesti : rows});
                }
                else{
                    res.json({status:'NOT OK'});
                }
            });
        });
    }).post(function (req, res) {
        pool.getConnection(function (err, connection) {
            if (err) {
                res.json({"code": 100, "status": "Error while connecting to database"});
                return;
            }

            var vijest = {
                autor:'admin', // promijeni kad dođe login
                naslov: req.body.vijest.naslov,
                tekst: req.body.vijest.tekst,
                slika: req.body.vijest.slika,
                timestamp: new Date()
            };

            console.log(vijest);
            
            connection.query('INSERT INTO vijesti SET ?', vijest, function (err, data) {
                connection.release();
                
                if(!err){
                    res.json({status:'OK', insertId:data.insertId});
                }
                else{
                    res.json({status: 'NOT OK'});
                    console.log(err);
                }
            });

        });
    }).put(function (req, res) {
        pool.getConnection(function (err, connection) {
            if(err){
                res.json({"code": 100, "status": "Error while connecting to database"});
                return;
            }


            var vijest = {
                autor:'admin', // promijeni kad dođe login
                naslov: req.body.vijest.naslov,
                tekst: req.body.vijest.tekst,
                slika: req.body.vijest.slika,
                timestamp: new Date()
            };
            
            connection.query('UPDATE vijesti SET ? WHERE id = ?', [vijest, req.body.vijest.id], function (err, data) {
                if (!err){

                    res.json({ status: 'OK', changedRows:data.changedRows });

                }

                else {
                    res.json({status: 'NOT OK'});
                    console.log(err);
                }
            });
            });
            });

    apiRouter.route('/vijesti/:id').delete(function (req, res) {
        pool.getConnection(function (err, connection) {
            if (err) {
                res.json({"code": 100, "status": "Error while connecting to database"});
                return;
            }

            connection.query('DELETE FROM vijesti WHERE id = ?', req.params.id, function (err, data) {
                connection.release();

                if (!err){

                    res.json({ status: 'OK', affectedRows :data.affectedRows });

                }

                else {
                    res.json({status: 'NOT OK'});
                    console.log(err);
                }
            });
            });
        });

    apiRouter.route('/clanovi').get(function (req, res) {
        pool.getConnection(function (err, connection) {
            if(err){
                res.json({"code": 100, "status": "Error while connecting to database"});
                return;
            }

            connection.query('SELECT * FROM clanovi', function (err, rows, fields) {
                connection.release();

                if(!err){
                    res.json({status : 'OK', clanovi : rows});
                }
                else{
                    res.json({status:'NOT OK'});
                }
            });
        });
    }).post(function (req, res) {
        pool.getConnection(function (err, connection) {
            if (err) {
                res.json({"code": 100, "status": "Error while connecting to database"});
                return;
            }

            var clan = {
                ime: req.body.clan.ime,
                prezime: req.body.clan.prezime,
                rodjendan: req.body.clan.rodjendan,
                kategorija: req.body.clan.kategorija,
                mjesto: req.body.clan.mjesto,
                slika: req.body.clan.slika
            };

            console.log(clan);

            connection.query('INSERT INTO clanovi SET ?', clan, function (err, data) {
                connection.release();

                if(!err){
                    res.json({status:'OK', insertId:data.insertId});
                }
                else{
                    res.json({status: 'NOT OK'});
                    console.log(err);
                }
            });

        });
    }).put(function (req, res) {
        pool.getConnection(function (err, connection) {
            if(err){
                res.json({"code": 100, "status": "Error while connecting to database"});
                return;
            }


            var clan = {
                ime: req.body.clan.ime,
                prezime: req.body.clan.prezime,
                rodjendan: req.body.clan.rodjendan,
                kategorija: req.body.clan.kategorija,
                mjesto: req.body.clan.mjesto,
                slika: req.body.clan.slika
            };

            connection.query('UPDATE clanovi SET ? WHERE id = ?', [clan, req.body.clan.id], function (err, data) {
                if (!err){

                    res.json({ status: 'OK', changedRows:data.changedRows });

                }

                else {
                    res.json({status: 'NOT OK'});
                    console.log(err);
                }
            });
        });
    });

    apiRouter.route('/clanovi/:id').delete(function (req, res) {
        pool.getConnection(function (err, connection) {
            if (err) {
                res.json({"code": 100, "status": "Error while connecting to database"});
                return;
            }

            connection.query('DELETE FROM clanovi WHERE id = ?', req.params.id, function (err, data) {
                connection.release();

                if (!err){

                    res.json({ status: 'OK', affectedRows :data.affectedRows });

                }

                else {
                    res.json({status: 'NOT OK'});
                    console.log(err);
                }
            });
        });
    });

    apiRouter.route('/albumi').get(function (req, res) {
        pool.getConnection(function (err, connection) {
            if (err) {
                res.json({"code": 100, "status": "Error while connecting to database"});
                return;
            }

            connection.query('SELECT * FROM albumi', function (err, rows, fields) {
                connection.release();

                if (!err) {
                    res.json({status: 'OK', albumi: rows});
                }
                else {
                    res.json({status: 'NOT OK'});
                }
            });
        });
    });

    apiRouter.route('/slike').get(function (req, res) {
        pool.getConnection(function (err, connection) {
            if (err) {
                res.json({"code": 100, "status": "Error while connecting to database"});
                return;
            }

            connection.query('SELECT * FROM slike', function (err, rows, fields) {
                connection.release();

                if (!err) {
                    res.json({status: 'OK', slike: rows});
                }
                else {
                    res.json({status: 'NOT OK'});
                }
            });
        });
    });


    apiRouter.get('/me', function (req, res){

        res.send(req.decoded);

    });




    return apiRouter;
}