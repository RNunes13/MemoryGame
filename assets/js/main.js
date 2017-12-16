
    var eView = document.querySelector("#view");
    var eDivBackCards = document.querySelector("#backgroundCards");
    var nBack = 1;
    var nCount;
    var nElapsedTime;
	var aCards = new Array();
	var nPairs = 12;
    var sDifficult = "";

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
    var sLevel = document.querySelector("#level").value;
    var eCountdown = document.querySelector("#countdown");
    var nCountdown = 3;
    var eGame = document.querySelector("#game");
    var eOptions = document.querySelector("#options");
    var eHome = document.querySelector("#home");
    var eTimeElapsed = document.querySelector("#elapsedTime");
    var nSeconds = 0;
    var nMinutes = 0;
    var nHours = 0;

    fnBackgroundCards();

    eHome.addEventListener("click", function () {
         location.reload();
    });

    eRedo.addEventListener("click", function () {
         fnCheckView();
    });

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

        aCards.sort(function(a,b){ return Math.random() - Math.random() });

        aCards.forEach(function(v){

            eDiv = document.createElement("div");
            eImg = document.createElement("img");

            eDiv.classList.add("figura","bg-"+nBack);
            eDiv.setAttribute("data-value",parseInt(v));
            eImg.src = "assets/img/animais/"+sDifficult+"/"+v+".png";

            eDiv.appendChild(eImg);
            eDiv.addEventListener("click",fnClick);
            eView.appendChild(eDiv);

        });

    }

    function fnClick () {

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
						fnPlay('assets/audio/soltar.mp3');
					}

                    eTemp = "";

                    nHits = document.querySelectorAll(".ok").length;
                    eHits.innerText = nHits / 2;

                    let nTotal = aCards.length;

                    if (nHits == nTotal) {
                        eRedo.classList.remove("hidden");
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

    function fnDisableButton(e){

        if (e.value == "") {
            document.getElementById('startGame').disabled = true;
        }
        else {
            document.getElementById('startGame').disabled = false;
        }

    }

    function fnStartGame(){

		let eStarting =  document.querySelector("#startingGame");

        sDifficult = document.querySelector("#level").value;

        eStarting.classList.remove("hidden");

        fnCountdown();
        fnSuffle();

    }

    function fnCountdown() {

		nCount = setTimeout(function() { fnCountdown() }, 1000);

        if(nCountdown > 0) {
            eCountdown.innerText = nCountdown;
            nCountdown--;
        }

        if (nCount == 3) {
            eOptions.classList.add("hidden");
            eGame.classList.remove("hidden");
            clearTimeout(nCount);
            fnElapsedTime();
        }

    }

    function fnElapsedTime() {

        var time = ("00" + nHours).slice(-2) + ":" +
                   ("00" + nMinutes).slice(-2) + ":" +
                   ("00" + nSeconds).slice(-2);

        eTimeElapsed.innerText = time;

        nSeconds++;

		nHours = (nMinutes + 60) % 60;
        nMinutes = Math.floor( nSeconds / 60);
		nSeconds = (nSeconds + 60) % 60;

		/*
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
        */

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
            eDiv.addEventListener('click', fnChooseBackgroudCards)

            if (i == 1) {
                eDiv.classList.add("checked");
            }

            eDiv.appendChild(eImg);

	        eDivBackCards.appendChild(eDiv);

        }

    }

    function fnSaveBackground() {

        let eAlertMessage = document.querySelector("#alertMessage");
        let eChecked = document.querySelector(".checked");
		let eBack = document.querySelector(".checked");
	    let eBtnSave = document.querySelector("#btnSave");
	    let eAlert = document.querySelector("#alertMessage");

        eBtnSave.disabled = true;
		nBack = eBack.getAttribute("data-value");
		eAlert.classList.remove("hidden");

    }

    function fnChooseBackgroudCards() {

        let eChecked = document.querySelector(".checked");
        let nThis = this.getAttribute("data-value");
        let eBtnSave = document.querySelector("#btnSave");
        let eAlert = document.querySelector("#alertMessage");

		eChecked.classList.remove("checked");
		this.classList.add("checked");
        eAlert.classList.add("hidden");
        eBtnSave.disabled = false;

    }

    function fnCloseModal() {

        let eAlertMessage = document.querySelector("#alertMessage");

        eAlertMessage.classList.add("hidden");
        document.querySelector('#configurations').style.display = 'none';

    }
