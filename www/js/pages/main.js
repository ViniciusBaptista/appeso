function pagecontainershow_main(e,ui){
	//document.addEventListener("deviceready", onDeviceReady, false);
}

$(function(){
	$('#txtAltura').mask('999');
	$('#txtPeso').mask('099.00');
});

var validPeso = false;
var validAltura = false;

$(document).ready(function(){
	$('#txtPeso').keyup(function(){
		validPeso = false;
		var txtPeso = $('#txtPeso').val();
		var peso = parseFloat(txtPeso);
		var campoNecessario = "Este campo é necessário para o calculo!";

		if(peso < 0 || peso > 600) {
			$("#peso-error").html("O peso deve ser maior que 0 e menor que 600");
			return;
		}
		if(!peso) {
			$("#peso-error").html(campoNecessario);
			return;
		}

		validPeso = true;
		$('#peso-error').html('');
	});
});

$(document).ready(function(){
  $('#txtAltura').keyup(function(){
  	validAltura = false;
		var txtAltura = $('#txtAltura').val();
		var altura = parseFloat(txtAltura);
		var campoNecessario = "Este campo é necessário para o calculo!";

		if(altura < 0 || altura > 500) {
			$("#altura-error").html("A altura deve ser maior que 0 e menor que 500");
			return;
		}

		if(!altura) {
			$("#altura-error").html(campoNecessario);
			return;
		}

		validAltura = true;
		$("#altura-error").html('');
  });
});

//http://meumobi.github.io/stocks%20apis/2016/03/13/get-realtime-stock-quotes-yahoo-finance-api.html
var main = {
	login: function() {
    facebookConnectPlugin.login(["public_profile"], function (response) {
    	console.log(JSON.stringify(response));
    }, function (response) {
    	console.log(JSON.stringify(response));
    });
	},

	isLogged: function () {
		facebookConnectPlugin.getLoginStatus(function (status) {
			console.log("current status: " + JSON.stringify(status));
		});
	},

	calcular: function() {
		//ler dados dos inputs
		var txtAltura = $('#txtAltura').val();
		var txtPeso = $('#txtPeso').val();
		//calcular a formula do IMC
		var altura = parseFloat(txtAltura) / 100;
		var peso = parseFloat(txtPeso);
		var imc = peso/(altura*altura);
		//salvar no sessionstorage
		sessionStorage.setItem("imc", imc.toString() );
	   //navegar para a próxima página
		$.mobile.pageContainer.pagecontainer("change", "pages/resultado.html");
	},

	valid: function() {
		if(validAltura && validPeso) {
			this.calcular();
		}
	}
}
