

module.exports=function(app, express, pool, jwt, secret, bcrypt){

    const saltRounds = 10;

    var authRouter = express.Router();


    authRouter.post('/', function(req,res){

        pool.getConnection(function(err, connection){

            if (err) {
                res.json({"code" : 100, "status" : "Error in connection database"});
                return;
            }





            connection.query('SELECT * FROM users WHERE name=?', req.body.credentials.username ,function(err, rows, fields) {

                connection.release();

                console.log(rows);

                if(rows.length<1){
                    res.json({ status: 'NOT OK', description:'Username doesnt exist' });
                    return;
                }
                var validPass = bcrypt.compareSync("123", bcrypt.hashSync("123"));
                console.log(validPass);

                //TODO TODO OVDJE MORAŠ STAVITI NORMALNE HASHEVE I PASSWORDE



                if (!err){

                    if (rows.length>0 && validPass){
                        console.log('drugi if');

                        var token = jwt.sign({
                            username:rows[0].name,
                            password:rows[0].pass,
                            level:rows[0].level
                        }, secret, {
                            expiresIn:1440
                        });


                        res.json({ status: 'OK', token:token, user: {username:rows[0].name, level:rows[0].level}});

                    } else if (rows.length>0){

                        res.json({ status: 'NOT OK', description:'Wrong password' });

                    } else {

                        res.json({ status: 'NOT OK', description:'Username doesnt exist' });

                    }



                }

                else
                    res.json({ status: 'NOT OK' });
            });

        });

    });

    authRouter.post('/reg', function(req,res){

        pool.getConnection(function(err, connection){

            if (err) {
                res.json({"code" : 100, "status" : "Error in connection database"});
                return;
            }
            console.log(req);

        connection.query('SELECT * FROM users WHERE name=?', req.body.credentials.username ,function(err, rows, fields) {
            if(rows.length>0){
                res.json({ status: 'NOT OK', description:'Username already exist' });
            }else{
                var user = {
                    name: req.body.credentials.username,
                    pass: bcrypt.hashSync(req.body.credentials.password),
                    mail: req.body.credentials.mail,
                    level: 'nije admin'
                }

                connection.query('INSERT INTO users SET ?', user, function (err, data) {
                    connection.release();

                    if(!err){
                        res.json({status:'OK', insertId:data.insertId});
                    }else{
                        res.json({status:'NOT OK'});
                        console.log(err);
                    }
                })
            }
        });});

    });


    return authRouter;

}
