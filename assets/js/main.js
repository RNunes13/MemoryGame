
var eView = document.querySelector("#view");
var eDivBackCards = document.querySelector("#backgroundCards");
var eDivDrawingCards = document.querySelector("#drawingCards");
var nElapsedTime;
var aCards = [];
var nPairs;
var sUser = "";
var aScores = [];
var audio = new Audio();
var eTemp = "";
var bDisabled = false;
var nClicks = 0;
var nHits = 0;
var eClicks = document.querySelector("#clicks");
var eHits = document.querySelector("#hits");
var eRedo = document.querySelector("#redo");
var eTitle = document.querySelector("#title");
var eDescription = document.querySelector("#description");
var sLevel;
var eCountdown = document.querySelector("#countdown");
var nCountdown = 3;
var eGame = document.querySelector("#game");
var eOptions = document.querySelector("#options");
var eHome = document.querySelector("#home");
var eTimeElapsed = document.querySelector("#elapsedTime");
var eScoreTable = document.querySelector("#scoreTable");
var nSeconds = 0;
var nMinutes = 0;
var nHours = 0;    
var ePageNav = document.querySelector("#pageNav");    
var eStartGame = document.querySelector('#startGame');
var eBtnConfig = document.querySelector('#btnConfig');
var eBtnScores = document.querySelector('#btnScores');    
var eBtnSave = document.querySelector("#btnSave");
var eNumCards = document.querySelector("#numCards");

fnAddEvents();
fnConfigCards();
fnScores();

function fnAddEvents() {

    eHome.addEventListener("click", function () { location.reload(); });
    eRedo.addEventListener("click", fnCheckView);

    document.querySelector("#btnConfig").addEventListener("click", function() { document.querySelector('#configurations').style.display = 'block'; })

    document.querySelector("#btnScores").addEventListener("click", function() { document.querySelector('#scores').style.display = 'block'; })

    document.querySelector("#userName").addEventListener("keyup", fnDisableButton);
    document.querySelector("#level").addEventListener("change", fnDisableButton);
    eStartGame.addEventListener("click", fnStartGame);
    document.querySelector("#closeModalConfig").addEventListener("click", fnCloseModal);
    eBtnSave.addEventListener("click", fnSaveConfig);
    document.querySelector("#closeModalScores").addEventListener("click", fnCloseModal);
    document.querySelector("#infoScores").addEventListener("click", fnInfoScores);
    eNumCards.addEventListener("change", fnChooseQntCards);

}

function fnPlay(src){
	audio.pause();
	audio = new Audio(src);
	audio.play();
}

function fnCheckView() {

    if(eView.firstChild) {
        while (eView.firstChild) {
            eView.removeChild(eView.firstChild);
        }
        audio.pause();
        nHits = 0;
        nClicks = 0;
        eHits.innerText = 0;
        eClicks.innerText = 0;
        // eHome.classList.add("hidden");
        eRedo.classList.add("hidden");
        eTitle.innerText = "Jogo da Memória";
        eDescription.innerText = "Concentre-se e use a sua memória para encontrar todos os pares.";
        eTimeElapsed.innerText = "00:00:00";
        nSeconds = 0;
        nMinutes = 0;
        nHours = 0;
        fnSuffle();
        fnElapsedTime();
    }
    else {
        fnSuffle();
    }

}

//FUNÇÃO PARA EMBARALHAR AS CARTAS
function fnSuffle() {    
   
    if (localStorage.getItem("numCards") != null) {
        nPairs = localStorage.getItem("numCards") / 2;
    } else {
        nPairs = 12; //NUMERO DE PARES PADRÃO
    }
    
    aCards = [];

    for (let i=1; i <= nPairs ; i++){
        aCards.push(i+"-a");
        aCards.push(i+"-b");
    }
    
    let nBack = localStorage.getItem("background");
    let sDraw = localStorage.getItem("drawing");
    
    aCards.sort(function(a,b){ return Math.random() - Math.random() });

    aCards.forEach(function(v){

        let eDiv = document.createElement("div");
        let eImg = document.createElement("img");

        eDiv.classList.add("figura","bg-"+nBack);
        eDiv.setAttribute("data-value",parseInt(v));
        eImg.src = "assets/img/cartas/"+sDraw+"/"+sLevel+"/"+v+".png";

        eDiv.appendChild(eImg);
        eDiv.addEventListener("click",fnClick);
        eView.appendChild(eDiv);

    });
    
    eHits.innerText = "0/" + nPairs;

}

