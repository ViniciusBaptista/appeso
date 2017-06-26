function pagecontainershow_resultado(e,ui){
	var imc = parseFloat(sessionStorage.getItem("imc"));
	var imcNumber = imc.toFixed(2);
	var txt = imcNumber;
/*  exemplo chamadas do banco, txt provavelmente so e necessario na para inserção
	var imcs;
	var datas;
	banco(txt, 1);
	datas = banco(txt, 2);
	imcs = banco(txt, 3);
*/
	
	switch(true) {
		case (imcNumber < 17):
			$('#labelImc').text('Abaixo de 17');
			$('#messageImc').text('Muito abaixo do peso!');
			break;
		case (imcNumber > 17 && imcNumber < 18.49):
			$('#labelImc').text('Entre 17 e 18,49');
			$('#messageImc').text('Abaixo do peso!');
			break;
		case (imcNumber > 18.5 && imcNumber < 24.99):
			$('#labelImc').text('Entre 18,5 e 24,99');
			$('#messageImc').text('Peso normal!');
			break;
		case (imcNumber > 24.99):
			$('#labelImc').text('Maior que 24,99');
			$('#messageImc').text('Acima do peso!');
			break;
		default:
			$('#labelImc').text('Valor de peso invalido ou maior que o esperado!');
			$('#messageImc').text('');
	}
	var txtImc = imcNumber.toString().replace(".", ",");
	$('#txtImc').text(txtImc);
};

var resultado = {
	publishAImage: function() {
		facebookConnectPlugin.showDialog(
	    {
	        method: "feed",
	        href:'https://www.google.co.jp/logos/doodles/2014/doodle-4-google-2014-japan-winner-5109465267306496.2-hp.png',
	        name:'Test Post',
	        message:'First photo post',
	        caption: 'Testing using phonegap plugin',
	        description: 'Posting photo using phonegap facebook plugin'
	    },
	    function (response) { console.log(JSON.stringify(response)) },
	    function (response) { console.log(JSON.stringify(response)) });
	}
};
