
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
        alert("Ano de referencia não encontrado");
        return false;
    }
    var dataL1 = [88, 90, 98, 90, 100, 87];
    var dataL2 = [100, 90, 86, 90, 85, 75];
    var label_X1 = [];
    var label_X2 = [];

    for (var i = 0; i < (datas.length / 2) ; i++)
        label_X1.push(mes(datas[i]));

    for (var i = datas.length / 2; i < datas.length; i++)
        label_X2.push(mes(datas[i]));

    //var label_X1 = [mes(datas[0]), mes(datas[1]), mes(datas[2]), mes(datas[3]), mes(datas[4]), mes(datas[5])];
    //var label_X2 = [mes(datas[6]), mes(datas[7]), mes(datas[8]), mes(datas[9]), mes(datas[10]), mes(datas[11])];

    showLineChart("LineChart1", dataL1, dataL2, label_X1, ano);
    showLineChart("LineChart2", dataL1, dataL2, label_X2, ano);

    return true;
}

function showLineChart(canvasName, dataL1, dataL2, label_X, ano) {
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
            },
			{
			    label: "2017",
			    data: dataL2,
			    borderWidith: 6,
			    borderColor: 'rgba(6, 204, 6, 0.85)',
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
    switch (strMes.substring(3, 5)) {
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
        if (vetor[i].substring(6, 10) == ano) {
            vetor2[j++] = vetor[i];
        }
    }
    return vetor2;
}

var vetorz = [
    "13-01-2017",
    "14-02-2017",
    "15-03-2016",
    "16-03-2017",
    "17-04-2017",
    "18-05-2017",
    "19-04-2016",
    "20-06-2017",
    "21-05-2016",
    "22-07-2017",
    "13-08-2017",
    "14-09-2017",
    "15-06-2016",
    "16-10-2017",
    "17-11-2017",
    "18-12-2017",
    "19-07-2016",
    "21-08-2016"
];

function buscar() {
    var txtAno = $('#txtAno').val();
    var v = limitarAno(vetorz, txtAno);
    if (criarGrafico(txtAno, v)) {
        $('#box-chart').fadeIn(0);
        $('#box-chart2').fadeIn(0);
    }
}