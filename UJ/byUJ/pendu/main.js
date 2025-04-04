// @author mydkong, mydkong //
// @date Friday 7th march 2025 4:04 AM //
// @bugfix arrêt de la boucle infinie while //
const ecartPerso=125;
var motsFetches, mots=[];
var event=new Object();
for(var i=0;i<3574;i++){
	mots[i]=null;
}

//getFrenchWords();
//const lettresInterdites="éèêëàâîïôû";
for(var i=0;i<3574;i++){
	mots[i]=words[i].name;
	mots[i].replace("é", "e");
	mots[i].replace("è", "e");
	mots[i].replace("ê", "e");
	mots[i].replace("ë", "e");
	mots[i].replace("à", "a");
	mots[i].replace("â", "a");
	mots[i].replace("î", "i");
	mots[i].replace("ï", "i");
	mots[i].replace("ô", "o");
	mots[i].replace("û", "u");
}

var r=(rt)=>{
	return rt//
}

var s=r;
var okClicked=false;
var annulerClicked=false;
event.select=(str)=>{
	return document.querySelector(str);
}
event.select(".ok").addEventListener("click", ()=>{
	okClicked=true;
})
event.select(".ok").addEventListener("mouseup", ()=>{
	okClicked=false;
})
event.select(".annuler").addEventListener("click", ()=>{
	annulerClicked=true;
})
event.select(".annuler").addEventListener("mouseup", ()=>{
	annulerClicked=false;
})

/*// Créer un tableau de mots
var mots = [
	"javascript",
	"singe",
	"extraordinaire",
	"pancake",
	"patate",
	"robot",
	"jeu",
	"intergouvernementalisationnelement"
]*/

var delay=(milliseconds)=>{
	const date = Date.now();
	var currentDate;
	do{
		currentDate = Date.now();
	}while(currentDate - date < milliseconds);
}

// Choisir un mot secret au hasard
var motSecret = mots[Math.floor(Math.random() * mots.length)];
var essais=6;
var canvas=document.querySelector("canvas");
var ctx=canvas.getContext("2d");

const alphabetstr="abcdefghijklmnopqrstuvwxyz";
var alphabet=new Object();
for(var i=0;i<26;i++){
	alphabet[alphabetstr.substr(i, 1)]=false;
}

var cercle=(x, y, rayon, cerclePlein, epaisseur, couleur)=>{
	if (cerclePlein) {
		ctx.strokeStyle=couleur;
	} else {
		ctx.fillStyle=couleur;
	}
	ctx.lineWidth = epaisseur;
	ctx.beginPath();
	ctx.arc(x, y, rayon, 0, Math.PI * 2, false);
	if (cerclePlein) {
		ctx.fill();
	} else {
		ctx.stroke();
	}
}

var membres=[
	function(){
		cercle(250-ecartPerso, 225, 20, true, 5, "#000");
	},
	function(){
		ctx.strokeStyle="#000";
		ctx.lineWidth=5;
		ctx.beginPath();
		ctx.moveTo(250-ecartPerso, 225);
		ctx.lineTo(250-ecartPerso, 275);
		ctx.stroke();
	},
	function(){
		ctx.strokeStyle="#000";
		ctx.lineWidth=5;
		ctx.beginPath();
		ctx.moveTo(250-ecartPerso, 265);
		ctx.lineTo(225-ecartPerso, 230);
		ctx.stroke();
	},
	function(){
		ctx.strokeStyle="#000";
		ctx.lineWidth=5;
		ctx.beginPath();
		ctx.moveTo(250-ecartPerso, 265);
		ctx.lineTo(275-ecartPerso, 230);
		ctx.stroke();
	},
	function(){
		ctx.strokeStyle="#000";
		ctx.lineWidth=5;
		ctx.beginPath();
		ctx.moveTo(250-ecartPerso, 275);
		ctx.lineTo(230-ecartPerso, 295);
		ctx.stroke();
	},
	function(){
		ctx.strokeStyle="#000";
		ctx.lineWidth=5;
		ctx.beginPath();
		ctx.moveTo(250-ecartPerso, 275);
		ctx.lineTo(270-ecartPerso, 295);
		ctx.stroke();
	}
]

event.montrer=(elem)=>{
	event.select(elem).hidden=false;
}
event.cacher=(elem)=>{
	event.select(elem).hidden=true;
}
event.alert=(str, tt)=>{
	event.select(".absolute").hidden=false;
	event.select(".title").innerHTML=tt;
	event.select(".paragraph").innerHTML=str;
	event.cacher(".letter");
	event.select(".annuler").style.display="none"; // Hide event.select(".annuler")
	event.montrer(".ok");
}
event.confirm=(str, tt)=>{
	event.select(".absolute").hidden=false;
	event.select(".title").innerHTML=tt;
	event.select(".paragraph").innerHTML=str;
	event.cacher(".letter");
	event.select(".annuler").style.display="block"; // Show event.select(".annuler")
	event.montrer(".ok");
}
event.prompt=(str, tt, textElem)=>{
	event.select(".absolute").hidden=false;
	event.select(".title").innerHTML=tt;
	event.select(".paragraph").innerHTML=str;
	event.montrer(".letter");
	event.select(".annuler").style.display="block"; // Show event.select(".annuler")
	event.montrer(".ok");
	event.select(textElem).focus();
}
event.inverse=new Object();
event.inverse["6"]=0;
event.inverse["5"]=1;
event.inverse["4"]=2;
event.inverse["3"]=3;
event.inverse["2"]=4;
event.inverse["1"]=5;
event.inverse["0"]=6;

