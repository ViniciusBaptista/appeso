
function pagecontainershow_linechart(e,ui){
	criarGrafico();
}

function loadLineChartPage() {
	$.mobile.pageContainer.pagecontainer("change", "pages/linechart.html");
}


function salvar(canvasName){
	return getImg(canvasName, function(blob){
		return blob;
	});
}

function getImg(canvasName, callback){
	$('#'+canvasName).get(0).toBlob(function(blob){
		var reader = new window.FileReader();
		reader.readAsDataURL(blob); 
		reader.onloadend = function() {
			base64data = reader.result;			
		}
		callback(blob);
	});
}


function criarGrafico(){
	var dataL1 = [88, 90, 98, 90, 100, 87];
	var dataL2 = [100, 90, 86, 90, 85, 75];
	var label_X1 = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"];
	var label_X2 = ["Jul", "Ago", mes("13-09-2017"), "Out", "Nov", mes("01-12-2017")];

	showLineChart("LineChart1", dataL1, dataL2, label_X1);
	showLineChart("LineChart2", dataL1, dataL2, label_X2);
}

function showLineChart(canvasName, dataL1, dataL2, label_X){
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
				text: "Peso em dois anos (2016/2017)"
			},
			labels: {
				fontStyle: "bold"
			}
		}
	});
}

function mes(strMes){
	switch(strMes.substring(3, 5)){
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

function print(str){
	console.log(str);
}