function fnClick () {

    let nBack = localStorage.getItem("background");
	let eThis = this;
	let bOpen = eThis.classList.contains("ok");

    if (!bDisabled && !bOpen) {

        bDisabled = true;

        nClicks++;
        eClicks.innerText = nClicks;

        fnPlay('assets/audio/pegar.mp3');

        if(eTemp){

            eThis.classList.add("ok");

            let nCardA =  eThis.getAttribute("data-value");
            let nCardB =  eTemp.getAttribute("data-value");

            if (nCardA != nCardB) {
                eThis.classList.add("bg-danger");
                eTemp.classList.add("bg-danger");
            } else {
                eThis.classList.add("bg-success");
                eTemp.classList.add("bg-success");
            }

            setTimeout(function () {

                if (nCardA != nCardB) {
                    eThis.classList.remove("bg-danger","ok");
                    eThis.classList.add("bg-"+nBack);
                    eTemp.classList.remove("bg-danger","ok");
                    eTemp.classList.add("bg-"+nBack);
                } else {
                    eThis.classList.remove("bg-success");
                    eTemp.classList.remove("bg-success");
                    eThis.classList.add("fadeout");
                    eTemp.classList.add("fadeout");
					fnPlay('assets/audio/soltar.mp3');
				}

                eTemp = "";

                nHits = document.querySelectorAll(".ok").length;
                eHits.innerText = (nHits / 2) + "/" + nPairs;

                let nTotal = aCards.length;

                if (nHits == nTotal) {

                    let aFadeout = document.querySelectorAll('.fadeout');
                    let nFadeout = aFadeout.length;

                    for (var a = 0; a < nFadeout; a++){
                        aFadeout[a].classList.remove("fadeout");
                        aFadeout[a].classList.add("fadein");
                    }

                    eRedo.classList.remove("hidden");
                    fnSaveScores();
                    eTitle.innerText = "Parabéns !";
                    eDescription.innerText = "Você encontrou todos os pares.";
                    clearTimeout(nElapsedTime);
                    fnPlay('assets/audio/aplausos.mp3');                        
                }

                bDisabled = false;

            }, 1000);

        } else {

            eTemp = eThis;
            eThis.classList.add("ok");
            bDisabled = false;

        }

    }

}

function fnDisableButton(){

    let userName = document.querySelector("#userName").value;
    let level = document.querySelector("#level").value;

    userName = userName.replace(/^\s+/,""); // REMOVE OS ESPAÇO DA ESQUERDA DA STRING, SE HOUVER

    if (userName == "" || level == "") {
        eStartGame.disabled = true;
        eStartGame.classList.remove('btn-success');
        eStartGame.classList.add('btn-danger');
    }
    else {
        eStartGame.disabled = false;
        eStartGame.classList.remove('btn-danger');
        eStartGame.classList.add('btn-success');
    }

}
    
function fnStartGame(){

    if (localStorage.getItem("background") == null) {

        let title = 'OPSS...';
        let text = 'Parece que é a primeira vez que você executa este jogo, ou os dados foram limpos.<br/><br/>' +
                   'Portanto, será necessário realizar algumas configurações antes de iniciar.<br/><br/>' +
                   'Para ter acesso as configurações deste jogo, basta clicar no botão <strong>Configurções</strong>.';

        alertify.alert(title, text);
        return;
    }

    let userName = document.querySelector("#userName"); //CAMPO ONDE O USUARIO INFORMA O NOME
    let level = document.querySelector("#level"); //SELECT PARA ESCOLHA DO NIVEL
	let eStarting =  document.querySelector("#startingGame"); //COUNTDOWN

    //DESATIVANDO OS CAMPOS E BOTÕES DA TELA INICIAL, PARA PREVINIR INTERVEÇÕES DURANTE o COUNTDOWN
    userName.disabled = true;
    level.disabled = true;
    eStartGame.disabled = true;
    eBtnConfig.disabled = true;
    eBtnScores.disabled = true;

    sUser = document.querySelector("#userName").value;

    sLevel = document.querySelector("#level").value;

    eStarting.classList.remove("hidden");

    fnCountdown();
    fnSuffle();
}

