function banco(imcdb, action) {

    document.addEventListener('deviceready', function () {
        var db = window.sqlitePlugin.openDatabase({name: 'prototipo.db', location: 'default'}, function (db) {

            // Here, you might create or open the table.
            db.transaction(function (tx) {
                // ...
                tx.executeSql('CREATE TABLE IF NOT EXISTS imcusuario (id INTEGER PRIMARY KEY ASC AUTOINCREMENT NOT NULL, imc  DOUBLE (3, 2) NOT NULL, data DATE DEFAULT (CURRENT_DATE));)');
            }, function (error) {
                console.log('transaction error: ' + error.message);
            }, function () {
                console.log('transaction ok');
            });

            function addItem(imc) {

                db.transaction(function (tx) {

                    var query = "INSERT INTO imcusuario (imc) VALUES (?)";

                    tx.executeSql(query, [imc], function (tx, res) {
                        console.log("insertId: " + res.insertId + " -- probably 1");
                        console.log("rowsAffected: " + res.rowsAffected + " -- should be 1");
                    },
                            function (tx, error) {
                                console.log('INSERT error: ' + error.message);
                            });
                }, function (error) {
                    console.log('transaction error: ' + error.message);
                }, function () {
                    console.log('transaction ok');
                });
            }


            function getData(last) {

                var datas = [];
                db.transaction(function (tx) {

                    var query = "SELECT * FROM imcusuario WHERE imc != ?";

                    tx.executeSql(query, [last], function (tx, resultSet) {

                        for (var x = 0; x < resultSet.rows.length; x++) {
                            datas.push(resultSet.rows.item(x).data);

                        }
                    },
                            function (tx, error) {
                                console.log('SELECT error: ' + error.message);
                            });
                }, function (error) {
                    console.log('transaction error: ' + error.message);
                }, function () {
                    console.log('transaction ok');
                });
                return datas;
            }


            function getimcs(last) {

                var imcs = [];
                db.transaction(function (tx) {

                    var query = "SELECT * FROM imcusuario WHERE imc != ?";

                    tx.executeSql(query, [last], function (tx, resultSet) {
                        //Passar para jquery e criar um lugar especifico para display
                        for (var x = 0; x < resultSet.rows.length; x++) {
                            imcs.push(resultSet.rows.item(x).imc);
                        }

                    },
                            function (tx, error) {
                                console.log('SELECT error: ' + error.message);
                            });
                }, function (error) {
                    console.log('transaction error: ' + error.message);
                }, function () {
                    console.log('transaction ok');
                });
                return imcs;
            }

            /*
             addItem(imcdb);
             getData(0);
             getimcs(0);
             */

            var returnimc;
            var returndata;
            switch (action) { //para inserir no banco 1, para puxar datas 2, para puxar imcs 3
                case 1:
                    addItem(imcdb);
                    break;
                case 2:
                    returndata = getData(0);
                    /*for (let i = 0; i < returndata.length; i++){
                      console.log("batata  " + returndata[i]);
                    }*/
                    return returndata;
                    break;
                case 3:
                    returnimc = getimcs(0);
                    /*for (let i = 0; i < returnimc.length; i++){
                      console.log("batata  " + returnimc[i]);
                    }*/
                    return returnimc;
                    break;
                default:
                    console.log("comando invalido, digite 1 para puxar dados do banco, ou 2 para adicionar dados");
            }




        }, function (error) {
            console.log('Open database ERROR: ' + JSON.stringify(error));
        });

    });

}
