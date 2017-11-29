    
    console.clear();
    var eView = document.querySelector("#view");
    var eDivBackCards = document.querySelector("#backgroundCards");
    var nCount;
    var nElapsedTime;
	var aCards = new Array();
	var nPairs = 12;

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
    var sBackground = "bg1";
    
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

            eDiv.classList.add("figura", sBackground);
            eDiv.setAttribute("data-value",parseInt(v));
            eImg.src = "assets/img/animais/"+v+".png";

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

            eThis.classList.remove(sBackground);

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
						eThis.classList.add(sBackground);
						eTemp.classList.remove("bg-danger","ok");
						eTemp.classList.add(sBackground);
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
                        // eHome.classList.remove("hidden");
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

        document.querySelector("#startingGame").classList.remove("hidden");
        eCountdown.style.fontSize = '150px';

        fnCountdown();
        fnSuffle();

    }

    function fnCountdown() {

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

        nCount = setTimeout(function() { fnCountdown() }, 1000);

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

        for (var i = 1; i <= 3; i++) {

            eImgBackCards = document.createElement("img");

            eImgBackCards.setAttribute("data-value", i);

            if (i == 1) {
                eImgBackCards.classList.add("figuraBack", "bg1-check");
                eImgBackCards.setAttribute("id", "checked");
            }
            else {
                eImgBackCards.classList.add("figuraBack", "bg" + i);
            }

            eImgBackCards.style.margin = '10px';
            eImgBackCards.style.cursor = 'pointer';
            eImgBackCards.addEventListener('click', fnChooseBackgroudCards)

            eDivBackCards.appendChild(eImgBackCards);

        }

    }
    
    function fnSaveBackground() {

        let eAlertMessage = document.querySelector("#alertMessage");
        let eImgChecked = document.querySelector("#checked");

        sBackground = "bg" + eImgChecked.getAttribute("data-value");
        eAlertMessage.classList.remove("hidden");
        document.querySelector("#btnSave").disabled = true;

    }

    //AUX QUE ARMAZENARÁ O VALOR DA IMAGEM ANTERIOR - FUNÇÃO ABAIXO
    var aux = 1;

    function fnChooseBackgroudCards() {

        var eCheckImages = document.querySelector("#checked");
        var nThisDataValue = this.getAttribute("data-value");

        if (eCheckImages) {
            eCheckImages.removeAttribute("id");
            eCheckImages.className = "";
            eCheckImages.classList.add("figuraBack", "bg" + aux)

            this.setAttribute("id", "checked");
            this.classList.add("bg" + nThisDataValue + "-check");

        }
        else {
            this.setAttribute("id", "checked");
            this.classList.add("bg" + nThisDataValue + "-check");
        }

        document.querySelector("#btnSave").disabled = false;
        aux = nThisDataValue;

    }
    
    function fnCloseModal() {

        let eAlertMessage = document.querySelector("#alertMessage");

        eAlertMessage.classList.add("hidden");
        document.querySelector('#configurations').style.display = 'none';

    }
