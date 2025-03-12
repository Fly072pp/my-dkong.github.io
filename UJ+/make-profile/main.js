var event=new Object(), step=0, iconface=null, name=null;
event.select=(str)=>{
  return document.querySelector(str);
}
const nextstep=(st)=>{
  if(st===1){
    event.select(".root").innerHTML=`<h1>Étape 1 : Votre icône de profil</h1>
      <p class="subtitle">Choisissez votre icône de profil</p>
      <div class="img-pp"></div>
      <button class="next-step">Continuer</button>`;
    for(var i=0;i<6;i++){
      event.select(".img-pp").innerHTML+='<img class="icon-pp icon'+i+'" src="img/'+(i+1)+'.webp">';
    }
    event.select(".icon1").addEventListener("click", (e)=>{
      console.log(e);
      iconface=String(0);
    });
    event.select(".icon"+2).addEventListener("click", (e)=>{
      console.log(e);
      iconface=String(1);
    });
    event.select(".icon"+3).addEventListener("click", (e)=>{
      console.log(e);
      iconface=String(2);
    });
    event.select(".icon"+4).addEventListener("click", (e)=>{
      console.log(e);
      iconface=String(3);
    });
    event.select(".icon"+5).addEventListener("click", (e)=>{
      console.log(e);
      iconface=String(4);
    });
    event.select(".icon"+6).addEventListener("click", (e)=>{
      console.log(e);
      iconface=String(5);
    });
    event.select(".next-step").addEventListener("click", ()=>{
      name=event.select(".input-name").value;
      nextstep(++step);
    });
  }else if(st===2){
    event.select(".root").innerHTML=`<h1>Étape 2 : Votre nom</h1>
    <p class="subtitle">Entrez le nom par lequel vous voulez que l'on vous appelle</p>
    <input type="text" class="input-name">
    <button class="next-step">Continuer</button>`;
    event.select(".next-step").addEventListener("click", ()=>{
      name=event.select(".input-name").value;
      nextstep(++step);
    }); 
  }else if(st===3){
    name=event.select(".input-name").value;
    const dataLS=new Object();
    dataLS[sessionStorage.getItem("IDUSER")]=new Object();
    dataLS[sessionStorage.getItem("IDUSER")].iconface=iconface;
    dataLS[sessionStorage.getItem("IDUSER")].name=name;
    localStorage.setItem("UJ+data", JSON.stringify(dataLS));
    event.select(".root").innerHTML=`<h1>Tout est prêt !</h1>
    <button class="link-uj+">Aller sur UJ+</button>`;
    event.select(".link-uj+").addEventListener("click", ()=>{window.location.href="../"}); 
  }
}

if(sessionStorage.getItem("IDUSER")!==null){
  if(localStorage.getItem("UJ+data")!==null){
    if(JSON.parse(localStorage.getItem("UJ+data"))[sessionStorage.getItem("IDUSER")]!==null){
      nextstep(++step);
      event.select(".next-step").addEventListener("click", ()=>{
        if(iconface!==null){
          nextstep(++step)
        }else{
          if(event.select(".root").innerHTML.indexOf("Cliquez sur une des images")===-1){
            event.select(".root").innerHTML+='<h1 style="color: red;">Cliquez sur une des images</h1>';
            event.select(".next-step").addEventListener("click", ()=>{
              name=event.select(".input-name").value;
              nextstep(++step);
            }); 
          }
        }
      });
    }else{
      localStorage.setItem("UJ+data", JSON.stringify({}));
      window.location.reload();
    }
  }else{
    localStorage.setItem("UJ+data", JSON.stringify({}));
    window.location.reload();
  }
}else{
  window.location.href="../login/";
}
