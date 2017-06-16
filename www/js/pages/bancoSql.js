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
                console.log("IMC: " + resultSet.rows.item(x).imc +
                    ", Data: " + resultSet.rows.item(x).data);

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


function getimcs(last) {
  var imcs = [];
  var datas = [];
  const listaImc = document.querySelector('#imc');


    db.transaction(function (tx) {

        var query = "SELECT * FROM imcusuario WHERE imc != ?";

        tx.executeSql(query, [last], function (tx, resultSet) {
            //Passar para jquery e criar um lugar especifico para display
            for(var x = 0; x < resultSet.rows.length; x++) {
              var li = document.createElement('li');
                  li.textContent = "IMC: " + resultSet.rows.item(x).imc + " Data: " + resultSet.rows.item(x).data;
                  listaImc.appendChild(li);
                  //imcs.push(resultSet.rows.item(x).imc);
                  //datas.push(resultSet.rows.item(x).data);

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
switch (action) { //para ler o banco, passar como parametro o numero 1, para adicionar ao banco, passar numero 2
  case 1:
    getData(0);
    getimcs(0);
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
