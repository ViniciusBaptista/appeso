function pagecontainershow_resultado(e,ui){
	var imc = parseFloat(sessionStorage.getItem("imc"));
	var imcNumber = imc.toFixed(2);

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

function publishAImage() {
	facebookConnectPlugin.showDialog( 
    {
        method: "feed",
        media:'link da imagem',
        name:'Test Post',
        message:'First photo post',    
        caption: 'Testing using phonegap plugin',
        description: 'Posting photo using phonegap facebook plugin'
    }, 
    function (response) { alert(JSON.stringify(response)) },
    function (response) { alert(JSON.stringify(response)) });
}