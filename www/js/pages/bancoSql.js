function banco (imcdb, action) {

  document.addEventListener('deviceready', function() {
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

          tx.executeSql(query, [imc], function(tx, res) {
            console.log("insertId: " + res.insertId + " -- probably 1");
            console.log("rowsAffected: " + res.rowsAffected + " -- should be 1");
          },
          function(tx, error) {
            console.log('INSERT error: ' + error.message);
          });
        }, function(error) {
          console.log('transaction error: ' + error.message);
        }, function() {
          console.log('transaction ok');
        });
      }


      function getData(last) {

        db.transaction(function (tx) {

          var query = "SELECT * FROM imcusuario WHERE imc != ?";

          tx.executeSql(query, [last], function (tx, resultSet) {

            for(var x = 0; x < resultSet.rows.length; x++) {

              
              resultados2.push(resultSet.rows.item(x).data);

                //console.log("IMC: " + resultSet.rows.item(x).imc +
                   // ", Data: " + resultSet.rows.item(x).data);

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
        return resultados2;
      }


      function getimcs(last) {
        


        db.transaction(function (tx) {

          var query = "SELECT * FROM imcusuario WHERE imc != ?";

          tx.executeSql(query, [last], function (tx, resultSet) {
            //Passar para jquery e criar um lugar especifico para display
            for(var x = 0; x < resultSet.rows.length; x++) {
              resultados.push(resultSet.rows.item(x).imc);

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
        return resultados;
      }

/*
  addItem(imcdb);
  getData(0);
  getimcs(0);
  */
  var resultados = [];
  var resultados2 = [];
switch (action) { //para ler o banco, passar como parametro o numero 1, para adicionar ao banco, passar numero 2
  case 1:
  var dadosdata = getData(0);
  var dadosimc = getimcs(0);
  return dadosimc;
  break;
  case 2:
  addItem(imcdb);
  break;
  default: console.log("comando invalido, digite 1 para puxar dados do banco, ou 2 para adicionar dados");
}




}, function (error) {
  console.log('Open database ERROR: ' + JSON.stringify(error));
});

});

}
