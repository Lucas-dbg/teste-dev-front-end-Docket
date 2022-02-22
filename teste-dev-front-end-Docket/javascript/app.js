$(window).on("load", function(){
    /*Adiciona máscara a alguns inputs*/
    $('#cnpj').mask('00.000.000/0000-00');
    $('#cpf').mask('000.000.000.00');
    $('#cep-cartorio').mask('00.000-000');  
    
    /*Requisita os documentos para o banco*/
    let url = "http://localhost:3000/Documentos";
    $.get(url, function(data) {
        let resultado = data;  
        listaDocumentos(resultado);
        contaDocumentos(resultado);
        verificaNumeroPedido(resultado);
        verificaStatusPedido(resultado);
    })

    identificaDataAtual();
})

function validaTipoPessoa(valor){
    if(valor == "juridica"){
        $("#div-campo-cpf").css("display", "none");
        $("#div-campo-cnpj").css("display", "inline");
    }
}

function validaCamposFormulario(){
    let nomeDocumento = document.getElementById("Nome-Documento").value;
    let tipoPessoa = document.getElementById("select-tipo-pessoa").value;
    let cpf = document.getElementById("cpf").value;
    let cnpj = document.getElementById("cnpj").value;
    let nomeRazaoSocial = document.getElementById("nome-pessoa").value;
    let cepCartorio = document.getElementById("cep-cartorio").value;
    let ruaCartorio = document.getElementById("rua-cartorio").value;
    let numeroCartorio = document.getElementById("numero-cartorio").value;
    let cidadeCartorio = document.getElementById("cidade-cartorio").value;
    let ufCartorio = document.getElementById("uf-cartorio").value;

    if(nomeDocumento == "") {
        alert("O nome do documento é um campo obrigatório")
    }
    if(tipoPessoa == "fisica" && cpf == ""){
        alert("O CPF é um campo obrigatório")
    }
        
    if(tipoPessoa == "juridica" && cnpj == "") {
        alert("O CNPJ é um campo obrigatório")
    }
    if(nomeDocumento == "") {
        alert("O nome do individo é um campo obrigatório")
    }
    if(nomeRazaoSocial == "") {
        alert("O nome do individuo ou razão social é um campo obrigatório")
    }
    if(cepCartorio == "") {
        alert("O CEP do Cartório é um campo obrigatório")
    }
    if(ruaCartorio == "") {
        alert("A rua do cartório é um campo obrigatório")
    }
    if(numeroCartorio == "") {
        alert("O número do cartorio é um campo obrigatório")
    }
    if(cidadeCartorio == "") {
        alert("A cidade do cartorio é um campo obrigatório")
    }
    if(ufCartorio == "") {
        alert("O uf do cartorio é um campo obrigatório")
    }
}

function salvarDocumento() {

    validaCamposFormulario();

    /*Paga o valor dos campos do formulário*/
    let nomeDocumento = document.getElementById("Nome-Documento").value;
    let tipoPessoa = document.getElementById("select-tipo-pessoa").value;
    let cpf = document.getElementById("cpf").value;
    let cnpj = document.getElementById("cnpj").value;
    let nomeRazaoSocial = document.getElementById("nome-pessoa").value;
    let cepCartorio = document.getElementById("cep-cartorio").value;
    let ruaCartorio = document.getElementById("rua-cartorio").value;
    let numeroCartorio = document.getElementById("numero-cartorio").value;
    let cidadeCartorio = document.getElementById("cidade-cartorio").value;
    let ufCartorio = document.getElementById("uf-cartorio").value;
    let data = identificaDataAtual();

    /*Corpo da requisição*/
    let documento = {
        "nomeDocumento": nomeDocumento,
        "tipoPessoa": tipoPessoa,
        "cpf": cpf,
        "cnpj": cnpj,
        "nomeRazaoSocial": nomeRazaoSocial,
        "cepCartorio": cepCartorio,
        "ruaCartorio": ruaCartorio,
        "numeroCartorio": numeroCartorio,
        "cidadeCartorio": cidadeCartorio,
        "ufCartorio": ufCartorio,
        "dtaCriacaoDocumento": data
    }

    /*caminho das requisições*/
    let url = "http://localhost:3000/Documentos";

    /*Requisição*/
    $.ajax({
        method: "POST",
        url: url,
        headers: {
            "Cache-Control" : "no-cache"
        },
        data: documento, 
        success: function(data){
            toastr.success('Documento Salvo');
        },
        error: function(){
            toastr.danger('Falha ao salvar documento');
        }

    });    

    /*Força a página a recarregar*/
    window.location.reload(true);
}

function listaDocumentos(resultado) {
     
    if(resultado.length > 0){
        /*Altera para o card onde a listagem ocorrerá*/
        let card3 = document.getElementById("card-3");
        card3.style.display = "none";
        let card4 = document.getElementById("card-4");
        card4.style.display = "inline";  
        
        function preencheCardComDadosDocumento(objeto, indice){
            $("#div-teste").html(objeto);
        }

        resultado.forEach(preencheCardComDadosDocumento);
    }     
}

function contaDocumentos(qtdDocumentos){
    let qtd = qtdDocumentos.length
    // let qtdDoc = document.getElementById("qtdDoc");
    // qtdDoc.innerText(qtdDocumentos);
    $("#qtdDoc").html(qtd);

}

function identificaDataAtual(){
    /*Busca as datas*/
    let data = new Date();
    let dia = data.getDate();
    let mes = data.getMonth();
    let ano = data.getFullYear();

    /*trata o dado do mês*/
    switch (mes) {
        case 0 :
            mes = "janeiro";
            break;
        case 1 :
            mes = "fevereiro";
            break;
        case 2 :
            mes = "março";
            break;
        case 3 :
            mes = "abril";
            break;
        case 4 :
            mes = "maio";
            break;
        case 5 :
            mes = "junho";
            break;
        case 6 :
            mes = "julho";
            break;
        case 7 :
            mes = "agosto";
            break;
        case 8 :
            mes = "setembro";
            break;

        case 9 :
            mes = "outubro";
            break;
        case 10 :
            mes = "novembro";
            break;
        case 11 :
            mes = "dezembro";
            break;
        default: mes = data.getMonth();
         
    }

    let dataNoFormatoEsperado = `${dia} de ${mes} de ${ano}`

    $("#insereDataCriacao").html(dataNoFormatoEsperado);

    return dataNoFormatoEsperado;
}

function verificaNumeroPedido(qtdDocsBanco){
    let qtd = qtdDocsBanco.length + 1;

    $("#contadorPedido").html(qtd);
}

function verificaStatusPedido(qtdDocsBanco){
    if(qtdDocsBanco.length > 0){
        /*Altera a cor do ponto*/
        $("#ponto").css("background-color","#FFAF3E");

        /*Altera o texto do status*/
        $("#variavelStatus").html("Em andamento");
    }else {
        $("#variavelStatus").html("Finalizado");
    }
}