function fnCountdown() {

    if(nCountdown > 0) {
        eCountdown.innerText = nCountdown;
        nCountdown--;
    } else {
        eOptions.classList.add("hidden");
        eGame.classList.remove("hidden");
        fnElapsedTime();
        return;
    }

    setTimeout(function() { fnCountdown() }, 1000);

}

function fnElapsedTime() {

    var time = ("00" + nHours).slice(-2) + ":" +
               ("00" + nMinutes).slice(-2) + ":" +
               ("00" + nSeconds).slice(-2);

    eTimeElapsed.innerText = time;

    nSeconds++;

    if (nSeconds == 60) {
        nSeconds = 0;
        if (nMinutes == 59) {
            nHours++;
            nMinutes = 0
        }
        else {
            nMinutes++;
        }
    }

    nElapsedTime = setTimeout(function(){ fnElapsedTime() }, 1000);

}

//FUNÇÃO PARA ADICIONAR AS CARTAS DE FUNDO E TIPOS NAS CONFIGURAÇÕES
function fnConfigCards() {
    
    let backgroundSaved = localStorage.getItem('background');
    let drawingSaved = localStorage.getItem('drawing');
    let nDrawingSaved;
    
    switch (drawingSaved) {
        case 'animais':
            nDrawingSaved = 1;
            break;
        case 'carros':
            nDrawingSaved = 2;
            break;
    }

    for (var i = 1; i <= 9; i++) {

		let eImg = document.createElement("img");
		eImg.src = "assets/img/checked.png";

        let eDiv = document.createElement("div");
        eDiv.setAttribute("data-value", i);
        eDiv.setAttribute("data-config", "background");
        eDiv.classList.add("bg", "bg-" + i);

        if (i == backgroundSaved) { eDiv.classList.add("bgChecked") }

        eDiv.addEventListener('click', fnChooseConfigCards);
        eDiv.appendChild(eImg);
        eDivBackCards.appendChild(eDiv);

    }
    
    for (var i = 1; i <= 2; i++) {
        
        let eImg = document.createElement("img");
		eImg.src = "assets/img/checked.png";

        let eDiv = document.createElement("div");
        
        switch (i) {
            case 1:
                eDiv.setAttribute("data-value", "animais");
                break;
            case 2:
                eDiv.setAttribute("data-value", "carros");
                break;
        }

        eDiv.setAttribute("data-config", "drawing");
        eDiv.classList.add("drawing", "drawing-" + i);

        if (i == nDrawingSaved) { eDiv.classList.add("drawingChecked") }

        eDiv.addEventListener('click', fnChooseConfigCards);
        eDiv.appendChild(eImg);
        eDivDrawingCards.appendChild(eDiv);
        
    }
    
    let nQtdCards = localStorage.getItem("numCards");
    
    switch (nQtdCards) {
        case '24':
            eNumCards.selectedIndex = 0;
            break;
        case '30':
            eNumCards.selectedIndex = 1;
            break;
        case '40':
            eNumCards.selectedIndex = 2;
            break;
        default:
            eNumCards.selectedIndex = 0;
            break;
    }

}

function fnSaveConfig() {

	let eBack = document.querySelector(".bgChecked");
    let eDraw = document.querySelector(".drawingChecked");
    let sQntCards = eNumCards.value;

    eBtnSave.disabled = true;
    
	let nBack = eBack.getAttribute("data-value");
    let nDraw = eDraw.getAttribute("data-value");

    localStorage.setItem("background", nBack);
    localStorage.setItem("drawing", nDraw);
    localStorage.setItem("numCards", sQntCards);

	 notif({
        type: "success",
        msg: "<strong>Sucesso!</strong> As configurações foram salvas...",
        position: "center",
        fade: true
    });

}

