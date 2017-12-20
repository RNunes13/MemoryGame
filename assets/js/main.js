
    var eView = document.querySelector("#view");
    var eDivBackCards = document.querySelector("#backgroundCards");
    var nElapsedTime;
	var aCards = new Array();
	var nPairs = 12;
    var sUser = "";
    var aScores = new Array();

	for(let i=1; i <= nPairs ; i++){
    	aCards.push(i+"-a");
    	aCards.push(i+"-b");
	}

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

    fnAddEvents();
    fnBackgroundCards();
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
        eBtnSave.addEventListener("click", fnSaveBackground);
        document.querySelector("#closeModalScores").addEventListener("click", fnCloseModal);
        document.querySelector("#infoScores").addEventListener("click", fnInfoScores);

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
            eDescription.innerText = "Concentre-se e use a sua memória para econtrar todos os pares.";
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

        let nBack = localStorage.getItem("background");
        aCards.sort(function(a,b){ return Math.random() - Math.random() });

        aCards.forEach(function(v){

            eDiv = document.createElement("div");
            eImg = document.createElement("img");

            eDiv.classList.add("figura","bg-"+nBack);
            eDiv.setAttribute("data-value",parseInt(v));
            eImg.src = "assets/img/animais/"+sLevel+"/"+v+".png";

            eDiv.appendChild(eImg);
            eDiv.addEventListener("click",fnClick);
            eView.appendChild(eDiv);

        });

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
                    eHits.innerText = nHits / 2;

                    let nTotal = aCards.length;

                    if (nHits == nTotal) {

                        let aFadeout = document.getElementsByClassName('fadeout');
                        let nFadeout = document.getElementsByClassName('fadeout').length;

                        for (var a = 0; a < nFadeout/2; a++){
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

    };

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
                       'Portanto, será necessário configurar o fundo das cartas.<br/><br/>' +
                       'Acesse as <strong>Configurções</strong> e escolha o seu tema preferido.';

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

    //FUNÇÃO PARA ADICIONAR AS CARTAS DE FUNDO NAS CONFIGURAÇÕES
    function fnBackgroundCards() {

        for (var i = 1; i <= 9; i++) {

			eImg = document.createElement("img");
			eImg.src = "assets/img/checked.png";

            eDiv = document.createElement("div");
            eDiv.setAttribute("data-value", i);
            eDiv.classList.add("bg", "bg-" + i);

            if (i == localStorage.getItem('background')) { eDiv.classList.add("checked") }

            eDiv.addEventListener('click', fnChooseBackgroudCards)

            /*if (i == 1) {
                eDiv.classList.add("checked");
            }*/

            eDiv.appendChild(eImg);

	        eDivBackCards.appendChild(eDiv);

        }

    }

    function fnSaveBackground() {

        let eAlertMessage = document.querySelector("#alertMessage");
        let eChecked = document.querySelector(".checked");
		let eBack = document.querySelector(".checked");
	    let eAlert = document.querySelector("#alertMessage");

        eBtnSave.disabled = true;
		let nBack = eBack.getAttribute("data-value");



        localStorage.setItem("background", nBack);


		eAlert.classList.remove("hidden");

    }

    function fnChooseBackgroudCards() {

        let eChecked = document.querySelector(".checked");
        let nThis = this.getAttribute("data-value");
        let eBtnSave = document.querySelector("#btnSave");
        let eAlert = document.querySelector("#alertMessage");

        if (eChecked != null) { eChecked.classList.remove("checked"); };        
		this.classList.add("checked");
        eAlert.classList.add("hidden");
        eBtnSave.disabled = false;

    }

    function fnCloseModal() {

        let eAlertMessage = document.querySelector("#alertMessage");

        eAlertMessage.classList.add("hidden");
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

                ePos.innerText = (i + 1) + 'º';
                eName.innerText = oData[i][3];
                eClicks.innerText = oData[i][0];
                eTime.innerText = oData[i][1];
                eDificuldae.innerText = oData[i][4];

                eTR.appendChild(ePos);
                eTR.appendChild(eName);
                eTR.appendChild(eClicks);
                eTR.appendChild(eTime);
                eTR.appendChild(eDificuldae);

                eScoreTable.appendChild(eTR);

                ePageNav.classList.remove("hidden");

            }

        } else {

            let eTR = document.createElement("tr");
            let eTD = document.createElement("td");

            eTD.innerText = "Não há pontuações no momento. Começe a jogar agora!"
            eTD.setAttribute("colspan", 5);
            eTR.appendChild(eTD);
            eTR.classList.add("text-center");
            eScoreTable.appendChild(eTR);

            //ePageNav.classList.add("hidden");

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
        let dataLength;

        if (dataStorage != null) {

            dataLength = dataStorage.length + 1;
            aScores = dataStorage;

        } else {

            dataLength = 1;
        }

        let aData = [Clicks, Time, dataLength, sUser, sDifficult];
        
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


