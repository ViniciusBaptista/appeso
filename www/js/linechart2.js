function pagecontainershow_linechart(e, ui) {
    clear(dadosBD);
    banco("", "get");
}

function loadLineChartPage() {
    //$.mobile.pageContainer.pagecontainer("change", "linechart.html");
    $.mobile.pageContainer.pagecontainer("change", "pages/linechart.html");
}

function salvar(canvasName) {
    console.log(getImage(canvasName));
}

function getImage(canvasName) {
    var a;
    getBlob(canvasName, function (blob) {
        //saveAs(blob, canvasName + ".png");
        console.log(blob);
        a = blob;
    });
    return a;
}

function getBlob(canvasName, callback) {
    $('#' + canvasName).get(0).toBlob(function (blob) {
        var reader = new window.FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = function () {
            base64data = reader.result;
            console.log(base64data);
            //saveAs(blob, canvasName + ".png");
        }
        callback(blob);
    });
}

function criarGrafico(ano, datasEimcs) {
    if (datasEimcs.length == 0) {
        $('#box-chart').fadeOut(0);
        $('#box-chart2').fadeOut(0);
        alert("Ano de referência não encontrado");
        return false;
    }

    var L1 = [];
    var L2 = [];
    var label_X1 = [];
    var label_X2 = [];


    var Len = datasEimcs.length;
    var len2 = parseInt(Len / 2);

    for (var i = 0; i < len2; i++)
        L1.push(parseFloat(datasEimcs[i].substring(11, datasEimcs[i].length)));

    console.log("tamanho do len/2: " + Len / 2);
    for (var i = len2; i < Len; i++)
        L2.push(parseFloat(datasEimcs[i].substring(11, datasEimcs[i].length)));

    for (var i = 0; i < len2; i++)
        label_X1.push(mes(datasEimcs[i]));

    for (var i = len2; i < Len; i++)
        label_X2.push(mes(datasEimcs[i]));


    showLineChart("LineChart1", L1, label_X1, ano);
    showLineChart("LineChart2", L2, label_X2, ano);

    return true;
}

function showLineChart(canvasName, dadosLinha, label_X, ano) {
    var ctx = $('#' + canvasName).get(0).getContext("2d");
    var LineChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: label_X,
            datasets: [{
                label: ano,
                data: dadosLinha,
                borderWidith: 6,
                borderColor: 'rgba(77, 166, 253, 0.85)',
                backgroundColor: 'transparent'
            }]
        },
        options: {
            title: {
                display: true,
                fontSize: 20,
                text: "Referente ao ano " + ano
            },
            labels: {
                fontStyle: "bold"
            }
        }
    });
}

function mes(strMes) {
    switch (strMes.substring(5, 7)) {
        case '01':
            return 'Jan';
            break;
        case '02':
            return 'Fev';
            break;
        case '03':
            return 'Mar';
            break;
        case '04':
            return 'Abr';
            break;
        case '05':
            return 'Mai';
            break;
        case '06':
            return 'Jun';
            break;
        case '07':
            return 'Jul';
            break;
        case '08':
            return 'Ago';
            break;
        case '09':
            return 'Set';
            break;
        case '10':
            return 'Out';
            break;
        case '11':
            return 'Nov';
            break;
        case '12':
            return 'Dez';
            break;
        default:
            return 'null';
    }
}

function print(str) {
    console.log(str);
}

function limitarAno(vetor, ano) {
    var vetor2 = [];
    var j, i;
    for (i = 0, j = 0; i < vetor.length; i++) {
        if (vetor[i].substring(0, 4) == ano) {
            vetor2[j++] = vetor[i];
        }
    }
    return vetor2;
}

function buscar() {
    var txtAno = $('#txtAno').val();
    var vetLimitado = limitarAno(dadosBD, txtAno);
    if (criarGrafico(txtAno, vetLimitado)) {
        $('#box-chart').fadeIn(0);
        $('#box-chart2').fadeIn(0);
    }
}

function clear(array) {
    while (array.length > 0) {
        array.pop();
    }
}

var dadosBD = [];

function banco(imcdb, op) {
    document.addEventListener('deviceready', function () {
        var db = window.sqlitePlugin.openDatabase({ name: 'bancomobile.db', location: 'default' }, function (db) {

            db.transaction(function (tx) {
                tx.executeSql('CREATE TABLE IF NOT EXISTS imcusuario (id INTEGER PRIMARY KEY ASC AUTOINCREMENT NOT NULL, imc  DOUBLE (3, 2) NOT NULL, data DATE DEFAULT (CURRENT_DATE));)');
            }, function (error) {
                console.log('transaction error: ' + error.message);
            }, function () {
                console.log('tabela criada/aberta com sucesso!');
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
                    console.log('Item adicionado');
                });
            }

            function getItens() {
                db.transaction(function (tx) {

                    var query = "SELECT * FROM imcusuario";

                    tx.executeSql(query, [], function (tx, resultSet) {
                        //Passar para jquery e criar um lugar especifico para display
                        var formato;
                        for (var x = 0; x < resultSet.rows.length; x++) {
                            formato = resultSet.rows.item(x).data + " " + resultSet.rows.item(x).imc;
                            dadosBD.push(formato);
                            console.log(formato);
                        }
                    },
                    function (tx, error) {
                        console.log('SELECT error: ' + error.message);
                    });
                }, function (error) {
                    console.log('transaction error: ' + error.message);
                }, function () {
                    console.log('Select Executado');
                });
            }

            
            if (op === 'add')
                addItem(imcdb.toFixed(2));
            if (op === 'get') {
                clear(dadosBD);
                getItens(0);
            }

        }, function (error) {
            console.log('Open database ERROR: ' + JSON.stringify(error));
        });
    });
}

