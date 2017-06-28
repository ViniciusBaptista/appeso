function banco(imcdb) {

    document.addEventListener('deviceready', function () {
        var db = window.sqlitePlugin.openDatabase({ name: 'prototipo.db', location: 'default' }, function (db) {

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




            function getimcs(last) {


                db.transaction(function (tx) {

                    var query = "SELECT * FROM imcusuario WHERE imc != ?";

                    tx.executeSql(query, [last], function (tx, resultSet) {
                        //Passar para jquery e criar um lugar especifico para display
                        var formato;
                        for (var x = 0; x < resultSet.rows.length; x++) {
                            formato = "" + resultSet.rows.item(x).data + " " + resultSet.rows.item(x).imc + "";
                            dadosBD.push(formato);

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

            }

            /*
             addItem(imcdb);
             getData(0);
             getimcs(0);
             */
            //var imcs = [];
            //  var datas = [];
            //  var returnimc;
            //var returndata;



        }, function (error) {
            console.log('Open database ERROR: ' + JSON.stringify(error));
        });

    });

}