// Créer le tableau de réponses
var tableauReponses = [];
for (var i = 0; i < motSecret.length; i++) {
	tableauReponses[i]="_";
}

var win=true;
var nombreLettresManquantes = motSecret.length;
var reponse;
var sortie;

const update=()=>{
	event.select(".tableau-reponses").innerHTML=tableauReponses.join(" ");
	event.select("essais").innerHTML=essais+" essais"; // L.242
}

event.select(".ok").addEventListener("click", ()=>{
	const reponse1=event.select(".letter").innerHTML;
	event.select(".letter").innerHTML="";
	if(event.circuit===0){
		//event.cacher(".absolute");
		event.prompt("Devine une lettre, ou clique sur Annuler pour quitter la partie.", "Action utilisateur 🙏", ".letter"); ///  L.319-321
		event.circuit=1;
	}else if(event.circuit===1){
		reponse=reponse1;
		//event.cacher(".absolute");
		reponse=reponse.toLowerCase(); // Transcription en minuscule
		
  	 	/*if (reponse === null) {
			// Quitter la boucle du jeu
				event.circuit=2;
				event.confirm("Quitter ?", "Action requise 🤔 :";
			} else if (reponse!=="") {
				event.circuit=3; // Tableau
				event.alert("Tu ne dois saisir qu'une seule lettre.", "Oups...");
			} else {
				*/// Mettre à jour l'état de la partie
				if (!alphabet[reponse]) {
					var s=true;
					for (var j = 0; j < motSecret.length; j++) {
						if (motSecret[j] === reponse) {
							tableauReponses[j] = reponse;
							nombreLettresManquantes--;
							s=false;
						}
					}
					if (s===true) {
						membres[event.inverse[String(essais--)]]();
					}
					alphabet[reponse]=true;
					if(nombreLettresManquantes<1){
						win=true;
						verif();
					}
					if(essais<1){
						win=false;
						verif();
					}
				} else {
					event.circuit=0;
					event.alert("La lettre a déjà été mentionnée.", "Oups...");
				}
		//}
	}else if(event.circuit===2){
		event.cacher(".absolute");
	}else if(event.circuit===3){
		event.alert(tableauReponses.join(" "), "Tableau :");
		event.circuit=0;
	}else if(event.circuit===1000){
		window.location.reload();
	}else if(event.circuit===999){
		verif();
	}
	update();
});

event.select(".annuler").addEventListener("click", ()=>{
	if(event.circuit===1){
		event.circuit=2;
		event.confirm("Quitter ?", "Action requise 🤔 :");
	}else if(event.circuit===2){
		//event.cacher(".absolute");
		event.prompt("Devine une lettre, ou clique sur Annuler pour quitter la partie.", "Action utilisateur 🙏", ".letter"); ///  L.319-321
		event.circuit=1;
	}else if(event.circuit===1000){
		event.cacher(".absolute");
	}else if(event.circuit===999){
		verif();
	}
	update();
});

event.select(".letter").addEventListener("keydown", (e)=>{
	if(e.keyCode===13) event.select(".ok").click();
});

/*// La boucle du jeu
 var intervalle=setInterval(()=>{
 	// Afficher la progression du joueur
 	*///event.alert(tableauReponses.join(" "), "Tableau :");
	//event.circuit=0;
 	/*// Récupérer un essai du joueur
 	var reponse = event.prompt("Devine une lettre, ou clique sur Annuler pour quitter la partie.", "Une lettre plize 🙏 !!!");
 	if (reponse !== null) {
 		reponse=reponse.toLowerCase(); // Transcription en minuscule
 	}
   	if (reponse === null) {
		// Quitter la boucle du jeu
		if (event.confirm("Quitter ?", "Action requise 🤔 :")) {
			win=NaN;
			verif();
		}
	} else if (reponse.length !== 1) {
		event.alert("Tu ne dois saisir qu'une seule lettre.", "Oups...");
	} else {
		// Mettre à jour l'état de la partie
		if (!alphabet[reponse]) {
			var s=true;
			for (var j = 0; j < motSecret.length; j++) {
				if (motSecret[j] === reponse) {
					tableauReponses[j] = reponse;
					nombreLettresManquantes--;
					s=false;
				}
			}
			if (s=true) {
				essais--;
				membres[5-essais-1]();
			}
			alphabet[reponse]=true;
		} else {
			event.alert("La lettre a déjà été mentionnée.", "Oups...");
		}
	}

	if (!essais>0) {
		win=false;
		verif();
	}
	// Fin de la boucle de jeu
}, 50)*/

update();
event.cacher(".absolute");
event.prompt("Devine une lettre, ou clique sur Annuler pour quitter la partie.", "Action utilisateur 🙏", ".letter");
event.circuit=1;

var verif=()=>{
	/*clearInterval(intervalle);*/
	if (win == true) {
		// Féliciter le joueur gagnant
		event.confirm("Félicitations ! Le mot secret est bien " + motSecret+" !", "Bravo 🥳 ! On reccomence 🥺 ?");
		event.circuit=1000;
	} else if (win == false){
		// Lui afficher le message "Perdu"
		event.confirm("Oups ! Tu as utilisé tous tes essais, le mot était " + motSecret+"...", "Oups... 😭 On reccomence 🥺 ?");
		event.circuit=1000;
	}
}
setInterval(()=>{ // Alternative à while qui forme une boucle infinie
	if(event.select(".letter").innerText.length>1){
		event.select(".letter").innerText=event.select(".letter").innerText.substr(0, 1)//
	}
}, 3)

// End