function fnChooseConfigCards() {    

    let eBackChecked = document.querySelector(".bgChecked");
    let eDrawingChecked = document.querySelector(".drawingChecked");
    let eBtnSave = document.querySelector("#btnSave");
    let sConfig = this.getAttribute("data-config");
    
    if (sConfig == "background") {
        
        if (eBackChecked != null) { eBackChecked.classList.remove("bgChecked"); };
        this.classList.add("bgChecked");
        
    } else {
        
        if (eDrawingChecked != null) { eDrawingChecked.classList.remove("drawingChecked"); };
        this.classList.add("drawingChecked");
        
    }
    
    eBackChecked = document.querySelector(".bgChecked");
    eDrawingChecked = document.querySelector(".drawingChecked");
    
    if (eBackChecked != null && eDrawingChecked != null) {
        eBtnSave.disabled = false;
    }

}

function fnChooseQntCards() {
    
    let eBackChecked = document.querySelector(".bgChecked");
    let eDrawingChecked = document.querySelector(".drawingChecked");
    let eBtnSave = document.querySelector("#btnSave");
    
    if (eBackChecked && eDrawingChecked) {
        eBtnSave.disabled = false;
    }
    
}

function fnCloseModal() {
    document.querySelector('#configurations').style.display = 'none';
    document.querySelector('#scores').style.display = 'none';

}

function fnScores() {

    let oData = JSON.parse(localStorage.getItem("scores"));
        
    if (oData != null) {
        
        oData.sort();

        for (var i = 0; i < oData.length; i++) {

            let eTR = document.createElement("tr");
            let ePos = document.createElement("td");
            let eName = document.createElement("td");
            let eClicks = document.createElement("td");
            let eTime = document.createElement("td");
            let eDificuldae = document.createElement("td");
            let eCards = document.createElement("td");

            ePos.innerText = (i + 1) + 'º';
            eName.innerText = oData[i][3];
            eClicks.innerText = oData[i][0];
            eTime.innerText = oData[i][1];
            eDificuldae.innerText = oData[i][4];
            eCards.innerText = oData[i][5];

            eTR.appendChild(ePos);
            eTR.appendChild(eName);
            eTR.appendChild(eClicks);
            eTR.appendChild(eTime);
            eTR.appendChild(eDificuldae);
            eTR.appendChild(eCards);

            eScoreTable.appendChild(eTR);

            ePageNav.classList.remove("hidden");

        }

    } else {

        let eTR = document.createElement("tr");
        let eTD = document.createElement("td");

        eTD.innerText = "Não há pontuações no momento. Começe a jogar agora!"
        eTD.setAttribute("colspan", 6);
        eTR.appendChild(eTD);
        eTR.classList.add("text-center");
        eScoreTable.appendChild(eTR);

    }

}

function fnSaveScores() {

    // COLOCAR A PRIMEIRA LETRA DA STRING DE DIFICULDADE EM MAIUSCULO
    let sDifficult = sLevel.substring(0, 1); // ARMAZENA A PRIMEIRA LETRA
    sDifficult = sDifficult.toUpperCase(); // COLOCA EM MAIUSCULA
    sDifficult += sLevel.substring(1); // E CONCATENA A LETRA MAIUSCULA COM A STRING NOVAMENTE

    let dataStorage = JSON.parse(localStorage.getItem("scores"));

    let Clicks = eClicks.innerText;
    let Time = eTimeElapsed.innerText;
    let Cards = localStorage.getItem("numCards");
    let dataLength;

    if (dataStorage != null) {

        dataLength = dataStorage.length + 1;
        aScores = dataStorage;

    } else {
        dataLength = 1;
    }

    let aData = [Clicks, Time, dataLength, sUser, sDifficult, Cards];
        
    aScores.push(aData);

    localStorage.setItem("scores", JSON.stringify(aScores));

}

function fnInfoScores() {

    let title = 'PONTUAÇÕES';
    let text = 'A definição da posição é verifica a partir do número de cliques realizados no jogo.<br/><br/>' +
               'Critérios de desempate:<br/>' +
               '1) Tempo decorrido;<br/>' +
               '2) Primeiro que pontuou.';

    alertify.alert(title, text);
    return;

}