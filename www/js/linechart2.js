
function pagecontainershow_linechart(e, ui) {
    //	criarGrafico("2017", limitarAno(vetorz, '2017'));
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
        }
        callback(blob);
    });
}

function criarGrafico(ano, datas) {
    if (datas.length == 0) {
        $('#box-chart').fadeOut(0);
        $('#box-chart2').fadeOut(0);
        alert("Ano de referencia n�o encontrado");
        return false;
    }
    var d = banco("",3);
    var dataL1 = [];
    var dataL2 = [];
    var label_X1 = [];
    var label_X2 = [];
    var batata = [2.3, 3.4, 3.3, 6.8, 8.8];

    for (var i = 0; i < (batata.length / 2) ; i++)
        dataL1.push(parseFloat(d[i]));

    for (var i = d.length / 2; i < d.length; i++)
        dataL2.push(parseFloat(d[i]));

    for (var i = 0; i < (datas.length / 2) ; i++)
        label_X1.push(mes(datas[i]));

    for (var i = datas.length / 2; i < datas.length; i++)
        label_X2.push(mes(datas[i]));

    //var label_X1 = [mes(datas[0]), mes(datas[1]), mes(datas[2]), mes(datas[3]), mes(datas[4]), mes(datas[5])];
    //var label_X2 = [mes(datas[6]), mes(datas[7]), mes(datas[8]), mes(datas[9]), mes(datas[10]), mes(datas[11])];

    showLineChart("LineChart1", dataL1, label_X1, ano);
    showLineChart("LineChart2", dataL2, label_X2, ano);

    return true;
}

function showLineChart(canvasName, dataL1, label_X, ano) {
    var ctx = $('#' + canvasName).get(0).getContext("2d");
    var LineChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: label_X,
            datasets: [{
                label: "2016",
                data: dataL1,
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
    switch (strMes.substring(0, 5)) {
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
    var v = limitarAno(banco("",2), txtAno);
    if (criarGrafico(txtAno, v)) {
        $('#box-chart').fadeIn(0);
        $('#box-chart2').fadeIn(0);
    }
}
